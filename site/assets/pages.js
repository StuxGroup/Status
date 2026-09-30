/* Dev banner on local previews (add ?nodev=1 to hide it), the status page's saved theme and the footer version. */
(function () {
  try { var t = localStorage.getItem("githup-theme"); if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t); } catch (e) {}
  document.addEventListener("DOMContentLoaded", function () {
    var local = location.hostname === "localhost" || location.hostname === "127.0.0.1";
    var b = document.getElementById("dev-banner");
    if (b && local && !/(?:^|[?&])nodev=1(?:&|$)/.test(location.search)) b.classList.add("on");
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
