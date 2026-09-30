/* The /changelogs/ page: renders each tab's CHANGELOG.md, with its ### sections sorted into a
   fixed order at render time (not trusting the markdown order) and coloured type badges.
   Each tab is a <section class="cl-panel" data-src="..." data-fallback="..."> with a matching
   <button class="cl-tab" data-key="...">; /changelogs/#<key> opens that tab directly. */
(function () {
  "use strict";
  var ORDER = ["Added", "Changed", "Fixed", "Removed", "Security", "Deprecated"];

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function inline(s) {
    s = esc(s);
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/\*([^*\s][^*]*)\*/g, "<em>$1</em>");
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*|#[^)\s]*)\)/g, '<a href="$2">$1</a>');
    return s;
  }
  function rank(heading) {
    var word = ((heading.match(/^###\s+([A-Za-z]+)/) || [])[1] || "").toLowerCase();
    for (var i = 0; i < ORDER.length; i++) if (ORDER[i].toLowerCase() === word) return i;
    return ORDER.length; // unknown types go last, in their original order
  }
  function sortSections(md) {
    var out = [], pre = [], secs = [];
    function flush() {
      secs.sort(function (a, b) { return (a.rank - b.rank) || (a.idx - b.idx); });
      out = out.concat(pre);
      secs.forEach(function (s) { out = out.concat(s.lines); });
      pre = []; secs = [];
    }
    md.split("\n").forEach(function (line) {
      if (/^#{1,2}\s/.test(line)) { flush(); pre.push(line); return; }
      if (/^###\s/.test(line)) { secs.push({ rank: rank(line), idx: secs.length, lines: [line] }); return; }
      if (secs.length) secs[secs.length - 1].lines.push(line); else pre.push(line);
    });
    flush();
    return out.join("\n");
  }
  function render(md) {
    var lines = sortSections(md.replace(/\r\n/g, "\n").trim()).split("\n");
    var html = "", inEntry = false, inList = false, item = null, para = null;
    var typeRe = new RegExp("^(" + ORDER.join("|") + ")\\b");
    function flushItem() { if (item !== null) { html += "<li>" + inline(item) + "</li>"; item = null; } }
    function flushList() { flushItem(); if (inList) { html += "</ul>"; inList = false; } }
    function flushPara() { if (para !== null) { html += '<p class="cl-p">' + inline(para) + "</p>"; para = null; } }
    function flushEntry() { flushList(); flushPara(); if (inEntry) { html += "</article>"; inEntry = false; } }
    lines.forEach(function (raw) {
      var line = raw.replace(/\s+$/, ""), m;
      if (!line.trim()) { flushItem(); flushPara(); return; }
      if (/^#\s/.test(line)) return; // the file's own title
      if ((m = line.match(/^##\s+(.+)$/))) {
        flushEntry();
        // "## v1.2.0" and Keep-a-Changelog style "## [1.2.0] - 2026-09-30" both work.
        html += '<article class="cl-entry"><h2 class="cl-version">' + inline(m[1].trim().replace(/^\[([^\]]+)\]/, "$1")) + "</h2>";
        inEntry = true;
        return;
      }
      if (!inEntry) return; // the intro above the first release
      if ((m = line.match(/^###\s+(.+)$/))) {
        flushList(); flushPara();
        var t = m[1].trim(), type = t.match(typeRe);
        html += type
          ? '<h3 class="cl-label cl-label-' + type[1].toLowerCase() + '">' + type[1] + "</h3>"
          : '<h3 class="cl-section">' + inline(t) + "</h3>";
        return;
      }
      if ((m = line.match(/^\s*[-*]\s+(.+)$/))) {
        flushItem(); flushPara();
        if (!inList) { html += '<ul class="cl-list">'; inList = true; }
        item = m[1].trim();
        return;
      }
      if (item !== null) { item += " " + line.trim(); return; }
      para = para === null ? line.trim() : para + " " + line.trim();
    });
    flushEntry();
    return html;
  }

  function load(panel) {
    if (panel.getAttribute("data-loaded")) return;
    panel.setAttribute("data-loaded", "1");
    var body = panel.querySelector(".cl-body");
    var version = document.querySelector('[data-version-of="' + panel.id + '"]');
    fetch(panel.getAttribute("data-src"), { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (md) {
        body.innerHTML = render(md) || '<p class="cl-p">No releases yet.</p>';
        var top = md.match(/^##\s+\[?v?(\d+\.\d+\.\d+)/m);
        if (version && top) version.textContent = "v" + top[1];
      })
      .catch(function () {
        var url = panel.getAttribute("data-fallback");
        body.innerHTML = '<p class="cl-p">Couldn’t load this changelog right now. See <a href="' + esc(url) +
          '">CHANGELOG.md on GitHub</a> instead.</p>';
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var tabs = [].slice.call(document.querySelectorAll(".cl-tab"));
    if (!tabs.length) return;
    function show(key, focus) {
      var found = tabs.some(function (t) { return t.getAttribute("data-key") === key; });
      if (!found) key = tabs[0].getAttribute("data-key");
      tabs.forEach(function (t) {
        var on = t.getAttribute("data-key") === key;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        panel.hidden = !on;
        if (on) { load(panel); if (focus) t.focus(); }
      });
    }
    function fromHash() { return decodeURIComponent(location.hash.replace(/^#/, "")); }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () {
        var key = t.getAttribute("data-key");
        if (history.replaceState) history.replaceState(null, "", "#" + key); else location.hash = key;
        show(key);
      });
      t.addEventListener("keydown", function (e) {
        var n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : null;
        if (n === null) return;
        e.preventDefault();
        n = (n + tabs.length) % tabs.length;
        tabs[n].click();
        tabs[n].focus();
      });
    });
    window.addEventListener("hashchange", function () { show(fromHash()); });
    show(fromHash());
    // Fill in each tab's version up front, not only when it is opened.
    document.querySelectorAll(".cl-panel").forEach(load);
  });
})();
