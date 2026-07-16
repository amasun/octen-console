(function(){
  const PRIMARY = 'var(--color-accent)', PRIMARY_BG = '#0398551a';
  const MODELS = [
    { id:'anthropic/claude-sonnet-4.6', label:'Claude Sonnet 4.6', provider:'Anthropic', modality:'chat', input:3, output:15, supportsSearch:true, tag:'Recommended' },
    { id:'anthropic/claude-opus-4.6', label:'Claude Opus 4.6', provider:'Anthropic', modality:'chat', input:5, output:25, supportsSearch:true },
    { id:'anthropic/claude-haiku-4.5', label:'Claude Haiku 4.5', provider:'Anthropic', modality:'chat', input:1, output:5, supportsSearch:true },
    { id:'google/gemini-3.1-pro-preview', label:'Gemini 3.1 Pro', provider:'Google', modality:'chat', input:2, output:12, supportsSearch:true },
    { id:'google/gemini-3-flash-preview', label:'Gemini 3 Flash', provider:'Google', modality:'chat', input:0.5, output:3, supportsSearch:true },
    { id:'openai/gpt-5.4', label:'GPT-5.4', provider:'OpenAI', modality:'chat', input:2.5, output:15, supportsSearch:true },
    { id:'openai/gpt-oss-120b', label:'GPT-OSS-120B', provider:'OpenAI', modality:'chat', input:0.039, output:0.19 },
    { id:'moonshotai/kimi-k2.5', label:'Kimi K2.5', provider:'MoonshotAI', modality:'chat', input:0.45, output:2.2 },
    { id:'minimax/minimax-m2.5', label:'Minimax M2.5', provider:'Minimax', modality:'chat', input:0.25, output:1.2 },
    { id:'google/gemini-3-image', label:'Gemini 3 Image', provider:'Google', modality:'image', input:2, output:30, tag:'Recommended' },
    { id:'openai/gpt-image-2', label:'GPT Image 2', provider:'OpenAI', modality:'image', input:5, output:40 },
    { id:'bytedance/seedream-5', label:'Seedream 5', provider:'ByteDance', modality:'image', input:1.5, output:18 },
  ];
  const PROVIDER_COLORS = {
    Anthropic:{bg:'#fdf0e7',fg:'#c2570f'}, Google:{bg:'#e8f0fe',fg:'#1a73e8'}, OpenAI:{bg:'#e7f5f0',fg:'#0d9373'},
    MoonshotAI:{bg:'#ede9fe',fg:'#7c3aed'}, Minimax:{bg:'#fee2e2',fg:'#dc2626'}, ByteDance:{bg:'#e0f2fe',fg:'#0284c7'},
  };
  const MOCK_SOURCES = [
    { title:'The State of AI in 2026: Key Trends and Breakthroughs', url:'https://example.com/state-of-ai-2026', domain:'techreview.com' },
    { title:'Latest Industry Analysis and Expert Commentary', url:'https://example.com/industry-analysis', domain:'reuters.com' },
    { title:'Comprehensive Research Overview', url:'https://example.com/research-overview', domain:'arxiv.org' },
  ];
  const SUGGESTIONS = {
    chat:['What are the latest AI developments this month?','Explain the difference between RAG and fine-tuning','Compare vector databases for production use'],
    image:['A sunrise over snow-capped mountains, golden hour','Minimalist poster of a green hummingbird, flat design','Isometric illustration of a data center, soft colors'],
  };

  function routeModel(modality, selectedId, searchOn){
    const pool = MODELS.filter(m=>m.modality===modality);
    const find = id => MODELS.find(m=>m.id===id);
    if(modality==='image'){ return { model: pool.find(m=>m.id===selectedId)||find('google/gemini-3-image'), reason: searchOn?'Search enabled':'Image generation' }; }
    const selected = pool.find(m=>m.id===selectedId)||find('anthropic/claude-sonnet-4.6');
    if(searchOn && !selected.supportsSearch){ return { model: find('anthropic/claude-sonnet-4.6'), reason: selected.label+' does not support search' }; }
    return { model: selected, reason: searchOn?'Search enabled':'' };
  }
  function mockTextResponse(prompt, modelLabel, searchOn, hasAttachment){
    if(hasAttachment) return 'I have analyzed the image you uploaded. Here is what I can see:\n\n**Overview** — The image shows a clear composition with distinct visual elements.\n\n**Key observations:**\n\n1. The main subject is well-positioned within the frame\n2. Color palette leans toward natural tones with good contrast\n3. There are several details worth noting in the background\n\nWould you like me to focus on any specific aspect?\n\n_(Simulated response from '+modelLabel+')_';
    if(searchOn) return 'Based on the latest web results, here is what I found:\n\n**Current landscape** — Recent reporting shows significant momentum, with several notable developments over the past quarter.\n\n**Key insights** — Three factors stand out:\n\n1. Infrastructure costs have dropped substantially year-over-year\n2. Regulatory clarity is improving across major markets\n3. Tooling maturity is enabling faster production deployments\n\n_(Simulated response from '+modelLabel+')_';
    return 'Great question. Here is a structured way to think about it:\n\n**The short answer** — It depends on your goals, but there is a clear framework.\n\n**Key considerations:**\n\n1. **Scope** — Clarify what success looks like.\n2. **Trade-offs** — Compare approaches on cost, speed, and quality.\n3. **Iteration** — Start small, measure, then expand.\n\n_(Simulated response from '+modelLabel+')_';
  }
  function mockImageUrl(prompt, seed, ratio){
    const dim = ratio==='16:9'?[640,360]:ratio==='9:16'?[360,640]:[512,512]; const w=dim[0],h=dim[1];
    const palettes=[['#0f766e','#039855','#0f172a'],['#7c3aed','#2563eb','#0f172a'],['#ea580c','#dc2626','#1e1b4b'],['#0284c7','#039855','#082f49']];
    const p=palettes[seed%palettes.length]; const text=(prompt||'').slice(0,30).replace(/[<>&"']/g,''); const mn=Math.min(w,h);
    const svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="'+p[0]+'"/><stop offset="50%" stop-color="'+p[1]+'"/><stop offset="100%" stop-color="'+p[2]+'"/></linearGradient></defs><rect width="'+w+'" height="'+h+'" fill="url(#g)"/><circle cx="'+(w*0.75)+'" cy="'+(h*0.25)+'" r="'+(mn*0.15)+'" fill="rgba(255,255,255,0.18)"/><circle cx="'+(w*0.2)+'" cy="'+(h*0.8)+'" r="'+(mn*0.22)+'" fill="rgba(255,255,255,0.08)"/><text x="'+(w/2)+'" y="'+(h/2)+'" font-family="sans-serif" font-size="'+(mn*0.04)+'" fill="rgba(255,255,255,0.92)" text-anchor="middle">'+text+'</text><text x="'+(w/2)+'" y="'+(h/2+mn*0.07)+'" font-family="sans-serif" font-size="'+(mn*0.025)+'" fill="rgba(255,255,255,0.5)" text-anchor="middle">AI generated · mock preview</text></svg>';
    return 'data:image/svg+xml;utf8,'+encodeURIComponent(svg);
  }
  function renderLite(content){
    const esc = content.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return esc.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/_([^_]+)_/g,'<em style="color:#64748b">$1</em>').replace(/\n/g,'<br/>');
  }
  function relativeTime(ts){ const mins=Math.floor((Date.now()-ts)/60000); if(mins<1)return'just now'; if(mins<60)return mins+'m ago'; const h=Math.floor(mins/60); if(h<24)return h+'h ago'; return Math.floor(h/24)+'d ago'; }
  function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function providerMark(provider, size){ const c=PROVIDER_COLORS[provider]||{bg:'#f1f5f9',fg:'#475569'}; return '<span class="rounded-lg flex items-center justify-center font-semibold shrink-0" style="width:'+size+'px;height:'+size+'px;font-size:'+Math.round(size*0.38)+'px;background:'+c.bg+';color:'+c.fg+'">'+provider.charAt(0)+'</span>'; }

  // ── State ──
  const S = {
    modality:'chat', selectedChat:'anthropic/claude-sonnet-4.6', selectedImage:'google/gemini-3-image',
    searchOn:false, systemPrompt:'', temperature:'1.0', topP:'1.0', maxTokens:'4096', aspectRatio:'1:1', imageCount:1,
    messages:[], inputValue:'', isLoading:false, attachments:[], activeSessionId:null,
    menuOpen:false, settingsOpen:false, historyOpen:false, sessions:[],
  };
  let streamTimer=null;
  S.sessions = [
    { id:'seed-1', title:'What are the latest AI developments this month?', modality:'chat', updatedAt:Date.now()-1000*60*60*3,
      messages:[ {id:'s1-u',role:'user',content:'What are the latest AI developments this month?'},
        {id:'s1-a',role:'assistant',content:mockTextResponse('x','Claude Sonnet 4.6',true,false),routedModel:'Claude Sonnet 4.6',routeReason:'Search enabled',sources:MOCK_SOURCES,usage:{prompt_tokens:160,completion_tokens:182,total_tokens:342}} ] },
    { id:'seed-2', title:'A sunrise over snow-capped mountains, golden hour', modality:'image', updatedAt:Date.now()-1000*60*60*26,
      messages:[ {id:'s2-u',role:'user',content:'A sunrise over snow-capped mountains, golden hour'},
        {id:'s2-a',role:'assistant',content:'',routedModel:'Gemini 3 Image',routeReason:'Image generation',imageUrls:[mockImageUrl('A sunrise',3,'1:1')],usage:{prompt_tokens:52,completion_tokens:1280,total_tokens:1332}} ] },
  ];

  const selId = () => S.modality==='chat'?S.selectedChat:S.selectedImage;
  const setSelId = id => { if(S.modality==='chat')S.selectedChat=id; else S.selectedImage=id; };
  const selModel = () => MODELS.find(m=>m.id===selId()) || MODELS.filter(m=>m.modality===S.modality)[0];

  const $ = id => document.getElementById(id);
  function svgSend(c){ return '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="'+c+'" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'; }
  function spinner(sz,col){ return '<div class="rounded-full animate-spin" style="width:'+sz+'px;height:'+sz+'px;border-width:2px;border-style:solid;border-color:'+col+';border-top-color:transparent"></div>'; }

  // ── Renderers ──
  function renderModalitySwitch(){
    document.querySelectorAll('[data-md-modality]').forEach(b=>{
      const active = b.getAttribute('data-md-modality')===S.modality;
      b.style.cssText = (b.getAttribute('data-md-modality')==='chat'?'padding:6px 14px;gap:6px;border-right:1px solid #e2e8f0;':'padding:6px 14px;gap:6px;') + (active?'background:'+PRIMARY_BG+';color:'+PRIMARY+';font-weight:600':'background:white;color:#64748b');
    });
  }
  function renderModelBtn(){
    const m=selModel(); $('md-model-mark').innerHTML=providerMark(m.provider,22); $('md-model-label').textContent=m.label;
    const btn=$('md-model-btn'); btn.style.cssText='padding:5px 10px;gap:8px;'+(S.menuOpen?'border-color:'+PRIMARY+';background:'+PRIMARY_BG:'border-color:#e2e8f0;background:white');
    $('md-model-chev').style.transform=S.menuOpen?'rotate(180deg)':'';
  }
  function renderModelMenu(){
    const menu=$('md-model-menu'); menu.classList.toggle('hidden',!S.menuOpen); if(!S.menuOpen)return;
    $('md-model-menu-title').textContent = S.modality==='chat'?'Text models':'Image models';
    const vis=MODELS.filter(m=>m.modality===S.modality); const grouped={};
    vis.forEach(m=>{(grouped[m.provider]=grouped[m.provider]||[]).push(m);});
    let html='';
    Object.keys(grouped).forEach(prov=>{
      html+='<div><div class="px-3 text-[10px] font-medium uppercase tracking-wider text-slate-400" style="padding-top:8px;padding-bottom:4px">'+prov+'</div>';
      grouped[prov].forEach(m=>{
        html+='<button type="button" onclick="mdPick(\''+m.id+'\')" class="w-full flex items-center px-3 py-2 hover:bg-slate-50 transition-colors text-left" style="gap:10px">'+providerMark(m.provider,28)+
          '<div class="min-w-0 flex-1 flex items-center gap-1.5"><span class="text-xs font-medium text-slate-800 truncate">'+m.label+'</span>'+
          (m.tag?'<span class="px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0" style="background:#fef3c7;color:#b45309">'+m.tag+'</span>':'')+
          (m.supportsSearch?'<span class="inline-flex items-center gap-0.5 text-[10px] text-slate-400 shrink-0"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>search</span>':'')+'</div>'+
          (selId()===m.id?'<svg class="w-4 h-4 shrink-0" style="color:'+PRIMARY+'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>':'')+'</button>';
      });
      html+='</div>';
    });
    $('md-model-list').innerHTML=html;
  }
  function renderHistory(){
    const menu=$('md-history-menu'); menu.classList.toggle('hidden',!S.historyOpen);
    $('md-history-btn').style.cssText='padding:6px 10px;'+(S.historyOpen?'background:'+PRIMARY_BG+';color:'+PRIMARY+';border-color:'+PRIMARY:'background:white;color:#475569;border-color:#e2e8f0');
    if(!S.historyOpen)return;
    const list=$('md-history-list');
    if(S.sessions.length===0){ list.innerHTML='<div class="px-3 text-center text-xs text-slate-400" style="padding-top:24px;padding-bottom:24px">No conversations yet</div>'; return; }
    list.innerHTML=S.sessions.map(s=>{
      const icon = s.modality==='chat'?'<svg class="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 018.6-12.4 8.48 8.48 0 018 8z"/></svg>':'<svg class="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 15l-5-5L5 21"/></svg>';
      return '<button type="button" onclick="mdLoadSession(\''+s.id+'\')" class="w-full flex items-center px-3 py-2 hover:bg-slate-50 transition-colors text-left border-t border-slate-50" style="gap:10px;'+(s.id===S.activeSessionId?'background:'+PRIMARY_BG:'')+'">'+
        '<span class="rounded-lg flex items-center justify-center shrink-0" style="width:28px;height:28px;background:#f1f5f9">'+icon+'</span>'+
        '<div class="min-w-0 flex-1"><div class="text-xs font-medium text-slate-800 truncate">'+esc(s.title)+'</div><div class="text-[11px] text-slate-400">'+relativeTime(s.updatedAt)+' · '+s.messages.length+' messages</div></div>'+
        (s.id===S.activeSessionId?'<svg class="w-3.5 h-3.5 shrink-0" style="color:'+PRIMARY+'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>':'')+'</button>';
    }).join('');
  }
  function inputBarHtml(rows, placeholder){
    const att = S.attachments.length? '<div class="flex flex-wrap gap-2 mb-2">'+S.attachments.map(a=>'<div class="relative rounded-lg overflow-hidden border border-slate-200" style="width:56px;height:56px"><img src="'+a.url+'" class="w-full h-full object-cover"/><button type="button" onclick="mdRemoveAtt(\''+a.id+'\')" class="absolute flex items-center justify-center rounded-full" style="top:3px;right:3px;width:16px;height:16px;background:rgba(15,23,42,0.65)"><svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>').join('')+'</div>' : '';
    const disabled = (!S.inputValue.trim() && S.attachments.length===0) || S.isLoading;
    const settingsPanel = S.settingsOpen? '<div class="absolute left-0 rounded-xl border border-slate-200 bg-white shadow-xl z-50 p-3 flex flex-col gap-3" style="bottom:calc(100% + 8px);width:280px">'+
        '<div class="text-xs font-semibold text-slate-700">'+(S.modality==='chat'?'Text parameters':'Image parameters')+'</div>'+
        (S.modality==='chat'
          ? '<div><div class="text-[11px] text-slate-500 uppercase tracking-wide mb-1.5">System prompt</div><input type="text" value="'+esc(S.systemPrompt)+'" oninput="mdSet(\'systemPrompt\',this.value)" placeholder="e.g. Be precise and concise." class="w-full border border-slate-200 rounded-md text-xs outline-none" style="padding:6px 10px"/></div>'+
            '<div class="grid grid-cols-2 gap-2"><div><div class="text-[11px] text-slate-500 uppercase tracking-wide mb-1.5">Temperature</div><input type="number" step="0.1" min="0" max="2" value="'+S.temperature+'" oninput="mdSet(\'temperature\',this.value)" class="w-full border border-slate-200 rounded-md text-xs outline-none" style="padding:6px 10px"/></div><div><div class="text-[11px] text-slate-500 uppercase tracking-wide mb-1.5">Top P</div><input type="number" step="0.1" min="0" max="1" value="'+S.topP+'" oninput="mdSet(\'topP\',this.value)" class="w-full border border-slate-200 rounded-md text-xs outline-none" style="padding:6px 10px"/></div></div>'+
            '<div><div class="text-[11px] text-slate-500 uppercase tracking-wide mb-1.5">Max tokens</div><input type="number" min="1" value="'+S.maxTokens+'" oninput="mdSet(\'maxTokens\',this.value)" class="w-full border border-slate-200 rounded-md text-xs outline-none" style="padding:6px 10px"/></div>'
          : '<div><div class="text-[11px] text-slate-500 uppercase tracking-wide mb-1.5">Aspect ratio</div><div class="inline-flex rounded-lg border border-slate-200 text-xs overflow-hidden">'+['1:1','16:9','9:16'].map((r,i)=>'<button type="button" onclick="mdSet(\'aspectRatio\',\''+r+'\')" class="px-3 py-1.5 '+(i<2?'border-r border-slate-200':'')+'" style="'+(S.aspectRatio===r?'background:'+PRIMARY_BG+';color:'+PRIMARY+';font-weight:500':'background:white;color:#475569')+'">'+r+'</button>').join('')+'</div></div>'+
            '<div><div class="text-[11px] text-slate-500 uppercase tracking-wide mb-1.5">Number of images</div><div class="inline-flex rounded-lg border border-slate-200 text-xs overflow-hidden">'+[1,2,4].map((n,i)=>'<button type="button" onclick="mdSet(\'imageCount\','+n+')" class="py-1.5 '+(i<2?'border-r border-slate-200':'')+'" style="padding-left:14px;padding-right:14px;'+(S.imageCount===n?'background:'+PRIMARY_BG+';color:'+PRIMARY+';font-weight:500':'background:white;color:#475569')+'">'+n+'</button>').join('')+'</div></div>')+
      '</div>' : '';
    return '<div class="rounded-2xl border border-slate-200 bg-white px-4 pb-2 transition-all" style="padding-top:10px;box-shadow:0 4px 16px rgba(15,23,42,0.06)">'+att+
      '<textarea id="md-input" rows="'+rows+'" oninput="mdOnInput(this)" onkeydown="mdOnKey(event)" placeholder="'+placeholder+'" class="w-full bg-transparent border-0 py-0.5 text-sm focus:outline-none resize-none placeholder:text-slate-300" style="max-height:160px">'+esc(S.inputValue)+'</textarea>'+
      '<div class="flex items-center justify-between mt-1"><div class="flex items-center gap-2 min-w-0">'+
        '<div class="relative" id="md-settings-wrap"><button type="button" onclick="mdToggleSettings()" class="flex items-center justify-center rounded-full border transition-colors shrink-0" style="width:30px;height:30px;'+(S.settingsOpen?'border-color:'+PRIMARY+'66;background:'+PRIMARY_BG+';color:'+PRIMARY:'border-color:#e2e8f0;background:white;color:#64748b')+'"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg></button>'+settingsPanel+'</div>'+
        '<button type="button" onclick="mdPickFile()" class="flex items-center justify-center rounded-full border transition-colors shrink-0" style="width:30px;height:30px;border-color:#e2e8f0;background:white;color:#64748b"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 15l-5-5L5 21"/><line x1="16" y1="5" x2="22" y2="5"/><line x1="19" y1="2" x2="19" y2="8"/></svg></button>'+
        '<span class="shrink-0" style="width:1px;height:18px;background:#e2e8f0;margin:0 2px"></span>'+
        '<button type="button" onclick="mdToggleSearch()" class="inline-flex items-center shrink-0" style="gap:8px;height:30px"><span class="text-xs font-medium" style="color:'+(S.searchOn?PRIMARY:'#64748b')+'">Search</span><span class="relative inline-flex items-center rounded-full transition-colors" style="width:36px;height:20px;background:'+(S.searchOn?PRIMARY:'#cbd5e1')+'"><span class="inline-block rounded-full bg-white shadow transition-transform" style="width:14px;height:14px;transform:'+(S.searchOn?'translateX(19px)':'translateX(3px)')+'"></span></span></button>'+
      '</div>'+
      '<button type="button" onclick="mdSend()" '+(disabled?'disabled':'')+' class="shrink-0 p-2 rounded-lg transition-all" style="background:'+(disabled?'#f1f5f9':PRIMARY)+';cursor:'+(disabled?'default':'pointer')+'">'+(S.isLoading?spinner(16,'white'):svgSend(disabled?'#94a3b8':'white'))+'</button>'+
      '</div></div>';
  }
  function messageHtml(msg){
    const isUser=msg.role==='user';
    let inner='';
    if(msg.attachments&&msg.attachments.length) inner+='<div class="flex flex-wrap gap-2 mb-2">'+msg.attachments.map(u=>'<img src="'+u+'" class="rounded-lg border border-slate-200 object-cover" style="width:96px;height:96px"/>').join('')+'</div>';
    if(msg.isStreaming&&!msg.content){ inner+='<div class="flex items-center gap-2 text-slate-400 text-xs py-0.5">'+spinner(14,'#cbd5e1')+'<span>'+(S.modality==='image'?'Generating image...':'Thinking...')+'</span></div>'; }
    else if(msg.content){ inner+='<div>'+renderLite(msg.content)+(msg.isStreaming?'<span style="display:inline-block;width:2px;height:14px;background:#94a3b8;margin-left:2px"></span>':'')+'</div>'; }
    if(msg.imageUrls&&msg.imageUrls.length){ inner+='<div class="grid gap-2 '+(msg.imageUrls.length>1?'grid-cols-2':'grid-cols-1')+' '+(msg.content?'mt-2':'')+'">'+msg.imageUrls.map(u=>'<img src="'+u+'" class="rounded-xl w-full border border-slate-200" style="'+(msg.imageUrls.length>1?'':'max-width:360px')+'"/>').join('')+'</div>'; }
    let extra='';
    if(!isUser&&msg.routedModel) extra+='<div class="flex items-center gap-1.5 mb-1.5 text-[11px] text-slate-400"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4M13 3l2.5 6.5L22 12l-6.5 2.5L13 21l-2.5-6.5L4 12l6.5-2.5L13 3z"/></svg><span class="font-medium text-slate-500">'+msg.routedModel+'</span>'+(msg.routeReason?'<span>· '+msg.routeReason+'</span>':'')+'</div>';
    const bubble='<div class="rounded-2xl px-4 py-3 text-sm leading-relaxed '+(isUser?'text-slate-800':'bg-slate-50 text-slate-700 border border-slate-100')+'" style="'+(isUser?'background:'+PRIMARY_BG:'')+'">'+inner+'</div>';
    let sources='';
    if(!isUser&&msg.sources&&!msg.isStreaming){
      sources='<div class="mt-2 rounded-xl border border-slate-200 overflow-hidden"><div class="px-3 py-1.5 bg-slate-50 text-[11px] font-medium text-slate-500 flex items-center gap-1.5"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/></svg> '+msg.sources.length+' sources</div>'+
        msg.sources.map((s,i)=>'<a href="'+s.url+'" target="_blank" rel="noopener noreferrer" class="flex items-center px-3 py-2 hover:bg-slate-50 transition-colors border-t border-slate-100" style="gap:10px"><span class="shrink-0 w-5 h-5 rounded bg-slate-100 text-[10px] font-medium text-slate-500 flex items-center justify-center">'+(i+1)+'</span><div class="min-w-0 flex-1"><div class="text-xs text-slate-700 truncate">'+esc(s.title)+'</div><div class="text-[10px] text-slate-400">'+s.domain+'</div></div></a>').join('')+'</div>';
    }
    let usage='';
    if(!isUser&&msg.usage&&!msg.isStreaming) usage='<div class="mt-1.5 text-[11px] text-slate-400">'+msg.usage.prompt_tokens+' in + '+msg.usage.completion_tokens+' out = '+msg.usage.total_tokens+' tokens</div>';
    return '<div class="flex '+(isUser?'justify-end':'justify-start')+'"><div style="max-width:'+(isUser?'70%':'85%')+'">'+extra+bubble+sources+usage+'</div></div>';
  }
  function renderBody(){
    const body=$('md-body');
    if(S.messages.length===0){
      const title=S.modality==='chat'?'Chat with any model':'Generate images with AI';
      const icon=S.modality==='chat'?'<span style="font-size:30px">💬</span>':'<svg style="width:28px;height:28px;color:'+PRIMARY+'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 15l-5-5L5 21"/></svg>';
      body.className='flex-1 flex flex-col items-center justify-center px-6';
      body.innerHTML='<div class="rounded-2xl flex items-center justify-center mb-4" style="width:56px;height:56px;background:'+PRIMARY_BG+'">'+icon+'</div>'+
        '<h3 class="text-xl font-semibold text-slate-800 mb-6">'+title+'</h3>'+
        '<div class="w-full" style="max-width:672px">'+inputBarHtml(2, S.modality==='chat'?'Ask anything...':'Describe the image you want to create...')+
        '<div class="flex flex-wrap items-center justify-center gap-2 mt-5">'+SUGGESTIONS[S.modality].map(s=>'<button type="button" onclick="mdSuggest(this)" data-s="'+esc(s)+'" class="py-2 rounded-full border border-slate-200 bg-white text-xs text-slate-500 hover:border-slate-300 hover:text-slate-700 transition-colors" style="padding-left:14px;padding-right:14px;box-shadow:0 1px 2px rgba(15,23,42,0.04)">'+esc(s)+'</button>').join('')+'</div></div>';
    } else {
      body.className='flex-1 flex flex-col overflow-hidden';
      body.innerHTML='<div id="md-scroll" class="flex-1 overflow-y-auto flex flex-col" style="padding-top:20px;padding-bottom:20px;gap:20px"><div class="w-full mx-auto flex flex-col px-6" style="max-width:860px;gap:20px">'+S.messages.map(messageHtml).join('')+'</div></div>'+
        '<div class="shrink-0 w-full mx-auto px-6" style="max-width:860px;padding-top:8px;padding-bottom:16px">'+inputBarHtml(1, S.modality==='chat'?'Ask a follow-up...':'Describe another image...')+'</div>';
      const sc=$('md-scroll'); if(sc) sc.scrollTop=sc.scrollHeight;
    }
  }
  function renderAll(){ renderModalitySwitch(); renderModelBtn(); renderModelMenu(); renderHistory(); renderBody(); }

  // ── Actions (exposed globally) ──
  window.mdSetModality=function(m){ S.modality=m; S.menuOpen=false; renderAll(); };
  window.mdToggleMenu=function(){ S.menuOpen=!S.menuOpen; S.historyOpen=false; renderModelBtn(); renderModelMenu(); renderHistory(); };
  window.mdPick=function(id){ setSelId(id); S.menuOpen=false; renderModelBtn(); renderModelMenu(); };
  window.mdToggleHistory=function(){ S.historyOpen=!S.historyOpen; S.menuOpen=false; renderHistory(); renderModelMenu(); };
  window.mdToggleSettings=function(){ S.settingsOpen=!S.settingsOpen; renderBody(); };
  window.mdToggleSearch=function(){ S.searchOn=!S.searchOn; renderBody(); };
  window.mdSet=function(k,v){ S[k]=v; if(k==='aspectRatio'||k==='imageCount') renderBody(); };
  window.mdOnInput=function(el){ S.inputValue=el.value; el.style.height='auto'; el.style.height=Math.min(el.scrollHeight,160)+'px'; const btn=el.parentElement.querySelector('button[onclick="mdSend()"]'); const dis=(!S.inputValue.trim()&&S.attachments.length===0)||S.isLoading; if(btn){btn.disabled=dis; btn.style.background=dis?'#f1f5f9':PRIMARY; btn.style.cursor=dis?'default':'pointer'; btn.innerHTML=S.isLoading?spinner(16,'white'):svgSend(dis?'#94a3b8':'white');} };
  window.mdOnKey=function(e){ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); mdSend(); } };
  window.mdSuggest=function(el){ mdSend(el.getAttribute('data-s')); };
  window.mdPickFile=function(){ $('md-file').click(); };
  window.mdRemoveAtt=function(id){ S.attachments=S.attachments.filter(a=>a.id!==id); renderBody(); };
  window.mdNewChat=function(){ archiveCurrent(); S.messages=[]; S.inputValue=''; S.isLoading=false; S.attachments=[]; S.activeSessionId=null; if(streamTimer)clearInterval(streamTimer); renderAll(); };
  window.mdLoadSession=function(id){ if(id===S.activeSessionId){S.historyOpen=false;renderHistory();return;} archiveCurrent(); const s=S.sessions.find(x=>x.id===id); S.messages=s.messages.slice(); S.modality=s.modality; S.activeSessionId=id; S.historyOpen=false; S.isLoading=false; if(streamTimer)clearInterval(streamTimer); renderAll(); };

  function archiveCurrent(){
    if(S.messages.length===0)return;
    const fu=S.messages.find(m=>m.role==='user'); const title=fu?(fu.content.slice(0,60)||'Image conversation'):'Conversation';
    if(S.activeSessionId){ S.sessions=S.sessions.map(s=>s.id===S.activeSessionId?Object.assign({},s,{messages:S.messages.slice(),updatedAt:Date.now()}):s); }
    else { S.sessions=[{id:'session-'+Date.now(),title:title,modality:S.modality,messages:S.messages.slice(),updatedAt:Date.now()}].concat(S.sessions); }
  }

  window.mdSend=function(override){
    const text=(typeof override==='string'?override:S.inputValue).trim();
    if((!text&&S.attachments.length===0)||S.isLoading)return;
    const r=routeModel(S.modality, selId(), S.searchOn);
    const userAtt=S.attachments.map(a=>a.url);
    S.messages.push({id:'user-'+Date.now(),role:'user',content:text,attachments:userAtt.length?userAtt:undefined});
    S.inputValue=''; S.attachments=[]; S.isLoading=true;
    const aid='assistant-'+Date.now();
    renderBody();
    if(S.modality==='image'){
      setTimeout(function(){
        S.messages.push({id:aid,role:'assistant',content:'',routedModel:r.model.label,routeReason:r.reason,isStreaming:true}); renderBody();
        setTimeout(function(){
          const urls=[]; for(let i=0;i<S.imageCount;i++) urls.push(mockImageUrl(text||'Generated image', i+text.length, S.aspectRatio));
          const m=S.messages.find(x=>x.id===aid); m.imageUrls=urls; m.isStreaming=false; m.usage={prompt_tokens:40+Math.floor(text.length/4),completion_tokens:1280*S.imageCount,total_tokens:40+Math.floor(text.length/4)+1280*S.imageCount};
          S.isLoading=false; renderBody();
        },1800);
      },300);
      return;
    }
    const full=mockTextResponse(text,r.model.label,S.searchOn,userAtt.length>0);
    setTimeout(function(){
      S.messages.push({id:aid,role:'assistant',content:'',routedModel:r.model.label,routeReason:r.reason,sources:S.searchOn?MOCK_SOURCES:undefined,isStreaming:true}); renderBody();
      let ci=0;
      streamTimer=setInterval(function(){
        ci+=Math.floor(Math.random()*24)+16;
        const m=S.messages.find(x=>x.id===aid); if(!m){clearInterval(streamTimer);return;}
        if(ci>=full.length){ clearInterval(streamTimer); const ct=Math.floor(full.length/4); const pt=120+S.messages.length*40; m.content=full; m.isStreaming=false; m.usage={prompt_tokens:pt,completion_tokens:ct,total_tokens:pt+ct}; S.isLoading=false; renderBody(); }
        else { m.content=full.slice(0,ci); renderBody(); }
      },16);
    },400);
  };

  // outside click / esc
  document.addEventListener('mousedown',function(e){
    const t=e.target;
    if(S.menuOpen && !$('md-model-wrap').contains(t)){ S.menuOpen=false; renderModelBtn(); renderModelMenu(); }
    if(S.historyOpen && !$('md-history-wrap').contains(t)){ S.historyOpen=false; renderHistory(); }
    if(S.settingsOpen){ const w=$('md-settings-wrap'); if(w && !w.contains(t)){ S.settingsOpen=false; renderBody(); } }
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ if(S.menuOpen||S.historyOpen){S.menuOpen=false;S.historyOpen=false;renderModelBtn();renderModelMenu();renderHistory();} if(S.settingsOpen){S.settingsOpen=false;renderBody();} } });

  document.addEventListener('DOMContentLoaded',function(){
    const fi=$('md-file'); if(fi) fi.addEventListener('change',function(e){ const files=e.target.files; if(!files)return; for(const f of Array.prototype.slice.call(files,0,4-S.attachments.length)){ if(!f.type.startsWith('image/'))continue; S.attachments.push({id:f.name+'-'+Date.now()+'-'+Math.random().toString(36).slice(2,6),url:URL.createObjectURL(f),name:f.name}); } fi.value=''; renderBody(); });
    renderAll();
  });
})();
