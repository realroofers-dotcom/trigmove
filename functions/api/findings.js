/* ============================================================
   functions/api/findings.js
   Public, read-only, no key. Same shape as detections.js.

     /api/findings                 all findings, newest first
     /api/findings?id=1            one finding with its full timeline
     /api/findings?ticker=TOVX     findings for one company
     /api/findings?status=open     open | resolved | closed

   Named queries only. No SQL is ever accepted from the caller.
   ============================================================ */

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const q   = url.searchParams;

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=300"
  };

  try {
    const id = q.get("id");

    if (id) {
      const f = await env.OVERHANG.prepare(
        "SELECT * FROM v_findings_public WHERE id = ?"
      ).bind(id).first();
      if (!f) return json({ ok:false, error:"not found" }, headers, 404);

      const ev = await env.OVERHANG.prepare(
        `SELECT happened_on, kind, headline, detail, source_form, source_accession, bearing
           FROM finding_events WHERE finding_id = ? ORDER BY happened_on`
      ).bind(id).all();

      const mk = await env.OVERHANG.prepare(
        `SELECT as_of, px, shares, mcap, note
           FROM finding_marks WHERE finding_id = ? ORDER BY as_of`
      ).bind(id).all();

      return json({
        ok: true,
        finding: f,
        timeline: ev.results || [],
        marks: mk.results || [],
        note: NOTE
      }, headers);
    }

    let sql = "SELECT * FROM v_findings_public";
    const binds = [];
    const ticker = (q.get("ticker") || "").toUpperCase();
    const status = q.get("status");

    if (ticker) { sql += " WHERE ticker = ?"; binds.push(ticker); }
    else if (status) { sql += " WHERE status = ?"; binds.push(status); }

    const r = await env.OVERHANG.prepare(sql).bind(...binds).all();
    const rows = r.results || [];

    const counts = { total: rows.length, open: 0, resolved: 0, closed: 0, no_events: 0 };
    for (const x of rows) {
      if (counts[x.status] !== undefined) counts[x.status]++;
      if (!x.events) counts.no_events++;
    }

    return json({ ok:true, counts, findings: rows, note: NOTE }, headers);

  } catch (e) {
    return json({ ok:false, error:String(e) }, headers, 500);
  }
}

const NOTE =
  "A finding is a documented condition with a date on it, not a prediction. Everything recorded " +
  "afterwards is filed whether it supports the finding or not, and a finding where nothing has " +
  "happened stays on this list and says so.";

function json(obj, headers, status = 200) {
  return new Response(JSON.stringify(obj, null, 2), { status, headers });
}
