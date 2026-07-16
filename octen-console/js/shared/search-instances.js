(function(){
  const PRIMARY = 'var(--color-accent)', CODE_BG='#0d1117', FB='#e2e8f0', CARD='#ecedf0', HEAD='#1e293b', MONO='"JetBrains Mono",ui-monospace,"SF Mono",Menlo,Consolas,monospace';
  const C_KEY='#7ee787',C_STR='#a5d6ff',C_NUM='#79c0ff',C_KW='#ff7b72',C_DEF='#c9d1d9';
  const MASKED='octen-7c2b••••••••••••••••••••••••5f0a', B64_IMG='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...';
  const MAX_IMAGES=5;
  const $=id=>document.getElementById(id);
  const esc=s=>(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const domainOf=u=>{try{return new URL(u).hostname.replace(/^www\./,'');}catch(e){return u;}};
  const nameFromUrl=u=>{try{const p=new URL(u).pathname.split('/').filter(Boolean).pop();return p||domainOf(u);}catch(e){return u;}};
  const fmtDate=iso=>{if(!iso)return'';const d=new Date(iso),p=n=>String(n).padStart(2,'0');return d.getFullYear()+'/'+p(d.getMonth()+1)+'/'+p(d.getDate());};
  const fmtDur=s=>{const m=Math.floor(s/60),ss=s%60;return m+':'+String(ss).padStart(2,'0');};
  const svgUri=s=>'data:image/svg+xml,'+encodeURIComponent(s);
  // serialize + highlight (shared)
  function indent(n){return '  '.repeat(n);}
  function serialize(v,lang,lvl){ lvl=lvl||0;
    if(v===null||v===undefined)return lang==='python'?'None':'null';
    if(typeof v==='boolean')return lang==='python'?(v?'True':'False'):String(v);
    if(typeof v==='number')return String(v);
    if(typeof v==='string')return JSON.stringify(v);
    if(Array.isArray(v)){ if(!v.length)return'[]'; return '[\n'+v.map(x=>indent(lvl+1)+serialize(x,lang,lvl+1)).join(',\n')+'\n'+indent(lvl)+']'; }
    const ks=Object.keys(v); if(!ks.length)return'{}';
    return '{\n'+ks.map(k=>indent(lvl+1)+JSON.stringify(k)+': '+serialize(v[k],lang,lvl+1)).join(',\n')+'\n'+indent(lvl)+'}';
  }
  window.PGS_serialize=serialize;
  function hlCode(line){const toks=[];const re=/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g;let last=0,m;const plain=t=>{const pr=/(\b(?:import|from|const|let|var|await|async|function|return|print|new)\b)|(\b(?:True|False|None|true|false|null)\b)|(\b\d+(?:\.\d+)?\b)/g;let l=0,mm;while((mm=pr.exec(t))){if(mm.index>l)toks.push({t:t.slice(l,mm.index),c:C_DEF});if(mm[1])toks.push({t:mm[0],c:C_KW});else toks.push({t:mm[0],c:C_NUM});l=mm.index+mm[0].length;}if(l<t.length)toks.push({t:t.slice(l),c:C_DEF});};while((m=re.exec(line))){if(m.index>last)plain(line.slice(last,m.index));toks.push({t:m[0],c:C_STR});last=m.index+m[0].length;}if(last<line.length)plain(line.slice(last));if(!toks.length)toks.push({t:line,c:C_DEF});return toks;}
  function hlJson(line){const toks=[];const re=/("(?:[^"\\]|\\.)*")(\s*:)?|(\b\d+(?:\.\d+)?\b)|(\btrue\b|\bfalse\b|\bnull\b)/g;let last=0,m;while((m=re.exec(line))){if(m.index>last)toks.push({t:line.slice(last,m.index),c:C_DEF});if(m[1]!==undefined){if(m[2]){toks.push({t:m[1],c:C_KEY});toks.push({t:m[2],c:C_DEF});}else toks.push({t:m[1],c:C_STR});}else if(m[3]!==undefined)toks.push({t:m[3],c:C_NUM});else if(m[4]!==undefined)toks.push({t:m[4],c:C_KW});last=m.index+m[0].length;}if(last<line.length)toks.push({t:line.slice(last),c:C_DEF});if(!toks.length)toks.push({t:line,c:C_DEF});return toks;}
  function codeBlock(code,hl){const lines=code.split('\n');const nums=lines.map((_,i)=>'<div>'+(i+1)+'</div>').join('');const body=lines.map(ln=>'<div>'+hl(ln).map(tk=>'<span style="color:'+tk.c+'">'+esc(tk.t)+'</span>').join('')+(ln===''?'​':'')+'</div>').join('');return '<div style="max-height:560px;overflow:auto;background:'+CODE_BG+';padding:14px 0"><div style="display:flex;width:max-content;min-width:100%;font-family:'+MONO+';font-size:12.5px;line-height:21px"><div style="flex-shrink:0;text-align:right;color:#6e7681;user-select:none;padding:0 16px">'+nums+'</div><div style="flex:1;padding-right:16px;white-space:pre">'+body+'</div></div></div>';}

  // SVG thumbnails
  const T_DASH=svgUri("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='#f1f5f9'/><rect width='84' height='300' fill='#fff'/><circle cx='24' cy='30' r='8' fill='#039855'/><rect x='104' y='24' width='120' height='12' rx='6' fill='#1e293b'/><rect x='104' y='60' width='86' height='62' rx='10' fill='#fff' stroke='#e2e8f0'/><rect x='200' y='60' width='86' height='62' rx='10' fill='#ecfdf5' stroke='#a7f3d0'/><polyline points='118,238 158,210 198,224 238,180 278,196 318,150 360,168' fill='none' stroke='#039855' stroke-width='3'/></svg>");
  const T_PRICING=svgUri("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#0f766e'/><stop offset='1' stop-color='#059669'/></linearGradient></defs><rect width='400' height='300' fill='url(#g)'/><rect x='152' y='62' width='96' height='200' rx='14' fill='#fff'/><rect x='168' y='216' width='64' height='22' rx='11' fill='#059669'/></svg>");
  const T_MOBILE=svgUri("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='#eef2ff'/><rect x='150' y='30' width='100' height='240' rx='20' fill='#fff' stroke='#c7d2fe' stroke-width='2'/><circle cx='200' cy='96' r='28' fill='#e0e7ff'/><path d='M188 96 l8 8 l16 -16' fill='none' stroke='#6366f1' stroke-width='3'/></svg>");
  const T_DARK=svgUri("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='#0b1220'/><rect width='80' height='300' fill='#111a2e'/><circle cx='22' cy='28' r='7' fill='#22d3ee'/><polyline points='112,128 142,104 172,116 202,84 222,100' fill='none' stroke='#22d3ee' stroke-width='3'/><rect x='306' y='90' width='14' height='44' rx='2' fill='#34d399'/></svg>");
  const T_GLASS=svgUri("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='gg' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#7c3aed'/><stop offset='0.5' stop-color='#db2777'/><stop offset='1' stop-color='#f59e0b'/></linearGradient></defs><rect width='400' height='300' fill='url(#gg)'/><rect x='70' y='90' width='260' height='120' rx='18' fill='#fff' opacity='0.22'/></svg>");

  // mixed result pool (dpub/dcrawl = days offset)
  const POOL=[
    {type:'image',title:'Minimal SaaS Dashboard — Analytics Overview',url:T_DASH,source_page:'https://dribbble.com/shots/analytics-dashboard',authors:'Dribbble',description:'Clean light-theme analytics dashboard with sidebar, KPI cards and a weekly revenue line chart.',summary:'Category: Dashboard\nStyle: Minimal, light, single accent\nPalette: #FFFFFF / #F8FAFC / #039855',snippet:'<div class="kpi-card"><span>Revenue</span></div>',dpub:-1,dcrawl:-1},
    {type:'text',title:'Designing for Dark Mode: Surfaces, Accents & Contrast',url:'https://uxdesign.cc/dark-mode-guide',authors:'UX Collective',favicon:'https://uxdesign.cc/favicon.ico',highlight:'Dark mode is more than inverting colors: use layered dark grays instead of pure black to convey elevation, desaturate accent hues, and keep body text near a 7:1 contrast ratio…',full_content:'Dark mode has moved from a novelty to a baseline expectation.\n\n## Surfaces and elevation\nAvoid pure #000 backgrounds; layer dark grays so higher surfaces read as closer.\n\n## Accent colors\nDesaturate by 10–20% and re-check contrast.',cover:T_DARK,dpub:-2,dcrawl:-1},
    {type:'video',title:'Building a Mobile Onboarding Flow (Figma → Code)',url:'https://www.youtube.com/watch?v=onboard',source_page:'https://www.youtube.com/watch?v=onboard',cover_url:T_MOBILE,description:'A 20-minute walkthrough turning a fintech onboarding design into a working prototype.',duration_seconds:1245,authors:'DesignCourse',dpub:-5,dcrawl:-4},
    {type:'image',title:'Gradient Pricing Page Concept',url:T_PRICING,source_page:'https://www.behance.net/gallery/pricing-page',authors:'Behance',description:'Three-tier pricing layout on a teal-to-emerald gradient with the recommended plan raised.',summary:'Category: Landing / Pricing\nStyle: Bold gradient, rounded cards',snippet:'<button class="btn-primary">Choose plan</button>',dpub:-3,dcrawl:-2},
    {type:'text',title:'Why Three-Tier Pricing Converts',url:'https://cxl.com/blog/pricing-tiers',authors:'CXL',favicon:'https://cxl.com/favicon.ico',highlight:'Three-tier layouts work because they anchor the middle plan as the default choice. A single emphasized CTA and an annual toggle account for most of the conversion lift…',full_content:'Pricing pages carry disproportionate revenue weight.\n\n## Anchor with three tiers\nThe middle plan becomes the reference point.\n\n## One primary action\nEmphasize a single CTA per card.',dpub:-8,dcrawl:-6},
    {type:'video',title:'Dark Analytics Console UI Kit — Speed Build',url:'https://www.youtube.com/watch?v=darkkit',source_page:'https://www.youtube.com/watch?v=darkkit',cover_url:T_DARK,description:'Timelapse building a dense dark-theme console with neon accents.',duration_seconds:1180,authors:'Flux Academy',dpub:-12,dcrawl:-9},
    {type:'image',title:'Glassmorphism Landing Hero',url:T_GLASS,source_page:'https://www.behance.net/gallery/glass-hero',authors:'Behance',description:'Vibrant gradient hero with a frosted glass panel and high-contrast pill CTA.',summary:'Category: Landing\nStyle: Glassmorphism, blur, vivid gradient',snippet:'<div class="hero-glass"><h1>Design, searchable.</h1></div>',dpub:-16,dcrawl:-11},
    {type:'image',title:'Mobile Banking App — Onboarding',url:T_MOBILE,source_page:'https://mobbin.com/screens/banking',authors:'Mobbin',description:'Soft rounded onboarding screens for a fintech app with paged dots and primary action.',summary:'Category: Mobile\nStyle: Soft, rounded, indigo accent',snippet:'<div class="onboard"><h2>You are all set</h2></div>',dpub:-20,dcrawl:-14},
  ];
  const PHRASES=['modern dark navigation bar with logo','SaaS pricing section with three tiers','footer with link columns and newsletter'];

  // ── instance factory ──
  const INST={};
  function init(cfg){
    const I={ cfg:cfg, text:'', images:[], attachMenu:false, topic:'general', max:'10', basis:'auto',
      timeRange:'', start:'', end:'', dateLabel:'', safesearch:'strict',
      mods: cfg.modalities.slice(), html:false, htmlTokens:'5000', hl:true, fc:false, fcTokens:'2048',
      tab:'request', lang:'python', rtab:'preview', loading:false, result:null, took:0, attId:1,
      cal:{open:false,y:2026,m:5,s:null,e:null}, expanded:{} };
    INST[cfg.key]=I;
    buildShell(I);
    return I;
  }
  const K=I=>I.cfg.key;

  function buildShell(I){
    const k=K(I), c=I.cfg;
    const root=$(c.rootId); if(!root)return;
    root.innerHTML =
    '<div class="grid lg:grid-cols-2 gap-4">'+
      // LEFT
      '<div style="min-width:0;background:#fff;border:1px solid '+CARD+';border-radius:10px;padding:16px">'+
        '<div class="flex items-center justify-between" style="margin-bottom:18px"><h2 style="font-size:17px;font-weight:600;color:'+HEAD+';margin:0">Configuration</h2>'+
          '<a href="#" onclick="go(\'web-search\');return false" class="inline-flex items-center" style="gap:6px;height:32px;padding:0 10px;border:1px solid '+FB+';border-radius:10px;font-size:12px;font-weight:500;color:#64748b;text-decoration:none"><svg style="width:14px;height:14px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> Docs</a></div>'+
        // Inputs composer
        '<div style="margin-bottom:22px"><label style="display:block;font-size:14px;font-weight:500;color:'+HEAD+';margin-bottom:8px">Inputs <span style="color:#ef4444">*</span></label>'+
          '<div id="'+k+'-dz" style="border:1px solid '+FB+';border-radius:12px;background:#fff;padding:10px">'+
            '<div id="'+k+'-thumbs" class="flex flex-wrap" style="gap:8px"></div>'+
            '<textarea id="'+k+'-text" maxlength="500" rows="2" placeholder="" style="width:100%;box-sizing:border-box;border:none;outline:none;resize:none;font-size:14px;line-height:21px;color:#0f172b;background:transparent;font-family:inherit;padding:4px 6px"></textarea>'+
            '<div class="flex items-center justify-between" style="margin-top:6px"><div id="'+k+'-attwrap" class="flex items-center" style="gap:8px;position:relative">'+
              '<button type="button" id="'+k+'-addimg" onclick="PGS_attach(\''+k+'\')" class="inline-flex items-center" style="gap:6px;height:32px;padding:0 11px;border:1px solid '+FB+';border-radius:8px;background:#fff;font-size:13px;color:#475569;cursor:pointer"><svg style="width:15px;height:15px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 15l-5-5L5 21"/></svg> Add image <svg style="width:13px;height:13px;opacity:0.6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg></button>'+
              '<div id="'+k+'-pop" class="hidden" style="position:absolute;top:calc(100% + 8px);left:0;z-index:40;width:258px;background:#fff;border:1px solid '+FB+';border-radius:10px;box-shadow:0 10px 28px rgba(15,23,42,0.14);padding:8px"></div></div>'+
              '<input id="'+k+'-file" type="file" accept="image/*" multiple style="display:none"/>'+
              '<div class="flex items-center" style="gap:8px"><button type="button" onclick="PGS_clear(\''+k+'\')" class="inline-flex items-center" style="gap:6px;height:32px;padding:0 12px;border:1px solid '+FB+';border-radius:8px;background:#fff;color:#64748b;font-size:13px;font-weight:500;cursor:pointer"><svg style="width:13px;height:13px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M1 4v6h6M23 20v-6h-6"/><path stroke-linecap="round" stroke-linejoin="round" d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg> Clear</button>'+
              '<button type="button" id="'+k+'-run" onclick="PGS_run(\''+k+'\')" class="inline-flex items-center" style="gap:6px;height:32px;padding:0 16px;border:none;border-radius:8px;background:'+PRIMARY+';color:#fff;font-size:13px;font-weight:500;cursor:not-allowed;opacity:0.5"><svg style="width:13px;height:13px" fill="#fff" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg> Run</button></div>'+
            '</div></div><div id="'+k+'-atterr" style="font-size:12px;color:#ef4444;margin:6px 2px 0"></div></div>'+
        // Basic settings
        '<div style="margin-bottom:22px"><h3 class="pgs-h">Basic settings</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;row-gap:14px">'+
          (c.topic?'<div><span class="pgs-l">Topic</span><select id="'+k+'-topic" class="pgs-f" onchange="PGS_set(\''+k+'\',\'topic\',this.value)"><option value="general">general</option><option value="news">news</option><option value="design">design</option></select></div>':'')+
          '<div><span class="pgs-l">Output modalities</span>'+(c.selectable?
            '<div class="inline-flex" style="border:1px solid '+FB+';border-radius:8px;overflow:hidden;width:100%">'+['text','image','video'].map((mm,i)=>'<button type="button" class="'+k+'-mod" data-m="'+mm+'" onclick="PGS_toggleMod(\''+k+'\',\''+mm+'\')" style="flex:1;padding:6px 4px;font-size:11px;'+(i<2?'border-right:1px solid '+FB+';':'')+'">'+mm+'</button>').join('')+'</div>'
            :'<div class="pgs-fake">'+c.modalities[0]+'</div>')+'</div>'+
          '<div><span class="pgs-l">Max results</span><input id="'+k+'-max" type="number" min="1" max="100" value="10" class="pgs-f" oninput="PGS_set(\''+k+'\',\'max\',this.value)"/></div>'+
        '</div></div>'+
        // Filters
        '<div style="margin-bottom:22px"><h3 class="pgs-h">Filters</h3>'+
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:6px"><div><span class="pgs-l">Time basis</span><div class="inline-flex" style="border:1px solid '+FB+';border-radius:999px;overflow:hidden;height:33px">'+
            ['auto','published','crawled'].map((b,i)=>'<button type="button" class="'+k+'-tb pgs-seg" data-b="'+b+'" onclick="PGS_basis(\''+k+'\',\''+b+'\')"'+(i<2?' style2':'')+'>'+(b[0].toUpperCase()+b.slice(1))+'</button>').join('')+'</div></div>'+
            '<div class="relative"><span class="pgs-l">Date range</span><button type="button" id="'+k+'-datebtn" onclick="PGS_dateToggle(\''+k+'\')" class="w-full flex items-center" style="gap:8px;padding:8px 10px;border:1px solid '+FB+';border-radius:10px;background:#fff;font-size:13px;color:#94a3b8;cursor:pointer"><svg style="width:15px;height:15px;color:#94a3b8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path stroke-linecap="round" d="M16 2v4M8 2v4M3 10h18"/></svg><span id="'+k+'-datelbl">Custom range</span></button><div id="'+k+'-datepop" style="display:none;position:absolute;top:calc(100% + 6px);right:0;z-index:60;background:#fff;border:1px solid '+FB+';border-radius:12px;box-shadow:0 12px 32px rgba(15,23,42,0.16);padding:14px;gap:12px"></div></div></div>'+
          '<p style="font-size:12px;color:#94a3b8;margin:0 0 14px">Auto prefers published time and falls back to crawled time.</p>'+
          '<div style="margin-bottom:14px"><span class="pgs-l">Include domains</span><textarea id="'+k+'-inc" rows="2" placeholder="e.g. octen.ai (one per line)" class="pgs-f" style="height:auto;padding:8px 10px" oninput="PGS_code(\''+k+'\')"></textarea></div>'+
          '<div><span class="pgs-l">Exclude domains</span><textarea id="'+k+'-exc" rows="2" placeholder="e.g. octen.ai (one per line)" class="pgs-f" style="height:auto;padding:8px 10px" oninput="PGS_code(\''+k+'\')"></textarea></div>'+
        '</div>'+
        // Output options
        '<div><h3 class="pgs-h">Output options</h3><div id="'+k+'-outopts" style="display:flex;flex-direction:column;gap:14px"></div></div>'+
      '</div>'+
      // RIGHT
      '<div style="min-width:0;display:flex;flex-direction:column;background:#fff;border:1px solid '+CARD+';border-radius:10px;overflow:hidden;align-self:start">'+
        '<div style="display:flex;border-bottom:1px solid '+CARD+'"><button type="button" id="'+k+'-tab-req" onclick="PGS_tab(\''+k+'\',\'request\')" class="pgs-mtab">request</button><button type="button" id="'+k+'-tab-res" onclick="PGS_tab(\''+k+'\',\'response\')" class="pgs-mtab">response</button></div>'+
        '<div id="'+k+'-sub-req" class="flex items-center justify-between" style="padding:10px 16px;border-bottom:1px solid '+CARD+'"><div class="inline-flex" style="border:1px solid '+FB+';border-radius:999px;overflow:hidden;height:30px">'+
          ['python','javascript','curl'].map((l,i)=>'<button type="button" class="'+k+'-lang pgs-lang" data-l="'+l+'" onclick="PGS_lang(\''+k+'\',\''+l+'\')"'+(i>0?' style="border-left:1px solid '+FB+'"':'')+'>'+(l==='curl'?'cURL':l[0].toUpperCase()+l.slice(1))+'</button>').join('')+'</div>'+
          '<button type="button" onclick="PGS_copyReq(\''+k+'\')" id="'+k+'-copyreq" class="inline-flex items-center" style="gap:5px;border:none;background:none;cursor:pointer;font-size:13px;color:#64748b"><svg style="width:14px;height:14px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy</button></div>'+
        '<div id="'+k+'-sub-res" class="hidden flex items-center justify-between" style="padding:10px 16px;border-bottom:1px solid '+CARD+'"><div class="inline-flex" style="border:1px solid '+FB+';border-radius:8px;overflow:hidden;height:30px"><button type="button" class="'+k+'-rt pgs-rt" data-r="json" onclick="PGS_rtab(\''+k+'\',\'json\')">JSON</button><button type="button" class="'+k+'-rt pgs-rt" data-r="preview" onclick="PGS_rtab(\''+k+'\',\'preview\')" style="border-left:1px solid '+FB+'">Preview</button></div>'+
          '<div class="flex items-center" style="gap:12px"><span id="'+k+'-took" style="font-size:12px;color:#94a3b8"></span><button type="button" onclick="PGS_copyResp(\''+k+'\')" id="'+k+'-copyresp" class="inline-flex items-center" style="gap:5px;border:none;background:none;cursor:pointer;font-size:13px;color:#64748b"><svg style="width:14px;height:14px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy</button></div></div>'+
        '<div id="'+k+'-content" style="display:flex;flex-direction:column"></div>'+
      '</div>'+
    '</div>';
    // bind composer text
    const ta=$(k+'-text'); ta.addEventListener('input',e=>{I.text=e.target.value;renderRun(I);PGS_code(k);});
    ta.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();PGS_run(k);}});
    // animated placeholder
    let ph=0,ch=0,del=false;(function tick(){const cur=PHRASES[ph];if(!del){ch++;if(ch>cur.length){del=true;setTimeout(tick,1500);return;}}else{ch--;if(ch<=0){del=false;ph=(ph+1)%PHRASES.length;}}if(!ta.value)ta.setAttribute('placeholder',cur.slice(0,Math.max(0,ch)));setTimeout(tick,del?40:95);})();
    // file input
    $(k+'-file').addEventListener('change',e=>{onFiles(I,e.target.files);e.target.value='';});
    // dropzone
    const dz=$(k+'-dz');
    dz.addEventListener('dragover',e=>{e.preventDefault();dz.style.borderColor=PRIMARY;dz.style.background='#f0fdf4';});
    dz.addEventListener('dragleave',e=>{e.preventDefault();dz.style.borderColor=FB;dz.style.background='#fff';});
    dz.addEventListener('drop',e=>{e.preventDefault();dz.style.borderColor=FB;dz.style.background='#fff';onFiles(I,e.dataTransfer.files);});
    // time basis seg style fix
    document.querySelectorAll('.'+k+'-tb').forEach(b=>{ b.style.cssText='padding:0 12px;font-size:12px;cursor:pointer;border:none;'+(b.dataset.b!=='auto'?'border-left:1px solid '+FB+';':''); });
    renderBasis(I); renderMods(I); renderOutOpts(I); renderThumbs(I); renderRun(I); renderTabs(I); renderContent(I);
  }

  function onFiles(I,files){ if(!files||!files.length)return; let err=''; const k=K(I);
    for(let i=0;i<files.length;i++){const f=files[i]; if(!f.type.startsWith('image/')){err='Unsupported file type.';continue;} if(f.size>5*1024*1024){err='"'+f.name+'" exceeds 5 MB.';continue;} if(I.images.length>=MAX_IMAGES){err='Up to '+MAX_IMAGES+' images.';continue;} I.images.push({id:I.attId++,mode:'file',name:f.name,preview:URL.createObjectURL(f),url:''});}
    $(k+'-atterr').textContent=err; renderThumbs(I); renderRun(I); PGS_code(k);
  }

  // ── renderers ──
  function renderThumbs(I){ const k=K(I); const wrap=$(k+'-thumbs');
    wrap.innerHTML=I.images.map(im=>{const src=im.mode==='url'?im.url:im.preview;return '<div style="position:relative;width:52px;height:52px"><img src="'+src+'" onerror="this.style.display=\'none\'" title="'+esc(im.name)+'" style="width:52px;height:52px;object-fit:cover;border-radius:8px;border:1px solid '+FB+';display:block"/><button type="button" onclick="PGS_rmImg(\''+k+'\','+im.id+')" style="position:absolute;top:-6px;right:-6px;width:18px;height:18px;border-radius:999px;border:2px solid #fff;background:#0f172a;color:#fff;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;padding:0"><svg style="width:11px;height:11px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>';}).join('');
    wrap.style.marginBottom=I.images.length?'10px':'0';
  }
  function renderRun(I){ const has=!!I.text.trim()||I.images.length>0; const dis=!has||I.loading; const b=$(K(I)+'-run'); b.style.cursor=dis?'not-allowed':'pointer'; b.style.opacity=dis?'0.5':'1'; }
  function renderBasis(I){ const k=K(I); document.querySelectorAll('.'+k+'-tb').forEach(x=>x.classList.toggle('on',x.dataset.b===I.basis)); document.querySelectorAll('.'+k+'-tb').forEach(x=>{const on=x.dataset.b===I.basis;x.style.background=on?'#f0fdf4':'#fff';x.style.color=on?'#15803d':'#64748b';x.style.fontWeight=on?'500':'400';}); }
  function renderMods(I){ const k=K(I); if(!I.cfg.selectable)return; document.querySelectorAll('.'+k+'-mod').forEach(x=>{const on=I.mods.includes(x.dataset.m);x.style.cssText='flex:1;padding:6px 4px;font-size:11px;'+(x.dataset.m!=='video'?'border-right:1px solid '+FB+';':'')+(on?'background:#0398551a;color:#039855;font-weight:500':'background:#fff;color:#475569');}); }
  function renderOutOpts(I){ const k=K(I), c=I.cfg; let h='';
    if(c.highlightFull){
      h+='<div class="flex items-start justify-between" style="gap:12px"><div style="flex:1"><label class="flex items-center" style="gap:8px;font-size:12px;font-weight:500;color:#334155;cursor:pointer"><input type="checkbox" '+(I.hl?'checked':'')+' onchange="PGS_set(\''+k+'\',\'hl\',this.checked)" style="width:16px;height:16px;accent-color:'+PRIMARY+'"/> Return highlights</label><p style="color:#64748b;margin:4px 0 0 24px;font-size:11px">Query-relevant highlights for text results.</p></div></div>';
      h+='<div class="flex items-start justify-between" style="gap:12px"><div style="flex:1"><label class="flex items-center" style="gap:8px;font-size:12px;font-weight:500;color:#334155;cursor:pointer"><input type="checkbox" '+(I.fc?'checked':'')+' onchange="PGS_set(\''+k+'\',\'fc\',this.checked)" style="width:16px;height:16px;accent-color:'+PRIMARY+'"/> Return full content</label><p style="color:#64748b;margin:4px 0 0 24px;font-size:11px">Full page content for text results.</p></div>'+(I.fc?'<div><span class="pgs-l">Max tokens</span><input type="number" value="'+I.fcTokens+'" oninput="PGS_set(\''+k+'\',\'fcTokens\',this.value)" class="pgs-f" style="width:110px"/></div>':'')+'</div>';
    }
    if(c.htmlSnippet){
      const showHtml = I.topic==='design' && I.mods.includes('image');
      h+='<div class="flex items-start justify-between" style="gap:12px;'+(showHtml?'':'opacity:0.45')+'"><div style="flex:1"><label class="flex items-center" style="gap:8px;font-size:12px;font-weight:500;color:#334155;cursor:'+(showHtml?'pointer':'default')+'"><input type="checkbox" '+(I.html?'checked':'')+' '+(showHtml?'':'disabled')+' onchange="PGS_set(\''+k+'\',\'html\',this.checked)" style="width:16px;height:16px;accent-color:'+PRIMARY+'"/> Return HTML snippet</label><p style="color:#64748b;margin:4px 0 0 24px;font-size:11px">Reusable HTML/CSS per image result (topic=design only).</p></div>'+(I.html&&showHtml?'<div><span class="pgs-l">Max tokens</span><input type="number" value="'+I.htmlTokens+'" oninput="PGS_set(\''+k+'\',\'htmlTokens\',this.value)" class="pgs-f" style="width:110px"/></div>':'')+'</div>';
    }
    h+='<div style="max-width:220px"><span class="pgs-l">Safesearch</span><select id="'+k+'-ss" class="pgs-f" onchange="PGS_set(\''+k+'\',\'safesearch\',this.value)"><option value="strict">strict</option><option value="off">off</option></select></div>';
    $(k+'-outopts').innerHTML=h;
    const ss=$(k+'-ss'); if(ss)ss.value=I.safesearch;
  }
  function renderTabs(I){ const k=K(I);
    $(k+'-tab-req').classList.toggle('on',I.tab==='request'); $(k+'-tab-res').classList.toggle('on',I.tab==='response');
    [['req','request'],['res','response']].forEach(([s,t])=>{const el=$(k+'-tab-'+s);const on=I.tab===t;el.style.cssText='flex:1;height:46px;border:none;cursor:pointer;font-size:14px;text-transform:capitalize;'+(on?'background:#eaf4ee;color:'+PRIMARY+';font-weight:500;border-bottom:2px solid '+PRIMARY:'background:transparent;color:#64748b;border-bottom:2px solid transparent');});
    $(k+'-sub-req').classList.toggle('hidden',I.tab!=='request'); $(k+'-sub-res').classList.toggle('hidden',I.tab!=='response'); $(k+'-sub-res').style.display=I.tab==='response'?'flex':'none';
    $(k+'-took').textContent=I.result?('Response '+I.took+' ms'):'';
    document.querySelectorAll('.'+k+'-lang').forEach(b=>{const on=b.dataset.l===I.lang;b.style.cssText='padding:0 12px;font-size:12px;cursor:pointer;border:none;'+(b.dataset.l!=='python'?'border-left:1px solid '+FB+';':'')+(on?'background:#f0fdf4;color:#15803d;font-weight:500':'background:#fff;color:#64748b');});
    document.querySelectorAll('.'+k+'-rt').forEach(b=>{const on=b.dataset.r===I.rtab;b.style.cssText='padding:0 12px;font-size:12px;cursor:pointer;border:none;'+(b.dataset.r!=='json'?'border-left:1px solid '+FB+';':'')+(on?'background:#f0fdf4;color:#15803d;font-weight:500':'background:#fff;color:#64748b');});
  }

  // ── payload + response ──
  function buildPayload(I){ const c=I.cfg;
    const inputs=[]; if(I.text.trim())inputs.push({type:'text',data:I.text.trim()});
    I.images.forEach(im=>inputs.push(im.mode==='url'?{type:'image',url:im.url}:{type:'image',data:B64_IMG}));
    const p={inputs:inputs}; if(c.topic)p.topic=I.topic;
    p.output_modalities=c.selectable?I.mods.slice():c.modalities.slice();
    p.count=Number(I.max)||10;
    const inc=($(K(I)+'-inc').value||'').split('\n').map(s=>s.trim()).filter(Boolean);
    const exc=($(K(I)+'-exc').value||'').split('\n').map(s=>s.trim()).filter(Boolean);
    if(inc.length)p.include_domains=inc; if(exc.length)p.exclude_domains=exc;
    p.time_basis=I.basis; if(I.start)p.start_time=I.start; if(I.end)p.end_time=I.end; else if(I.timeRange)p.time_range=I.timeRange;
    p.safesearch=I.safesearch;
    if(c.highlightFull){ p.highlight=I.hl?{enable:true}:{enable:false}; p.full_content=I.fc?{enable:true,max_tokens:Number(I.fcTokens)||2048}:{enable:false}; }
    if(c.htmlSnippet && I.topic==='design' && p.output_modalities.includes('image')){ p.html_snippet=I.html?{enable:true,max_tokens:Number(I.htmlTokens)||5000}:{enable:false}; }
    return p;
  }
  function requestCode(I){ const p=buildPayload(I);
    if(I.lang==='python')return ['import requests','import json','','url = "https://api.octen.ai/multimodal-search"','headers = {','    "x-api-key": "'+MASKED+'",','    "Content-Type": "application/json",','}','','payload = '+serialize(p,'python',0),'','response = requests.post(url, headers=headers, json=payload)','data = response.json()','print(json.dumps(data, indent=2))'].join('\n');
    if(I.lang==='javascript'){const b=serialize(p,'json',1);return ['const response = await fetch("https://api.octen.ai/multimodal-search", {','  method: "POST",','  headers: {','    "x-api-key": "'+MASKED+'",','    "Content-Type": "application/json",','  },','  body: JSON.stringify('+b+'),','});','','const data = await response.json();'].join('\n');}
    const json=serialize(p,'json',0).split('\n').map((l,i)=>i===0?l:'  '+l).join('\n');
    return ['curl https://api.octen.ai/multimodal-search \\','  -X POST \\',"  -H 'x-api-key: "+MASKED+"' \\","  -H 'Content-Type: application/json' \\","  -d '"+json+"'"].join('\n');
  }
  function buildResponse(I){ const c=I.cfg; const now=new Date(); const fmt=d=>d.toISOString().replace('.000','');
    const mods=c.selectable?I.mods:c.modalities;
    const pool=POOL.filter(e=>mods.includes(e.type));
    const count=Math.max(1,Math.min(Number(I.max)||10,pool.length));
    const results=pool.slice(0,count).map(e=>{ const pub=new Date(now);pub.setDate(pub.getDate()+e.dpub); const cr=new Date(now);cr.setDate(cr.getDate()+e.dcrawl);
      const item={type:e.type,title:e.title,url:e.url};
      if(e.type==='image'||e.type==='video'){item.source_page=e.source_page;item.description=e.description;}
      if(e.type==='video'){item.cover_url=e.cover_url;item.duration_seconds=e.duration_seconds;}
      if(e.type==='text'){ if(I.hl)item.highlight=e.highlight; if(I.fc)item.full_content=e.full_content; item.favicon=e.favicon; if(mods.includes('image')&&e.cover)item.cover_image=e.cover; }
      item.authors=e.authors; item.time_published=fmt(pub); item.time_last_crawled=fmt(cr);
      if(e.type==='image'&&c.htmlSnippet&&I.topic==='design'){ item.summary=e.summary; if(I.html)item.html_snippet=e.snippet; }
      return item;
    });
    const hex='0123456789abcdef';
    return {request_id:'req_'+Array.from({length:16},()=>hex[Math.floor(Math.random()*16)]).join(''),data:{results:results},meta:{usage:{num_search_queries:1},latency:320+Math.floor(Math.random()*260),warning:null}};
  }

  function renderContent(I){ const k=K(I), c=$(k+'-content');
    if(I.tab==='request'){ c.innerHTML=codeBlock(requestCode(I),hlCode); return; }
    if(I.loading){ c.innerHTML='<div style="min-height:360px;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:14px">Running…</div>'; return; }
    if(!I.result){ c.innerHTML='<div style="min-height:360px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;color:#cbd5e1"><svg style="width:40px;height:40px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35"/></svg><span style="font-size:14px;color:#94a3b8">Run a request to see results</span></div>'; return; }
    if(I.rtab==='json'){ c.innerHTML=codeBlock(JSON.stringify(I.result,null,2),hlJson); return; }
    const items=I.result.data.results;
    c.innerHTML='<div style="max-height:560px;overflow-y:auto;padding:14px 16px"><div style="display:flex;flex-direction:column;gap:12px">'+items.map((r,i)=>resultRow(I,r,i)).join('')+'</div></div>';
    window.__pgsItems=window.__pgsItems||{}; window.__pgsItems[k]=items;
  }
  function resultRow(I,r,i){ const k=K(I);
    const idx='<span style="font-size:12px;font-weight:700;color:#cbd5e1;flex-shrink:0">'+String(i+1).padStart(2,'0')+'</span>';
    const src='<a href="'+esc(r.source_page||r.url)+'" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;gap:4px;font-size:12px;color:'+PRIMARY+';text-decoration:none;margin:4px 0 7px"><svg style="width:11px;height:11px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg> '+domainOf(r.source_page||r.url)+'</a>';
    const meta='<div style="margin-top:auto;font-size:11px;color:#94a3b8">Published '+fmtDate(r.time_published)+' · Crawled '+fmtDate(r.time_last_crawled)+'</div>';
    if(r.type==='image'){
      return '<div style="border:1px solid '+CARD+';border-radius:10px;background:#fff;display:flex;gap:12px;padding:12px"><button type="button" onclick="PGS_lightbox(\''+k+'\','+i+')" title="View larger" style="position:relative;width:172px;flex-shrink:0;aspect-ratio:4/3;border-radius:8px;overflow:hidden;background:#f1f5f9;padding:0;border:none;cursor:zoom-in;display:block"><img src="'+r.url+'" style="width:100%;height:100%;object-fit:cover;display:block"/><span style="position:absolute;top:7px;left:7px;font-size:9.5px;font-weight:600;text-transform:uppercase;color:#fff;background:rgba(15,23,42,0.62);padding:2px 6px;border-radius:999px">image</span></button>'+
        '<div style="flex:1;min-width:0;display:flex;flex-direction:column"><div style="display:flex;align-items:baseline;gap:8px">'+idx+'<h4 style="font-size:14px;font-weight:600;color:'+HEAD+';margin:0;line-height:19px">'+esc(r.title)+'</h4></div>'+src+'<p style="font-size:12.5px;color:#64748b;line-height:18px;margin:0 0 8px">'+esc(r.description)+'</p>'+(r.summary?'<pre style="font-size:11px;color:#475569;background:#f8fafc;border-radius:6px;padding:8px 10px;white-space:pre-wrap;margin:0 0 8px;font-family:'+MONO+'">'+esc(r.summary)+'</pre>':'')+meta+(r.html_snippet?'<pre style="margin:8px 0 0;padding:10px 11px;background:'+CODE_BG+';border-radius:8px;overflow-x:auto;font-family:'+MONO+';font-size:11px;color:#c9d1d9;white-space:pre">'+esc(r.html_snippet)+'</pre>':'')+'</div></div>';
    }
    if(r.type==='video'){
      return '<div style="border:1px solid '+CARD+';border-radius:10px;background:#fff;display:flex;gap:12px;padding:12px"><a href="'+esc(r.url)+'" target="_blank" rel="noreferrer" style="position:relative;width:172px;flex-shrink:0;aspect-ratio:16/9;border-radius:8px;overflow:hidden;background:#0f172a;display:block"><img src="'+r.cover_url+'" style="width:100%;height:100%;object-fit:cover;display:block;opacity:0.9"/><span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><span style="width:40px;height:40px;border-radius:999px;background:rgba(15,23,42,0.55);display:flex;align-items:center;justify-content:center"><svg style="width:18px;height:18px;color:#fff" fill="#fff" viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"/></svg></span></span><span style="position:absolute;bottom:7px;right:7px;font-size:10px;font-weight:600;color:#fff;background:rgba(15,23,42,0.75);padding:1px 6px;border-radius:4px">'+fmtDur(r.duration_seconds)+'</span></a>'+
        '<div style="flex:1;min-width:0;display:flex;flex-direction:column"><div style="display:flex;align-items:baseline;gap:8px">'+idx+'<h4 style="font-size:14px;font-weight:600;color:'+HEAD+';margin:0;line-height:19px">'+esc(r.title)+'</h4></div>'+src+'<p style="font-size:12.5px;color:#64748b;line-height:18px;margin:0 0 8px">'+esc(r.description)+'</p>'+meta+'</div></div>';
    }
    // text
    const exKey=k+'-'+i; const exp=I.expanded[exKey];
    return '<div style="border:1px solid '+CARD+';border-radius:10px;background:#fff;padding:12px"><div style="display:flex;align-items:baseline;gap:8px">'+idx+'<a href="'+esc(r.url)+'" target="_blank" rel="noreferrer" style="font-size:14px;font-weight:600;color:'+HEAD+';text-decoration:none;line-height:19px">'+esc(r.title)+'</a></div>'+
      '<div style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:#94a3b8;margin:4px 0 7px"><img src="'+(r.favicon||'')+'" onerror="this.style.display=\'none\'" style="width:12px;height:12px"/>'+esc(r.authors||domainOf(r.url))+' · '+fmtDate(r.time_published)+'</div>'+
      (r.highlight?'<div style="border-left:2px solid #cbd5e1;padding-left:10px;margin-bottom:8px"><p style="font-size:12.5px;color:#475569;line-height:18px;margin:0">'+esc(r.highlight)+'</p></div>':'')+
      (r.cover_image?'<img src="'+r.cover_image+'" style="width:100%;max-width:280px;border-radius:8px;border:1px solid '+FB+';margin-bottom:8px"/>':'')+
      (r.full_content?'<button type="button" onclick="PGS_toggleText(\''+k+'\','+i+')" style="display:inline-flex;align-items:center;gap:4px;border:none;background:none;cursor:pointer;font-size:11.5px;color:'+PRIMARY+';padding:0">'+(exp?'Hide full content':'Show full content')+'</button>'+(exp?'<pre style="margin:7px 0 0;font-size:12px;color:#334155;white-space:pre-wrap;line-height:18px;font-family:inherit">'+esc(r.full_content)+'</pre>':''):'')+
    '</div>';
  }

  // ── calendar ──
  const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DOW=['Su','Mo','Tu','We','Th','Fr','Sa'];
  function calDays(y,m){const f=new Date(y,m,1);const s=new Date(y,m,1-f.getDay());const a=[];for(let i=0;i<42;i++){const d=new Date(s);d.setDate(s.getDate()+i);a.push(d);}return a;}
  function inRange(cal,d){const t=new Date(d).setHours(0,0,0,0);const s=cal.s?new Date(cal.s).setHours(0,0,0,0):null;const e=cal.e?new Date(cal.e).setHours(0,0,0,0):null;if(s!==null&&t===s)return'start';if(e!==null&&t===e)return'end';if(s!==null&&e!==null&&t>s&&t<e)return'mid';return null;}
  function nextM(o){return o.m===11?{y:o.y+1,m:0}:{y:o.y,m:o.m+1};}
  function monthGrid(I,y,m){const k=K(I);const days=calDays(y,m);let h='<div style="width:224px"><div style="text-align:center;font-size:13px;font-weight:600;color:'+HEAD+';margin-bottom:8px">'+MONTHS[m]+' '+y+'</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">'+DOW.map(d=>'<div style="text-align:center;font-size:11px;color:#94a3b8;height:24px;line-height:24px">'+d+'</div>').join('')+days.map(d=>{const tm=d.getMonth()===m;const r=inRange(I.cal,d);const bg=(r==='start'||r==='end')?PRIMARY:(r==='mid'?'#f0fdf4':'transparent');const col=!tm?'#cbd5e1':(r?(r==='mid'?'#15803d':'#fff'):'#0f172b');return '<div onclick="PGS_pick(\''+k+'\','+d.getFullYear()+','+d.getMonth()+','+d.getDate()+')" style="text-align:center;height:30px;line-height:30px;font-size:12px;border-radius:7px;cursor:pointer;color:'+col+';background:'+bg+'">'+d.getDate()+'</div>';}).join('')+'</div></div>';return h;}
  function renderCal(I){const k=K(I);const pop=$(k+'-datepop');if(!pop)return;const nm=nextM(I.cal);
    pop.innerHTML='<div style="display:flex;flex-direction:column;gap:2px;width:120px;border-right:1px solid #f1f5f9;padding-right:12px">'+[['Last 24 hours','day'],['Last week','week'],['Last month','month'],['Last year','year']].map(p=>'<button type="button" onclick="PGS_preset(\''+k+'\',\''+p[1]+'\',\''+p[0]+'\')" onmouseenter="if(!this.dataset.on)this.style.background=\'#f8fafc\'" onmouseleave="if(!this.dataset.on)this.style.background=\'transparent\'" '+(I.timeRange===p[1]?'data-on="1"':'')+' style="text-align:left;padding:8px 10px;border-radius:7px;border:none;cursor:pointer;font-size:13px;'+(I.timeRange===p[1]?'background:#0398551a;color:#039855;font-weight:500':'background:transparent;color:#475569')+'">'+p[0]+'</button>').join('')+'</div>'+
      '<div><div style="display:flex;align-items:flex-start;gap:20px"><button type="button" onclick="PGS_calNav(\''+k+'\',-1)" style="border:none;background:none;cursor:pointer;color:#64748b;font-size:16px">‹</button><div style="display:flex;gap:20px;flex:1">'+monthGrid(I,I.cal.y,I.cal.m)+monthGrid(I,nm.y,nm.m)+'</div><button type="button" onclick="PGS_calNav(\''+k+'\',1)" style="border:none;background:none;cursor:pointer;color:#64748b;font-size:16px">›</button></div>'+
      '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px"><button type="button" onclick="PGS_clearRange(\''+k+'\')" style="padding:7px 14px;border-radius:8px;border:1px solid '+FB+';background:#fff;cursor:pointer;font-size:13px;color:#64748b">Clear</button><button type="button" onclick="PGS_applyRange(\''+k+'\')" style="padding:7px 14px;border-radius:8px;border:none;background:'+PRIMARY+';cursor:pointer;font-size:13px;color:#fff;font-weight:500">Apply</button></div></div>';
  }
  function isoOf(d,end){const p=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+'T'+(end?'23:59:59':'00:00:00')+'+08:00';}
  function shortD(d){return MONTHS[d.getMonth()].slice(0,3)+' '+d.getDate();}
  function closeCal(I){I.cal.open=false;const p=$(K(I)+'-datepop');if(p)p.style.display='none';}

  // ── exposed actions ──
  window.PGS_set=function(k,key,val){const I=INST[k];I[key]=val; if(key==='topic'||key==='hl'||key==='fc'||key==='html')renderOutOpts(I); PGS_code(k);};
  window.PGS_code=function(k){const I=INST[k]; if(I&&I.tab==='request')renderContent(I);};
  window.PGS_basis=function(k,b){const I=INST[k];I.basis=b;renderBasis(I);PGS_code(k);};
  window.PGS_toggleMod=function(k,m){const I=INST[k];const i=I.mods.indexOf(m);if(i>=0){if(I.mods.length>1)I.mods.splice(i,1);}else I.mods.push(m);renderMods(I);renderOutOpts(I);PGS_code(k);};
  window.PGS_tab=function(k,t){const I=INST[k];I.tab=t;renderTabs(I);renderContent(I);};
  window.PGS_lang=function(k,l){const I=INST[k];I.lang=l;renderTabs(I);renderContent(I);};
  window.PGS_rtab=function(k,t){const I=INST[k];I.rtab=t;renderTabs(I);renderContent(I);};
  window.PGS_rmImg=function(k,id){const I=INST[k];I.images=I.images.filter(im=>im.id!==id);renderThumbs(I);renderRun(I);PGS_code(k);};
  window.PGS_attach=function(k){const I=INST[k];I.attachMenu=!I.attachMenu;const pop=$(k+'-pop');const btn=$(k+'-addimg');pop.classList.toggle('hidden',!I.attachMenu);
    if(I.attachMenu){ btn.style.borderColor=PRIMARY;btn.style.background='#f0fdf4';btn.style.color='#15803d';
      pop.innerHTML='<button type="button" onclick="PGS_upload(\''+k+'\')" onmouseenter="this.style.background=\'#f8fafc\'" onmouseleave="this.style.background=\'none\'" style="width:100%;display:flex;align-items:center;gap:8px;height:34px;padding:0 8px;border:none;border-radius:7px;background:none;cursor:pointer;font-size:13px;color:#334155"><svg style="width:15px;height:15px;color:#64748b" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg> Upload from device</button><div style="display:flex;align-items:center;gap:8px;margin:6px 6px;color:#94a3b8;font-size:11px"><span style="flex:1;height:1px;background:#f1f5f9"></span> or <span style="flex:1;height:1px;background:#f1f5f9"></span></div><div style="display:flex;gap:6px;padding:0 2px 2px"><input type="text" id="'+k+'-url" onkeydown="if(event.key===\'Enter\'){event.preventDefault();PGS_confirmUrl(\''+k+'\')}" placeholder="Paste image URL" style="flex:1;min-width:0;height:32px;padding:0 9px;border:1px solid '+FB+';border-radius:7px;font-size:12.5px;color:#0f172b;outline:none;box-sizing:border-box"/><button type="button" onclick="PGS_confirmUrl(\''+k+'\')" style="height:32px;padding:0 13px;border:none;border-radius:7px;background:'+PRIMARY+';color:#fff;font-size:12.5px;font-weight:500;cursor:pointer">Add</button></div>';
      const u=$(k+'-url'); if(u)u.focus();
    } else { pop.innerHTML=''; btn.style.borderColor=FB;btn.style.background='#fff';btn.style.color='#475569'; }
  };
  function closeAttach(I){const k=K(I);I.attachMenu=false;const pop=$(k+'-pop');if(pop){pop.classList.add('hidden');pop.innerHTML='';}const btn=$(k+'-addimg');if(btn){btn.style.borderColor=FB;btn.style.background='#fff';btn.style.color='#475569';}}
  window.PGS_upload=function(k){$(k+'-file').click();closeAttach(INST[k]);};
  window.PGS_confirmUrl=function(k){const I=INST[k];const inp=$(k+'-url');const u=(inp.value||'').trim();if(!u)return;if(I.images.length>=MAX_IMAGES){$(k+'-atterr').textContent='Up to '+MAX_IMAGES+' images.';return;}I.images.push({id:I.attId++,mode:'url',name:nameFromUrl(u),preview:'',url:u});$(k+'-atterr').textContent='';closeAttach(I);renderThumbs(I);renderRun(I);PGS_code(k);};
  window.PGS_clear=function(k){const I=INST[k];I.text='';I.images=[];I.topic='general';I.max='10';I.basis='auto';I.timeRange='';I.start='';I.end='';I.safesearch='strict';I.hl=true;I.fc=false;I.html=false;I.result=null;I.tab='request';
    $(k+'-text').value='';$(k+'-inc').value='';$(k+'-exc').value='';$(k+'-max').value='10';if($(k+'-topic'))$(k+'-topic').value='general';$(k+'-atterr').textContent='';I.cal.s=null;I.cal.e=null;$(k+'-datelbl').textContent='Custom range';$(k+'-datelbl').className='';$(k+'-datelbl').style.color='#94a3b8';
    renderThumbs(I);renderRun(I);renderBasis(I);renderMods(I);renderOutOpts(I);renderTabs(I);renderContent(I);
  };
  window.PGS_run=function(k){const I=INST[k];const has=!!I.text.trim()||I.images.length>0;if(!has||I.loading)return;I.loading=true;I.tab='response';I.rtab='preview';I.result=null;renderTabs(I);renderContent(I);
    setTimeout(()=>{const r=buildResponse(I);I.result=r;I.took=r.meta.latency;I.loading=false;renderTabs(I);renderContent(I);},750);};
  window.PGS_copyReq=function(k){const I=INST[k];try{navigator.clipboard&&navigator.clipboard.writeText(requestCode(I));}catch(e){}flash(k+'-copyreq');};
  window.PGS_copyResp=function(k){const I=INST[k];if(!I.result)return;try{navigator.clipboard&&navigator.clipboard.writeText(JSON.stringify(I.result,null,2));}catch(e){}flash(k+'-copyresp');};
  function flash(id){const b=$(id);if(!b)return;const o=b.innerHTML;b.innerHTML='<svg style="width:14px;height:14px;color:'+PRIMARY+'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied';setTimeout(()=>{b.innerHTML=o;},1500);}
  window.PGS_toggleText=function(k,i){const I=INST[k];const key=k+'-'+i;I.expanded[key]=!I.expanded[key];renderContent(I);};
  window.PGS_lightbox=function(k,i){const it=(window.__pgsItems&&window.__pgsItems[k]||[])[i];if(!it)return;const lb=$('pgs-lightbox');
    lb.innerHTML='<button type="button" onclick="PGS_closeLightbox()" style="position:fixed;top:20px;right:24px;width:40px;height:40px;border-radius:999px;border:none;background:rgba(255,255,255,0.14);color:#fff;display:inline-flex;align-items:center;justify-content:center;cursor:pointer"><svg style="width:20px;height:20px" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button><div onclick="event.stopPropagation()" style="max-width:860px;width:100%;display:flex;flex-direction:column;gap:14px"><img src="'+it.url+'" style="width:100%;max-height:70vh;object-fit:contain;border-radius:12px;background:#fff;box-shadow:0 24px 70px rgba(0,0,0,0.5)"/><div><h3 style="margin:0;font-size:16px;font-weight:600;color:#fff">'+esc(it.title)+'</h3><a href="'+esc(it.source_page||it.url)+'" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;gap:5px;font-size:12.5px;color:#34d399;text-decoration:none;margin-top:6px">'+domainOf(it.source_page||it.url)+'</a><p style="margin:8px 0 0;font-size:13px;line-height:19px;color:rgba(255,255,255,0.72)">'+esc(it.description||'')+'</p></div></div>';
    lb.style.display='flex';lb.onclick=PGS_closeLightbox;};
  window.PGS_closeLightbox=function(){const lb=$('pgs-lightbox');lb.style.display='none';lb.innerHTML='';};
  window.PGS_dateToggle=function(k){const I=INST[k];I.cal.open=!I.cal.open;const pop=$(k+'-datepop');if(I.cal.open){pop.style.display='flex';renderCal(I);const r=$(k+'-datebtn').getBoundingClientRect();pop.style.position='fixed';pop.style.top=(r.bottom+6)+'px';pop.style.right='auto';const w=pop.offsetWidth||620,vw=window.innerWidth;let left=Math.min(r.right-w,vw-w-8);left=Math.max(8,left);pop.style.left=left+'px';}else pop.style.display='none';};
  window.PGS_calNav=function(k,d){const I=INST[k];if(d>0){const n=nextM(I.cal);I.cal.y=n.y;I.cal.m=n.m;}else{I.cal.m=I.cal.m===0?11:I.cal.m-1;if(I.cal.m===11)I.cal.y--;}renderCal(I);};
  window.PGS_pick=function(k,y,m,d){const I=INST[k];I.timeRange='';const dt=new Date(y,m,d);if(!I.cal.s||(I.cal.s&&I.cal.e)){I.cal.s=dt;I.cal.e=null;}else{if(dt<I.cal.s){I.cal.e=I.cal.s;I.cal.s=dt;}else I.cal.e=dt;}renderCal(I);};
  window.PGS_preset=function(k,range,label){const I=INST[k];I.timeRange=range;I.cal.s=null;I.cal.e=null;I.start='';I.end='';$(k+'-datelbl').textContent=label;$(k+'-datelbl').style.color='#0f172b';closeCal(I);PGS_code(k);};
  window.PGS_applyRange=function(k){const I=INST[k];if(I.cal.s){I.timeRange='';I.start=isoOf(I.cal.s,false);I.end=isoOf(I.cal.e||I.cal.s,true);$(k+'-datelbl').textContent=I.cal.e?(shortD(I.cal.s)+' – '+shortD(I.cal.e)):shortD(I.cal.s);$(k+'-datelbl').style.color='#0f172b';}closeCal(I);PGS_code(k);};
  window.PGS_clearRange=function(k){const I=INST[k];I.cal.s=null;I.cal.e=null;I.timeRange='';I.start='';I.end='';$(k+'-datelbl').textContent='Custom range';$(k+'-datelbl').style.color='#94a3b8';closeCal(I);PGS_code(k);};

  document.addEventListener('mousedown',function(e){ Object.keys(INST).forEach(k=>{const I=INST[k];
    if(I.cal.open){const pop=$(k+'-datepop'),btn=$(k+'-datebtn');if(pop&&!pop.contains(e.target)&&btn&&!btn.contains(e.target))closeCal(I);}
    if(I.attachMenu){const w=$(k+'-attwrap');if(w&&!w.contains(e.target))closeAttach(I);}
  });});
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ PGS_closeLightbox(); Object.keys(INST).forEach(k=>{closeCal(INST[k]);closeAttach(INST[k]);}); } });

  // Exposed for SPA: called by app.js router after page DOM is injected
  window.initBroadSearchApi = function() {
    // Each search page (image/video/multimodal) is now its own SPA page and
    // injects only its own root. Init whichever roots are present in the DOM.
    const specs = [
      {key:'is', rootId:'is-root', modalities:['image'], topic:true, selectable:false, htmlSnippet:true, highlightFull:false},
      {key:'vs', rootId:'vs-root', modalities:['video'], topic:false, selectable:false, htmlSnippet:false, highlightFull:false},
      {key:'mm', rootId:'mm-root', modalities:['text','image','video'], topic:true, selectable:true, htmlSnippet:true, highlightFull:true},
    ];
    const present = specs.filter(s => document.getElementById(s.rootId));
    if (!present.length) return;
    present.forEach(function(s){
      delete INST[s.key];   // clear previous instance to allow re-init on revisit
      init(s);
    });
    // Inject Early Access gate notice below the Inputs row for each gated product
    const gateMap = { 'is': 'Image Search', 'vs': 'Video Search', 'mm': 'Multimodal Chat' };
    present.forEach(function(s){
      const k = s.key;
      const productName = gateMap[k];
      const atterr = document.getElementById(k + '-atterr');
      if (!atterr) return;
      const inputsBlock = atterr.parentElement;
      if (!inputsBlock) return;
      const notice = document.createElement('div');
      notice.className = 'ra-gate-notice flex items-center gap-2 text-sm';
      notice.setAttribute('data-product', productName);
      notice.style.marginTop = '12px';
      notice.innerHTML = '<svg class="w-4 h-4 shrink-0" style="color:#F97316" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
        + '<span class="flex-1 text-[#737373]">' + productName + ' is in early access — request access to start using it.</span>'
        + '<a href="#" onclick="openRequestAccess(\'' + productName + '\');return false" class="shrink-0 font-medium hover:underline" style="color:#039855">Request access \u2192</a>';
      inputsBlock.appendChild(notice);
    });
    if (window.updateGateNotices) window.updateGateNotices();
  };
  // Fallback for non-SPA direct load
  document.addEventListener('DOMContentLoaded', window.initBroadSearchApi);

  // SPA lifecycle: these pages share the PGS instance system (is/vs/mm roots).
  window.pageInit = window.pageInit || {};
  ['image-search','video-search','multimodal-search'].forEach(function(id){
    window.pageInit[id] = window.initBroadSearchApi;
  });
})();
