(function(){
  const PRIMARY='#039855';
  const $=id=>document.getElementById(id);
  function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  let rtab='preview', lastResp=null;

  // mock sub-query templates + per-result hosts (host, titleTemplate, authors, highlightTemplate)
  const SUBQ=[
    ['{q} market trends',[['globenewswire.com','SNS Insider','Market sized at multi-billion scale with strong double-digit CAGR through 2035.'],['marketsandmarkets.com','MarketsandMarkets','Demand is driven by data-center buildouts and edge deployments.'],['statista.com','Statista','Forecast shows sustained growth across all major regions.']]],
    ['{q} market share',[['reuters.com','Reuters','Leading vendor retained over 80% of the accelerator market.'],['bloomberg.com','Bloomberg','Share shifts as challengers ramp custom silicon.'],['counterpointresearch.com','Counterpoint','Quarterly share tracker shows incremental gains for rivals.']]],
    ['top {q} manufacturers',[['tomshardware.com','Tom’s Hardware','Roundup of the leading manufacturers and their flagship parts.'],['anandtech.com','AnandTech','Deep dive into architectures from the top players.'],['theverge.com','The Verge','Who is shipping the most capable hardware right now.']]],
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

  // ── time basis pills ──
  let tbActive='auto';
  document.addEventListener('click',function(e){ const b=e.target.closest&&e.target.closest('.bsa-tb'); if(!b)return;
    tbActive=b.getAttribute('data-tb');
    document.querySelectorAll('.bsa-tb').forEach((x,i)=>{ const on=x===b; x.style.cssText='padding:4px 10px;'+(i<2?'border-right:1px solid #e2e8f0;':'')+(on?'background:#0398551a;color:#039855;font-weight:500':'background:#fff;color:#475569'); });
    refreshCode();
  });

  // ── full content max-tokens visibility ──
  document.addEventListener('change',function(e){ if(e.target&&e.target.id==='bsa-fc'){ const w=$('bsa-fc-wrap'); if(w)w.classList.toggle('hidden',!e.target.checked); }
    if(e.target&&e.target.id==='bsa-hl'){ const w=$('bsa-hl-wrap'); if(w)w.style.opacity=e.target.checked?'1':'0.4'; } });

  // ── date range calendar ──
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
      '<div><div style="display:flex;align-items:flex-start;gap:20px"><button type="button" onclick="bsaCalNav(-1)" style="border:none;background:none;cursor:pointer;color:#64748b;font-size:16px;line-height:24px">‹</button><div style="display:flex;gap:20px;flex:1">'+monthGrid(cal.y,cal.m)+monthGrid(nm.y,nm.m)+'</div><button type="button" onclick="bsaCalNav(1)" style="border:none;background:none;cursor:pointer;color:#64748b;font-size:16px;line-height:24px">›</button></div>'+
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
  // Left presets → time_range enum (mutually exclusive with custom start/end)
  window.bsaPreset=function(range,label){ cal.range=range; cal.start=null; cal.end=null; $('bsa-start').value=''; $('bsa-end').value=''; $('bsa-date-label').textContent=label; $('bsa-date-label').className='text-slate-700'; closeCal(); refreshCode(); };
  // Right calendar → custom start/end (clears time_range)
  window.bsaApplyRange=function(){ if(cal.start){ cal.range=''; $('bsa-start').value=isoOf(cal.start,false); $('bsa-end').value=isoOf(cal.end||cal.start,true); $('bsa-date-label').textContent=cal.end?(shortD(cal.start)+' – '+shortD(cal.end)):shortD(cal.start); $('bsa-date-label').className='text-slate-700'; } closeCal(); refreshCode(); };
  window.bsaClearRange=function(){ cal.start=null; cal.end=null; cal.range=''; $('bsa-start').value=''; $('bsa-end').value=''; $('bsa-date-label').textContent='Custom range'; $('bsa-date-label').className='text-slate-400'; closeCal(); refreshCode(); };
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
    document.querySelectorAll('.bsa-lang').forEach(b=>{const on=b.getAttribute('data-l')===bsaLang;b.style.cssText='padding:6px 12px;font-size:12px;cursor:pointer;'+(b.getAttribute('data-l')!=='python'?'border-left:1px solid #e2e8f0;':'')+(on?'background:#0398551a;color:#039855;font-weight:500':'background:#fff;color:#475569');});
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
        const item={ title:base[1]+' — '+capitalize(qtext), url:'https://www.'+host+'/2026/'+slug+(k?'-'+(k+1):''), authors:base[1] };
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
    $('bsa-tab-req').style.cssText=req?'color:#039855;background:#0398551a;border-bottom:2px solid #039855':'color:#475569';
    $('bsa-tab-res').style.cssText=req?'color:#475569':'color:#039855;background:#0398551a;border-bottom:2px solid #039855';
  };
  window.bsaRtab=function(t){ rtab=t;
    $('bsa-rt-preview').style.cssText=t==='preview'?'background:#0398551a;color:#039855;font-weight:500':'background:#fff;color:#475569';
    $('bsa-rt-json').style.cssText=t==='json'?'background:#0398551a;color:#039855;font-weight:500':'background:#fff;color:#475569';
    renderRespBody();
  };
  window.bsaRun=function(){
    const p=readParams();
    if(!p.query){ $('bsa-query').focus(); return; }
    refreshCode(); bsaTab('response'); lastResp=buildResponse(p); renderRespBody();
  };
  window.bsaClear=function(){ $('bsa-query').value=''; lastResp=null; refreshCode(); renderEmpty(); };
  window.bsaToggleResult=function(i){ const el=$('bsa-r-'+i); const ch=$('bsa-c-'+i); if(!el)return; const open=el.style.display!=='none'; el.style.display=open?'none':'block'; if(ch)ch.style.transform=open?'':'rotate(180deg)'; };

  function renderEmpty(){ $('bsa-meta').textContent=''; $('bsa-resp-body').innerHTML='<div class="flex flex-col items-center justify-center py-12 text-slate-400"><svg class="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35"/></svg><p class="text-xs">Run a query to see expanded queries &amp; parallel results</p></div>'; }
  function renderRespBody(){
    if(!lastResp){ renderEmpty(); return; }
    $('bsa-meta').textContent=lastResp.meta.usage.num_search_queries+' queries · '+lastResp.meta.latency+' ms';
    if(rtab==='json'){ $('bsa-resp-body').innerHTML='<div class="bg-slate-900 rounded-md p-4 overflow-auto max-h-[28rem]"><pre class="text-xs text-slate-100 whitespace-pre font-mono">'+esc(JSON.stringify(lastResp,null,2))+'</pre></div>'; return; }
    const rows=lastResp.search_results.map((sr,i)=>{
      const results=sr.results.map((r,k)=>'<a href="'+esc(r.url)+'" target="_blank" rel="noopener noreferrer" class="flex items-start gap-2 py-1.5 rounded-md hover:bg-slate-50 px-1 transition-colors"><img src="'+esc(r.favicon)+'" onerror="this.style.visibility=\'hidden\'" class="shrink-0 mt-0.5 rounded" style="width:14px;height:14px"/><div class="min-w-0 flex-1"><div class="text-slate-700 truncate" style="font-size:11px">'+esc(r.title)+'</div>'+(r.highlight?'<div class="text-slate-500 mt-0.5" style="font-size:10px;line-height:1.35">'+esc(r.highlight)+'</div>':'')+'<div class="text-slate-400 truncate mt-0.5" style="font-size:9px;line-height:1.2">'+esc(r.authors)+' · '+fmtDate(r.time_published)+' · '+esc(r.url)+'</div></div></a>').join('');
      return '<div class="rounded-lg overflow-hidden"><button onclick="bsaToggleResult('+i+')" class="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors text-left rounded-lg"><svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg><span class="text-slate-700 flex-1 leading-snug truncate" style="font-size:11px">'+esc(sr.query)+'</span><span class="text-xs text-slate-400 shrink-0">'+sr.results.length+' results</span><span class="text-xs shrink-0" style="color:#039855">'+sr.latency+'ms</span><svg id="bsa-c-'+i+'" class="w-3.5 h-3.5 text-slate-300 shrink-0 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg></button><div id="bsa-r-'+i+'" style="display:none" class="px-3 pb-2.5"><div style="margin-left:28px">'+results+'</div></div></div>';
    }).join('');
    $('bsa-resp-body').innerHTML='<div style="display:flex;flex-direction:column;gap:2px">'+rows+'</div>';
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