// GET /api/detections?list=tests      — the six questions
// GET /api/detections?list=detected   — companies that failed one or more
// GET /api/detections?list=cleared    — companies that came back clean
// GET /api/detections?ticker=TOVX     — one company, with its evidence
//
// PUBLIC and READ-ONLY by design. No key. No SQL from the caller.
// Named queries only, same rule as db.js.

const LISTS = {
  tests:    `SELECT test_no, short_name, question, what_fails, source_document, applies_to
               FROM detection_tests ORDER BY test_no`,
  detected: `SELECT * FROM v_detected`,
  cleared:  `SELECT * FROM v_cleared`
};

const ONE = `SELECT d.*, o.price_30d, o.price_90d, o.price_180d, o.price_1y,
                    o.chg_30d_pct, o.chg_90d_pct, o.chg_180d_pct, o.chg_1y_pct,
                    o.reverse_split_since, o.reverse_split_ratio, o.reverse_split_date,
                    o.authorized_restored, o.financings_since,
                    o.shares_out_now, o.dilution_multiple,
                    o.listing_status, o.going_concern
               FROM detections d
               LEFT JOIN detection_outcomes o ON o.detection_id = d.detection_id
              WHERE d.ticker = ?
              ORDER BY d.event_date DESC LIMIT 1`;

const TESTS = `SELECT test_no, short_name, question, what_fails, source_document, applies_to
                 FROM detection_tests ORDER BY test_no`;

const EVIDENCE = `SELECT test_no, what_it_shows, quoted_text, filing_type, filing_date,
                         filing_url, page_or_section
                    FROM detection_evidence WHERE detection_id = ?
                   ORDER BY test_no, filing_date`;

const json = (d, s) => new Response(JSON.stringify(d), {
  status: s || 200,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'public, max-age=300',
    'access-control-allow-origin': '*'
  }
});

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  if (!env.OVERHANG) return json({ error: 'no database bound' }, 500);

  const ticker = (url.searchParams.get('ticker') || '')
    .toUpperCase().replace(/[^A-Z.\-]/g, '').slice(0, 8);

  if (ticker) {
    try {
      const row = await env.OVERHANG.prepare(ONE).bind(ticker).first();

      try {
        await env.OVERHANG.prepare(
          `INSERT INTO detection_lookups (ticker, found, looked_at)
           VALUES (?, ?, datetime('now'))`
        ).bind(ticker, row ? 1 : 0).run();
      } catch (e) { /* logging must never break the answer */ }

      if (!row) return json({ ticker, rows: [], tests: [], evidence: [] });

      const t = await env.OVERHANG.prepare(TESTS).all();
      const e = await env.OVERHANG.prepare(EVIDENCE).bind(row.detection_id).all();

      return json({ ticker, rows: [row], tests: t.results || [], evidence: e.results || [] });
    } catch (err) {
      return json({ error: String(err && err.message || err) }, 500);
    }
  }

  const name = url.searchParams.get('list') || 'detected';
  const sql = LISTS[name];
  if (!sql) return json({ error: 'unknown list', available: Object.keys(LISTS) }, 400);

  try {
    const { results } = await env.OVERHANG.prepare(sql).all();
    return json({ list: name, rows: results || [] });
  } catch (err) {
    return json({ error: String(err && err.message || err) }, 500);
  }
}
