/* BUILT 2026-09-01 13:00 ET */
/* ============================================================
   terms.js — the words, explained where they stand

   Put this once, before </body>, on any page:
     <script src="https://triggeredshort.com/terms.js"></script>

   Every term below gets a soft underline wherever it appears in the
   page. Tap it — on a phone or a desktop — and one plain sentence
   appears. Not a definition; a sentence.

   THE RULE THIS IS BUILT TO: a person should never have to leave the
   page to find out what a word means, and should never be handed a
   paragraph when a sentence will do. If a twelve-year-old cannot read
   the popup, the popup is wrong.

   It never marks a word inside a heading, a link, a button, an input,
   or the popup itself — and it marks each term ONCE per page, the
   first time, so a page does not turn blue.
   ============================================================ */

(function () {

var TERMS = [
 {
  "id": "deemed-dividend",
  "term": "Deemed dividend",
  "plain": "When a company gives one group of holders something worth more than what they gave up, the excess is not an expense \u2014 it is treated as a payment to those holders. It reduces the earnings figure attributable to everyone else.",
  "phrase": "a deemed dividend of approximately $X was recorded",
  "short": "One group of shareholders got something worth more than they paid. The difference is treated as a payment to them, and it comes out of everyone else's share of the earnings."
 },
 {
  "id": "warrant-inducement",
  "term": "Warrant inducement",
  "plain": "The company lowers the exercise price on warrants already outstanding to get the holders to exercise now, and usually issues new warrants as part of the deal.",
  "phrase": "inducement offer letter agreement",
  "short": "The company drops the price on warrants people already hold, so they use them now. It gets cash in the door and puts more shares on the market."
 },
 {
  "id": "beneficial-ownership-limitation",
  "term": "Beneficial ownership limitation (the blocker)",
  "plain": "A ceiling written into the warrant that stops the holder from crossing a set percentage at any one moment. Holders exercise up to the line, sell down, and exercise again.",
  "phrase": "the Holder shall not have the right to exercise any portion of this Warrant to the extent that... the Holder would beneficially own in excess of 4.99%",
  "short": "A ceiling that stops one holder owning more than a set percentage at any one moment. He can sell some, drop under the line, and buy again \u2014 so the ceiling caps the moment, not the total."
 },
 {
  "id": "pre-funded-warrant",
  "term": "Pre-funded warrant",
  "plain": "A warrant where nearly the whole purchase price is paid up front and the exercise price is a fraction of a cent. Economically it is a share, structured so the holder does not have to hold it as one yet.",
  "phrase": "pre-funded warrants with an exercise price of $0.0001",
  "short": "A share bought and paid for now, collected later. It does not count as ownership until it is collected, which is how a holder stays under a reporting line."
 },
 {
  "id": "floor-price",
  "term": "Floor price",
  "plain": "The lowest level to which a resetting exercise price is allowed to fall.",
  "phrase": "the Exercise Price shall not be reduced below the Floor Price",
  "short": "The lowest a resetting price is allowed to go. Below it, the reset stops."
 },
 {
  "id": "variable-rate-transaction",
  "term": "Variable rate transaction",
  "plain": "A financing whose conversion or exercise price moves with the market price rather than being fixed. Investors in an earlier deal often prohibit the company from doing another one.",
  "phrase": "the Company shall not effect or enter into an agreement to effect any Variable Rate Transaction",
  "short": "The price the investor pays moves with the market instead of being fixed. If the stock falls, he gets more shares for the same money."
 },
 {
  "id": "minimum-price",
  "term": "Minimum Price",
  "plain": "The exchange&#x27;s reference price for deciding whether a share issuance is at a discount. It is the lower of the official closing price and the average closing price over the prior five trading days \u2014 which means the prior day&#x27;s close alone does not settle it.",
  "phrase": "a price less than the Minimum Price",
  "short": "The exchange's reference price for deciding whether shares were sold at a discount."
 },
 {
  "id": "baby-shelf",
  "term": "Baby shelf (one-third rule)",
  "plain": "A company whose public float is under $75 million may sell no more than one third of that float in any twelve months on a shelf registration.",
  "phrase": "General Instruction I.B.6 of Form S-3",
  "short": "A small company may only sell up to a third of its public float in a year using a shelf. If the value falls, the amount it can raise falls with it."
 },
 {
  "id": "non-accelerated-filer",
  "term": "Non-accelerated filer",
  "plain": "A smaller reporting company is not required to have an outside auditor attest to its internal controls over financial reporting. Management still certifies them.",
  "phrase": "Non-accelerated filer \u2612",
  "short": "A smaller company does not need an outside auditor to check its internal controls. Nobody independent has tested them."
 },
 {
  "id": "authorized-vs-outstanding",
  "term": "Authorized vs outstanding",
  "plain": "Authorized is the ceiling the charter permits. Outstanding is what exists today. The gap between them is how many shares can still be issued without asking anybody.",
  "phrase": "350,000,000 shares of common stock authorized... 45,892,668 shares issued and outstanding",
  "short": "Authorized is the most shares the company is allowed to have. Outstanding is how many exist now. The gap is how many more it can issue without asking anybody."
 },
 {
  "id": "reverse-split-without-a-shareholder-vote",
  "term": "Reverse split without a shareholder vote",
  "plain": "Nevada permits a board to change the authorized shares and the issued shares in the same proportion without asking holders. Delaware requires a vote, but since 2023 only a majority of votes actually cast.",
  "phrase": "pursuant to the laws of the State of Nevada... was not required to obtain stockholder approval",
  "short": "Nevada permits a board to change the authorized shares and the issued shares in the same proportion without asking holders. Delaware requires a vote, but since 2023 only a majority of votes actually cast."
 },
 {
  "id": "going-concern",
  "term": "Going concern",
  "plain": "Management or the auditor has concluded there is substantial doubt the company can fund itself for the next twelve months.",
  "phrase": "substantial doubt about the Company&#x27;s ability to continue as a going concern",
  "short": "The company or its auditor has said there is real doubt it can fund itself for the next twelve months."
 },
 {
  "id": "fails-to-deliver",
  "term": "Fails to deliver",
  "plain": "Shares that did not change hands on the settlement date. The SEC publishes a count by security by date.",
  "phrase": "CNS fails-to-deliver data",
  "short": "Shares that were sold but not handed over on time. The SEC publishes the count."
 },
 {
  "id": "contra-revenue",
  "term": "Contra revenue",
  "plain": "When a company gives something of value to a customer, the value is subtracted from revenue rather than booked as an expense. A warrant issued to a customer can work this way.",
  "phrase": "consideration payable to a customer",
  "short": "The company gave a customer something of value, and its own revenue figure goes down instead of an expense going up."
 },
 {
  "id": "item-4.02",
  "term": "Item 4.02 (non-reliance)",
  "plain": "The company is telling investors that financial statements it already published should no longer be relied on.",
  "phrase": "Non-Reliance on Previously Issued Financial Statements",
  "short": "The company is telling investors that financial statements it already published should no longer be relied on."
 },
 {
  "id": "exhibit",
  "term": "Exhibit",
  "short": "The actual contract attached to a filing. The filing describes it in a paragraph; the exhibit is the twenty pages that say what was really agreed. It is the part almost nobody opens.",
  "phrase": "Exhibit 4.1, Exhibit 10.1"
 },
 {
  "id": "warrant",
  "term": "Warrant",
  "short": "A ticket to buy shares later at a set price. If the stock goes up the holder buys cheap and sells high, and every share he buys is a new share that did not exist before.",
  "phrase": "warrants to purchase shares of common stock"
 },
 {
  "id": "dilution",
  "term": "Dilution",
  "short": "More shares exist, so each one you own is a smaller slice of the same company. Nothing was taken from you directly \u2014 the pie was cut into more pieces.",
  "phrase": ""
 },
 {
  "id": "8-k",
  "term": "8-K",
  "short": "A form a company files when something important happens. It has four business days to file it.",
  "phrase": "Form 8-K"
 },
 {
  "id": "10-q",
  "term": "10-Q",
  "short": "The quarterly report. Three months of numbers, unaudited. The share count is on the cover.",
  "phrase": "Form 10-Q"
 },
 {
  "id": "accession",
  "term": "Accession number",
  "short": "The SEC's filing cabinet number for one document. Quote it and anyone can find the exact same page.",
  "phrase": "0001104659-25-100468"
 },
 {
  "id": "placement-agent",
  "term": "Placement agent",
  "short": "The firm that arranges a financing and takes a fee out of the money raised.",
  "phrase": "acted as exclusive placement agent"
 },
 {
  "id": "cashless-exercise",
  "term": "Cashless exercise",
  "short": "The holder gets his shares without putting up cash \u2014 the company keeps some of the shares instead. No money comes in.",
  "phrase": "cashless exercise"
 }
];

var CSS = ''
+ '.tdef{border-bottom:1.5px dotted currentColor;cursor:help;opacity:.95}'
+ '.tdef:hover{opacity:1;border-bottom-style:solid}'
+ '.tpop{position:absolute;z-index:9999;max-width:340px;background:#0C1220;color:#E6EAF2;'
+   'border-radius:10px;padding:15px 17px;box-shadow:0 8px 28px rgba(0,0,0,.34);'
+   'font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;'
+   'opacity:0;transform:translateY(4px);transition:opacity .12s,transform .12s}'
+ '.tpop.on{opacity:1;transform:translateY(0)}'
+ '.tpop b{display:block;font-size:16px;margin:0 0 7px;color:#fff}'
+ '.tpop .ph{display:block;font:12.5px ui-monospace,Menlo,monospace;color:#8A93A8;'
+   'margin:9px 0 0;border-top:1px solid #232B3E;padding-top:9px}'
+ '.tpop .ph i{font-style:normal;color:#B9C2D6}'
+ '.tpop a{display:inline-block;margin-top:11px;color:#FF8A5C;font-weight:600;'
+   'font-size:14px;text-decoration:none}'
+ '.tpop a:hover{text-decoration:underline}'
+ '.tpop .x{position:absolute;top:8px;right:10px;color:#6C778F;font-size:19px;'
+   'line-height:1;cursor:pointer;padding:2px 5px}'
+ '.tpop .x:hover{color:#fff}';

var SKIP = 'h1,h2,h3,h4,h5,h6,a,button,input,textarea,select,code,pre,script,style,'
         + '.tpop,.tdef,[data-noterms],.motto,nav,.docket-nav';

function styles(){
  if (document.getElementById('tdef-css')) return;
  var e = document.createElement('style');
  e.id = 'tdef-css'; e.textContent = CSS;
  document.head.appendChild(e);
}

function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g, function(c){
  return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }

var pop = null;
function close(){ if (pop) { pop.classList.remove('on');
  var p = pop; pop = null; setTimeout(function(){ p.remove(); }, 140); } }

function open(el, t){
  close();
  pop = document.createElement('div');
  pop.className = 'tpop';
  pop.innerHTML = '<span class="x">&times;</span>'
    + '<b>' + esc(t.term) + '</b>'
    + esc(t.short)
    + (t.phrase ? '<span class="ph">In the filing it reads: <i>'
        + esc(t.phrase) + '</i></span>' : '')
    + '<a href="/glossary.html#' + t.id + '">The whole entry &rarr;</a>';
  document.body.appendChild(pop);

  var r = el.getBoundingClientRect();
  var w = pop.offsetWidth, h = pop.offsetHeight;
  var left = r.left + window.scrollX + (r.width / 2) - (w / 2);
  left = Math.max(10, Math.min(left, window.innerWidth - w - 10));
  var top = r.bottom + window.scrollY + 8;
  if (r.bottom + h + 16 > window.innerHeight) top = r.top + window.scrollY - h - 8;
  pop.style.left = left + 'px';
  pop.style.top = top + 'px';
  requestAnimationFrame(function(){ pop.classList.add('on'); });

  pop.querySelector('.x').addEventListener('click', close);
}

/* walk the text nodes and mark the first hit of each term */
function mark(){
  var done = {};
  var sorted = TERMS.slice().sort(function(a,b){ return b.term.length - a.term.length; });

  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: function(n){
      if (!n.nodeValue || n.nodeValue.length < 4) return NodeFilter.FILTER_REJECT;
      var p = n.parentElement;
      if (!p || p.closest(SKIP)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  var nodes = [], n;
  while ((n = walker.nextNode())) nodes.push(n);

  nodes.forEach(function(node){
    for (var i = 0; i < sorted.length; i++) {
      var t = sorted[i];
      if (done[t.id]) continue;
      var re = new RegExp('\\b(' + t.term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')\\b','i');
      var m = node.nodeValue.match(re);
      if (!m) continue;

      var idx = m.index;
      var after = node.splitText(idx);
      after.nodeValue = after.nodeValue.slice(m[0].length);
      var span = document.createElement('span');
      span.className = 'tdef';
      span.textContent = m[0];
      span.setAttribute('data-t', t.id);
      after.parentNode.insertBefore(span, after);
      done[t.id] = true;
      break;
    }
  });

  document.addEventListener('click', function(e){
    var s = e.target.closest && e.target.closest('.tdef');
    if (s) {
      e.preventDefault();
      var id = s.getAttribute('data-t');
      var t = TERMS.filter(function(x){ return x.id === id; })[0];
      if (t) open(s, t);
      return;
    }
    if (pop && !e.target.closest('.tpop')) close();
  });

  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
  window.addEventListener('resize', close);
}

function go(){ styles(); mark(); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go);
else go();

})();
