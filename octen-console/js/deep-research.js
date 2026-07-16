(function(){
  const PRIMARY = 'var(--color-accent)';
  const $=id=>document.getElementById(id);
  function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  const EXAMPLES=['What are AI agents actually being used for in production?','NVIDIA vs AMD stock performance','What are the most promising AI startups to watch right now?'];
  const SUBQ_SRC=[
    ['What is the current state of frontier AI models in 2026?',[['openai.com/blog/gpt-4o-benchmarks-2026','GPT-4o Benchmark Results & Performance Analysis'],['anthropic.com/news/claude-4-family','Introducing the Claude 4 Model Family'],['blog.google/gemini-2-5-pro-launch','Gemini 2.5 Pro: Next Generation AI Capabilities']]],
    ['AI model company overview category:company',[['openai.com/about','About OpenAI é?Mission & Research'],['anthropic.com/company','Anthropic é?AI Safety Company'],['deepmind.google/about','Google DeepMind é?Pioneering AI Research']]],
    ['frontier AI models latest news 2026',[['techcrunch.com/2026/frontier-ai-models-comparison','Frontier AI Models Compared: Who Leads in 2026?'],['theverge.com/2026/3/ai-models-roundup','March 2026 AI Roundup'],['arstechnica.com/ai/2026/claude-4-gpt-5-comparison','Claude 4 vs GPT-5: Head-to-Head Comparison']]],
    ['AI model capabilities and benchmarks comparison',[['huggingface.co/spaces/open-llm-leaderboard','Open LLM Leaderboard é?Hugging Face'],['paperswithcode.com/sota','State-of-the-Art AI Results'],['lmsys.org/chatbot-arena-leaderboard','Chatbot Arena Leaderboard é?LMSYS']]],
    ['open source LLM models progress 2026',[['ai.meta.com/blog/llama-4','Introducing Llama 4: Open Foundation Models'],['mistral.ai/news/mistral-large-2','Mistral Large 2: Enterprise-Grade Open Model'],['qwenlm.github.io/blog/qwen2.5','Qwen 2.5: Multilingual Open-Weight LLM']]],
    ['AI industry market trends and adoption 2026',[['mckinsey.com/ai-enterprise-adoption-2026','Enterprise AI Adoption Trends é?McKinsey'],['statista.com/ai-market-size-2026','AI Market Size & Growth Forecast 2026']]],
    ['Claude 4 model family features and pricing',[['anthropic.com/claude-4-pricing','Claude 4 Pricing & Model Tiers'],['anthropic.com/news/claude-4-opus','Claude 4 Opus: Extended Thinking & Reasoning']]],
    ['GPT-4o multimodal capabilities 2026',[['openai.com/gpt-4o-multimodal','GPT-4o Multimodal: Vision, Audio & Code'],['techcrunch.com/2026/gpt-4o-review','GPT-4o Review: The Most Versatile AI Model']]],
    ['Gemini 2.5 Pro technical specifications',[['blog.google/gemini-2-5-specs','Gemini 2.5 Pro: 2M Token Context'],['arxiv.org/abs/2026.gemini-technical','Gemini 2.5: Technical Report']]],
    ['AI safety and alignment research 2026',[['anthropic.com/research/alignment-2026','Advances in AI Alignment'],['openai.com/safety/alignment-plan','OpenAI Alignment Plan 2026']]],
    ['frontier model training cost estimates',[['semianalysis.com/training-costs-2026','The $500M Model: Training Cost Analysis'],['epochai.org/compute-trends','Compute Trends in AI Training']]],
    ['AI regulation and governance updates',[['whitehouse.gov/ai-executive-order-2026','Executive Order on AI Safety 2026'],['europarl.europa.eu/ai-act-update','EU AI Act: Implementation Progress']]],
    ['LLM inference optimization techniques',[['arxiv.org/abs/2026.speculative-decoding','Speculative Decoding at Scale'],['together.ai/blog/inference-optimization','LLM Inference: From 100ms to 10ms']]],
    ['AI agent frameworks and tooling 2026',[['langchain.com/agents-v3','LangChain Agents v3'],['anthropic.com/claude-agent-sdk','Claude Agent SDK']]],
    ['retrieval augmented generation RAG advances',[['pinecone.io/blog/rag-2026','RAG in 2026: Beyond Naive Retrieval'],['arxiv.org/abs/2026.adaptive-rag','Adaptive RAG']]],
    ['AI chip and hardware landscape',[['nvidia.com/blackwell-b300','NVIDIA Blackwell B300'],['semianalysis.com/ai-chip-landscape','AI Chip Landscape 2026']]],
    ['synthetic data for model training',[['arxiv.org/abs/2026.synthetic-data-survey','Synthetic Data Survey'],['scale.com/synthetic-data-platform','Scale AI Synthetic Data Platform']]],
    ['AI model evaluation and red teaming',[['metr.org/evaluations-2026','METR: Frontier Model Evaluations 2026'],['nist.gov/ai-risk-framework','NIST AI Risk Management Framework']]],
    ['enterprise AI deployment patterns',[['aws.amazon.com/bedrock-patterns','AWS Bedrock: Enterprise AI Deployment'],['azure.microsoft.com/ai-studio','Azure AI Studio']]],
    ['multimodal AI applications and use cases',[['a16z.com/multimodal-ai-apps','Multimodal AI: Top 50 Applications'],['sequoiacap.com/ai-use-cases','Sequoia: Where AI Creates Real Value']]],
  ];
  let _si=0; const SUBQ=SUBQ_SRC.map(s=>({query:s[0],results:s[1].map(r=>({id:++_si,url:r[0],title:r[1]}))}));
  const LAT=[71,72,71,67,67,63,72,69,68,67,75,62,60,65,63,63,62,69,65,69];
  const TABLE=[
    {model:'GPT-5.4 (OpenAI)',capabilities:'Multimodal reasoning, 1M+ token context, autonomous coding, agentic workflows',date:'March 2026',benchmarks:'GPQA 92.8%, SWE-bench 74.9%, Terminal-Bench 77.3%',refs:[[6,'teamai.com'],[8,'gurusup.com'],[9,'thinkaicorp.com'],[11,'linkedin.com'],[4,'attainmentlabs.com']]},
    {model:'Claude Opus 4.6 (Anthropic)',capabilities:'Adaptive thinking, natural prose, agentic tasks, 1M context',date:'Feb 2026',benchmarks:'GPQA 91.3%, SWE-bench 74%+, ARC-AGI-2 68.8%',refs:[[6,'teamai.com'],[8,'gurusup.com'],[9,'thinkaicorp.com'],[13,'niobond.com'],[4,'attainmentlabs.com']]},
    {model:'Gemini 3.1 Pro (Google)',capabilities:'Native multimodality, long-context research, reasoning',date:'March 2026',benchmarks:'GPQA 94.3%, ARC-AGI-2 77.1%, 1M+ context',refs:[[6,'teamai.com'],[9,'thinkaicorp.com'],[11,'linkedin.com'],[5,'meta-intelligence.tech']]},
    {model:'Grok 4.1 (xAI)',capabilities:'Multi-agent architecture, coding, real-time data integration',date:'Nov 2025 (updated 2026)',benchmarks:'SWE-bench 75%, fast inference 118 t/s',refs:[[6,'teamai.com'],[8,'gurusup.com'],[9,'thinkaicorp.com'],[13,'niobond.com']]},
    {model:'Kimi K2.5 (Moonshot)',capabilities:'Open-weight math/reasoning, coding, 256k context',date:'Jan 2026',benchmarks:'AIME 96.1%, GPQA 87.6%, SWE-bench 76.8%',refs:[[9,'thinkaicorp.com'],[26,'awesomeagents.ai'],[6,'teamai.com'],[13,'niobond.com']]},
    {model:'Mistral Small 4 (Mistral AI)',capabilities:'MoE multimodal, reasoning, 256k context, open-weight',date:'March 2026',benchmarks:'AA LCR 0.72, LiveCodeBench high, efficient outputs',refs:[[14,'marktechpost.com'],[15,'mistral.ai'],[11,'linkedin.com'],[6,'teamai.com']]},
    {model:'DeepSeek V3.2 (DeepSeek)',capabilities:'Open-source coding/math, cost-effective, enterprise tasks',date:'Dec 2025 (updated 2026)',benchmarks:'MMLU-Pro high, SWE-bench competitive',refs:[[9,'thinkaicorp.com'],[6,'teamai.com'],[8,'gurusup.com'],[4,'attainmentlabs.com']]},
    {model:'Nemotron 3 Super (NVIDIA)',capabilities:'MoE agentic AI, high throughput, open weights',date:'March 2026',benchmarks:'DeepResearch Bench #1, 5x throughput gains',refs:[[27,'blogs.nvidia.com'],[11,'linkedin.com'],[6,'teamai.com']]},
    {model:'Qwen 3.5 Small (Alibaba)',capabilities:'Local deployment, efficient small model, 262k context',date:'March 2026',benchmarks:'Matches frontier on select tasks, runs on 4GB RAM',refs:[[1,'blogarama.com'],[6,'teamai.com'],[11,'linkedin.com']]},
    {model:'MiMo-V2 (Xiaomi)',capabilities:'Multimodal, trillion params, China ecosystem focus',date:'March 2026',benchmarks:'Strong in text/vision/audio integration',refs:[[2,'seriousinsights.net'],[6,'teamai.com'],[11,'linkedin.com']]},
  ];
  const HISTORY=['Latest breakthroughs in quantum computing 2026','Compare top JavaScript frameworks performance','What is the impact of EU AI Act on startups?','Best practices for RAG implementation in production','NVIDIA Blackwell B300 specs and availability','How to fine-tune LLMs with limited compute budget','Tesla Optimus robot latest updates and demos','Best open-source alternatives to GPT-5','Kubernetes vs serverless for AI inference workloads','What happened at GTC 2026 keynote?','Anthropic Claude Agent SDK tutorial and examples','Comparison of vector databases for production RAG','Apple Intelligence features in iOS 20','How does speculative decoding work in LLMs?','Top AI research papers from ICML 2026','Sam Altman latest interview key takeaways','Rust vs Go for building AI infrastructure','What is mixture of experts architecture?','AI chip market share NVIDIA AMD Intel custom','How to deploy Claude in enterprise environments'].map((q,i)=>({id:'s'+(i+1),turns:[{query:q,timestamp:Date.now()-3600000*(20-i)}]}));
  const DELAY_SOURCES=1400, DELAY_CONTENT=2000;

  const S={ query:'', phase:'idle', expandedSubQuery:null, elapsed:0, sessionTurns:[], currentTurnIndex:0, sessions:HISTORY.slice(), historyOpen:false, historyPage:0, copied:false, linkCopied:false, parameters:Object.assign({},window.SPD_BROAD_DEFAULTS) };
  let startT=0, timer=null, tos=[];
  function clearAll(){ tos.forEach(clearTimeout); tos=[]; if(timer){clearInterval(timer);timer=null;} }
  const activeQuery=()=> (S.sessionTurns[S.currentTurnIndex]&&S.sessionTurns[S.currentTurnIndex].query)||'';
  const visSubQ=()=> SUBQ.slice(0,S.parameters.maxQueries);

  const ICON={ spin:'<svg style="width:16px;height:16px;color:#94a3b8;animation:spin 1s linear infinite" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M21 12a9 9 0 11-6.219-8.56"/></svg>',
    globe:'<svg style="width:16px;height:16px;color:#94a3b8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>',
    chevD:'<svg style="width:14px;height:14px;color:#cbd5e1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>',
    chevU:'<svg style="width:14px;height:14px;color:#cbd5e1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>',
    check:'<svg style="width:14px;height:14px;color:'+PRIMARY+'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' };
  function refBadges(refs){ return '<span class="inline-flex items-center" style="gap:2px;margin-left:4px">'+refs.map(r=>'<a href="https://'+r[1]+'" target="_blank" rel="noopener noreferrer" title="'+r[1]+'" style="font-size:10px;color:#3b82f6"><sup>['+r[0]+']</sup></a>').join('')+'</span>'; }

  function historyDrop(){
    if(!S.historyOpen)return''; const pages=Math.ceil(S.sessions.length/10);
    let inner;
    if(!S.sessions.length){ inner='<div style="padding:24px 16px;text-align:center;font-size:11px;color:#94a3b8">No history yet</div>'; }
    else { inner=S.sessions.slice(S.historyPage*10,S.historyPage*10+10).map(s=>'<div onclick="bsLoad(\''+s.id+'\')" class="flex items-center" style="gap:12px;cursor:pointer;padding:10px 16px"><span class="shrink-0" style="width:8px;height:8px;border-radius:999px;border:1px solid #e2e8f0"></span><span class="truncate" style="flex:1;font-size:11px;color:#64748b">'+esc(s.turns[0].query)+'</span><button onclick="event.stopPropagation();bsDel(\''+s.id+'\')" class="shrink-0" style="padding:4px;border:none;background:none;color:#cbd5e1;cursor:pointer"><svg style="width:12px;height:12px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button></div>').join('');
      if(S.sessions.length>10){ inner+='<div class="flex items-center justify-center" style="gap:8px;padding:8px 16px;border-top:1px solid #f1f5f9"><button onclick="bsHistPage(-1)" style="padding:4px;border:none;background:none;cursor:pointer;color:'+(S.historyPage===0?'#cbd5e1':'#64748b')+'">é?/button><span style="font-size:11px;color:#94a3b8">'+(S.historyPage+1)+' / '+pages+'</span><button onclick="bsHistPage(1)" style="padding:4px;border:none;background:none;cursor:pointer;color:'+(S.historyPage>=pages-1?'#cbd5e1':'#64748b')+'">é?/button></div>'; }
    }
    return '<div style="position:absolute;top:100%;right:0;margin-top:8px;width:300px;z-index:50;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.12)"><div style="padding:12px 16px;border-bottom:1px solid #f1f5f9"><span style="font-size:14px;font-weight:600;color:#334155">History</span></div><div style="padding:8px 0">'+inner+'</div></div>';
  }

  function render(){ const root=$('bs-root'); if(!root)return; if(S.phase==='idle'){ root.innerHTML=renderHero(); bindHero(); } else { root.innerHTML=renderResults(); } }
  function renderHero(){
    return '<div style="position:relative;width:100%;height:100%;overflow:hidden;background:#fbfcfb">'+
      '<div style="position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 48% 57%, rgba(3,152,85,0.14) 0%, rgba(238,247,239,0.88) 23%, rgba(246,239,213,0.74) 42%, rgba(255,255,255,0.96) 67%)"></div>'+
      '<div style="position:absolute;right:24px;top:20px;z-index:20"><div class="flex items-center" style="gap:8px">'+
        '<button onclick="bsSettings()" title="Run settings" style="display:flex;height:36px;width:36px;align-items:center;justify-content:center;border-radius:12px;border:1px solid #e2e8f0;background:rgba(255,255,255,0.8);color:#64748b;cursor:pointer"><svg style="width:16px;height:16px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg></button>'+
        '<div style="position:relative"><button onclick="bsToggleHistory()" class="flex items-center" style="gap:6px;padding:8px 12px;font-size:12px;font-weight:500;color:#475569;border-radius:12px;border:1px solid #e2e8f0;background:rgba(255,255,255,0.8);cursor:pointer"><svg style="width:14px;height:14px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M3 3v5h5M3.05 13A9 9 0 106 5.3L3 8"/><path d="M12 7v5l4 2"/></svg> History</button>'+historyDrop()+'</div>'+
      '</div></div>'+
      '<div style="position:relative;z-index:10;display:flex;height:100%;flex-direction:column;align-items:center;padding-top:92px">'+
        '<div style="position:relative;display:flex;align-items:center;justify-content:center;width:139px;height:139px;margin-bottom:37px"><div style="position:absolute;inset:0;border-radius:999px;border:1px solid rgba(3,152,85,0.35);background:rgba(255,255,255,0.35);box-shadow:0 18px 60px rgba(3,152,85,0.14)"></div><div style="position:absolute;inset:6px;border-radius:999px;border:1px dotted rgba(3,152,85,0.35);animation:spin 18s linear infinite"></div><div style="position:absolute;inset:31px;border-radius:999px;background:rgba(255,255,255,0.55)"></div><svg style="position:relative;width:44px;height:44px;color:'+PRIMARY+'" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><circle cx="12" cy="3" r="2"/><circle cx="12" cy="21" r="2"/><circle cx="3" cy="12" r="2"/><circle cx="21" cy="12" r="2"/></svg></div>'+
        '<h1 style="text-align:center;font-family:Georgia,serif;font-weight:400;font-size:36px;line-height:40px;color:#0f172b">Experience the <span style="color:'+PRIMARY+';font-weight:600">Answer</span></h1>'+
        '<div style="width:100%;max-width:640px;min-height:112px;margin-top:30px;border-radius:18px;border:1px solid rgba(226,232,240,0.8);background:rgba(255,255,255,0.88);box-shadow:0 16px 44px rgba(15,23,42,0.08)"><div class="flex items-start" style="gap:12px;padding:12px">'+ICON.globe+'<textarea id="bs-hero-input" rows="1" placeholder="How can I help you?" style="flex:1;resize:none;border:0;background:transparent;color:#1e293b;outline:none;min-height:48px;max-height:88px;font-size:16px;line-height:24px">'+esc(S.query)+'</textarea><button id="bs-hero-send" onclick="bsSubmitHero()" style="display:flex;flex-shrink:0;align-items:center;justify-content:center;border-radius:999px;color:#fff;width:52px;height:36px;margin-top:52px;border:none;cursor:pointer;background:'+(S.query.trim()?'linear-gradient(135deg,#039855 0%,#d0b861 100%)':'#cbd5e1')+'"><svg style="width:16px;height:16px;transform:rotate(45deg)" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg></button></div></div>'+
        '<div style="width:100%;max-width:640px;margin-top:20px"><div style="display:flex;flex-direction:column;gap:10px">'+EXAMPLES.map(e=>'<button onclick="bsSubmit(this.getAttribute(\'data-q\'))" data-q="'+esc(e)+'" style="display:block;width:100%;padding:0 24px;text-align:center;color:#475569;height:36px;font-size:14px;line-height:20px;border-radius:12px;border:none;background:rgba(224,224,224,0.4);cursor:pointer">'+esc(e)+'</button>').join('')+'</div></div>'+
      '</div></div>';
  }
  function renderResults(){
    const p=S.parameters; const vsq=visSubQ(); const totalResults=p.maxQueries*p.count;
    const searching=S.phase==='searching';
    const contentReady=S.phase==='done'||(searching&&S.elapsed>=DELAY_CONTENT);
    const sourcesReady=S.phase==='done'||(searching&&S.elapsed>=DELAY_SOURCES);
    // left synthesis (full mode only)
    let left='';
    if(p.mode==='full'){
      let body;
      if(searching&&S.elapsed<DELAY_CONTENT){ body='<div class="flex items-center" style="gap:10px;font-size:14px;color:#94a3b8">'+ICON.spin+'<span>Synthesizing results...</span></div>'; }
      else if(contentReady){
        body='<div><p style="font-size:14px;color:#334155;line-height:1.6;margin-bottom:32px">Pioneer labs including OpenAI, Anthropic, Google DeepMind, and Meta are pushing the boundaries of AI capability in 2026. The landscape is defined by a competitive race between proprietary systems and rapidly improving open-weight alternatives.'+refBadges([[27,'blogs.nvidia.com'],[20,'semianalysis.com']])+' Below are the most prominent frontier AI models to watch right now.</p>'+
          '<h2 style="font-weight:700;color:#0f172a;font-size:18px;margin-bottom:16px">Top Frontier AI Models (2026)</h2>'+
          '<div style="border-radius:8px;border:1px solid #e2e8f0;overflow:hidden"><div class="flex items-center justify-end" style="gap:4px;padding:8px 12px;border-bottom:1px solid #f1f5f9;background:#fff"><svg style="width:14px;height:14px;color:#94a3b8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></div><div style="overflow-x:auto"><table style="width:100%;font-size:13px;border-collapse:collapse"><thead><tr style="border-bottom:1px solid #e2e8f0;background:#fff"><th style="text-align:left;font-weight:500;color:#64748b;padding:12px 16px;white-space:nowrap">Frontier AI Model</th><th style="text-align:left;font-weight:500;color:#64748b;padding:12px 16px">Key Capabilities</th><th style="text-align:left;font-weight:500;color:#64748b;padding:12px 16px;white-space:nowrap">Release Date</th><th style="text-align:left;font-weight:500;color:#64748b;padding:12px 16px">Benchmarks</th></tr></thead><tbody>'+
          TABLE.map(r=>'<tr style="border-bottom:1px solid #f1f5f9;background:#fff"><td style="padding:12px 16px;vertical-align:top;white-space:nowrap"><span style="color:#0f172a;font-weight:500">'+esc(r.model)+'</span>'+refBadges(r.refs)+'</td><td style="padding:12px 16px;color:#475569;vertical-align:top;line-height:1.4">'+esc(r.capabilities)+'</td><td style="padding:12px 16px;color:#64748b;vertical-align:top;white-space:nowrap">'+esc(r.date)+'</td><td style="padding:12px 16px;color:#475569;vertical-align:top;line-height:1.4">'+esc(r.benchmarks)+'</td></tr>').join('')+
          '</tbody></table></div></div>'+
          '<div class="flex justify-end" style="margin-top:12px"><button onclick="bsCopy()" title="Copy results" style="padding:8px;border-radius:8px;border:none;background:none;color:'+(S.copied?PRIMARY:'#cbd5e1')+';cursor:pointer">'+(S.copied?ICON.check:'<svg style="width:16px;height:16px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>')+'</button></div></div>';
      } else body='';
      left='<div style="display:flex;flex-direction:column;height:100%;border-right:1px solid #e2e8f0;width:58%"><div style="flex:1;overflow-y:auto;padding:28px 32px 32px">'+body+'</div>'+inputBar()+'</div>';
    }
    // right search process
    const rightWidth=p.mode==='full'?'42%':'100%';
    let sqList='';
    if(sourcesReady){
      sqList='<div style="display:flex;flex-direction:column;gap:4px">'+vsq.map((sq,i)=>{ const lat=LAT[i]||70;
        if(p.mode==='queries_only'){ return '<div style="border-radius:8px;overflow:hidden"><div class="flex items-center" style="gap:12px;padding:10px 12px"><span class="shrink-0">'+ICON.globe+'</span><span style="font-size:13px;color:#334155;flex:1;line-height:1.3">'+esc(sq.query)+'</span></div></div>'; }
        const open=S.expandedSubQuery===i;
        return '<div style="border-radius:8px;overflow:hidden"><button onclick="bsToggleSQ('+i+')" class="flex items-center" style="width:100%;gap:12px;padding:10px 12px;text-align:left;border:none;background:none;cursor:pointer;border-radius:8px">'+ICON.globe+'<span class="truncate" style="font-size:13px;color:#334155;flex:1;line-height:1.3">'+esc(sq.query)+'</span><span style="font-size:12px;color:#94a3b8;flex-shrink:0">'+p.count+' results</span><span style="font-size:12px;flex-shrink:0;color:'+PRIMARY+'">'+lat+'ms</span>'+(open?ICON.chevU:ICON.chevD)+'</button>'+(open?'<div style="padding:0 12px 10px;margin-left:28px">'+sq.results.slice(0,p.count).map(r=>'<a href="https://'+r.url+'" target="_blank" rel="noopener noreferrer" class="flex items-start" style="gap:8px;padding:6px 4px;border-radius:6px;text-decoration:none"><span style="flex-shrink:0;display:flex;align-items:center;justify-content:center;width:14px;height:14px;font-size:8px;font-weight:500;border-radius:3px;background:#f1f5f9;color:#94a3b8;margin-top:2px">'+r.id+'</span><div style="min-width:0;flex:1"><div class="truncate" style="color:#475569;font-size:11px">'+esc(r.title)+'</div><div class="truncate" style="color:#94a3b8;font-size:9px;line-height:1.2">'+esc(r.url)+'</div></div></a>').join('')+'</div>':'')+'</div>';
      }).join('')+'</div>';
    } else if(searching){ sqList='<div class="flex items-center" style="gap:10px;font-size:14px;color:#94a3b8;margin-bottom:16px">'+ICON.spin+'<span>Expanding query...</span></div>'; }
    const rightHeader='<div class="flex items-center" style="gap:12px;margin-bottom:24px"><h2 style="font-size:16px;font-weight:600;color:#1e293b">'+(p.mode==='queries_only'?'Queries':'Search Process')+'</h2>'+(p.mode!=='queries_only'?'<span style="padding:4px 12px;border-radius:999px;font-size:12px;font-weight:500;background:#ecfdf5;color:'+PRIMARY+'">Max latency: 75ms</span>':'')+'</div>';
    const right='<div style="overflow-y:auto;background:#fff;width:'+rightWidth+'"><div style="padding:24px 28px 32px;'+(p.mode!=='full'?'max-width:900px;margin:0 auto;':'')+'">'+rightHeader+sqList+'</div></div>';
    const footer=(p.mode!=='full')?'<div class="shrink-0" style="border-top:1px solid #e2e8f0;background:#fff;padding:12px 32px 24px">'+inputBarInner('900px')+'</div>':'';
    // header
    const pages=Math.ceil(S.sessions.length/10);
    const topRight='<div class="flex items-center" style="gap:8px;position:absolute;right:24px;top:20px">'+
      '<button onclick="bsSettings()" title="Run settings" style="display:flex;height:36px;width:36px;align-items:center;justify-content:center;color:#64748b;border-radius:8px;border:1px solid #e2e8f0;background:#fff;cursor:pointer"><svg style="width:16px;height:16px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg></button>'+
      '<button onclick="bsShare()" class="flex items-center" style="gap:6px;padding:8px 12px;font-size:12px;font-weight:500;color:#64748b;border-radius:8px;border:1px solid #e2e8f0;background:#fff;cursor:pointer">'+(S.linkCopied?ICON.check+'Link copied':'<svg style="width:14px;height:14px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>Share')+'</button>'+
      '<div style="position:relative"><button onclick="bsToggleHistory()" class="flex items-center" style="gap:6px;padding:8px 12px;font-size:12px;font-weight:500;color:#64748b;border-radius:8px;border:1px solid #e2e8f0;background:#fff;cursor:pointer"><svg style="width:14px;height:14px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M3 3v5h5M3.05 13A9 9 0 106 5.3L3 8"/><path d="M12 7v5l4 2"/></svg> History</button>'+historyDrop()+'</div>'+
      '<button onclick="bsReset()" class="flex items-center" style="gap:6px;padding:8px 16px;font-size:12px;font-weight:500;color:#fff;border-radius:8px;border:none;cursor:pointer;background:'+PRIMARY+'"><svg style="width:14px;height:14px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>New Chat</button></div>';
    const turnNav= S.sessionTurns.length>1?'<div class="flex items-center" style="gap:4px"><button onclick="bsTurn(-1)" '+(S.currentTurnIndex===0?'disabled':'')+' style="padding:4px;border:none;background:none;color:#94a3b8;cursor:pointer">é?/button><span style="font-size:12px;color:#64748b;font-weight:500;min-width:40px;text-align:center">'+(S.currentTurnIndex+1)+' / '+S.sessionTurns.length+'</span><button onclick="bsTurn(1)" '+(S.currentTurnIndex===S.sessionTurns.length-1?'disabled':'')+' style="padding:4px;border:none;background:none;color:#94a3b8;cursor:pointer">é?/button></div>':'';
    const stats='<div class="flex items-center justify-center" style="gap:32px"><div style="text-align:center"><div style="font-weight:700;font-size:22px;color:'+PRIMARY+'">'+p.maxQueries+'</div><div style="font-size:12px;color:#94a3b8">Queries</div></div>'+(p.mode!=='queries_only'?'<div style="text-align:center"><div style="font-weight:700;font-size:22px;color:'+PRIMARY+'">'+totalResults+'</div><div style="font-size:12px;color:#94a3b8">Results</div></div><div style="text-align:center"><div style="font-weight:700;font-size:22px;color:'+PRIMARY+'">75 ms</div><div style="font-size:12px;color:#94a3b8">Latency</div></div>':'')+'</div>';
    return '<div style="flex:1;overflow-y:auto;display:flex;flex-direction:column;height:100%"><div style="display:flex;flex-direction:column;height:100%">'+
      '<div class="shrink-0" style="border-bottom:1px solid #e2e8f0;text-align:center;padding:20px 32px 24px;position:relative">'+topRight+
        '<div class="flex items-center justify-center" style="gap:12px;margin-bottom:8px"><div style="display:inline-block;padding:4px 12px;border-radius:999px;border:1px solid #e2e8f0;font-size:12px;font-weight:500;color:#64748b">Question</div>'+turnNav+'</div>'+
        '<h1 style="font-weight:700;color:#0f172a;font-size:20px;line-height:1.4;max-width:700px;margin:0 auto 16px">'+esc(activeQuery())+'</h1>'+stats+
      '</div>'+
      '<div class="flex" style="flex:1;overflow:hidden">'+left+right+'</div>'+footer+
    '</div></div>';
  }
  function inputBarInner(maxW){ const dis=!S.query.trim()||S.phase==='searching'; return '<div class="flex items-center" style="gap:12px;border-radius:16px;border:1px solid #e2e8f0;padding:0 16px;box-shadow:0 2px 8px rgba(0,0,0,0.06);height:48px;'+(maxW?'max-width:'+maxW+';margin:0 auto;':'')+'">'+ICON.globe+'<input id="bs-follow" type="text" value="'+esc(S.query)+'" oninput="bsFollowInput(this.value)" onkeydown="bsFollowKey(event)" placeholder="How can I help you?" '+(S.phase==='searching'?'disabled':'')+' style="flex:1;background:transparent;font-size:14px;color:#1e293b;outline:none;height:100%;border:none"/><button onclick="bsSubmit(document.getElementById(\'bs-follow\').value)" '+(dis?'disabled':'')+' style="flex-shrink:0;padding:8px;border-radius:8px;border:none;cursor:pointer;background:'+(dis?'#f1f5f9':PRIMARY)+';color:'+(dis?'#94a3b8':'#fff')+'"><svg style="width:16px;height:16px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg></button></div>'; }
  function inputBar(){ return '<div class="shrink-0" style="padding:12px 32px 24px">'+inputBarInner('')+'</div>'; }
  function bindHero(){ const t=$('bs-hero-input'); if(!t)return; t.addEventListener('input',function(){ S.query=t.value; t.style.height='auto'; t.style.height=Math.min(t.scrollHeight,120)+'px'; const b=$('bs-hero-send'); if(b)b.style.background=S.query.trim()?'linear-gradient(135deg,#039855 0%,#d0b861 100%)':'#cbd5e1'; }); t.addEventListener('keydown',function(e){ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();bsSubmit(t.value);} }); }

  window.bsSubmitHero=function(){ const t=$('bs-hero-input'); bsSubmit(t?t.value:S.query); };
  window.bsFollowInput=function(v){ S.query=v; const i=$('bs-follow'); if(i){const b=i.nextElementSibling; const dis=!v.trim()||S.phase==='searching'; if(b){b.style.background=dis?'#f1f5f9':PRIMARY;b.style.color=dis?'#94a3b8':'#fff';b.disabled=dis;}} };
  window.bsFollowKey=function(e){ if(e.key==='Enter'){e.preventDefault();bsSubmit(e.target.value);} };
  window.bsToggleHistory=function(){ S.historyOpen=!S.historyOpen; render(); };
  window.bsHistPage=function(d){ const pages=Math.ceil(S.sessions.length/10); S.historyPage=Math.max(0,Math.min(pages-1,S.historyPage+d)); render(); };
  window.bsDel=function(id){ S.sessions=S.sessions.filter(s=>s.id!==id); render(); };
  window.bsSettings=function(){ SPD.open('broad',S.parameters,function(v){ S.parameters=v; if($('page-broad-search').classList.contains('active')&&S.phase!=='idle')render(); }); };
  window.bsToggleSQ=function(i){ S.expandedSubQuery=S.expandedSubQuery===i?null:i; render(); };
  window.bsTurn=function(d){ S.currentTurnIndex=Math.max(0,Math.min(S.sessionTurns.length-1,S.currentTurnIndex+d)); render(); };
  window.bsCopy=function(){ try{navigator.clipboard&&navigator.clipboard.writeText('Question: '+activeQuery()+'\n\nResults: Top Frontier AI Models (2026)\n'+TABLE.map(r=>'- '+r.model+': '+r.capabilities).join('\n'));}catch(e){} S.copied=true; render(); setTimeout(()=>{S.copied=false;render();},2000); };
  window.bsShare=function(){ try{navigator.clipboard&&navigator.clipboard.writeText(location.href+'?q='+encodeURIComponent(activeQuery()));}catch(e){} S.linkCopied=true; render(); setTimeout(()=>{S.linkCopied=false;render();},2000); };
  window.bsSubmit=function(q){ q=(q||'').trim(); if(!q||S.phase==='searching')return; clearAll();
    S.sessionTurns=S.sessionTurns.concat([{query:q,timestamp:Date.now()}]); S.currentTurnIndex=S.sessionTurns.length-1;
    S.query=''; S.phase='searching'; S.expandedSubQuery=null; S.elapsed=0; S.historyOpen=false; startT=Date.now(); render();
    timer=setInterval(()=>{ S.elapsed=Date.now()-startT; if(S.elapsed>=DELAY_SOURCES)render(); },200); tos.push(0);
    tos.push(setTimeout(()=>{ clearAll(); S.elapsed=0; S.phase='done'; render(); }, DELAY_CONTENT+2400));
  };
  window.bsReset=function(){ clearAll(); if(S.sessionTurns.length){ S.sessions=[{id:'s'+Date.now(),turns:S.sessionTurns.slice()}].concat(S.sessions); } S.query=''; S.sessionTurns=[]; S.currentTurnIndex=0; S.phase='idle'; S.expandedSubQuery=null; S.historyOpen=false; render(); };
  window.bsLoad=function(id){ const sess=S.sessions.find(s=>s.id===id); if(!sess)return; clearAll(); S.sessionTurns=sess.turns.slice(); S.currentTurnIndex=S.sessionTurns.length-1; S.phase='done'; S.historyOpen=false; S.expandedSubQuery=null; S.query=''; render(); };

  document.addEventListener('DOMContentLoaded',function(){ render(); });
})();

(function(){
  const PRIMARY = 'var(--color-accent)';
  const $=id=>document.getElementById(id);
  function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  let rtab='preview', lastResp=null;

  // mock sub-query templates + per-result hosts (host, titleTemplate, authors, highlightTemplate)
  const SUBQ=[
    ['{q} market trends',[['globenewswire.com','SNS Insider','Market sized at multi-billion scale with strong double-digit CAGR through 2035.'],['marketsandmarkets.com','MarketsandMarkets','Demand is driven by data-center buildouts and edge deployments.'],['statista.com','Statista','Forecast shows sustained growth across all major regions.']]],
    ['{q} market share',[['reuters.com','Reuters','Leading vendor retained over 80% of the accelerator market.'],['bloomberg.com','Bloomberg','Share shifts as challengers ramp custom silicon.'],['counterpointresearch.com','Counterpoint','Quarterly share tracker shows incremental gains for rivals.']]],
    ['top {q} manufacturers',[['tomshardware.com','Tomé¥æª Hardware','Roundup of the leading manufacturers and their flagship parts.'],['anandtech.com','AnandTech','Deep dive into architectures from the top players.'],['theverge.com','The Verge','Who is shipping the most capable hardware right now.']]],
    ['{q} leader analysis',[['nvidia.com','NVIDIA','Extended data-center GPU lead with new accelerator family.'],['semianalysis.com','SemiAnalysis','Supply and roadmap analysis of the market leader.'],['cnbc.com','CNBC','Earnings underscore continued dominance.']]],
    ['{q} challenger strategy',[['amd.com','AMD','Strategy update targeting inference and open ecosystems.'],['techcrunch.com','TechCrunch','How challengers plan to close the gap in 2026.'],['fool.com','The Motley Fool','Competitive positioning and outlook.']]],
    ['{q} pricing and cost',[['together.ai','Together AI','Per-unit pricing comparison across providers.'],['openrouter.ai','OpenRouter','Cost trends declined sharply year over year.'],['gartner.com','Gartner','Total cost of ownership framework.']]],
    ['{q} supply chain',[['nikkei.com','Nikkei','Foundry capacity and packaging constraints persist.'],['ft.com','Financial Times','Supply chain dynamics shaping availability.'],['wsj.com','WSJ','Export controls reshape sourcing.']]],
    ['{q} regulation and policy',[['whitehouse.gov','The White House','Executive actions affecting the sector.'],['europarl.europa.eu','European Parliament','Regulatory implementation progress.'],['gov.uk','GOV.UK','Policy guidance overview.']]],
  ];
  const LAT=[69,72,66,71,64,68,70,63];
  const HOST_DATES=['2026-04-01T07:30:00Z','2026-03-28T00:00:00Z','2026-03-22T10:15:00Z','2026-03-15T18:00:00Z','2026-03-09T09:00:00Z'];

  const lines=v=>(v||'').split('\n').map(s=>s.trim()).filter(Boolean);
  function readParams(){
    return {
      query:($('bsa-query').value||'').trim(),
      max_queries:Math.max(1,Math.min(parseInt($('bsa-maxq').value,10)||5,SUBQ.length)),
      topic:$('bsa-topic').value,
      count:Math.max(1,parseInt($('bsa-count').value,10)||10),
      time_basis:tbActive,
      time_range:cal.range||'',
      start_time:$('bsa-start').value, end_time:$('bsa-end').value,
      include_domains:lines($('bsa-include').value), exclude_domains:lines($('bsa-exclude').value),
      include_text:($('bsa-inctext').value||'').trim(), exclude_text:($('bsa-exctext').value||'').trim(),
      hl:$('bsa-hl').checked, hl_tokens:parseInt($('bsa-hl-tokens').value,10)||256,
      fc:$('bsa-fc').checked, fc_tokens:parseInt($('bsa-fc-tokens').value,10)||2048,
      images:$('bsa-images').checked, videos:$('bsa-videos').checked,
      safesearch:$('bsa-safesearch').value,
    };
  }
  function buildPayload(p){
    const so={ topic:p.topic, count:p.count };
    so.time_basis=p.time_basis;
    if(p.start_time||p.end_time){ if(p.start_time)so.start_time=p.start_time; if(p.end_time)so.end_time=p.end_time; }
    else if(p.time_range)so.time_range=p.time_range;
    if(p.include_domains.length)so.include_domains=p.include_domains;
    if(p.exclude_domains.length)so.exclude_domains=p.exclude_domains;
    if(p.include_text)so.include_text=p.include_text;
    if(p.exclude_text)so.exclude_text=p.exclude_text;
    so.highlight=p.hl?{enable:true,max_tokens:p.hl_tokens}:{enable:false};
    so.full_content=p.fc?{enable:true,max_tokens:p.fc_tokens}:{enable:false};
    so.include_images=p.images; so.include_videos=p.videos;
    so.safesearch=p.safesearch;
    return { query:p.query||'', max_queries:p.max_queries, search_options:so };
  }

  // é¹â¬é¹â¬ time basis pills é¹â¬é¹â¬
  let tbActive='auto';
  document.addEventListener('click',function(e){ const b=e.target.closest&&e.target.closest('.bsa-tb'); if(!b)return;
    tbActive=b.getAttribute('data-tb');
    document.querySelectorAll('.bsa-tb').forEach((x,i)=>{ const on=x===b; x.style.cssText='padding:4px 10px;'+(i<2?'border-right:1px solid #e2e8f0;':'')+(on?'background:#0398551a;color:#039855;font-weight:500':'background:#fff;color:#475569'); });
    refreshCode();
  });

  // é¹â¬é¹â¬ full content max-tokens visibility é¹â¬é¹â¬
  document.addEventListener('change',function(e){ if(e.target&&e.target.id==='bsa-fc'){ const w=$('bsa-fc-wrap'); if(w)w.classList.toggle('hidden',!e.target.checked); }
    if(e.target&&e.target.id==='bsa-hl'){ const w=$('bsa-hl-wrap'); if(w)w.style.opacity=e.target.checked?'1':'0.4'; } });

  // é¹â¬é¹â¬ date range calendar é¹â¬é¹â¬
  const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DOW=['Su','Mo','Tu','We','Th','Fr','Sa'];
  const cal={ open:false, y:2026, m:5, start:null, end:null, range:'' };
  function calDays(y,m){ const first=new Date(y,m,1); const s=new Date(y,m,1-first.getDay()); const a=[]; for(let i=0;i<42;i++){ const d=new Date(s); d.setDate(s.getDate()+i); a.push(d);} return a; }
  function inRange(d){ const t=new Date(d).setHours(0,0,0,0); const s=cal.start?new Date(cal.start).setHours(0,0,0,0):null; const e=cal.end?new Date(cal.end).setHours(0,0,0,0):null; if(s!==null&&t===s)return'start'; if(e!==null&&t===e)return'end'; if(s!==null&&e!==null&&t>s&&t<e)return'mid'; return null; }
  function nextM(o){ return o.m===11?{y:o.y+1,m:0}:{y:o.y,m:o.m+1}; }
  function monthGrid(y,m){
    const days=calDays(y,m);
    let h='<div style="width:224px"><div style="text-align:center;font-size:13px;font-weight:600;color:#1e293b;margin-bottom:8px">'+MONTHS[m]+' '+y+'</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">';
    h+=DOW.map(d=>'<div style="text-align:center;font-size:11px;color:#94a3b8;height:24px;line-height:24px">'+d+'</div>').join('');
    h+=days.map(d=>{ const tm=d.getMonth()===m; const r=inRange(d); const bg=(r==='start'||r==='end')?PRIMARY:(r==='mid'?'#f0fdf4':'transparent'); const col=!tm?'#cbd5e1':(r?(r==='mid'?'#15803d':'#fff'):'#0f172b');
      return '<div onclick="bsaPick('+d.getFullYear()+','+d.getMonth()+','+d.getDate()+')" style="text-align:center;height:30px;line-height:30px;font-size:12px;border-radius:7px;cursor:pointer;color:'+col+';background:'+bg+'">'+d.getDate()+'</div>'; }).join('');
    return h+'</div></div>';
  }
  function renderCal(){
    const pop=$('bsa-date-pop'); if(!pop)return; const nm=nextM(cal);
    pop.innerHTML='<div style="display:flex;flex-direction:column;gap:2px;width:120px;border-right:1px solid #f1f5f9;padding-right:12px">'+
        [['Last 24 hours','day'],['Last week','week'],['Last month','month'],['Last year','year']].map(p=>'<button type="button" onclick="bsaPreset(\''+p[1]+'\',\''+p[0]+'\')" onmouseenter="if(!this.dataset.on)this.style.background=\'#f8fafc\'" onmouseleave="if(!this.dataset.on)this.style.background=\'transparent\'" '+(cal.range===p[1]?'data-on="1"':'')+' style="text-align:left;padding:8px 10px;border-radius:7px;border:none;cursor:pointer;font-size:13px;'+(cal.range===p[1]?'background:#0398551a;color:#039855;font-weight:500':'background:transparent;color:#475569')+'">'+p[0]+'</button>').join('')+'</div>'+
      '<div><div style="display:flex;align-items:flex-start;gap:20px"><button type="button" onclick="bsaCalNav(-1)" style="border:none;background:none;cursor:pointer;color:#64748b;font-size:16px;line-height:24px">&larr;</button><div style="display:flex;gap:20px;flex:1">'+monthGrid(cal.y,cal.m)+monthGrid(nm.y,nm.m)+'</div><button type="button" onclick="bsaCalNav(1)" style="border:none;background:none;cursor:pointer;color:#64748b;font-size:16px;line-height:24px">&rarr;</button></div>'+
      '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px"><button type="button" onclick="bsaClearRange()" style="padding:7px 14px;border-radius:8px;border:1px solid #e2e8f0;background:#fff;cursor:pointer;font-size:13px;color:#64748b">Clear</button><button type="button" onclick="bsaApplyRange()" style="padding:7px 14px;border-radius:8px;border:none;background:'+PRIMARY+';cursor:pointer;font-size:13px;color:#fff;font-weight:500">Apply</button></div></div>';
  }
  function closeCal(){ cal.open=false; const pop=$('bsa-date-pop'); if(pop)pop.style.display='none'; }
  window.bsaDateToggle=function(){ cal.open=!cal.open; const pop=$('bsa-date-pop');
    if(cal.open){ pop.style.display='flex'; renderCal();
      // position as fixed + clamp into viewport so presets are always visible
      const btn=$('bsa-date-btn').getBoundingClientRect();
      pop.style.position='fixed'; pop.style.top=(btn.bottom+6)+'px'; pop.style.right='auto';
      const w=pop.offsetWidth||620, vw=window.innerWidth;
      let left=Math.min(btn.right-w, vw-w-8); left=Math.max(8,left);
      pop.style.left=left+'px';
    } else { pop.style.display='none'; }
  };
  window.bsaCalNav=function(d){ if(d>0){const n=nextM(cal);cal.y=n.y;cal.m=n.m;} else {cal.m=cal.m===0?11:cal.m-1; if(cal.m===11)cal.y--;} renderCal(); };
  window.bsaPick=function(y,m,d){ cal.range=''; const dt=new Date(y,m,d); if(!cal.start||(cal.start&&cal.end)){cal.start=dt;cal.end=null;} else { if(dt<cal.start){cal.end=cal.start;cal.start=dt;} else cal.end=dt; } renderCal(); };
  function isoOf(d,end){ const pad=n=>String(n).padStart(2,'0'); return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+'T'+(end?'23:59:59':'00:00:00')+'+08:00'; }
  function shortD(d){ return MONTHS[d.getMonth()].slice(0,3)+' '+d.getDate(); }
  // Left presets &rarr;time_range enum (mutually exclusive with custom start/end)
  window.bsaPreset=function(range,label){ cal.range=range; cal.start=null; cal.end=null; $('bsa-start').value=''; $('bsa-end').value=''; $('bsa-date-label').textContent=label; $('bsa-date-label').className='text-[#737373]'; closeCal(); refreshCode(); };
  // Right calendar &rarr;custom start/end (clears time_range)
  window.bsaApplyRange=function(){ if(cal.start){ cal.range=''; $('bsa-start').value=isoOf(cal.start,false); $('bsa-end').value=isoOf(cal.end||cal.start,true); $('bsa-date-label').textContent=cal.end?(shortD(cal.start)+' é?'+shortD(cal.end)):shortD(cal.start); $('bsa-date-label').className='text-[#737373]'; } closeCal(); refreshCode(); };
  window.bsaClearRange=function(){ cal.start=null; cal.end=null; cal.range=''; $('bsa-start').value=''; $('bsa-end').value=''; $('bsa-date-label').textContent='Custom range'; $('bsa-date-label').className='text-[#a3a3a3]'; closeCal(); refreshCode(); };
  document.addEventListener('mousedown',function(e){ if(cal.open){ const wrap=$('bsa-date-pop'); const btn=$('bsa-date-btn'); if(wrap&&!wrap.contains(e.target)&&btn&&!btn.contains(e.target)){ closeCal(); } } });
  let bsaLang='python';
  const SZ=(window.PGS_serialize)||((v)=>JSON.stringify(v,null,2));
  function reqCode(){
    const p=readParams(); const payload=buildPayload(p); const KEY=(window.PGS_MASKED)||'YOUR_API_KEY';
    if(bsaLang==='python') return ['import requests','import json','','url = "https://api.octen.ai/v1/broad-search"','headers = {','    "x-api-key": "'+KEY+'",','    "Content-Type": "application/json",','}','','payload = '+SZ(payload,'python',0),'','response = requests.post(url, headers=headers, json=payload)','data = response.json()','print(json.dumps(data, indent=2))'].join('\n');
    if(bsaLang==='javascript'){ const b=SZ(payload,'json',1); return ['const response = await fetch("https://api.octen.ai/v1/broad-search", {','  method: "POST",','  headers: {','    "x-api-key": "'+KEY+'",','    "Content-Type": "application/json",','  },','  body: JSON.stringify('+b+'),','});','','const data = await response.json();'].join('\n'); }
    const json=SZ(payload,'json',0).split('\n').map((l,i)=>i===0?l:'  '+l).join('\n');
    return ['curl https://api.octen.ai/v1/broad-search \\','  -X POST \\',"  -H 'x-api-key: "+KEY+"' \\","  -H 'Content-Type: application/json' \\","  -d '"+json+"'"].join('\n');
  }
  function refreshCode(){ const el=$('bsa-code'); if(!el)return; const hl=bsaLang==='python'?window.PGS_hlCode:(bsaLang==='javascript'?window.PGS_hlCode:window.PGS_hlCode);
    if(window.PGS_codeBlock){ el.innerHTML=window.PGS_codeBlock(reqCode(),hl); el.firstChild&&(el.firstChild.style.maxHeight="560px"); }
    else { el.textContent=reqCode(); }
    document.querySelectorAll('.bsa-lang').forEach(b=>{
      const on=b.getAttribute('data-l')===bsaLang;
      b.className = 'bsa-lang px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ' + (on ? 'bg-white shadow text-[#0a0a0a]' : 'bg-transparent text-[#737373] hover:text-[#0a0a0a] hover:bg-[#e5e5e5]');
      b.style.cssText = '';
    });
  }
  window.bsaSetLang=function(l){ bsaLang=l; refreshCode(); };
  window.bsaCopyReq=function(){ try{navigator.clipboard&&navigator.clipboard.writeText(reqCode());}catch(e){} const b=$('bsa-copyreq'); if(b){const o=b.innerHTML;b.innerHTML='<svg class="w-3.5 h-3.5" style="color:#039855" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Copied</span>';setTimeout(()=>b.innerHTML=o,1500);} };

  function buildResponse(p){
    const subs=SUBQ.slice(0,p.max_queries);
    const queries=subs.map(s=>s[0].replace('{q}',p.query));
    let totalLat=0;
    const search_results=subs.map((sq,i)=>{
      const qtext=sq[0].replace('{q}',p.query); const lat=LAT[i]||70; totalLat+=lat;
      const results=[]; for(let k=0;k<p.count;k++){ const base=sq[1][k%sq[1].length]; const host=base[0]; const slug=p.query.toLowerCase().replace(/[^a-z0-9]+/g,'-').slice(0,40);
        const item={ title:base[1]+' é?'+capitalize(qtext), url:'https://www.'+host+'/2026/'+slug+(k?'-'+(k+1):''), authors:base[1] };
        if(p.hl)item.highlight=base[2];
        item.time_published=HOST_DATES[k%HOST_DATES.length];
        item.time_last_crawled='2026-04-02T03:18:46Z';
        item.favicon='https://www.'+host+'/favicon.ico';
        if(p.fc)item.full_content='<full page content truncated for preview>';
        results.push(item);
      }
      return { query:qtext, results:results, latency:lat };
    });
    return { code:0, msg:'success', request_id:'req_'+Math.random().toString(36).slice(2,10)+Math.random().toString(36).slice(2,8),
      queries:queries, search_results:search_results,
      meta:{ usage:{ num_search_queries:subs.length }, latency:1200+totalLat*3, warning:null } };
  }
  function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
  function fmtDate(iso){ if(!iso)return''; const d=new Date(iso),pad=n=>String(n).padStart(2,'0'); return d.getFullYear()+'/'+pad(d.getMonth()+1)+'/'+pad(d.getDate()); }

  window.bsaTab=function(t){
    const req=t==='request';
    $('bsa-pane-request').classList.toggle('hidden',!req);
    $('bsa-pane-response').classList.toggle('hidden',req);
    $('bsa-tab-req').style.cssText = '';
    $('bsa-tab-res').style.cssText = '';
    
    const activeCls = 'px-1 py-1.5 text-sm font-medium text-[#0a0a0a] border-b-[1.5px] border-slate-900 transition-colors';
    const inactiveCls = 'px-1 py-1.5 text-sm font-medium text-[#737373] border-b-[1.5px] border-transparent hover:text-[#737373] transition-colors';
    
    $('bsa-tab-req').className = req ? activeCls : inactiveCls;
    $('bsa-tab-res').className = req ? inactiveCls : activeCls;
  };
  window.bsaRtab=function(t){ rtab=t;
    const activeCls = 'px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-white shadow text-[#0a0a0a]';
    const inactiveCls = 'px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-transparent text-[#737373] hover:text-[#0a0a0a] hover:bg-[#e5e5e5]';
    $('bsa-rt-preview').className = t === 'preview' ? activeCls : inactiveCls;
    $('bsa-rt-json').className = t === 'json' ? activeCls : inactiveCls;
    $('bsa-rt-preview').style.cssText = '';
    $('bsa-rt-json').style.cssText = '';
    renderRespBody();
  };
  window.bsaRun=function(){
    const p=readParams();
    if(!p.query){ $('bsa-query').focus(); return; }
    refreshCode(); bsaTab('response'); lastResp=buildResponse(p); renderRespBody();
  };
  window.bsaClear=function(){ $('bsa-query').value=''; lastResp=null; refreshCode(); renderEmpty(); };
  window.bsaToggleResult=function(i){ const el=$('bsa-r-'+i); const ch=$('bsa-c-'+i); if(!el)return; const btn=el.previousElementSibling; const open=el.style.display!=='none'; el.style.display=open?'none':'block'; if(ch)ch.style.transform=open?'':'rotate(180deg)'; if(btn){ btn.classList.toggle('bg-[#f5f5f5]',!open); btn.classList.toggle('bg-white',open); } };

  function renderEmpty(){ $('bsa-meta').textContent=''; $('bsa-resp-body').innerHTML=`<div class="flex-1 flex flex-col items-center justify-center py-12 text-[#a3a3a3]">
  <svg class="w-[36px] h-[36px] mb-2 shrink-0" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.2059 21.9674C29.2158 21.9191 29.285 21.9191 29.2949 21.9674C29.8082 24.4792 31.7711 26.4421 34.2829 26.9554C34.3312 26.9653 34.3312 27.0345 34.2829 27.0444C31.7711 27.5577 29.8082 29.5206 29.2949 32.0324C29.285 32.0808 29.2158 32.0808 29.2059 32.0324C28.6926 29.5206 26.7297 27.5577 24.2179 27.0444C24.1695 27.0345 24.1695 26.9653 24.2179 26.9554C26.7297 26.4421 28.6926 24.4792 29.2059 21.9674Z" stroke="#039855" stroke-width="2.25"/>
<path d="M22.0791 15.5641C22.1729 15.1049 22.829 15.1049 22.9228 15.5641C23.1301 16.5783 23.9227 17.3708 24.9368 17.5781C25.396 17.6719 25.396 18.328 24.9368 18.4219C23.9227 18.6291 23.1301 19.4217 22.9228 20.4358C22.829 20.895 22.1729 20.895 22.0791 20.4358C21.8718 19.4217 21.0792 18.6291 20.0651 18.4219C19.6059 18.328 19.6059 17.6719 20.0651 17.5781C21.0792 17.3708 21.8718 16.5783 22.0791 15.5641Z" fill="#039855"/>
<path d="M5.25 13.35H4.125V13.35H5.25ZM10.2789 30.5737L10.6347 31.641L10.6347 31.641L10.2789 30.5737ZM17.3433 31.1764L16.8046 30.1888V30.1888L17.3433 31.1764ZM20.0387 30.9876C20.5842 30.6901 20.7852 30.0067 20.4876 29.4613C20.1901 28.9158 19.5067 28.7148 18.9613 29.0124L19.5 30L20.0387 30.9876ZM29.625 17.25C29.625 17.8713 30.1287 18.375 30.75 18.375C31.3713 18.375 31.875 17.8713 31.875 17.25H30.75H29.625ZM13.5095 31.0063L12.8855 31.9424H12.8855L13.5095 31.0063ZM5.25001 28.0951L4.12501 28.0951L4.12501 28.0978L5.25001 28.0951ZM9.19172 30.9361L9.54486 32.0042L9.54747 32.0034L9.19172 30.9361ZM8.52606 4.40396L8.01532 3.40158L8.52606 4.40396ZM5.90396 7.02606L6.90634 7.5368L6.90634 7.5368L5.90396 7.02606ZM27.4739 4.40396L27.9847 3.40158V3.40158L27.4739 4.40396ZM30.096 7.02606L31.0984 6.51532V6.51532L30.096 7.02606ZM12.75 10.125C12.1287 10.125 11.625 10.6287 11.625 11.25C11.625 11.8713 12.1287 12.375 12.75 12.375V11.25V10.125ZM23.25 12.375C23.8713 12.375 24.375 11.8713 24.375 11.25C24.375 10.6287 23.8713 10.125 23.25 10.125V11.25V12.375ZM12.75 16.875C12.1287 16.875 11.625 17.3787 11.625 18C11.625 18.6213 12.1287 19.125 12.75 19.125V18V16.875ZM15.375 19.125C15.9963 19.125 16.5 18.6213 16.5 18C16.5 17.3787 15.9963 16.875 15.375 16.875V18V19.125ZM21.15 3.75V2.625H14.85V3.75V4.875H21.15V3.75ZM17.3433 31.1764L17.882 32.164L20.0387 30.9876L19.5 30L18.9613 29.0124L16.8046 30.1888L17.3433 31.1764ZM30.75 17.25H31.875V13.35H30.75H29.625V17.25H30.75ZM10.2789 30.5737L10.6347 31.641C11.3913 31.3888 12.2219 31.5 12.8855 31.9424L13.5095 31.0063L14.1335 30.0703C12.8922 29.2427 11.3384 29.0347 9.92316 29.5064L10.2789 30.5737ZM5.25001 28.0951L4.12501 28.0978C4.13188 30.9049 6.87968 32.8854 9.54486 32.0042L9.19172 30.9361L8.83857 29.8679C7.62713 30.2685 6.37813 29.3682 6.37501 28.0923L5.25001 28.0951ZM14.85 3.75V2.625C13.1884 2.625 11.8746 2.62413 10.8176 2.71048C9.74752 2.79791 8.84208 2.98032 8.01532 3.40158L8.52606 4.40396L9.0368 5.40634C9.49351 5.17364 10.0699 5.02907 11.0008 4.95301C11.9449 4.87587 13.1513 4.875 14.85 4.875V3.75ZM5.25 13.35H6.375C6.375 11.6513 6.37587 10.4449 6.45301 9.50082C6.52907 8.56988 6.67364 7.99351 6.90634 7.5368L5.90396 7.02606L4.90158 6.51532C4.48032 7.34208 4.29791 8.24752 4.21048 9.3176C4.12413 10.3746 4.125 11.6884 4.125 13.35H5.25ZM8.52606 4.40396L8.01532 3.40158C6.67466 4.08468 5.58468 5.17466 4.90158 6.51532L5.90396 7.02606L6.90634 7.5368C7.37373 6.61951 8.11951 5.87373 9.0368 5.40634L8.52606 4.40396ZM13.5095 31.0063L12.8855 31.9424C14.3804 32.939 16.3047 33.0244 17.882 32.164L17.3433 31.1764L16.8046 30.1888C15.9614 30.6487 14.9327 30.603 14.1335 30.0703L13.5095 31.0063ZM21.15 3.75V4.875C22.8487 4.875 24.0551 4.87587 24.9992 4.95301C25.9301 5.02907 26.5065 5.17364 26.9632 5.40634L27.4739 4.40396L27.9847 3.40158C27.1579 2.98032 26.2525 2.79791 25.1824 2.71048C24.1254 2.62413 22.8116 2.625 21.15 2.625V3.75ZM30.75 13.35H31.875C31.875 11.6884 31.8759 10.3746 31.7895 9.3176C31.7021 8.24752 31.5197 7.34208 31.0984 6.51532L30.096 7.02606L29.0937 7.5368C29.3264 7.99351 29.4709 8.56988 29.547 9.50082C29.6241 10.4449 29.625 11.6513 29.625 13.35H30.75ZM27.4739 4.40396L26.9632 5.40634C27.8805 5.87373 28.6263 6.61951 29.0937 7.5368L30.096 7.02606L31.0984 6.51532C30.4153 5.17466 29.3253 4.08468 27.9847 3.40158L27.4739 4.40396ZM12.75 11.25V12.375H23.25V11.25V10.125H12.75V11.25ZM12.75 18V19.125H15.375V18V16.875H12.75V18ZM5.25 13.35H4.125L4.12501 28.0951L5.25001 28.0951H6.37501L6.375 13.35L5.25 13.35ZM9.19172 30.9361L9.54747 32.0034L10.6347 31.641L10.2789 30.5737L9.92317 29.5064L8.83597 29.8688L9.19172 30.9361Z" fill="#A3A3A3"/>
</svg>
  <p class="text-sm">Run a query to see expanded queries &amp; parallel results</p>
</div>`; }
  function renderFigmaPreview(){
    const previewQueries=[
      {query:'latest central bank interest rate decisions 2026',latency:85,open:true,results:[
        ['Central Bank Decisions & 2026 Interest Rate Outlook for NSE:TCS by GlobalWolfStreet - TradingView India','1. Central Bank Policy Trends in Early 2026 1.1 The Federal Reserve (U.S.) The U.S. Federal Reserve has held its key policy rate in a tight range after a series of cuts during 2025.','GlobalWolfStreet Follow · 2026/02/13 (UTC+8) · in.tradingview.com'],
        ['Central Bank Interest Rate Decisions: How the Fed, ECB, and BoE Shape Your Economy - maseconomics','On March 18, 2026, three of the world\'s most powerful institutions, the Federal Reserve, the European Central Bank (ECB), and the Bank of England (BoE), all held their benchmark interest rates steady within 24 hours of each other.','Majid Ali Sanghro · 2026/04/04 (UTC+8) · maseconomics.com'],
        ['Super Central Bank Week 2026: How Interest Rate Decisions Will Impact the Crypto Market | KuCoin','Super Central Bank Week 2026 explains how interest rate decisions may shape crypto market liquidity, risk appetite, and volatility as major central banks publish new policy signals.','2026/05/02 (UTC+8) · kucoin.com'],
        ['Why are Interest Rate CFDs influenced by central bank decisions? - WalletInvestor Magazin - Investing news','Interest Rate CFDs are influenced by central bank decisions because policy rates affect borrowing costs, growth expectations, and market pricing.','Sylvia · 2022/02/07 (UTC+8) · walletinvestor.com'],
        ['Why are Interest Rate CFDs influenced by central bank decisions? - Bitcoin News, Forecast, Technical Analysis, 8000+ Cryptocurrencies','Interest Rate CFDs and their influence on central bank decisions introduce financial derivatives that allow traders to speculate on the future direction of interest rates.','WalletInvestor · 2022/02/07 (UTC+8) · walletinvestor.com']
      ]},
      {query:'global central bank rate hikes 2026',latency:78},
      {query:'recent monetary policy changes worldwide',latency:82},
      {query:'central bank interest rate announcements today',latency:82},
      {query:'Federal Reserve interest rate decision 2026',latency:68}
    ];
    const globeSvg='<svg class="octen-globe" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"></path></svg>';
    const chevronSvg='<svg class="octen-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>';
    const cards=previewQueries.map((group)=>{
      const resultsHtml=(group.results||[]).map((r,k)=>'<a class="octen-result" href="#" onclick="return false">'+(k===4?'<span class="octen-result-icon">W</span>':'')+'<div class="octen-result-body"><div class="octen-result-title">'+esc(r[0])+'</div><div class="octen-result-summary">'+esc(r[1])+'</div><div class="octen-result-meta">'+esc(r[2])+'</div></div></a>').join('');
      return '<details class="octen-query-card"'+(group.open?' open':'')+'>'+'<summary>'+globeSvg+'<span class="octen-query-text">'+esc(group.query)+'</span>'+'<span class="octen-result-count">5 results</span>'+'<span class="octen-latency">'+group.latency+'ms</span>'+chevronSvg+'</summary>'+(resultsHtml?'<div class="octen-results">'+resultsHtml+'</div>':'')+'</details>';
    }).join('');
    return '<div class="octen-response-preview">'+cards+'</div>';
  }

  function renderRespBody(){
    if(!lastResp){ renderEmpty(); return; }
    $('bsa-meta').textContent=lastResp.meta.usage.num_search_queries+' queries è·?'+lastResp.meta.latency+' ms';
    if(rtab==='json'){ $('bsa-resp-body').innerHTML='<div class="bg-slate-900 rounded-md p-4 overflow-auto max-h-[28rem]"><pre class="text-xs text-slate-100 whitespace-pre font-mono">'+esc(JSON.stringify(lastResp,null,2))+'</pre></div>'; return; }
    $('bsa-resp-body').innerHTML=renderFigmaPreview();
  }

  document.addEventListener('DOMContentLoaded',function(){ if($('bsa-code'))refreshCode();
    const inp=$('bsa-query'); if(inp){ const EX=['compare frontier AI models in 2026','latest trends in the global AI chip market','best practices and pitfalls of RAG in production'];
      let ph=0,ch=0,del=false; (function tick(){ const cur=EX[ph]; if(!del){ch++; if(ch>cur.length){del=true;setTimeout(tick,1500);return;}} else {ch--; if(ch<=0){del=false;ph=(ph+1)%EX.length;}} if(!inp.value)inp.setAttribute('placeholder',cur.slice(0,Math.max(0,ch))); setTimeout(tick,del?40:95); })();
    }
  });
  // keep request code in sync with param edits
  document.addEventListener('input',function(e){ if(e.target.closest&&e.target.closest('#page-broad-search-api')) refreshCode(); });
  document.addEventListener('change',function(e){ if(e.target.closest&&e.target.closest('#page-broad-search-api')) refreshCode(); });
})();
