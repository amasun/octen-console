// SPA router + page lifecycle.
//
// Page modules register themselves and never touch this file:
//   registerPage("page-overview", `<div id="page-overview" ...>...</div>`)
//   window.pageInit["overview"] = function () { ... }   // runs after each render
//
// window.consolePageChanged (console-core.js) runs after every navigation for
// cross-page demo state (role gating, api-keys rerender, currentPage tracking).

window.pageHtml = window.pageHtml || {};
window.pageInit = window.pageInit || {};

// Registration guard: a duplicate registration silently overwriting a page is
// how templates get corrupted without anyone noticing — fail loudly instead.
window.registerPage = function (fullId, html) {
  if (window.pageHtml[fullId]) {
    console.error("[registerPage] duplicate registration ignored:", fullId);
    return;
  }
  window.pageHtml[fullId] = html;
};

function renderSidebar() {
  const container = document.getElementById("sidebar-container");
  if (container && window.sidebarHtml) {
    // We set outerHTML because sidebarHtml contains the <aside> itself
    container.outerHTML = window.sidebarHtml;
  }
}

window.go = function (pageId) {
  // Update sidebar active states
  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
  const clicked = document.querySelector(`.nav-item[onclick*="go('${pageId}')"]`);
  if (clicked) clicked.classList.add("active");

  // Render page
  const container = document.getElementById("page-container");
  if (container) {
    const fullId = `page-${pageId}`;
    const htmlToRender = window.pageHtml[fullId] || window.pageHtml[pageId];

    if (htmlToRender) {
      container.innerHTML = htmlToRender;
      const rootDiv = container.firstElementChild;
      if (rootDiv && rootDiv.classList) {
        rootDiv.classList.add("active");
        rootDiv.style.display = "block";
      }
      // Per-page init — runs after innerHTML is set so DOM nodes exist.
      const init = window.pageInit[pageId];
      if (init) {
        try { init(); } catch (e) { console.error("[pageInit]", pageId, e); }
      }
    } else {
      console.warn("Page not found:", pageId);
    }
  }

  // Cross-page hook from console-core (role gating, currentPage, …)
  if (typeof window.consolePageChanged === "function") {
    try { window.consolePageChanged(pageId); } catch (e) { console.error("[consolePageChanged]", pageId, e); }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  go("overview");
});
