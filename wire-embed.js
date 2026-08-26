/* ============================================================
   wire-embed.js  —  THE WARRANT WIRE, on any site
   Triggered Short · built 26 Aug 2026

   ONE LINE, anywhere on any page, on any of the properties:

     <div data-wire></div>
     <script src="https://triggeredshort.com/wire-embed.js"></script>

   OPTIONS — put them on the div:

     data-wire="5"        how many filings to show      (default 5)
     data-days="14"       how far back to look          (default 14)
     data-heavy="1"       only filings with a heavy mark
     data-title="..."     override the heading
     data-link="..."      where "the full wire" points  (default triggeredshort.com/warrants)

   It writes its own styles into its own container only, so it will
   not fight with whatever CSS the host page already has.
   ============================================================ */

(function () {
  var API  = "https://triggeredshort-wire.realroofers.workers.dev";
  var HOME = "https://triggeredshort.com/warrants.html";
  var HEAVY = ["Price reset","Cashless exercise","Warrant inducement","Inducement agreement",
               "Reduced exercise price","Variable rate transaction","Equity line"];

  var CSS = ''
  + '.tsw{font:14px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;'
  +   'color:#23241d;max-width:640px}'
  + '.tsw *{box-sizing:border-box}'
  + '.tsw-h{display:flex;align-items:baseline;gap:10px;border-bottom:1px solid #d8d8d1;'
  +   'padding-bottom:7px;margin:0 0 10px}'
  + '.tsw-h b{font-size:14px;font-weight:600}'
  + '.tsw-h span{font-family:ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:.13em;'
  +   'text-transform:uppercase;color:#8a8b80;margin-left:auto}'
  + '.tsw-r{padding:9px 0;border-bottom:1px solid #efece4}'
  + '.tsw-r:last-of-type{border-bottom:0}'
  + '.tsw-t{display:flex;gap:9px;align-items:baseline;flex-wrap:wrap}'
  + '.tsw-d{font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#8a8b80;white-space:nowrap}'
  + '.tsw-c{font-size:14px;line-height:1.35;flex:1;min-width:180px}'
  + '.tsw-f{font-family:ui-monospace,Menlo,monospace;font-size:10.5px;color:#8a8b80}'
  + '.tsw-m{display:inline-block;font-family:ui-monospace,Menlo,monospace;font-size:9.5px;'
  +   'letter-spacing:.04em;border:1px solid #e0ddd3;background:#faf9f5;color:#5c5d53;'
  +   'padding:1px 6px;border-radius:2px;margin:5px 4px 0 0}'
  + '.tsw-m.h{background:#fdf4f3;border-color:#e3c9c6;color:#8a1c1c}'
  + '.tsw-foot{margin:11px 0 0;font-size:12px;color:#6b6b66;line-height:1.5}'
  + '.tsw-foot a{color:#1f6b4f;text-decoration:none;font-weight:600}'
  + '.tsw-foot a:hover{text-decoration:underline}'
  + '.tsw-q{color:#8a8b80;font-size:13px;padding:10px 0}';

  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
    return { "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]; }); }

  function styles(){
    if (document.getElementById("tsw-css")) return;
    var s = document.createElement("style");
    s.id = "tsw-css"; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function render(box) {
    var n     = parseInt(box.getAttribute("data-wire") || "5", 10) || 5;
    var days  = parseInt(box.getAttribute("data-days") || "14", 10) || 14;
    var heavy = box.getAttribute("data-heavy") === "1";
    var title = box.getAttribute("data-title") || "The warrant wire";
    var link  = box.getAttribute("data-link") || HOME;

    box.className = "tsw";
    box.innerHTML = '<div class="tsw-q">Loading…</div>';

    fetch(API + "?wire=1&days=" + days + (heavy ? "&heavy=1" : ""))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d.ok) throw new Error("no data");
        var rows = (d.rows || []).slice(0, n);
        var out = '<div class="tsw-h"><b>' + esc(title) + '</b>'
                + '<span>' + (d.filings || 0) + ' in ' + days + ' days</span></div>';

        if (!rows.length) {
          out += '<div class="tsw-q">Nothing on the wire in this window.</div>';
        } else {
          out += rows.map(function (f) {
            var labels = (f.labels || "").split(" | ")
              .filter(function (x, i, a) { return x && a.indexOf(x) === i; }).slice(0, 4);
            var marks = labels.map(function (l) {
              return '<span class="tsw-m' + (HEAVY.indexOf(l) > -1 ? ' h' : '') + '">'
                   + esc(l) + '</span>'; }).join("");
            return '<div class="tsw-r"><div class="tsw-t">'
                 + '<span class="tsw-d">' + esc(f.filed_on || "") + '</span>'
                 + '<span class="tsw-c">' + esc(f.company || "") + '</span>'
                 + '<span class="tsw-f">' + esc(f.form || "") + '</span></div>'
                 + marks + '</div>';
          }).join("");
        }

        out += '<p class="tsw-foot">Filings whose text carries warrant financing language. '
             + 'A match is not a finding — it means the document is worth reading. '
             + '<a href="' + esc(link) + '">The full wire →</a></p>';
        box.innerHTML = out;
      })
      .catch(function () {
        box.innerHTML = '<div class="tsw-q">The wire is not reachable right now. '
                      + '<a href="' + esc(link) + '" style="color:#1f6b4f">Open it directly →</a></div>';
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
