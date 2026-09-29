/* Dev banner on local previews (add ?nodev=1 to hide it), and the status page's saved theme. */
(function () {
  try { var t = localStorage.getItem("githup-theme"); if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t); } catch (e) {}
  document.addEventListener("DOMContentLoaded", function () {
    var local = location.hostname === "localhost" || location.hostname === "127.0.0.1";
    var b = document.getElementById("dev-banner");
    if (b && local && !/(?:^|[?&])nodev=1(?:&|$)/.test(location.search)) b.classList.add("on");
  });
})();
