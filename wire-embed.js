/* BUILT 2026-08-26 18:50 ET */
/* ============================================================
   wire-embed.js  —  THE WARRANT WIRE, on any site
   Version 1b · 26 Aug 2026

   ONE LINE, anywhere, on any of the properties:

     <div data-wire></div>
     <script src="https://triggeredshort.com/wire-embed.js"></script>

   OPTIONS on the div:
     data-wire="5"        how many filings          (default 5)
     data-days="14"       how far back              (default 14)
     data-heavy="1"       only heavy marks
     data-title="..."     override the heading
     data-link="..."      where "the full wire" goes

   WHAT IT GIVES AWAY, DELIBERATELY: the date, the company, the form,
   and which language the filing contains. That is the headline.
   WHAT IT DOES NOT: what that language means for that company, which
   sections it sits in, or what the terms actually do. Clicking a row
   opens the offer, not the answer.
   ============================================================ */

(function () {
  var API  = "https://triggeredshort-wire.realroofers.workers.dev";
  var HOME = "https://triggeredshort.com/warrants.html";
  var READ = "https://8k10q.com/";
  var HEAVY = ["Price reset","Cashless exercise","Warrant inducement","Inducement agreement",
               "Reduced exercise price","Variable rate transaction","Equity line"];

  var CSS = ''
  + '.tsw{font:14px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;'
  +   'color:#23241d;max-width:660px}'
  + '.tsw *{box-sizing:border-box}'
  + '.tsw-h{display:flex;align-items:baseline;gap:10px;border-bottom:1px solid #d8d8d1;'
  +   'padding-bottom:7px;margin:0 0 4px}'
  + '.tsw-h b{font-size:14px;font-weight:600}'
  + '.tsw-h span{font-family:ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:.13em;'
  +   'text-transform:uppercase;color:#8a8b80;margin-left:auto}'
  + '.tsw-r{padding:10px 0;border-bottom:1px solid #efece4;cursor:pointer}'
  + '.tsw-r:last-of-type{border-bottom:0}'
  + '.tsw-r:hover{background:#faf9f5}'
  + '.tsw-t{display:flex;gap:9px;align-items:baseline;flex-wrap:wrap}'
  + '.tsw-d{font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#8a8b80;white-space:nowrap}'
  + '.tsw-c{font-size:14px;line-height:1.35;flex:1;min-width:170px;font-weight:600}'
  + '.tsw-f{font-family:ui-monospace,Menlo,monospace;font-size:10.5px;color:#8a8b80}'
  + '.tsw-m{display:inline-block;font-family:ui-monospace,Menlo,monospace;font-size:9.5px;'
  +   'letter-spacing:.04em;border:1px solid #e0ddd3;background:#faf9f5;color:#5c5d53;'
  +   'padding:1px 6px;border-radius:2px;margin:5px 4px 0 0}'
  + '.tsw-m.h{background:#fdf4f3;border-color:#e3c9c6;color:#8a1c1c}'
  + '.tsw-more{font-family:ui-monospace,Menlo,monospace;font-size:9.5px;color:#1f6b4f;margin-top:5px;'
  +   'display:inline-block}'
  + '.tsw-r.open .tsw-more{display:none}'
  + '.tsw-o{display:none;margin:10px 0 2px;border:1px solid #d8d8d1;border-left:3px solid #1f6b4f;'
  +   'background:#fff;border-radius:0 3px 3px 0;padding:13px 15px}'
  + '.tsw-r.open .tsw-o{display:block}'
  + '.tsw-o p{margin:0 0 10px;font-size:13.5px;line-height:1.55;color:#4a4a44}'
  + '.tsw-o p b{color:#23241d}'
  + '.tsw-buy{display:flex;gap:8px;flex-wrap:wrap}'
  + '.tsw-buy a{display:inline-block;font:12.5px inherit;text-decoration:none;border-radius:3px;'
  +   'padding:8px 13px;border:1px solid #d8d8d1;color:#23241d;background:#fff}'
  + '.tsw-buy a.g{background:#1f6b4f;border-color:#1f6b4f;color:#fff}'
  + '.tsw-buy a:hover{border-color:#1f6b4f;color:#1f6b4f}'
  + '.tsw-buy a.g:hover{opacity:.9;color:#fff}'
  + '.tsw-buy a b{font-family:ui-monospace,Menlo,monospace;font-weight:600}'
  + '.tsw-src{margin:9px 0 0;font-family:ui-monospace,Menlo,monospace;font-size:10px;color:#8a8b80}'
  + '.tsw-src a{color:#8a8b80}'
  + '.tsw-foot{margin:11px 0 0;font-size:12px;color:#6b6b66;line-height:1.5}'
  + '.tsw-foot a{color:#1f6b4f;text-decoration:none;font-weight:600}'
  + '.tsw-foot a:hover{text-decoration:underline}'
  + '.tsw-q{color:#8a8b80;font-size:13px;padding:10px 0}'
  + '.tsw-gate{margin:12px 0 0;border:1px solid #d8d8d1;border-left:3px solid #8a6a1c;'
  +   'background:#faf8f2;border-radius:0 3px 3px 0;padding:13px 16px}'
  + '.tsw-gate b{display:block;font-size:14.5px;color:#23241d;margin-bottom:4px}'
  + '.tsw-gate p{margin:0 0 11px;font-size:13px;line-height:1.55;color:#5c5d53}'
  + '.tsw-gate p b{display:inline;font-size:13px}'
  + '.tsw-gate a{display:inline-block;font:12.5px inherit;text-decoration:none;'
  +   'background:#8a6a1c;border:1px solid #8a6a1c;color:#fff;padding:8px 14px;border-radius:3px}'
  + '.tsw-gate a:hover{opacity:.9}';

  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
    return { "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]; }); }

  function nameOf(s){ return String(s || "").replace(/\s*\(CIK\s*\d+\)\s*$/i, "").trim(); }

  function styles(){
    if (document.getElementById("tsw-css")) return;
    var s = document.createElement("style");
    s.id = "tsw-css"; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function row(f) {
    var labels = String(f.labels || "").split(" | ")
      .filter(function (x, i, a) { return x && a.indexOf(x) === i; });
    var shown = labels.slice(0, 3);
    var rest  = labels.length - shown.length;

    var marks = shown.map(function (l) {
      return '<span class="tsw-m' + (HEAVY.indexOf(l) > -1 ? ' h' : '') + '">'
           + esc(l) + '</span>'; }).join("");
    if (rest) marks += '<span class="tsw-m">+' + rest + '</span>';

    var t  = (f.ticker || "").toUpperCase();
    var co = nameOf(f.company);
    var q  = t ? "ticker=" + encodeURIComponent(t) : "q=" + encodeURIComponent(co);
    var hv = labels.filter(function (l) { return HEAVY.indexOf(l) > -1; }).length;

    return '<div class="tsw-r">'
      + '<div class="tsw-t">'
      +   '<span class="tsw-d">' + esc(f.filed_on || "") + '</span>'
      +   '<span class="tsw-c">' + esc(co) + '</span>'
      +   '<span class="tsw-f">' + esc(f.form || "") + '</span></div>'
      + marks
      + '<div class="tsw-more">what this means &rarr;</div>'
      + '<div class="tsw-o">'
      +   '<p>This filing contains <b>' + labels.length + '</b> term'
      +     (labels.length === 1 ? '' : 's') + ' we watch for'
      +     (hv ? ', <b>' + hv + '</b> of them heavy' : '') + '. '
      +     '<b>What they do to a shareholder depends on the sections they sit in</b> &mdash; '
      +     'the exhibit, not the announcement. That takes reading.</p>'
      +   '<div class="tsw-buy">'
      +     '<a class="g" href="' + READ + '?' + q
      +       '&accession=' + encodeURIComponent(f.accession || '')
      +       '">Read this filing in plain English &middot; <b>$11</b></a>'
      +     '<a href="' + READ + '?' + q + '&deep=1">The whole company &middot; <b>$149</b></a>'
      +   '</div>'
      +   (f.doc_url
          ? '<p class="tsw-src">The document itself is public: '
            + '<a href="' + esc(f.doc_url) + '" target="_blank" rel="noopener">read it on EDGAR &#8599;</a>'
            + ' &mdash; we never hide the source, we read it.</p>'
          : '')
      + '</div></div>';
  }

  function render(box) {
    var n     = parseInt(box.getAttribute("data-wire") || "5", 10) || 5;
    var days  = parseInt(box.getAttribute("data-days") || "14", 10) || 14;
    var heavy = box.getAttribute("data-heavy") === "1";
    var title = box.getAttribute("data-title") || "Filed in the last " + days + " days";
    var link  = box.getAttribute("data-link") || HOME;

    box.className = "tsw";
    box.innerHTML = '<div class="tsw-q">Reading the wire&hellip;</div>';

    fetch(API + "?wire=1&days=" + days + (heavy ? "&heavy=1" : ""))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d.ok) throw new Error("no data");
        var all  = d.rows || [];
        var rows = all.slice(0, n);
        var out = '<div class="tsw-h"><b>' + esc(title) + '</b>'
                + '<span>' + all.length + ' filings</span></div>';
        out += rows.length ? rows.map(row).join("")
             : '<div class="tsw-q">Nothing on the wire in this window.</div>';

        var behind = all.length - rows.length;
        if (behind > 0) {
          out += '<div class="tsw-gate">'
              +   '<b>+' + behind + ' more &mdash; get the service</b>'
              +   '<p>Everyone sees the ' + rows.length + ' most recent, every time. '
              +   'The rest of the wire &mdash; every company, every mark, every day &mdash; is '
              +   '<b>$60 a year</b>. We make evaluation of filings easy. That is the service.</p>'
              +   '<a href="' + esc(link) + '">Get the service &middot; $60/yr</a>'
              + '</div>';
        }

        out += '<p class="tsw-foot">Filings whose text carries warrant financing language. '
             + 'A match is not a finding &mdash; it means the document is worth reading. '
             + 'We make evaluation of filings easy. That is the service.</p>';
        box.innerHTML = out;

        box.addEventListener("click", function (e) {
          var r = e.target.closest(".tsw-r");
          if (!r || e.target.closest("a")) return;
          r.classList.toggle("open");
        });
      })
      .catch(function () {
        box.innerHTML = '<div class="tsw-q">The wire is not reachable right now. '
                      + '<a href="' + esc(link) + '" style="color:#1f6b4f">Open it directly &rarr;</a></div>';
      });
  }

  function go() {
    styles();
    var boxes = document.querySelectorAll("[data-wire]");
    for (var i = 0; i < boxes.length; i++) render(boxes[i]);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", go);
  else go();
})();
