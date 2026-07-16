function renderSidebar() {
  const container = document.getElementById('sidebar-nav-container');
  if (!container) return;
  
  let html = '';
  navData.forEach(section => {
    html += `<div class="space-y-1"><div class="nav-section-label">${section.category}</div>`;
    section.items.forEach(item => {
      const activeClass = item.isActive ? ' active' : '';
      html += `<a href="#" class="nav-item${activeClass}" onclick="go('${item.id}'); return false;">
        ${item.svg}
        <span>${item.label}</span>
      </a>`;
    });
    html += `</div>`;
  });
  
  container.innerHTML = html;
}

function renderOverview() {
  const container = document.getElementById('overview-cards-container');
  if (!container) return;
  
  let html = `<h2 class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">API</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">`;
    
  // Render API cards
  overviewCardsData.api.forEach(card => {
    // Find matching svg from navData
    let matchingSvg = '';
    navData.forEach(section => section.items.forEach(item => {
      if(item.id === card.id) {
        matchingSvg = item.svg.replace('<svg ', '<svg class="w-6 h-6 text-slate-400 group-hover:text-[#039855] transition-colors" ');
      }
    }));
    
    html += `<a href="#" onclick="go('${card.id}');return false" class="group bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden" onmouseenter="this.style.borderColor='#039855'" onmouseleave="this.style.borderColor=''">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">${matchingSvg}<span class="text-slate-900 font-semibold text-base">${card.title}</span></div>
        <svg class="w-5 h-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#039855]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
      </div>
      <p class="text-sm text-slate-600 leading-relaxed">${card.desc}</p>
      <div class="flex flex-col gap-2.5">`;
      
      card.features.forEach(feat => {
        html += `<div class="flex items-start gap-2 text-sm text-slate-600">
          ${feat.icon}
          <span>${feat.text}</span>
        </div>`;
      });
      
    html += `</div></a>`;
  });
  
  html += `</div><h2 class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Application</h2>
    <div class="grid md:grid-cols-2 gap-4">`;
    
  // Render App cards
  overviewCardsData.app.forEach(card => {
    let matchingSvg = '';
    navData.forEach(section => section.items.forEach(item => {
      if(item.id === card.id) {
        matchingSvg = item.svg.replace('<svg ', '<svg class="w-5 h-5" ');
      }
    }));
    
    html += `<a href="#" onclick="openRequestAccess('${card.title}');return false" class="group bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer">
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style="background:#0398551a;color:#039855">${matchingSvg}</span>
        <p class="text-slate-900 font-semibold">${card.title}</p>
      </div>
      <p class="text-xs text-slate-600 leading-relaxed">${card.desc}</p>
    </a>`;
  });
  
  html += `</div>`;
  container.innerHTML = html;
}

function initApp() {
  renderSidebar();
  renderOverview();
  
  // Highlight sidebar based on current page if needed
  // ...
}

// Call on load
document.addEventListener('DOMContentLoaded', initApp);
