// Syntax Highlight and UI Components (Global)
const C_KEY='#7ee787',C_STR='#a5d6ff',C_NUM='#79c0ff',C_KW='#ff7b72',C_DEF='#c9d1d9';
const CODE_BG='#0d1117', MONO='"JetBrains Mono",ui-monospace,"SF Mono",Menlo,Consolas,monospace';
const esc=s=>(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

window.PGS_hlCode = function(line) {
  const toks=[];const re=/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g;let last=0,m;
  const plain=t=>{
    const pr=/(\b(?:import|from|const|let|var|await|async|function|return|print|new)\b)|(\b(?:True|False|None|true|false|null)\b)|(\b\d+(?:\.\d+)?\b)/g;
    let l=0,mm;
    while((mm=pr.exec(t))){
      if(mm.index>l)toks.push({t:t.slice(l,mm.index),c:C_DEF});
      if(mm[1])toks.push({t:mm[0],c:C_KW});
      else toks.push({t:mm[0],c:C_NUM});
      l=mm.index+mm[0].length;
    }
    if(l<t.length)toks.push({t:t.slice(l),c:C_DEF});
  };
  while((m=re.exec(line))){
    if(m.index>last)plain(line.slice(last,m.index));
    toks.push({t:m[0],c:C_STR});
    last=m.index+m[0].length;
  }
  if(last<line.length)plain(line.slice(last));
  if(!toks.length)toks.push({t:line,c:C_DEF});
  return toks;
};

window.PGS_hlJson = function(line) {
  const toks=[];const re=/("(?:[^"\\]|\\.)*")(\s*:)?|(\b\d+(?:\.\d+)?\b)|(\btrue\b|\bfalse\b|\bnull\b)/g;
  let last=0,m;
  while((m=re.exec(line))){
    if(m.index>last)toks.push({t:line.slice(last,m.index),c:C_DEF});
    if(m[1]!==undefined){
      if(m[2]){toks.push({t:m[1],c:C_KEY});toks.push({t:m[2],c:C_DEF});}
      else toks.push({t:m[1],c:C_STR});
    }else if(m[3]!==undefined)toks.push({t:m[3],c:C_NUM});
    else if(m[4]!==undefined)toks.push({t:m[4],c:C_KW});
    last=m.index+m[0].length;
  }
  if(last<line.length)toks.push({t:line.slice(last),c:C_DEF});
  if(!toks.length)toks.push({t:line,c:C_DEF});
  return toks;
};

window.PGS_codeBlock = function(code,hl) {
  const lines=code.split('\n');
  const nums=lines.map((_,i)=>'<div>'+(i+1)+'</div>').join('');
  const body=lines.map(ln=>'<div>'+hl(ln).map(tk=>'<span style="color:'+tk.c+'">'+esc(tk.t)+'</span>').join('')+(ln===''?'<br>':'')+'</div>').join('');
  return '<div style="height:100%;flex:1;overflow:auto;background:'+CODE_BG+';padding:14px 0"><div style="display:flex;width:max-content;min-width:100%;font-family:'+MONO+';font-size:12.5px;line-height:21px"><div style="flex-shrink:0;text-align:right;color:#6e7681;user-select:none;padding:0 16px">'+nums+'</div><div style="flex:1;padding-right:16px;white-space:pre">'+body+'</div></div></div>';
};