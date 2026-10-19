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
  if (typeof window.initOctenSidebar === "function") {
    window.initOctenSidebar();
  } else {
    const container = document.getElementById("sidebar-container");
    if (container && window.sidebarHtml) {
      // We set outerHTML because sidebarHtml contains the <aside> itself
      container.outerHTML = window.sidebarHtml;
    }
  }
}

window.go = function (pageId) {
  // Update sidebar active states
  if (window.octenSidebar && typeof window.octenSidebar.setActiveRoute === "function") {
    window.octenSidebar.setActiveRoute(pageId);
  }
  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
  const clicked = document.querySelector(`.nav-item[data-route-id="${pageId}"], .nav-item[onclick*="go('${pageId}')"]`);
  if (clicked) clicked.classList.add("active");

  // Route alias fallback mapping for Plan A entries
  let targetId = pageId;
  if (targetId === "broad-search") targetId = "answer";
  if (targetId === "news-search") targetId = "image-search";
  if (targetId === "business-search" || targetId === "place-search") targetId = "web-search";
  if (targetId === "multimodal-chat" || targetId === "ground-generation") targetId = "multimodal-search";
  if (targetId === "model") targetId = "model-gateway";

  // Render page
  const container = document.getElementById("page-container");
  if (container) {
    const fullId = `page-${targetId}`;
    const htmlToRender = window.pageHtml[fullId] || window.pageHtml[targetId] || window.pageHtml[`page-${pageId}`] || window.pageHtml[pageId];

    if (htmlToRender) {
      container.innerHTML = htmlToRender;
      const rootDiv = container.firstElementChild;
      if (rootDiv && rootDiv.classList) {
        rootDiv.classList.add("active");
        rootDiv.style.display = "block";
      }
      // Per-page init — runs after innerHTML is set so DOM nodes exist.
      const init = window.pageInit[targetId] || window.pageInit[pageId];
      if (init) {
        try { init(); } catch (e) { console.error("[pageInit]", targetId, e); }
      }
    } else {
      console.warn("Page not found:", pageId);
    }
  }

  // Cross-page hook from console-core (role gating, currentPage, …)
  if (typeof window.consolePageChanged === "function") {
    try { window.consolePageChanged(targetId); } catch (e) { console.error("[consolePageChanged]", targetId, e); }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  go("overview");
});
