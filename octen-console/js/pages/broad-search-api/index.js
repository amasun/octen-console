// Broad Search API page — response preview, request code-gen and bsa* helpers.
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
      const on = b.dataset.l === bsaLang;
      b.className = 'bsa-lang px-4 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ' + (on ? 'bg-white shadow-sm text-[#0a0a0a]' : 'bg-transparent text-[#737373] hover:text-[#0a0a0a]');
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
    
    const activeCls = 'py-4 text-base font-medium text-[#0a0a0a] border-b-[2px] border-[#0a0a0a] transition-colors relative top-[1px]';
    const inactiveCls = 'py-4 text-base font-medium text-[#737373] border-b-[2px] border-transparent hover:text-[#0a0a0a] transition-colors relative top-[1px]';
    
    $('bsa-tab-req').className = req ? activeCls : inactiveCls;
    $('bsa-tab-res').className = req ? inactiveCls : activeCls;
  };
  window.bsaRtab=function(t){ rtab=t;
    const activeCls = 'px-4 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer bg-white shadow-sm text-[#0a0a0a]';
    const inactiveCls = 'px-4 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer bg-transparent text-[#737373] hover:text-[#0a0a0a]';
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

  // keep request code in sync with param edits
  document.addEventListener('input',function(e){ if(e.target.closest&&e.target.closest('#page-broad-search-api')) refreshCode(); });
  document.addEventListener('change',function(e){ if(e.target.closest&&e.target.closest('#page-broad-search-api')) refreshCode(); });

  // SPA lifecycle: render the code panel after the page DOM is injected.
  window.pageInit = window.pageInit || {};
  window.pageInit['broad-search-api'] = function(){ 
    window.bsaSetLang('python'); 
    if($('bsa-code'))refreshCode();
    const inp = $('bsa-query'); 
    if(inp){ 
      const EX=['compare frontier AI models in 2026','latest trends in the global AI chip market','best practices and pitfalls of RAG in production'];
      let ph=0, ch=0, del=false; 
      if(window.bsaTypeTimer) clearTimeout(window.bsaTypeTimer);
      (function tick(){ 
        const currentInp = $('bsa-query');
        if(!currentInp) return; 
        const cur=EX[ph]; 
        if(!del){
          ch++; 
          if(ch>cur.length){del=true; window.bsaTypeTimer=setTimeout(tick,1500); return;}
        } else {
          ch--; 
          if(ch<=0){del=false; ph=(ph+1)%EX.length;}
        } 
        if(!currentInp.value) currentInp.setAttribute('placeholder',cur.slice(0,Math.max(0,ch))); 
        window.bsaTypeTimer=setTimeout(tick, del?40:95); 
      })();
    }
  };
})();
