(function(){
  const PRIMARY = 'var(--color-accent)';
  const $=id=>document.getElementById(id);
  // ── animated rotating placeholder ──
  const EXAMPLES=['NVDA stock price','US jobs report February 2026','Dow Jones 50000 milestone date'];
  document.addEventListener('DOMContentLoaded',function(){
    const inp=$('ws-query'); if(!inp)return;
    let ph=0,ch=0,del=false;
    (function tick(){
      const cur=EXAMPLES[ph];
      if(!del){ ch++; if(ch>cur.length){ del=true; setTimeout(tick,1400); return; } }
      else { ch--; if(ch<=0){ del=false; ph=(ph+1)%EXAMPLES.length; } }
      if(!inp.value) inp.setAttribute('placeholder', cur.slice(0,Math.max(0,ch)));
      setTimeout(tick, del?45:95);
    })();
  });

  // ── date range calendar (aligned with Broad Search) ──
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
      return '<div onclick="wsPick('+d.getFullYear()+','+d.getMonth()+','+d.getDate()+')" style="text-align:center;height:30px;line-height:30px;font-size:12px;border-radius:7px;cursor:pointer;color:'+col+';background:'+bg+'">'+d.getDate()+'</div>'; }).join('');
    return h+'</div></div>';
  }
  function renderCal(){
    const pop=$('ws-date-pop'); if(!pop)return; const nm=nextM(cal);
    pop.innerHTML='<div style="display:flex;flex-direction:column;gap:2px;width:120px;border-right:1px solid #f1f5f9;padding-right:12px">'+
        [['Last 24 hours','day'],['Last week','week'],['Last month','month'],['Last year','year']].map(p=>'<button type="button" onclick="wsPreset(\''+p[1]+'\',\''+p[0]+'\')" onmouseenter="if(!this.dataset.on)this.style.background=\'#f8fafc\'" onmouseleave="if(!this.dataset.on)this.style.background=\'transparent\'" '+(cal.range===p[1]?'data-on="1"':'')+' style="text-align:left;padding:8px 10px;border-radius:7px;border:none;cursor:pointer;font-size:13px;'+(cal.range===p[1]?'background:#0398551a;color:#039855;font-weight:500':'background:transparent;color:#475569')+'">'+p[0]+'</button>').join('')+'</div>'+
      '<div><div style="display:flex;align-items:flex-start;gap:20px"><button type="button" onclick="wsCalNav(-1)" style="border:none;background:none;cursor:pointer;color:#64748b;font-size:16px;line-height:24px">‹</button><div style="display:flex;gap:20px;flex:1">'+monthGrid(cal.y,cal.m)+monthGrid(nm.y,nm.m)+'</div><button type="button" onclick="wsCalNav(1)" style="border:none;background:none;cursor:pointer;color:#64748b;font-size:16px;line-height:24px">›</button></div>'+
      '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px"><button type="button" onclick="wsClearRange()" style="padding:7px 14px;border-radius:8px;border:1px solid #e2e8f0;background:#fff;cursor:pointer;font-size:13px;color:#64748b">Clear</button><button type="button" onclick="wsApplyRange()" style="padding:7px 14px;border-radius:8px;border:none;background:'+PRIMARY+';cursor:pointer;font-size:13px;color:#fff;font-weight:500">Apply</button></div></div>';
  }
  function closeCal(){ cal.open=false; const p=$('ws-date-pop'); if(p)p.style.display='none'; }
  window.wsDateToggle=function(){ cal.open=!cal.open; const pop=$('ws-date-pop');
    if(cal.open){ pop.style.display='flex'; renderCal(); const btn=$('ws-date-btn').getBoundingClientRect(); pop.style.position='fixed'; pop.style.top=(btn.bottom+6)+'px'; pop.style.right='auto'; const w=pop.offsetWidth||620,vw=window.innerWidth; let left=Math.min(btn.right-w,vw-w-8); left=Math.max(8,left); pop.style.left=left+'px'; }
    else pop.style.display='none';
  };
  window.wsCalNav=function(d){ if(d>0){const n=nextM(cal);cal.y=n.y;cal.m=n.m;} else {cal.m=cal.m===0?11:cal.m-1; if(cal.m===11)cal.y--;} renderCal(); };
  window.wsPick=function(y,m,d){ cal.range=''; const dt=new Date(y,m,d); if(!cal.start||(cal.start&&cal.end)){cal.start=dt;cal.end=null;} else { if(dt<cal.start){cal.end=cal.start;cal.start=dt;} else cal.end=dt; } renderCal(); };
  function isoOf(d,end){ const pad=n=>String(n).padStart(2,'0'); return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+'T'+(end?'23:59:59':'00:00:00')+'+08:00'; }
  function shortD(d){ return MONTHS[d.getMonth()].slice(0,3)+' '+d.getDate(); }
  window.wsPreset=function(range,label){ cal.range=range; cal.start=null; cal.end=null; if($('ws-start'))$('ws-start').value=''; if($('ws-end'))$('ws-end').value=''; $('ws-date-label').textContent=label; $('ws-date-label').className='text-[#737373]'; closeCal(); wsRefreshCode(); };
  window.wsApplyRange=function(){ if(cal.start){ cal.range=''; $('ws-start').value=isoOf(cal.start,false); $('ws-end').value=isoOf(cal.end||cal.start,true); $('ws-date-label').textContent=cal.end?(shortD(cal.start)+' – '+shortD(cal.end)):shortD(cal.start); $('ws-date-label').className='text-[#737373]'; } closeCal(); wsRefreshCode(); };
  window.wsClearRange=function(){ cal.start=null; cal.end=null; cal.range=''; if($('ws-start'))$('ws-start').value=''; if($('ws-end'))$('ws-end').value=''; $('ws-date-label').textContent='Custom range'; $('ws-date-label').className='text-[#a3a3a3]'; closeCal(); wsRefreshCode(); };
  document.addEventListener('mousedown',function(e){ if(cal.open){ const wrap=$('ws-date-pop'); const btn=$('ws-date-btn'); if(wrap&&!wrap.contains(e.target)&&btn&&!btn.contains(e.target)) closeCal(); } });

  // ── Search request code-gen (3 langs, highlighted, dynamic) ──
  let wsLang='python';
  const val=id=>{const e=$(id);return e?e.value:'';};
  const lines2=v=>(v||'').split('\n').map(s=>s.trim()).filter(Boolean);
  function wsTb(){const a=document.querySelector('.ws-tb.on');return a?a.getAttribute('data-b'):'auto';}
  function wsBuildPayload(){
    const p={ query:(val('ws-query')||'').trim(), count:Number(val('ws-max'))||5, time_basis:wsTb(), topic:($('ws-topic')?$('ws-topic').value:'general') };
    if(val('ws-start')||val('ws-end')){ if(val('ws-start'))p.start_time=val('ws-start'); if(val('ws-end'))p.end_time=val('ws-end'); }
    else if(cal.range)p.time_range=cal.range;
    const inc=lines2(val('ws-inc')), exc=lines2(val('ws-exc')); if(inc.length)p.include_domains=inc; if(exc.length)p.exclude_domains=exc;
    if((val('ws-inctext')||'').trim())p.include_text=val('ws-inctext').trim();
    if((val('ws-exctext')||'').trim())p.exclude_text=val('ws-exctext').trim();
    const hl=$('ws-hl')&&$('ws-hl').checked; p.highlight={enable:!!hl,max_tokens:Number(val('ws-hltok'))||512};
    const fc=$('ws-fc')&&$('ws-fc').checked; p.full_content=fc?{enable:true,max_tokens:Number(val('ws-fctok'))||2048}:{enable:false};
    p.safesearch=$('ws-safe')?$('ws-safe').value:'off';
    return p;
  }
  function wsReqCode(){
    const p=wsBuildPayload(); const SZ=window.PGS_serialize||((v)=>JSON.stringify(v,null,2)); const KEY=(window.PGS_MASKED)||'YOUR_API_KEY';
    if(wsLang==='python')return ['import requests','import json','','url = "https://api.octen.ai/search"','headers = {','    "x-api-key": "'+KEY+'",','    "Content-Type": "application/json",','}','','payload = '+SZ(p,'python',0),'','response = requests.post(url, headers=headers, json=payload)','data = response.json()','print(json.dumps(data, indent=2))'].join('\n');
    if(wsLang==='javascript'){const b=SZ(p,'json',1);return ['const response = await fetch("https://api.octen.ai/search", {','  method: "POST",','  headers: {','    "x-api-key": "'+KEY+'",','    "Content-Type": "application/json",','  },','  body: JSON.stringify('+b+'),','});','','const data = await response.json();'].join('\n');}
    const json=SZ(p,'json',0).split('\n').map((l,i)=>i===0?l:'  '+l).join('\n');
    return ['curl https://api.octen.ai/search \\','  -X POST \\',"  -H 'x-api-key: "+KEY+"' \\","  -H 'Content-Type: application/json' \\","  -d '"+json+"'"].join('\n');
  }
  window.wsRefreshCode=function(){ const el=$('ws-code'); if(!el)return;
    if(window.PGS_codeBlock){ el.innerHTML=window.PGS_codeBlock(wsReqCode(),window.PGS_hlCode); if(el.firstChild)el.firstChild.style.maxHeight="560px"; }
    else el.textContent=wsReqCode();
    document.querySelectorAll('.ws-lang').forEach(b=>{const on=b.getAttribute('data-l')===wsLang;b.style.cssText='padding:6px 12px;font-size:12px;cursor:pointer;'+(b.getAttribute('data-l')!=='python'?'border-left:1px solid #e2e8f0;':'')+(on?'background:#0398551a;color:#039855;font-weight:500':'background:#fff;color:#475569');});
  };
  window.wsSetLang=function(l){ wsLang=l; wsRefreshCode(); };
  window.wsBasis=function(b){ document.querySelectorAll('.ws-tb').forEach(x=>{const on=x.getAttribute('data-b')===b;x.classList.toggle('on',on);x.style.cssText='padding:4px 10px;font-size:12px;cursor:pointer;'+(x.getAttribute('data-b')!=='crawled'?'border-right:1px solid #e2e8f0;':'')+(on?'background:#0398551a;color:#039855;font-weight:500':'background:#fff;color:#64748b');}); wsRefreshCode(); };
  window.wsCopyReq=function(){ try{navigator.clipboard&&navigator.clipboard.writeText(wsReqCode());}catch(e){} const b=$('ws-copyreq'); if(b){const o=b.innerHTML;b.innerHTML='<svg class="w-3.5 h-3.5" style="color:#039855" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Copied</span>';setTimeout(()=>b.innerHTML=o,1500);} };
  // ── shared query-suggestion dropdown (focus to pick an example) ──
  window.attachSuggest=function(input, examples, onPick, anchor){
    if(!input||input.dataset.suggest)return; input.dataset.suggest='1'; const anc=anchor||input;
    const ICON='<svg style="width:16px;height:16px;color:#039855;flex-shrink:0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35"/></svg>';
    const dd=document.createElement('div'); dd.style.cssText='position:fixed;z-index:80;background:#fff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 10px 28px rgba(15,23,42,0.14);padding:6px;display:none';
    dd.innerHTML=examples.map(ex=>'<button type="button" data-ex="'+ex.replace(/"/g,'&quot;')+'" style="display:flex;align-items:center;gap:10px;width:100%;text-align:left;padding:9px 12px;border:none;background:none;border-radius:8px;cursor:pointer;font-size:14px;color:#334155">'+ICON+'<span>'+ex.replace(/</g,'&lt;')+'</span></button>').join('');
    document.body.appendChild(dd);
    dd.querySelectorAll('button[data-ex]').forEach(b=>{
      b.addEventListener('mouseenter',()=>b.style.background='#f1f5f9');
      b.addEventListener('mouseleave',()=>b.style.background='none');
      b.addEventListener('mousedown',e=>{ e.preventDefault(); input.value=b.getAttribute('data-ex'); if(onPick)onPick(); dd.style.display='none'; });
    });
    function pos(){ const r=anc.getBoundingClientRect(); dd.style.left=r.left+'px'; dd.style.top=(r.bottom+6)+'px'; dd.style.width=Math.max(r.width,260)+'px'; }
    function show(){ pos(); dd.style.display='block'; }
    function hide(){ dd.style.display='none'; }
    input.addEventListener('focus',show);
    input.addEventListener('click',show);
    input.addEventListener('blur',()=>setTimeout(hide,150));
    window.addEventListener('scroll',()=>{ if(dd.style.display!=='none')pos(); },true);
  };

  document.addEventListener('DOMContentLoaded',function(){ const tb=document.querySelector('.ws-tb[data-b="auto"]'); if(tb)tb.classList.add('on'); const wq=document.getElementById('ws-query'); if(wq)wq.addEventListener('input',wsRefreshCode); if($('ws-code'))wsRefreshCode();
    if(wq) window.attachSuggest(wq, EXAMPLES, ()=>{ wq.dispatchEvent(new Event('input',{bubbles:true})); });
    const bq=document.getElementById('bsa-query'); if(bq) window.attachSuggest(bq, ['What are AI agents actually being used for in production?','NVIDIA vs AMD stock performance','What are the most promising AI startups to watch right now?'], ()=>{ bq.dispatchEvent(new Event('input',{bubbles:true})); }, document.getElementById('bsa-query-box'));
  });
})();