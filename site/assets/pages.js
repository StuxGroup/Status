/* The site banner in dev mode (?banner=soon,maintenance,site previews the others), the status page's saved theme and the footer version. */
(function () {
  try { var t = localStorage.getItem("githup-theme"); if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t); } catch (e) {}
  // Dev-only banners, in the shared site-banner component. dev-mode.js sets DEV_MODE (true only in
  // the local build dev-server makes), so production never shows one.
  function banners() {
    if (!window.DEV_MODE) return;
    var name = document.title.split(" · ").pop();
    var copy = {
      maintenance: ["Maintenance", name + " is being updated and will be back shortly."],
      soon: ["Coming soon", name + " is launching soon."],
      dev: ["Dev mode", "Local preview of " + name + ". Run <code>dev-server.sh --no-dev-mode</code> to see it as production does."],
      site: ["Notice", "A site notice for " + name + " appears here."]
    };
    var want = (new URLSearchParams(location.search).get("banner") || "").split(",");
    var box = document.createElement("div");
    box.className = "site-banners";
    box.setAttribute("data-site-banners", "");
    ["maintenance", "soon", "dev", "site"].forEach(function (v) {
      if (v !== "dev" && want.indexOf(v) < 0) return;
      var d = document.createElement("div");
      d.className = "site-banner site-banner--" + v;
      d.setAttribute("role", "note");
      d.innerHTML = '<span class="site-banner-label"></span><span class="site-banner-text">' + copy[v][1] + "</span>";
      d.firstChild.textContent = copy[v][0];
      box.appendChild(d);
    });
    document.body.insertBefore(box, document.body.firstChild);
    document.documentElement.classList.add("has-site-banner");
    var s = document.createElement("script");
    s.src = "/assets/site-banner.js";
    document.body.appendChild(s);
  }

  document.addEventListener("DOMContentLoaded", function () {
    banners();
    // Footer version link: "Changelogs" until VERSION.md answers, then "vX.Y.Z".
    var v = document.querySelectorAll("[data-version]");
    if (v.length && window.fetch) {
      fetch("/VERSION.md", { cache: "no-cache" }).then(function (r) { if (!r.ok) throw 0; return r.text(); }).then(function (t) {
        t = t.trim().replace(/^v/i, "");
        if (!/^\d+\.\d+\.\d+/.test(t)) return;
        for (var i = 0; i < v.length; i++) { v[i].textContent = "v" + t; v[i].title = "Changelogs (v" + t + ")"; }
      }).catch(function () {});
    }
  });
})();
