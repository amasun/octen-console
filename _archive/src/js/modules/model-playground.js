(function(){
  const PRIMARY='#039855', PRIMARY_BG='#0398551a';
  const MODELS=[
    {group:'Anthropic',items:[{id:'anthropic/claude-sonnet-4.6',label:'Claude Sonnet 4.6'},{id:'anthropic/claude-opus-4.6',label:'Claude Opus 4.6'},{id:'anthropic/claude-haiku-4.5',label:'Claude Haiku 4.5'}]},
    {group:'Google',items:[{id:'google/gemini-3-flash-preview',label:'Gemini 3 Flash'},{id:'google/gemini-3.1-pro-preview',label:'Gemini 3.1 Pro'},{id:'google/gemini-3.1-flash-lite-preview',label:'Gemini 3.1 Flash Lite'}]},
    {group:'OpenAI',items:[{id:'openai/gpt-5.4',label:'GPT-5.4'},{id:'openai/gpt-oss-120b',label:'GPT-OSS-120B'}]},
    {group:'MoonshotAI',items:[{id:'moonshotai/kimi-k2.5',label:'Kimi K2.5'}]},
    {group:'Minimax',items:[{id:'minimax/minimax-m2.5',label:'Minimax M2.5'}]},
  ];
  const BROAD_DEFAULTS={ model:'anthropic/claude-sonnet-4.6',mode:'full',maxQueries:30,stream:false,maxTokens:0,maxRounds:5,reasoningEffort:'medium',extraContext:'',skipBrief:false,skipPlan:false,skipPlanConfirm:false,count:5,includeDomains:'',excludeDomains:'',includeText:'',excludeText:'',timeBasis:'auto',startTime:'',endTime:'',highlightEnabled:true,highlightTokens:256,format:'markdown',safesearch:'off',fullContentEnabled:false,fullContentTokens:2048 };
  const DEEP_DEFAULTS=Object.assign({},BROAD_DEFAULTS,{model:'minimax/minimax-m2.5',maxTokens:0,maxRounds:5,count:10});
  window.SPD_BROAD_DEFAULTS=BROAD_DEFAULTS; window.SPD_DEEP_DEFAULTS=DEEP_DEFAULTS;
  const INPUT='width:100%;padding:6px 10px;border:1px solid #e2e8f0;border-radius:6px;font-size:12px;background:#fff;outline:none;box-sizing:border-box';

  let cur=null; // {kind, values, onChange, showWebSearch, quickRange}
  const ov=()=>document.getElementById('spd-overlay');
  function clamp(raw,min,max){ const n=Number(raw); if(isNaN(n))return min; return Math.min(max,Math.max(min,n)); }
  function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function patch(u){ cur.values=Object.assign({},cur.values,u); if(cur.onChange)cur.onChange(cur.values); render(); }
  window.SPD={ patch:patch,
    open:function(kind,values,onChange){ cur={kind:kind,values:Object.assign({},values),onChange:onChange,showWebSearch:false,quickRange:'custom'}; const o=ov(); o.style.display='block'; o.classList.remove('hidden'); render(); },
    close:function(){ const o=ov(); o.style.display='none'; o.classList.add('hidden'); cur=null; },
    val:function(){ return cur?cur.values:null; }
  };
  function pill(field,opts,val){
    return '<div class="inline-flex" style="border:1px solid #e2e8f0;border-radius:999px;overflow:hidden;width:100%;font-size:12px">'+opts.map((o,i)=>'<button type="button" onclick="SPD.patch({'+field+':\''+o.v+'\'})" style="flex:1;padding:4px 10px;'+(i<opts.length-1?'border-right:1px solid #e2e8f0;':'')+(val===o.v?'background:'+PRIMARY_BG+';color:'+PRIMARY+';font-weight:500':'background:#fff;color:#475569')+'">'+o.l+'</button>').join('')+'</div>';
  }
  function toggle(field,checked){ return '<button type="button" onclick="SPD.patch({'+field+':'+(!checked)+'})" style="position:relative;display:inline-flex;height:20px;width:36px;align-items:center;border-radius:999px;border:none;cursor:pointer;background:'+(checked?PRIMARY:'#cbd5e1')+'"><span style="display:inline-block;height:14px;width:14px;border-radius:999px;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,0.2);transform:translateX('+(checked?'19px':'3px')+')"></span></button>'; }
  function field(label,inner){ return '<div><label style="display:block;color:#334155;margin-bottom:4px;font-size:11px;text-transform:uppercase;letter-spacing:0.04em">'+label+'</label>'+inner+'</div>'; }
  function num(field_,v,min,max){ return '<input type="number" min="'+min+'" max="'+max+'" value="'+v+'" oninput="SPD.patch({'+field_+':'+'this.valueAsNumber})" style="'+INPUT+'"/>'; }

  function render(){
    if(!cur)return; const v=cur.values, kind=cur.kind;
    const modelOpts=MODELS.map(g=>'<optgroup label="'+g.group+'">'+g.items.map(m=>'<option value="'+m.id+'" '+(v.model===m.id?'selected':'')+'>'+m.label+'</option>').join('')+'</optgroup>').join('');
    let runOpts;
    if(kind==='broad'){
      runOpts='<section style="display:flex;flex-direction:column;gap:12px">'+
        field('Mode',pill('mode',[{v:'full',l:'Full'},{v:'queries_and_search',l:'Search'},{v:'queries_only',l:'Queries'}],v.mode))+
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+field('Max queries',num('maxQueries',v.maxQueries,1,30))+'<div><label style="display:block;color:#334155;margin-bottom:4px;font-size:11px;text-transform:uppercase">Stream</label>'+toggle('stream',v.stream)+'</div></div>'+
      '</section>';
    } else {
      runOpts='<section style="display:flex;flex-direction:column;gap:12px">'+
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+field('Max rounds',num('maxRounds',v.maxRounds,1,10))+field('Max tokens',num('maxTokens',v.maxTokens,0,200000))+'</div>'+
        field('Reasoning effort',pill('reasoningEffort',[{v:'none',l:'None'},{v:'low',l:'Low'},{v:'medium',l:'Medium'},{v:'high',l:'High'}],v.reasoningEffort))+
        field('Extra context','<textarea rows="3" oninput="SPD.patch({extraContext:this.value})" placeholder="Focus on post-2024 updates..." style="'+INPUT+';resize:none">'+esc(v.extraContext)+'</textarea>')+
        '<div style="display:flex;flex-direction:column;gap:8px;padding-top:4px">'+
          '<div class="flex items-center justify-between" style="gap:12px"><span style="font-size:12px;font-weight:500;color:#334155">Skip brief</span>'+toggle('skipBrief',v.skipBrief)+'</div>'+
          '<div class="flex items-center justify-between" style="gap:12px"><span style="font-size:12px;font-weight:500;color:#334155">Skip plan</span>'+toggle('skipPlan',v.skipPlan)+'</div>'+
          '<div class="flex items-center justify-between" style="gap:12px"><span style="font-size:12px;font-weight:500;color:#334155">Skip plan confirm</span>'+toggle('skipPlanConfirm',v.skipPlanConfirm)+'</div>'+
        '</div>'+
      '</section>';
    }
    let web='';
    if(cur.showWebSearch){
      web='<div style="margin-top:12px;display:flex;flex-direction:column;gap:12px">'+
        field('Max results',num('count',v.count,1,100))+
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+field('Time basis',pill('timeBasis',[{v:'auto',l:'Auto'},{v:'published',l:'Published'},{v:'crawled',l:'Crawled'}],v.timeBasis))+
          field('Date range','<select onchange="SPDquickRange(this.value)" style="'+INPUT+'"><option value="custom" '+(cur.quickRange==='custom'?'selected':'')+'>Custom range</option><option value="7d" '+(cur.quickRange==='7d'?'selected':'')+'>Past 7 days</option><option value="1m" '+(cur.quickRange==='1m'?'selected':'')+'>Past 1 month</option><option value="1y" '+(cur.quickRange==='1y'?'selected':'')+'>Past 1 year</option></select>')+'</div>'+
        (cur.quickRange==='custom'?'<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+field('Start time','<input type="datetime-local" value="'+v.startTime+'" oninput="SPD.patch({startTime:this.value})" style="'+INPUT+'"/>')+field('End time','<input type="datetime-local" value="'+v.endTime+'" oninput="SPD.patch({endTime:this.value})" style="'+INPUT+'"/>')+'</div>':'')+
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+field('Domain filters','<textarea rows="3" oninput="SPD.patch({includeDomains:this.value})" placeholder="e.g. octen.ai (one per line)" style="'+INPUT+';resize:none">'+esc(v.includeDomains)+'</textarea>')+field('Exclude domains','<textarea rows="3" oninput="SPD.patch({excludeDomains:this.value})" placeholder="e.g. octen.ai (one per line)" style="'+INPUT+';resize:none">'+esc(v.excludeDomains)+'</textarea>')+'</div>'+
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+field('Include text','<input value="'+esc(v.includeText)+'" oninput="SPD.patch({includeText:this.value})" placeholder="Phrase to include" style="'+INPUT+'"/>')+field('Exclude text','<input value="'+esc(v.excludeText)+'" oninput="SPD.patch({excludeText:this.value})" placeholder="Phrase to exclude" style="'+INPUT+'"/>')+'</div>'+
        '<div class="flex items-start justify-between" style="gap:12px;padding-top:4px"><div style="flex:1"><label class="flex items-center" style="gap:8px;font-size:12px;font-weight:500;color:#334155;cursor:pointer"><input type="checkbox" '+(v.highlightEnabled?'checked':'')+' onchange="SPD.patch({highlightEnabled:this.checked})" style="width:16px;height:16px;accent-color:'+PRIMARY+'"/> Return highlights</label><p style="color:#64748b;margin:4px 0 0 24px;font-size:11px">Extract query-relevant highlights.</p></div>'+(v.highlightEnabled?'<div><label style="display:block;color:#334155;margin-bottom:4px;font-size:11px;text-transform:uppercase">Max tokens</label><input type="number" min="100" max="20000" value="'+v.highlightTokens+'" oninput="SPD.patch({highlightTokens:'+'this.valueAsNumber})" style="width:112px;padding:6px 10px;border:1px solid #e2e8f0;border-radius:6px;font-size:12px;outline:none"/></div>':'')+'</div>'+
        '<div class="flex items-start justify-between" style="gap:12px"><div style="flex:1"><label class="flex items-center" style="gap:8px;font-size:12px;font-weight:500;color:#334155;cursor:pointer"><input type="checkbox" '+(v.fullContentEnabled?'checked':'')+' onchange="SPD.patch({fullContentEnabled:this.checked})" style="width:16px;height:16px;accent-color:'+PRIMARY+'"/> Return full content</label><p style="color:#64748b;margin:4px 0 0 24px;font-size:11px">Billed via full_content_max_tokens.</p></div>'+(v.fullContentEnabled?'<div><label style="display:block;color:#334155;margin-bottom:4px;font-size:11px;text-transform:uppercase">Max tokens</label><input type="number" min="100" max="100000" value="'+v.fullContentTokens+'" oninput="SPD.patch({fullContentTokens:'+'this.valueAsNumber})" style="width:112px;padding:6px 10px;border:1px solid #e2e8f0;border-radius:6px;font-size:12px;outline:none"/></div>':'')+'</div>'+
        field('Safesearch','<select onchange="SPD.patch({safesearch:this.value})" style="'+INPUT+'"><option value="off" '+(v.safesearch==='off'?'selected':'')+'>off</option><option value="strict" '+(v.safesearch==='strict'?'selected':'')+'>strict</option></select>')+
      '</div>';
    }
    ov().innerHTML='<div onclick="SPD.close()" style="position:absolute;inset:0;background:rgba(15,23,42,0.12)"></div>'+
      '<aside style="position:absolute;top:0;right:0;height:100%;width:420px;max-width:100vw;background:#fff;border-left:1px solid #e2e8f0;box-shadow:-8px 0 24px rgba(0,0,0,0.1);display:flex;flex-direction:column">'+
        '<div class="shrink-0 flex items-center" style="gap:6px;padding:12px 16px;border-bottom:1px solid #f1f5f9"><div style="flex:1;min-width:0"><h2 style="color:#1e293b;font-size:14px;font-weight:600;margin:0">Run settings</h2><p style="color:#94a3b8;margin:2px 0 0;font-size:11px">'+(kind==='broad'?'POST /v1/broad-search':'POST /v1/deep-research')+'</p></div>'+
          '<button type="button" onclick="SPDreset()" class="inline-flex items-center" style="padding:6px 10px;border:1px solid #e2e8f0;color:#64748b;border-radius:6px;font-size:12px;background:#fff;cursor:pointer"><svg style="width:14px;height:14px;margin-right:4px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M1 4v6h6M23 20v-6h-6"/><path stroke-linecap="round" stroke-linejoin="round" d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>Reset</button>'+
          '<button type="button" onclick="SPD.close()" style="padding:6px;border:none;background:none;border-radius:6px;color:#94a3b8;cursor:pointer"><svg style="width:16px;height:16px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>'+
        '</div>'+
        '<div style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:16px">'+
          '<section><label style="display:block;color:#1e293b;font-size:14px;font-weight:500;margin-bottom:6px">Model<span style="color:#ef4444;margin-left:2px">*</span></label><select onchange="SPD.patch({model:this.value})" style="'+INPUT+'">'+modelOpts+'</select></section>'+
          '<div style="border-top:1px solid #f1f5f9"></div>'+runOpts+'<div style="border-top:1px solid #f1f5f9"></div>'+
          '<section><button type="button" onclick="SPDtoggleWeb()" class="flex items-center justify-between" style="width:100%;padding:4px 8px;margin:0 -8px;border:none;background:none;border-radius:6px;cursor:pointer"><h3 style="color:#1e293b;font-size:14px;font-weight:500;margin:0">Web Search</h3><span style="display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:6px;background:#f1f5f9"><svg style="width:16px;height:16px;color:#475569;transform:'+(cur.showWebSearch?'rotate(180deg)':'')+'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg></span></button>'+web+'</section>'+
        '</div>'+
      '</aside>';
  }
  window.SPDtoggleWeb=function(){ cur.showWebSearch=!cur.showWebSearch; render(); };
  window.SPDreset=function(){ const d=cur.kind==='broad'?BROAD_DEFAULTS:DEEP_DEFAULTS; cur.values=Object.assign({},d); if(cur.onChange)cur.onChange(cur.values); render(); };
  window.SPDquickRange=function(r){ cur.quickRange=r; if(r!=='custom'){ const now=new Date(); const end=now.toISOString().slice(0,16); const start=new Date(now); if(r==='7d')start.setDate(start.getDate()-7); else if(r==='1m')start.setMonth(start.getMonth()-1); else if(r==='1y')start.setFullYear(start.getFullYear()-1); patch({startTime:start.toISOString().slice(0,16),endTime:end}); } else render(); };
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&cur)SPD.close(); });
})();