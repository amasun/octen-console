(function(){
  const PRIMARY = 'var(--color-accent)', PRIMARY_BG='#0398551a';
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

window.DR_DATA = (function(){
  const mkR=(q,lat,res)=>({query:q,latency:lat,results:res.map(x=>({url:x[0],title:x[1]}))});
  const ROUNDS=[
    { id:1, focus:'Initial Research', totalResults:50, maxLatency:73, queries:[
      mkR('What is the current state of frontier AI models in 2026?',68,[['openai.com/blog/gpt-4o-benchmarks-2026','GPT-4o Benchmark Results & Performance Analysis'],['anthropic.com/news/claude-4-family','Introducing the Claude 4 Model Family'],['blog.google/gemini-2-5-pro-launch','Gemini 2.5 Pro: Next Generation AI Capabilities']]),
      mkR('AI model company overview and market positions 2026',72,[['openai.com/about','About OpenAI — Mission & Research'],['anthropic.com/company','Anthropic — AI Safety Company'],['deepmind.google/about','Google DeepMind — Pioneering AI Research']]),
      mkR('frontier AI models latest news and releases 2026',65,[['techcrunch.com/2026/frontier-ai-models-comparison','Frontier AI Models Compared: Who Leads in 2026?'],['theverge.com/2026/3/ai-models-roundup','March 2026 AI Roundup'],['arstechnica.com/ai/2026/claude-4-gpt-5-comparison','Claude 4 vs GPT-5: Head-to-Head Comparison']]),
      mkR('AI model capabilities benchmarks MMLU GPQA SWE-bench 2026',71,[['huggingface.co/spaces/open-llm-leaderboard','Open LLM Leaderboard — Hugging Face'],['paperswithcode.com/sota','State-of-the-Art AI Results'],['lmsys.org/chatbot-arena-leaderboard','Chatbot Arena Leaderboard — LMSYS']]),
      mkR('open source LLM models progress Llama Mistral 2026',63,[['ai.meta.com/blog/llama-4','Introducing Llama 4: Open Foundation Models'],['mistral.ai/news/mistral-large-2','Mistral Large 2: Enterprise-Grade Open Model'],['qwenlm.github.io/blog/qwen2.5','Qwen 2.5: Multilingual Open-Weight LLM']]),
      mkR('AI industry market trends enterprise adoption 2026',69,[['mckinsey.com/ai-enterprise-adoption-2026','Enterprise AI Adoption Trends — McKinsey'],['statista.com/ai-market-size-2026','AI Market Size & Growth Forecast 2026']]),
      mkR('Claude 4 model family features pricing context window',67,[['anthropic.com/claude-4-pricing','Claude 4 Pricing & Model Tiers'],['anthropic.com/news/claude-4-opus','Claude 4 Opus: Extended Thinking & Reasoning']]),
      mkR('GPT-5 multimodal capabilities and architecture',72,[['openai.com/gpt-5-multimodal','GPT-5: Vision, Audio & Code Integration'],['techcrunch.com/2026/gpt-5-review','GPT-5 Review: The Most Versatile AI Model']]),
      mkR('Gemini 2.5 Pro technical specifications context length',64,[['blog.google/gemini-2-5-specs','Gemini 2.5 Pro: 2M Token Context'],['arxiv.org/abs/2026.gemini-technical','Gemini 2.5: Technical Report']]),
      mkR('AI safety alignment research progress 2026',66,[['anthropic.com/research/alignment-2026','Advances in AI Alignment — Anthropic Research'],['openai.com/safety/alignment-plan','OpenAI Alignment Plan 2026']]),
      mkR('frontier model training cost compute requirements',70,[['semianalysis.com/training-costs-2026','The $500M Model: Training Cost Analysis 2026'],['epochai.org/compute-trends','Compute Trends in AI Training — Epoch AI']]),
      mkR('AI regulation governance EU AI Act executive order',62,[['whitehouse.gov/ai-executive-order-2026','Executive Order on AI Safety 2026'],['europarl.europa.eu/ai-act-update','EU AI Act: Implementation Progress']]),
      mkR('AI agent frameworks tooling autonomous agents 2026',68,[['langchain.com/agents-v3','LangChain Agents v3'],['anthropic.com/claude-agent-sdk','Claude Agent SDK: Build Autonomous Agents']]),
      mkR('retrieval augmented generation RAG advances 2026',65,[['pinecone.io/blog/rag-2026','RAG in 2026: Beyond Naive Retrieval'],['arxiv.org/abs/2026.adaptive-rag','Adaptive RAG: Dynamic Retrieval Strategies']]),
      mkR('AI chip hardware NVIDIA Blackwell AMD landscape',67,[['nvidia.com/blackwell-b300','NVIDIA Blackwell B300'],['semianalysis.com/ai-chip-landscape','AI Chip Landscape 2026']]),
      mkR('multimodal AI applications real-world use cases 2026',66,[['a16z.com/multimodal-ai-apps','Multimodal AI: Top 50 Applications in 2026'],['sequoiacap.com/ai-use-cases','Sequoia: Where AI Creates Real Value']]),
    ]},
    { id:2, focus:'Performance Comparison & Cost Analysis', totalResults:21, maxLatency:72, queries:[
      mkR('GPT-5 vs Claude 4 vs Gemini detailed task performance comparison',69,[['artificialanalysis.ai/leaderboard/2026','AI Model Performance Leaderboard 2026'],['scale.com/leaderboard','Scale AI: Enterprise LLM Evaluation Results'],['arxiv.org/abs/2026.frontier-comparison','Comparative Analysis of Frontier Language Models']]),
      mkR('AI model pricing cost per token comparison enterprise 2026',65,[['together.ai/pricing-comparison','LLM API Pricing: Complete Comparison Guide 2026'],['openrouter.ai/models','OpenRouter: Compare 200+ Model Prices']]),
      mkR('Chinese AI models Kimi DeepSeek MiMo performance 2026',71,[['technode.com/2026/china-ai-models','China AI Landscape'],['moonshot.ai/kimi-k2-benchmarks','Kimi K2.5: Benchmark Results'],['deepseek.com/v3-technical-report','DeepSeek V3.2 Technical Report']]),
      mkR('AI model coding task benchmark SWE-bench results',68,[['swebench.com/leaderboard','SWE-bench Verified: Latest Results'],['arxiv.org/abs/2026.coding-benchmark-meta','Meta-Analysis of Coding Benchmarks']]),
      mkR('AI model reasoning mathematical AIME GPQA results 2026',64,[['mathai.org/aime-results-2026','AIME 2026: AI Model Performance'],['openai.com/research/math-reasoning','Advances in Mathematical Reasoning']]),
      mkR('enterprise AI total cost of ownership ROI analysis',72,[['gartner.com/ai-tco-framework','AI TCO Framework — Gartner'],['deloitte.com/ai-roi-report-2026','Measuring AI ROI in 2026 — Deloitte']]),
      mkR('open weight vs proprietary model cost effectiveness',70,[['a16z.com/open-vs-closed-ai-economics','Open vs Closed AI: The Economics in 2026'],['huggingface.co/blog/open-model-value','The Business Case for Open-Weight Models']]),
    ]},
  ];
  const REPORT=`## Executive Summary\n\nThe frontier AI landscape in 2026 is defined by intense competition among leading labs. GPT-5.4, Claude Opus 4.6, and Gemini 3.1 Pro lead proprietary models, while Kimi K2.5, DeepSeek V3.2, and Llama 4 represent strong open-weight alternatives. Performance gaps are narrowing across coding, reasoning, and multimodal tasks.\n\n## Key Findings\n\n### Leading Proprietary Models\n\n- **GPT-5.4 (OpenAI)**: Multimodal reasoning with 1M+ token context, scoring GPQA 92.8% and SWE-bench 74.9%.\n- **Claude Opus 4.6 (Anthropic)**: Adaptive thinking with natural prose quality, GPQA 91.3% and SWE-bench 74%+.\n- **Gemini 3.1 Pro (Google)**: Industry-leading GPQA at 94.3% with native multimodality and 2M+ token context.\n\n### Open-Weight Contenders\n\n- **Kimi K2.5 (Moonshot)**: Exceptional math/reasoning with AIME 96.1% and SWE-bench 76.8%.\n- **DeepSeek V3.2**: Cost-effective enterprise option with competitive MMLU-Pro scores.\n- **Llama 4 (Meta)**: Most widely adopted open foundation model.\n\n### Market Trends\n\n- Enterprise AI adoption reached 72% among Fortune 500 companies\n- NVIDIA Blackwell B300 leads the hardware landscape\n- Regulatory frameworks are maturing with the EU AI Act entering enforcement\n\n## Conclusion\n\nThe frontier AI market in 2026 is the most competitive it has ever been. No single model dominates across all categories. Organizations should adopt a multi-model strategy.\n\n## References\n\n1. [GPT-4o Benchmark Results](https://openai.com/blog/gpt-4o-benchmarks-2026)\n2. [Claude 4 Model Family](https://anthropic.com/news/claude-4-family)\n3. [Gemini 2.5 Pro Launch](https://blog.google/gemini-2-5-pro-launch)\n`;
  const PLAN={ type:'plan', title:'Frontier AI Models in 2026: Competitive Landscape Assessment', overview:'This research evaluates the current state of frontier AI from three angles: (1) technical capabilities and benchmark performance; (2) market dynamics and enterprise adoption; (3) the open-source and Chinese AI ecosystem.', angles:[
    {focus:'Technical capabilities & benchmarks',focus_desc:'Compare frontier model performance across reasoning, coding, multimodal, and general knowledge benchmarks',queries:['frontier AI model benchmark comparison GPQA SWE-bench AIME 2026','Claude 4 vs GPT-5 vs Gemini 2.5 performance comparison','multimodal capabilities context window analysis 2026','AI model reasoning mathematical benchmark results 2026']},
    {focus:'Market & cost analysis',focus_desc:'Analyze enterprise AI adoption trends, API pricing, and total cost of ownership across major providers',queries:['enterprise AI adoption rates market trends 2026','AI model API pricing cost per token comparison','enterprise AI total cost of ownership ROI analysis','AI model throughput tokens per second latency comparison']},
    {focus:'Open-source & Chinese AI ecosystem',focus_desc:'Evaluate the progress of open-weight models and Chinese AI labs',queries:['open source LLM models progress Llama Mistral 2026','Chinese AI models Kimi DeepSeek performance 2026','open-weight model enterprise deployment viability','China AI chip constraints algorithmic efficiency gains']},
  ]};
  const ANALYSIS=[
    {type:'analysis',round:1,should_continue:true,findings:['The initial round has provided a broad overview of frontier AI models, key players, benchmarks, and market trends in 2026.','Benchmark results show Claude 4 Opus leading on reasoning tasks, while GPT-5 maintains advantages in multimodal and coding benchmarks.','Open-weight models (Llama 4, Mistral Large 2, Qwen 2.5) are closing the gap with proprietary models.'],follow_up_suggestions:['Detailed performance comparison across specific task categories','Cost-efficiency analysis for enterprise deployment','Emerging Chinese AI models beyond Qwen']},
    {type:'analysis',round:2,should_continue:false,findings:['Performance comparisons reveal a converging landscape: top-tier models differ by single-digit percentages on most benchmarks.','Enterprise TCO analysis shows open-weight models can reduce costs by 40-60% compared to proprietary APIs.','Chinese AI models (Kimi K2.5, DeepSeek V3.2) have reached competitive performance with Western frontier models.','The pricing war among API providers has driven costs down by roughly 70% year-over-year.'],follow_up_suggestions:[]},
  ];
  const BRIEF={ type:'brief', report_type:'evaluation', suggested_title:'Frontier AI Models in 2026: Competitive Landscape, Benchmark Analysis & Enterprise Adoption Trends', outline:[
    {section_title:'Converging Capabilities: The Benchmark Landscape',thesis:'Top-tier frontier models have converged in general capability, with differentiation shifting to specialized task performance.',evidence:[{content:'Claude 4 Opus, GPT-5, and Gemini 2.5 Pro score within 3% of each other on MMLU and HumanEval.',source_indices:[1,3,7],confidence:'strong'},{content:'Reasoning benchmarks (GPQA, AIME) show the most variance, with Claude 4 Opus leading by 8-12 points.',source_indices:[3,12],confidence:'strong'}]},
    {section_title:'The Open-Weight Revolution',thesis:'Open-weight models have crossed the viability threshold for enterprise deployment.',evidence:[{content:'Llama 4 and Mistral Large 2 achieve 90-95% of proprietary model performance at a fraction of the cost.',source_indices:[5,8],confidence:'strong'},{content:'Enterprise adoption of open-weight models doubled in H1 2026.',source_indices:[14],confidence:'moderate'}]},
    {section_title:'China’s AI Ascent: A Parallel Ecosystem',thesis:'Chinese AI labs have established a competitive parallel ecosystem.',evidence:[{content:'DeepSeek V3.2 and Kimi K2.5 demonstrate parity with GPT-5 on multilingual reasoning and coding.',source_indices:[21,23],confidence:'strong'}]},
  ], unresolved:{ contradictions:['Conflicting benchmark results between independent evaluators and providers’ self-reported scores.'], weak_claims:['Claims about Chinese models matching Western frontier performance are based primarily on standardized benchmarks.'], unanswered:['Long-term sustainability of aggressive API pricing strategies.','Impact of upcoming EU AI Act enforcement on model deployment.'] }, references:[
    {index:1,url:'https://openai.com/blog/gpt-4o-benchmarks-2026',title:'GPT-4o Benchmark Results & Performance Analysis'},
    {index:3,url:'https://blog.google/gemini-2-5-pro-launch',title:'Gemini 2.5 Pro: Next Generation AI Capabilities'},
    {index:5,url:'https://ai.meta.com/blog/llama-4',title:'Introducing Llama 4: Open Foundation Models'},
    {index:7,url:'https://huggingface.co/spaces/open-llm-leaderboard',title:'Open LLM Leaderboard — Hugging Face'},
    {index:8,url:'https://mistral.ai/news/mistral-large-2',title:'Mistral Large 2: Enterprise-Grade Open Model'},
    {index:12,url:'https://lmsys.org/chatbot-arena-leaderboard',title:'Chatbot Arena Leaderboard — LMSYS'},
    {index:14,url:'https://mckinsey.com/ai-enterprise-adoption-2026',title:'Enterprise AI Adoption Trends — McKinsey'},
    {index:21,url:'https://moonshot.ai/kimi-k2-benchmarks',title:'Kimi K2.5: Benchmark Results & Analysis'},
    {index:23,url:'https://deepseek.com/v3-technical-report',title:'DeepSeek V3.2 Technical Report'},
  ]};
  const HISTORY=[
    {id:'s1',q:'Latest breakthroughs in quantum computing 2026'},
    {id:'s2',q:'Compare top JavaScript frameworks performance'},
    {id:'s3',q:'What is the impact of EU AI Act on startups?'},
    {id:'s4',q:'Best practices for RAG implementation in production'},
    {id:'s5',q:'NVIDIA Blackwell B300 specs and availability'},
    {id:'s6',q:'How to fine-tune LLMs with limited compute budget'},
    {id:'s7',q:'AI safety alignment research landscape 2026'},
    {id:'s8',q:'Best open-source alternatives to GPT-5'},
    {id:'s9',q:'Enterprise AI deployment cost optimization strategies'},
    {id:'s10',q:'What happened at GTC 2026 keynote?'},
  ].map((s,i)=>({id:s.id,turns:[{query:s.q,timestamp:Date.now()-86400000*(7-i*0.6)}],createdAt:Date.now()-86400000*(7-i*0.6)}));
  return { ROUNDS, REPORT, PLAN, ANALYSIS, BRIEF, HISTORY };
})();
