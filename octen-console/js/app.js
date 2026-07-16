window.pageHtml = window.pageHtml || {};

function renderSidebar() {
  const container = document.getElementById("sidebar-container");
  if (container && window.sidebarHtml) {
    // We set outerHTML because sidebarHtml contains the <aside> itself
    container.outerHTML = window.sidebarHtml;
  }
}

// Override original go function
window.go = function(pageId) {
  // Update sidebar active states
  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
  const clicked = document.querySelector(`.nav-item[onclick*="go('${pageId}')"]`);
  if(clicked) clicked.classList.add("active");

  // Render page
  const container = document.getElementById("page-container");
  if (container) {
    const fullId = `page-${pageId}`;
    let htmlToRender = window.pageHtml[fullId] || window.pageHtml[pageId];
    
    if (htmlToRender) {
      container.innerHTML = htmlToRender;
      const rootDiv = container.firstElementChild;
      if (rootDiv && rootDiv.classList) {
        rootDiv.classList.add("active");
        rootDiv.style.display = "block";
      }
    } else {
      console.warn("Page not found:", pageId);
    }
  }
  
  // Post-render hooks — run after innerHTML is set so DOM nodes exist
  if (pageId === "overview") {
    setupOverviewTabs();
  } else if (pageId === "broad-search-api") {
    // bsaSetLang calls refreshCode internally — renders the code panel after DOM is injected
    if (window.bsaSetLang) window.bsaSetLang('python');
  } else if (["broad-search", "news-search", "image-search", "video-search"].includes(pageId)) {
    const searchBar = document.getElementById("main-search-input");
    if (searchBar) searchBar.focus();
  }
}

function setupOverviewTabs() {
  const tabs = document.querySelectorAll(".mcps-tab");
  const panels = document.querySelectorAll(".mcps-panel");
  if (!tabs.length) return;
  
  tabs.forEach(t => t.addEventListener("click", () => {
    const key = t.dataset.mcpsTab;
    tabs.forEach(x => {
      const active = x.dataset.mcpsTab === key;
      x.style.color = active ? "#039855" : "";
      x.style.borderColor = active ? "#039855" : "";
      x.classList.toggle("text-slate-500", !active);
      x.classList.toggle("border-transparent", !active);
    });
    panels.forEach(p => p.classList.toggle("hidden", p.dataset.mcpsPanel !== key));
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  go("overview");
});
