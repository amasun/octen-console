// model (Playground) page template — extracted from the prototype page set.
// Behavior (md* globals, render funcs) lives in model-gateway/index.js.
registerPage("page-model", `
<div id="page-model" class="page" style="padding:0">
  <div class="bg-slate-50" style="margin:-24px;padding:16px;height:calc(100vh - 16px)">
    <input id="md-file" type="file" accept="image/*" multiple style="display:none"/>
    <div class="bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden h-full">
      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-slate-100 shrink-0">
        <div class="flex items-center min-w-0" style="gap:12px">
          <h2 class="text-slate-800 text-sm font-semibold">Playground</h2>
          <!-- Modality switch -->
          <div class="inline-flex rounded-lg border border-slate-200 overflow-hidden text-xs">
            <button type="button" data-md-modality="chat" onclick="mdSetModality('chat')" class="inline-flex items-center border-r border-slate-200" style="padding:6px 14px;gap:6px">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
              <span>Text</span>
            </button>
            <button type="button" data-md-modality="image" onclick="mdSetModality('image')" class="inline-flex items-center" style="padding:6px 14px;gap:6px">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 15l-5-5L5 21"/></svg>
              <span>Image</span>
            </button>
          </div>
          <!-- Model picker -->
          <div class="relative min-w-0" id="md-model-wrap">
            <button type="button" onclick="mdToggleMenu()" id="md-model-btn" class="inline-flex items-center rounded-lg border text-xs transition-colors" style="padding:5px 10px;gap:8px;border-color:#e2e8f0;background:white">
              <span id="md-model-mark"></span>
              <span id="md-model-label" class="font-semibold text-slate-800 truncate" style="max-width:200px"></span>
              <svg id="md-model-chev" class="w-3.5 h-3.5 shrink-0 transition-transform" style="color:#94a3b8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div id="md-model-menu" class="absolute left-0 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden z-50 hidden" style="top:calc(100% + 6px);width:300px">
              <div id="md-model-menu-title" class="px-3 py-2 border-b border-slate-100 text-xs font-semibold text-slate-700"></div>
              <div id="md-model-list" class="overflow-y-auto py-1" style="max-height:320px"></div>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <a href="#" onclick="go('web-search');return false" class="inline-flex items-center px-2.5 py-1.5 border border-slate-200 text-slate-600 rounded-md text-xs hover:bg-slate-50">
            <svg class="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg><span>Docs</span>
          </a>
          <button type="button" onclick="mdNewChat()" class="inline-flex items-center px-2.5 py-1.5 border border-slate-200 text-slate-600 rounded-md text-xs hover:bg-slate-50">
            <svg class="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg><span>New Chat</span>
          </button>
          <div class="relative" id="md-history-wrap">
            <button type="button" onclick="mdToggleHistory()" id="md-history-btn" class="inline-flex items-center px-2.5 py-1.5 border rounded-md text-xs transition-colors" style="background:white;color:#475569;border-color:#e2e8f0">
              <svg class="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3v5h5M3.05 13A9 9 0 106 5.3L3 8m9-1v5l4 2"/></svg><span>History</span>
            </button>
            <div id="md-history-menu" class="absolute right-0 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden z-50 hidden" style="top:calc(100% + 6px);width:320px">
              <div class="px-3 py-2 border-b border-slate-100 text-xs font-semibold text-slate-700">Chat History</div>
              <div id="md-history-list" class="overflow-y-auto" style="max-height:360px"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- Body (empty state or conversation) -->
      <div id="md-body" class="flex-1 flex flex-col overflow-hidden"></div>
    </div>
  </div>
</div>
`);
