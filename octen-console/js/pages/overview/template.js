// Overview page template.
registerPage("page-overview", `<div id="page-overview" class="page active pl-0 pr-[10px] py-[10px] h-full min-h-0 overflow-hidden">
<div class="layout-pane w-full h-full overflow-y-auto relative min-h-0">
  <div class="max-w-[1400px] w-full mx-auto px-6 py-6 md:px-10 md:py-8">

  <!-- Header -->
  <div class="mb-6 flex items-center justify-between gap-6">
    <h1 id="ov-welcome-title" class="text-[#0a0a0a] text-2xl font-semibold">Welcome, Jane Niu</h1>

    <!-- API Key widget -->
    <div class="bg-white border border-[#e7e7e7] rounded-xl flex items-stretch shrink-0 overflow-hidden shadow-sm">
      <div class="flex items-center gap-3 px-4 py-3">
        <svg class="w-3.5 h-3.5 shrink-0" style="color:#039855" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
        <span class="text-xs text-[#a3a3a3] font-medium">API Key</span>
        <div id="ov-key-display" class="bg-[#f5f5f5] rounded-md px-3 py-1 flex items-center gap-2 border border-[#f5f5f5]">
          <code id="ov-key-val" class="text-xs text-[#737373] font-mono whitespace-nowrap">sk_live_1234••••••••••wxyz</code>
          <button id="ov-key-eye" onclick="toggleOvKeyVis()" class="p-0.5 hover:bg-[#e5e5e5] rounded text-[#a3a3a3] transition-colors">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
          <button onclick="copyOvKey()" class="p-0.5 hover:bg-[#e5e5e5] rounded text-[#a3a3a3] transition-colors">
            <svg id="ov-copy-icon" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          </button>
        </div>
      </div>
      <div class="w-px bg-[#f5f5f5] my-2"></div>
      <a href="#" class="flex items-center gap-2 px-4 hover:bg-[#f5f5f5] transition-colors group">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        <span class="text-xs text-[#a3a3a3] group-hover:text-[#737373] transition-colors">Operational →</span>
      </a>
    </div>
  </div>

  <!-- Payment Banner (role-aware in org mode) -->
  <div id="ov-payment-banner"></div>

  <!-- API 产品卡片 -->
  <section class="mb-8">
    <h2 class="text-[16px] text-[#000] font-semibold mb-3">API</h2>
    <div class="grid md:grid-cols-2 gap-4">
      <!-- Broad Search · Recommended -->
      <a href="#" onclick="go('broad-search');return false" class="group bg-white rounded-xl border border-[#e7e7e7] p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden" onmouseenter="this.style.borderColor='#039855'" onmouseleave="this.style.borderColor=''">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3"><svg class="w-6 h-6 text-[#a3a3a3] group-hover:text-[#039855] transition-colors" fill="none" viewBox="0 0 20 20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M16.4688 16.4695L13.5244 13.5251" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.999 14.8721C12.6898 14.8721 14.8711 12.6908 14.8711 10C14.8711 7.30923 12.6898 5.12793 9.999 5.12793C7.30825 5.12793 5.12695 7.30923 5.12695 10C5.12695 12.6908 7.30825 14.8721 9.999 14.8721Z" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.0008 11.5516C10.8577 11.5516 11.5523 10.8569 11.5523 9.99999C11.5523 9.14315 10.8577 8.44849 10.0008 8.44849C9.14389 8.44849 8.44922 9.14315 8.44922 9.99999C8.44922 10.8569 9.14389 11.5516 10.0008 11.5516Z" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.09113 4.2312L4.06836 4.25098" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.1853 17.7502C12.203 18.1546 11.1269 18.3776 9.99867 18.3776C5.37187 18.3776 1.62109 14.6268 1.62109 9.99997C1.62109 8.75572 1.89234 7.57482 2.37894 6.51318" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/><path d="M17.6336 13.4533C18.1106 12.4003 18.3762 11.2311 18.3762 9.9999C18.3762 5.37309 14.6254 1.62231 9.99867 1.62231C8.65308 1.62231 7.38157 1.93955 6.25488 2.50331" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="text-[#0a0a0a] font-semibold text-base">Broad Search</span></div>
          <svg class="w-5 h-5 text-[#a3a3a3] transition-transform group-hover:translate-x-1 group-hover:text-[#039855]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
        <p class="text-sm text-[#737373] leading-relaxed">Auto-decomposes one query into many parallel subqueries. Ready for production.</p>
        <div class="flex flex-col gap-3">
          <div class="flex items-start gap-2 text-sm text-[#737373]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gauge w-3.5 h-3.5 text-primary-lite shrink-0 mt-0.5" aria-hidden="true"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
            <span>&lt;62ms latency · Scales to 1M+ QPS · Broader coverage in a single call.</span>
          </div>
          <div class="flex items-start gap-2 text-sm text-[#737373]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb w-3.5 h-3.5 text-warning shrink-0 mt-0.5" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
            <span>Works best for research agents, hard questions, and comprehensive lookup.</span>
          </div>
        </div>
      </a>
      <a href="#" onclick="go('web-search');return false" class="group bg-white rounded-xl border border-[#e7e7e7] p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden" onmouseenter="this.style.borderColor='#039855'" onmouseleave="this.style.borderColor=''">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3"><svg class="w-6 h-6 text-[#a3a3a3] group-hover:text-[#039855] transition-colors" fill="none" viewBox="0 0 20 20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 10C17.5 8.51667 17.0601 7.06659 16.236 5.83322C15.4119 4.59986 14.2405 3.63857 12.8701 3.07091C11.4997 2.50325 9.99172 2.35472 8.5368 2.64412C7.08197 2.9335 5.74559 3.64781 4.6967 4.6967C3.64781 5.7456 2.9335 7.08197 2.64412 8.53683C2.35472 9.99167 2.50325 11.4997 3.07091 12.8702C3.63857 14.2406 4.59986 15.4119 5.83322 16.236C7.06659 17.0602 8.51663 17.5 9.99997 17.5M3 7.5H17M3 12.5H9.5833" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.58373 2.5C8.17983 4.74967 7.43555 7.34822 7.43555 10C7.43555 12.6517 8.17983 15.2503 9.58373 17.5M10.4171 2.5C11.7641 4.65838 12.5051 7.13972 12.5621 9.68333M16.8337 16.8333L18.3337 18.3333M12.5004 15C12.5004 15.663 12.7637 16.2989 13.2326 16.7677C13.7015 17.2366 14.3373 17.5 15.0004 17.5C15.6634 17.5 16.2993 17.2366 16.7681 16.7677C17.237 16.2989 17.5004 15.663 17.5004 15C17.5004 14.337 17.237 13.7011 16.7681 13.2322C16.2993 12.7634 15.6634 12.5 15.0004 12.5C14.3373 12.5 13.7015 12.7634 13.2326 13.2322C12.7637 13.7011 12.5004 14.337 12.5004 15Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="text-[#0a0a0a] font-semibold text-base">Web Search</span></div>
          <svg class="w-5 h-5 text-[#a3a3a3] transition-transform group-hover:translate-x-1 group-hover:text-[#039855]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
        <p class="text-sm text-[#737373] leading-relaxed">Ranked web results, highlights, and summaries. Ready for generation.</p>
        <div class="flex flex-col gap-3">
          <div class="flex items-start gap-2 text-sm text-[#737373]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gauge w-3.5 h-3.5 text-primary-lite shrink-0 mt-0.5" aria-hidden="true"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
            <span>&lt;62ms latency · Scales to 1M+ QPS</span>
          </div>
          <div class="flex items-start gap-2 text-sm text-[#737373]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb w-3.5 h-3.5 text-warning shrink-0 mt-0.5" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
            <span>Works best with structured queries generated by LLMs.</span>
          </div>
        </div>
      </a>
      <!-- Image Search -->
      <a href="#" onclick="openRequestAccess('Image Search');return false" class="group bg-white rounded-xl border border-[#e7e7e7] p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden" onmouseenter="this.style.borderColor='#039855'" onmouseleave="this.style.borderColor=''">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3"><svg class="w-6 h-6 text-[#a3a3a3] group-hover:text-[#039855] transition-colors" fill="none" viewBox="0 0 20 20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M9.62957 1.70267C10.0906 1.70285 10.4645 2.07659 10.4645 2.53763C10.4643 2.99849 10.0904 3.3724 9.62957 3.37259H7.36963C6.38238 3.37259 5.69155 3.37343 5.15365 3.41734C4.62555 3.46049 4.31807 3.54119 4.08349 3.66067C3.58631 3.914 3.18204 4.31827 2.92871 4.81546C2.80924 5.05002 2.72853 5.35755 2.68539 5.88561C2.64147 6.4235 2.64063 7.11437 2.64063 8.10159V12.6222C2.64063 13.6094 2.64144 14.3004 2.68539 14.8382C2.72854 15.3657 2.80932 15.6731 2.92871 15.9076C3.18204 16.4046 3.58649 16.8091 4.08349 17.0624C4.31804 17.1818 4.62575 17.2626 5.15365 17.3057C5.69155 17.3496 6.3824 17.3505 7.36963 17.3505H12.5275C13.9434 17.3505 14.4456 17.3395 14.8257 17.2105C15.6034 16.9464 16.2144 16.3354 16.4785 15.5576C16.6075 15.1776 16.6185 14.6753 16.6185 13.2595C16.6185 12.8239 16.6182 12.5367 16.6047 12.3244C16.5907 12.1061 16.5667 12.0639 16.5737 12.0786C16.4877 11.8975 16.2952 11.7913 16.0961 11.8141C16.0829 11.8178 16.0198 11.8371 15.8706 11.9175C15.6832 12.0185 15.4396 12.1706 15.0698 12.4017L12.5837 13.9553C11.299 14.7582 9.64582 14.6556 8.4699 13.7006C7.70197 13.0766 6.58087 13.1567 5.90967 13.8836L5.02751 14.8399C4.71484 15.1786 4.18636 15.1995 3.84749 14.8871C3.50864 14.5743 3.48753 14.0459 3.80029 13.7071L4.68245 12.7516C5.95149 11.3769 8.07087 11.2243 9.52299 12.4041C10.1448 12.9091 11.0188 12.9637 11.6982 12.5392L14.1852 10.9849C14.5355 10.766 14.8323 10.5802 15.078 10.4478C15.3184 10.3181 15.5957 10.1905 15.904 10.1548C16.8132 10.0498 17.6889 10.535 18.0817 11.3616C18.2147 11.6419 18.2538 11.9453 18.2713 12.2178C18.2892 12.4963 18.2884 12.8466 18.2884 13.2595C18.2884 14.5397 18.2996 15.3871 18.0597 16.094C17.6288 17.3636 16.6316 18.3607 15.362 18.7917C14.6552 19.0316 13.8077 19.0204 12.5275 19.0204H7.36963C6.40999 19.0204 5.63938 19.0215 5.01774 18.9707C4.38643 18.9191 3.83417 18.8101 3.32504 18.5508C2.51385 18.1375 1.85452 17.4771 1.44108 16.6661C1.1817 16.157 1.07278 15.6053 1.02116 14.9741C0.970378 14.3526 0.970703 13.5819 0.970703 12.6222V8.10159C0.970703 7.14191 0.970403 6.37135 1.02116 5.7497C1.07275 5.11828 1.18166 4.5662 1.44108 4.05699C1.85448 3.24584 2.51388 2.58644 3.32504 2.17304C3.83425 1.91361 4.3863 1.80471 5.01774 1.75312C5.63939 1.70237 6.40993 1.70267 7.36963 1.70267H9.62957ZM14.9754 1.36982C16.7906 1.12676 18.4599 2.40062 18.7035 4.21569C18.8137 5.03845 18.6116 5.83118 18.1892 6.4748L19.2732 7.88105C19.5544 8.24625 19.486 8.77148 19.1209 9.05289C18.7557 9.33414 18.2313 9.26573 17.9499 8.90073L16.9465 7.59948C16.6149 7.77194 16.2485 7.89199 15.8567 7.94453C14.0415 8.18762 12.373 6.91224 12.1296 5.09704C11.8865 3.28185 13.1603 1.61332 14.9754 1.36982ZM6.65185 6.55049C7.11185 6.55066 7.48504 6.92381 7.48519 7.38382V7.42776C7.48508 7.88779 7.11187 8.26092 6.65185 8.26109C6.19169 8.26109 5.81864 7.8879 5.81852 7.42776V7.38382C5.81867 6.9237 6.19171 6.55049 6.65185 6.55049ZM15.1976 3.02509C14.2967 3.14597 13.6636 3.97386 13.784 4.87487C13.9048 5.77593 14.7336 6.4097 15.6346 6.28925C16.5357 6.16835 17.1696 5.33894 17.049 4.43785C16.9281 3.53682 16.0987 2.90458 15.1976 3.02509Z" fill="currentColor"/></svg><span class="text-[#0a0a0a] font-semibold text-base">Image Search</span><span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium" style="background:#0398551a;color:#039855">Early Access</span></div>
          <svg class="w-5 h-5 text-[#a3a3a3] transition-transform group-hover:translate-x-1 group-hover:text-[#039855]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
        <p class="text-sm text-[#737373] leading-relaxed">Image retrieval across the open web. Ready for design and creative workflows.</p>
        <div class="flex flex-col gap-3">
          <div class="flex items-start gap-2 text-sm text-[#737373]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb w-3.5 h-3.5 text-warning shrink-0 mt-0.5" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
            <span>Works best for design references, asset lookup, and content creation.</span>
          </div>
        </div>
      </a>
      <!-- Video Search -->
      <a href="#" onclick="openRequestAccess('Video Search');return false" class="group bg-white rounded-xl border border-[#e7e7e7] p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden" onmouseenter="this.style.borderColor='#039855'" onmouseleave="this.style.borderColor=''">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3"><svg class="w-6 h-6 text-[#a3a3a3] group-hover:text-[#039855] transition-colors" fill="none" viewBox="0 0 20 20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M15.0105 11.7101C16.8257 11.467 18.495 12.7416 18.7385 14.5568C18.8485 15.3794 18.6457 16.1716 18.2233 16.8151L19.3073 18.2222C19.5886 18.5874 19.5209 19.1117 19.156 19.3933C18.7907 19.6744 18.2655 19.6069 17.984 19.2419L16.9806 17.9398C16.6491 18.1122 16.2826 18.2324 15.891 18.2849C14.0759 18.5276 12.407 17.2524 12.1637 15.4374C11.9208 13.6223 13.1955 11.9537 15.0105 11.7101ZM12.5836 2.08203C13.503 2.08203 14.2435 2.08123 14.8411 2.13005C15.4484 2.17968 15.9824 2.28467 16.476 2.53614C17.2602 2.93578 17.8986 3.57406 18.2982 4.35824C18.5495 4.85189 18.6546 5.38599 18.7043 5.99317C18.753 6.5908 18.7523 7.3313 18.7523 8.25066V10.0004C18.7521 10.4612 18.3782 10.8351 17.9173 10.8353C17.4563 10.8353 17.0825 10.4614 17.0824 10.0004V8.25066C17.0824 7.30376 17.082 6.64296 17.04 6.12907C16.9989 5.62519 16.9213 5.33503 16.8097 5.11589C16.5703 4.64617 16.1881 4.26407 15.7185 4.02458C15.4993 3.91292 15.2092 3.83547 14.7052 3.79427C14.1914 3.7523 13.5306 3.75196 12.5836 3.75196H7.41764C6.47069 3.75196 5.80996 3.75232 5.29607 3.79427C4.79194 3.83547 4.50206 3.91293 4.28288 4.02458C3.81302 4.26407 3.43105 4.64603 3.19157 5.11589C3.07993 5.33506 3.00245 5.62499 2.96127 6.12907C2.91931 6.64296 2.91895 7.30372 2.91895 8.25066V11.75C2.91895 12.6969 2.91928 13.3577 2.96127 13.8716C3.00247 14.3755 3.07992 14.6656 3.19157 14.8848C3.43107 15.3544 3.81316 15.7367 4.28288 15.9761C4.50202 16.0877 4.79217 16.1652 5.29607 16.2064C5.80995 16.2484 6.47072 16.2487 7.41764 16.2487H9.58396C10.045 16.2489 10.419 16.6226 10.419 17.0837C10.4188 17.5445 10.0449 17.9184 9.58396 17.9186H7.41764C6.49827 17.9186 5.7578 17.9194 5.16016 17.8706C4.55297 17.821 4.01888 17.7159 3.52523 17.4645C2.74105 17.0649 2.10277 16.4265 1.70312 15.6424C1.45167 15.1488 1.34667 14.6147 1.29704 14.0075C1.24822 13.4099 1.24902 12.6694 1.24902 11.75V8.25066C1.24902 7.33127 1.24824 6.59081 1.29704 5.99317C1.34666 5.38588 1.45167 4.85196 1.70312 4.35824C2.10276 3.57392 2.74091 2.93577 3.52523 2.53614C4.01897 2.28466 4.55285 2.17967 5.16016 2.13005C5.75781 2.08125 6.49824 2.08203 7.41764 2.08203H12.5836ZM15.2318 13.3654C14.331 13.4865 13.6985 14.315 13.819 15.216C13.94 16.1169 14.7687 16.7499 15.6696 16.6295C16.5707 16.5087 17.2038 15.6793 17.0832 14.7782C16.9622 13.8771 16.133 13.2446 15.2318 13.3654ZM8.82637 6.68246C9.09279 6.67003 9.32737 6.73335 9.52379 6.80697C9.73412 6.88584 9.97296 7.00587 10.2163 7.1268C10.53 7.28265 10.851 7.44973 11.1294 7.60856C11.4631 7.79894 11.8347 8.0339 12.1833 8.26449C12.4125 8.41619 12.6381 8.56452 12.8131 8.70802C12.9761 8.84161 13.1497 9.01386 13.273 9.25244L13.3226 9.35902L13.378 9.51202C13.4874 9.87794 13.4685 10.2914 13.3226 10.6416C13.1996 10.9366 12.9994 11.14 12.8131 11.2926C12.6382 11.436 12.4125 11.5838 12.1833 11.7354C11.8347 11.9659 11.4631 12.2017 11.1294 12.3921C10.851 12.5509 10.5298 12.7173 10.2163 12.873C9.97304 12.9939 9.73412 13.114 9.52379 13.1929C9.29929 13.277 9.02487 13.3482 8.70996 13.3076C8.28222 13.2524 7.86477 13.0129 7.60157 12.6712C7.40786 12.4197 7.33112 12.1467 7.29069 11.9104C7.25288 11.689 7.23552 11.4224 7.21745 11.1519C7.19155 10.7642 7.1727 10.3581 7.17269 10.0004C7.17269 9.64244 7.19153 9.23586 7.21745 8.84802C7.23553 8.57736 7.25287 8.31082 7.29069 8.08952C7.3311 7.85327 7.40802 7.58086 7.60157 7.32943L7.70736 7.20573C7.96932 6.93031 8.33579 6.74058 8.70996 6.69222L8.82637 6.68246ZM8.93704 8.37111C8.91704 8.48802 8.90454 8.65394 8.88412 8.95944C8.85937 9.32994 8.84262 9.69519 8.84262 10.0004C8.84262 10.3054 8.85937 10.6701 8.88412 11.0404C8.89429 11.1932 8.90204 11.3115 8.91012 11.4058L8.93704 11.6295C9.04837 11.5878 9.19896 11.5144 9.47329 11.3781C9.77271 11.2294 10.0629 11.0786 10.3025 10.9419C10.5906 10.7775 10.9274 10.5644 11.262 10.3429C11.5204 10.172 11.661 10.0776 11.7544 10.0011L11.7552 10.0004L11.7544 9.99952C11.6611 9.92302 11.5205 9.82869 11.262 9.65769C10.9273 9.43627 10.5906 9.22311 10.3025 9.05877C10.0629 8.92202 9.77279 8.77136 9.47329 8.62252C9.19887 8.48619 9.04846 8.41286 8.93704 8.37111Z" fill="currentColor"/></svg><span class="text-[#0a0a0a] font-semibold text-base">Video Search</span><span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium" style="background:#0398551a;color:#039855">Early Access</span></div>
          <svg class="w-5 h-5 text-[#a3a3a3] transition-transform group-hover:translate-x-1 group-hover:text-[#039855]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
        <p class="text-sm text-[#737373] leading-relaxed">Video retrieval across the open web. Ready for media discovery and research.</p>
        <div class="flex flex-col gap-3">
          <div class="flex items-start gap-2 text-sm text-[#737373]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb w-3.5 h-3.5 text-warning shrink-0 mt-0.5" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
            <span>Works best for video discovery, tutorial lookup, and clip sourcing.</span>
          </div>
        </div>
      </a>
      <a href="#" onclick="go('extract');return false" class="group bg-white rounded-xl border border-[#e7e7e7] p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden" onmouseenter="this.style.borderColor='#039855'" onmouseleave="this.style.borderColor=''">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3"><svg class="w-6 h-6 text-[#a3a3a3] group-hover:text-[#039855] transition-colors" fill="none" viewBox="0 0 20 20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M9.9998 13.9172C10.5081 13.9172 10.9955 14.1194 11.3548 14.4787C11.7139 14.8379 11.9162 15.3248 11.9163 15.8328C11.9163 16.3412 11.7141 16.8292 11.3548 17.1887C10.9955 17.5479 10.5081 17.7501 9.9998 17.7502C9.49147 17.7502 9.00347 17.5481 8.64405 17.1887C8.5108 17.0554 8.39972 16.9042 8.31201 16.7411H5.85352C5.76581 16.9041 5.65472 17.0554 5.52148 17.1887C5.16218 17.5478 4.67471 17.7501 4.1665 17.7502C3.65825 17.7502 3.17088 17.5479 2.81152 17.1887C2.45213 16.8292 2.25 16.3412 2.25 15.8328C2.25015 15.3247 2.45237 14.8379 2.81152 14.4787C3.17088 14.1194 3.65822 13.9172 4.1665 13.9172C4.67478 13.9172 5.16217 14.1193 5.52148 14.4787C5.73713 14.6944 5.89513 14.9566 5.98779 15.2412H8.17855C8.27128 14.9566 8.42855 14.6943 8.64405 14.4787C9.00347 14.1193 9.49147 13.9172 9.9998 13.9172ZM15.8324 8.083C16.3407 8.083 16.8288 8.28524 17.1881 8.64457C17.5476 9.0039 17.7496 9.49191 17.7496 10.0003C17.7496 10.5086 17.5474 10.996 17.1881 11.3553C17.0358 11.5077 16.8592 11.6299 16.669 11.7223V14.1108C16.8594 14.2032 17.0356 14.3262 17.1881 14.4787C17.5473 14.8379 17.7495 15.3247 17.7496 15.8328C17.7496 16.3412 17.5476 16.8292 17.1881 17.1887C16.8287 17.5481 16.3407 17.7502 15.8324 17.7502C15.3243 17.75 14.8375 17.5477 14.4782 17.1887C14.1188 16.8292 13.9166 16.3412 13.9166 15.8328C13.9168 15.3247 14.119 14.8379 14.4782 14.4787C14.6756 14.2812 14.9122 14.1327 15.1691 14.0376V11.7956C14.9123 11.7005 14.6756 11.5526 14.4782 11.3553C14.1189 10.996 13.9167 10.5086 13.9166 10.0003C13.9166 9.49191 14.1188 9.0039 14.4782 8.64457C14.8374 8.28552 15.3244 8.08316 15.8324 8.083ZM4.1665 8.083C4.67463 8.0831 5.1622 8.28541 5.52148 8.64457C5.88078 9.0039 6.08301 9.49199 6.08301 10.0003C6.08294 10.5085 5.88062 10.996 5.52148 11.3553C5.1622 11.7144 4.67463 11.9167 4.1665 11.9168C3.65825 11.9168 3.17088 11.7146 2.81152 11.3553C2.45218 10.996 2.25007 10.5087 2.25 10.0003C2.25 9.49191 2.45213 9.0039 2.81152 8.64457C3.17086 8.28541 3.65832 8.08303 4.1665 8.083ZM9.9998 2.25049C10.5081 2.25055 10.9955 2.45267 11.3548 2.81201C11.7141 3.17136 11.9163 3.65874 11.9163 4.167C11.9162 4.67512 11.714 5.16269 11.3548 5.52197C11.1797 5.697 10.9737 5.83368 10.7501 5.92887V8.236C10.974 8.33124 11.1796 8.46932 11.3548 8.64457C11.7142 9.0039 11.9163 9.49191 11.9163 10.0003C11.9163 10.5087 11.7141 10.996 11.3548 11.3553C10.9955 11.7147 10.5081 11.9167 9.9998 11.9168C9.49147 11.9168 9.00347 11.7147 8.64405 11.3553C8.28481 10.996 8.08258 10.5086 8.08252 10.0003C8.08252 9.49191 8.28465 9.0039 8.64405 8.64457C8.81947 8.46915 9.02547 8.33127 9.24955 8.236V5.92887C9.02572 5.83364 8.8193 5.69718 8.64405 5.52197C8.4473 5.32511 8.29973 5.08871 8.20459 4.83268H5.96093C5.86583 5.08875 5.71839 5.32506 5.52148 5.52197C5.16217 5.88129 4.67478 6.08341 4.1665 6.0835C3.65832 6.08347 3.17086 5.8811 2.81152 5.52197C2.45231 5.16267 2.25008 4.6752 2.25 4.167C2.25002 3.65862 2.45215 3.17139 2.81152 2.81201C3.1709 2.45264 3.65813 2.25051 4.1665 2.25049C4.67471 2.25057 5.16218 2.4528 5.52148 2.81201C5.67403 2.96464 5.79611 3.1414 5.88851 3.33203H8.27702C8.36947 3.14137 8.49147 2.96464 8.64405 2.81201C9.00347 2.45261 9.49147 2.25049 9.9998 2.25049ZM15.8324 2.25049C16.3407 2.25049 16.8287 2.45261 17.1881 2.81201C17.5474 3.17136 17.7496 3.65874 17.7496 4.167C17.7495 4.6752 17.5474 5.16267 17.1881 5.52197C16.8288 5.88126 16.3407 6.0835 15.8324 6.0835C15.3243 6.08335 14.8375 5.88109 14.4782 5.52197C14.1189 5.16265 13.9167 4.67527 13.9166 4.167C13.9167 3.6587 14.1189 3.17137 14.4782 2.81201C14.8375 2.45285 15.3242 2.25064 15.8324 2.25049Z" fill="currentColor"/></svg><span class="text-[#0a0a0a] font-semibold text-base">Extract</span></div>
          <svg class="w-5 h-5 text-[#a3a3a3] transition-transform group-hover:translate-x-1 group-hover:text-[#039855]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
        <p class="text-sm text-[#737373] leading-relaxed">Clean markdown, intent-focused highlights, and page classification. Ready for ingestion.</p>
        <div class="flex flex-col gap-3">
          <div class="flex items-start gap-2 text-sm text-[#737373]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gauge w-3.5 h-3.5 text-primary-lite shrink-0 mt-0.5" aria-hidden="true"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
            <span>Clean markdown extraction · success-only pricing</span>
          </div>
          <div class="flex items-start gap-2 text-sm text-[#737373]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb w-3.5 h-3.5 text-warning shrink-0 mt-0.5" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
            <span>Works best for AI agents, RAG pipelines, and content monitoring.</span>
          </div>
        </div>
      </a>
      <!-- Model -->
      <a href="#" onclick="go('model');return false" class="group bg-white rounded-xl border border-[#e7e7e7] p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden" onmouseenter="this.style.borderColor='#039855'" onmouseleave="this.style.borderColor=''">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3"><svg class="w-6 h-6 text-[#a3a3a3] group-hover:text-[#039855] transition-colors" fill="none" viewBox="0 0 18 18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 8.99991V5.99242C15.7495 5.73073 15.68 5.47379 15.5482 5.24765C15.4166 5.02152 15.2274 4.83419 15 4.70467L9.74997 1.69868C9.52146 1.56846 9.26298 1.5 9 1.5C8.73697 1.5 8.47852 1.56846 8.25 1.69868L3 4.70467C2.53575 4.97092 2.25 5.46217 2.25 5.99317V12.0066C2.25 12.5384 2.53575 13.0289 3 13.2944L8.25 16.3004C8.715 16.5659 9.28503 16.5659 9.74997 16.3004M9 16.4999V8.99991M9 8.99991L15.5475 5.21993M9 8.99991L2.4525 5.21993" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.89 11.2396C15.2515 11.0572 16.503 12.0132 16.6856 13.3747C16.7683 13.9915 16.6168 14.5855 16.3004 15.068L17.114 16.1235C17.3252 16.3973 17.2743 16.7904 17.0006 17.0017C16.7266 17.2127 16.3336 17.162 16.1224 16.8881L15.3694 15.9111C15.1205 16.0407 14.8451 16.1309 14.5507 16.1703C13.1891 16.3525 11.9381 15.3968 11.7557 14.0353C11.5734 12.6739 12.5286 11.4222 13.89 11.2396ZM14.0569 12.4811C13.3811 12.5717 12.906 13.1932 12.9965 13.869C13.087 14.5449 13.7084 15.0192 14.3843 14.9289C15.0603 14.8383 15.5347 14.2169 15.4442 13.5409C15.3535 12.8653 14.7326 12.3908 14.0569 12.4811Z" fill="currentColor"/></svg><span class="text-[#0a0a0a] font-semibold text-base">Model Gateway</span></div>
          <svg class="w-5 h-5 text-[#a3a3a3] transition-transform group-hover:translate-x-1 group-hover:text-[#039855]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
        <p class="text-sm text-[#737373] leading-relaxed">One API to call any LLM, with unified billing. Ready for production.</p>
        <div class="flex flex-col gap-3">
          <div class="flex items-start gap-2 text-sm text-[#737373]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gauge w-3.5 h-3.5 text-primary-lite shrink-0 mt-0.5" aria-hidden="true"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
            <span>OpenAI-compatible · Switch providers without rewriting code.</span>
          </div>
          <div class="flex items-start gap-2 text-sm text-[#737373]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb w-3.5 h-3.5 text-warning shrink-0 mt-0.5" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
            <span>Works best for multi-model apps, fallback chains, and cost routing.</span>
          </div>
        </div>
      </a>
      <a href="https://docs.octen.ai/api-reference/embedding" target="_blank" rel="noreferrer" class="group bg-white rounded-xl border border-[#e7e7e7] p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden" onmouseenter="this.style.borderColor='#039855'" onmouseleave="this.style.borderColor=''">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3"><svg class="w-6 h-6 text-[#a3a3a3] group-hover:text-[#039855] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg><span class="text-[#0a0a0a] font-semibold text-base">Embedding</span></div>
          <svg class="w-5 h-5 text-[#a3a3a3] transition-transform group-hover:translate-x-1 group-hover:text-[#039855]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
        <p class="text-sm text-[#737373] leading-relaxed">Vector embeddings for retrieval, similarity, and ranking. Ready for production.</p>
        <div class="flex flex-col gap-3">
          <div class="flex items-start gap-2 text-sm text-[#737373]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gauge w-3.5 h-3.5 text-primary-lite shrink-0 mt-0.5" aria-hidden="true"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
            <span>#1 on RTEB (0.7953) · Strong multilingual performance.</span>
          </div>
          <div class="flex items-start gap-2 text-sm text-[#737373]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb w-3.5 h-3.5 text-warning shrink-0 mt-0.5" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
            <span>Works best for RAG, semantic search, and recommendations.</span>
          </div>
        </div>
      </a>
      <!-- VL Embedding -->
      <a href="https://docs.octen.ai/api-reference/vl-embedding" target="_blank" rel="noreferrer" class="group bg-white rounded-xl border border-[#e7e7e7] p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden" onmouseenter="this.style.borderColor='#039855'" onmouseleave="this.style.borderColor=''">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3"><svg class="w-6 h-6 text-[#a3a3a3] group-hover:text-[#039855] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg><span class="text-[#0a0a0a] font-semibold text-base">VL Embedding</span></div>
          <svg class="w-5 h-5 text-[#a3a3a3] transition-transform group-hover:translate-x-1 group-hover:text-[#039855]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
        <p class="text-sm text-[#737373] leading-relaxed">Multimodal embeddings for cross-modal retrieval, similarity, and ranking. Ready for production.</p>
        <div class="flex flex-col gap-3">
          <div class="flex items-start gap-2 text-sm text-[#737373]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gauge w-3.5 h-3.5 text-primary-lite shrink-0 mt-0.5" aria-hidden="true"><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
            <span>#1 on MMEB-V2 (80.09) · Unified vision-language space.</span>
          </div>
          <div class="flex items-start gap-2 text-sm text-[#737373]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb w-3.5 h-3.5 text-warning shrink-0 mt-0.5" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
            <span>Works best for multimodal RAG, visual document search, and image-text retrieval.</span>
          </div>
        </div>
      </a>
    </div>
  </section>

  <!-- Application -->
  <section class="mb-8">
    <h2 class="text-[16px] text-[#000] font-semibold mb-3">Application</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Answer (formerly Broad Search Application) -->
      <a href="#" onclick="go('broad-search');return false" class="group bg-white border border-[#e7e7e7] rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-[#a3a3a3] transition-all cursor-pointer">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style="background:#0398551a;color:#039855"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/></svg></span>
            <p class="text-[#0a0a0a] font-semibold">Answer</p>
          </div>
          <p class="text-xs text-[#737373] leading-relaxed">Experience conversational search. Get verifiable AI answers grounded in live web sources.</p>
        </div>
        <div class="flex flex-col gap-2 pt-2 border-t border-[#f5f5f5]">
          <span class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855">Try now <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></span>
        </div>
      </a>
      <!-- Deep Research -->
      <a href="#" onclick="go('deep-research');return false" class="group bg-white border border-[#e7e7e7] rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-[#a3a3a3] transition-all cursor-pointer">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style="background:#0398551a;color:#039855"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18h8M3 22h18M14 22a7 7 0 100-14h-1M9 14h2M9 12a2 2 0 01-2-2V6h6v4a2 2 0 01-2 2zM12 6V3a1 1 0 00-1-1H9a1 1 0 00-1 1v3"/></svg></span>
            <p class="text-[#0a0a0a] font-semibold">Deep Research</p>
          </div>
          <p class="text-xs text-[#737373] leading-relaxed">Experience Deep Research. Get comprehensive reports distilled from thousands of sources.</p>
        </div>
        <div class="flex flex-col gap-2 pt-2 border-t border-[#f5f5f5]">
          <span class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855">Try now <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></span>
        </div>
      </a>
      <!-- Multimodal Chat -->
      <a href="#" onclick="openRequestAccess('Multimodal Chat');return false" class="group bg-white border border-[#e7e7e7] rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-[#a3a3a3] transition-all cursor-pointer">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style="background:#0398551a;color:#039855"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg></span>
            <p class="text-[#0a0a0a] font-semibold">Multimodal Chat</p>
            <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium" style="background:#0398551a;color:#039855">Early Access</span>
          </div>
          <p class="text-xs text-[#737373] leading-relaxed">Experience multimodal chat. Get answers grounded in text, image, and video sources.</p>
        </div>
        <div class="flex flex-col gap-2 pt-2 border-t border-[#f5f5f5]">
          <span class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855">Try now <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></span>
        </div>
      </a>
      <!-- Grounded Generation -->
      <a href="#" onclick="openRequestAccess('Grounded Generation');return false" class="group bg-white border border-[#e7e7e7] rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-[#a3a3a3] transition-all cursor-pointer">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style="background:#0398551a;color:#039855"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 15l-5-5L5 21"/></svg></span>
            <p class="text-[#0a0a0a] font-semibold">Grounded Generation</p>
            <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium" style="background:#0398551a;color:#039855">Early Access</span>
          </div>
          <p class="text-xs text-[#737373] leading-relaxed">Generate images and videos grounded in web-sourced references.</p>
        </div>
        <div class="flex flex-col gap-2 pt-2 border-t border-[#f5f5f5]">
          <span class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855">Try now <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></span>
        </div>
      </a>
    </div>
  </section>

  <!-- Getting Started -->
  <section>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-[16px] text-[#000] font-semibold">Getting Started</h2>
      <a href="https://docs.octen.ai/introduction/getting-started/quickstart" target="_blank" rel="noreferrer" class="text-xs font-medium hover:opacity-75 transition-opacity" style="color:#039855">Quickstart guide →</a>
    </div>
    <div class="grid md:grid-cols-3 gap-4">
      <div class="group bg-white border border-[#e7e7e7] rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-[#a3a3a3] transition-all">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold shrink-0" style="background:#0398551a;color:#039855">01</span>
        <div class="flex-1"><p class="text-[#0a0a0a] font-semibold mb-2">Get your API key</p><p class="text-xs text-[#737373] leading-relaxed">One API key for all Octen APIs.</p></div>
        <div class="flex flex-col gap-2 pt-2 border-t border-[#f5f5f5]">
          <a href="#" onclick="go('api-keys');return false" class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">Manage API keys <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        </div>
      </div>
      <div class="group bg-white border border-[#e7e7e7] rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-[#a3a3a3] transition-all">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold shrink-0" style="background:#0398551a;color:#039855">02</span>
        <div class="flex-1"><p class="text-[#0a0a0a] font-semibold mb-2">Make your first call</p><p class="text-xs text-[#737373] leading-relaxed">Fast, structured responses via API, SDK, or the CLI.</p></div>
        <div class="flex flex-row flex-nowrap items-center gap-4 pt-2 border-t border-[#f5f5f5]">
          <a href="https://docs.octen.ai/api-reference/search" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 text-xs font-medium w-fit whitespace-nowrap" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">API &amp; SDKs <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
          <a href="https://docs.octen.ai/llm-&-agent-interfaces/integrations/octen-cli" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 text-xs font-medium w-fit whitespace-nowrap" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">CLI <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        </div>
      </div>
      <div class="group bg-white border border-[#e7e7e7] rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-[#a3a3a3] transition-all">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold shrink-0" style="background:#0398551a;color:#039855">03</span>
        <div class="flex-1"><p class="text-[#0a0a0a] font-semibold mb-2">Integrate into your app</p><p class="text-xs text-[#737373] leading-relaxed">Use as an LLM tool or skill, or integrate into RAG pipelines.</p></div>
        <div class="flex flex-col gap-2 pt-2 border-t border-[#f5f5f5]">
          <a href="https://docs.octen.ai/llm-&-agent-interfaces/llm-tool-use/connect-llms-to-octen-search" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">Integration guide <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        </div>
      </div>
    </div>

    <!-- Built with MCP & Skills -->
    <div class="mt-4 bg-white border border-[#e7e7e7] rounded-xl p-6 grid lg:grid-cols-2 gap-6 hover:shadow-md hover:border-[#a3a3a3] transition-all">
      <!-- Left: intro -->
      <div class="min-w-0">
        <p class="text-[#0a0a0a] font-semibold mb-2">Built with MCP &amp; Skills</p>
        <p class="text-xs text-[#737373] leading-relaxed">Connect once, and your agent gets Search, Extract, and every tool we ship next — native to Claude Desktop, Cursor, VS Code, and any MCP client.</p>
      </div>
      <!-- Right: tabs + install + actions -->
      <div class="min-w-0 lg:border-l lg:border-[#e7e7e7] lg:pl-6">
        <!-- Tabs -->
        <div class="flex items-center gap-1 mb-3 border-b border-[#e7e7e7]">
          <button data-mcps-tab="mcp" class="mcps-tab px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors" style="color:#039855;border-color:#039855">MCP</button>
          <button data-mcps-tab="skills" class="mcps-tab px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors text-[#737373] border-transparent hover:text-[#737373]">Skills</button>
        </div>
        <!-- MCP panel -->
        <div data-mcps-panel="mcp" class="mcps-panel">
          <div class="flex items-center gap-2 flex-wrap">
            <select id="mcps-client" onchange="mcpsSetClient(this.value)" class="shrink-0 bg-white border border-[#e7e7e7] rounded-lg px-3 py-2 text-xs font-medium text-[#737373] cursor-pointer">
              <option value="claude-code">Claude Code</option>
              <option value="claude-desktop">Claude Desktop</option>
              <option value="cursor">Cursor</option>
              <option value="vscode">VS Code</option>
            </select>
            <div class="flex-1 min-w-[200px] flex items-center justify-between gap-2 bg-[#f5f5f5] border border-[#e7e7e7] rounded-lg px-3 py-2 font-mono text-xs text-[#0a0a0a]">
              <span id="mcps-cmd-mcp" class="truncate">claude mcp add --scope user octen -- npx -y octen-mcp</span>
              <button onclick="navigator.clipboard.writeText(document.getElementById('mcps-cmd-mcp').textContent)" class="text-[#a3a3a3] hover:text-[#737373] shrink-0" title="Copy">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              </button>
            </div>
            <a href="https://github.com/Octen-Team/octen-mcp" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 px-3 py-2 border border-[#e7e7e7] rounded-lg text-xs font-medium text-[#737373] hover:bg-[#f5f5f5]">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              GitHub
            </a>
            <a href="https://docs.octen.ai/llm-&-agent-interfaces/llm-tool-use/octen-mcp-server" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 px-3 py-2 border border-[#e7e7e7] rounded-lg text-xs font-medium text-[#737373] hover:bg-[#f5f5f5]">Docs</a>
          </div>
        </div>
        <!-- Skills panel -->
        <div data-mcps-panel="skills" class="mcps-panel hidden">
          <div class="flex items-center gap-2 flex-wrap">
            <div class="flex-1 min-w-[200px] flex items-center justify-between gap-2 bg-[#f5f5f5] border border-[#e7e7e7] rounded-lg px-3 py-2 font-mono text-xs text-[#0a0a0a]">
              <span>git clone https://github.com/Octen-Team/web-search-skills</span>
              <button onclick="navigator.clipboard.writeText('git clone https://github.com/Octen-Team/web-search-skills')" class="text-[#a3a3a3] hover:text-[#737373] shrink-0" title="Copy">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              </button>
            </div>
            <a href="https://github.com/Octen-Team" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 px-3 py-2 border border-[#e7e7e7] rounded-lg text-xs font-medium text-[#737373] hover:bg-[#f5f5f5]">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              GitHub
            </a>
            <a href="https://docs.octen.ai/llm-&-agent-interfaces/llm-tool-use/octen-skills" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 px-3 py-2 border border-[#e7e7e7] rounded-lg text-xs font-medium text-[#737373] hover:bg-[#f5f5f5]">Docs</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</div>
</div>
`);
