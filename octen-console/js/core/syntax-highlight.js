// Syntax Highlight and UI Components (exports window.PGS_* only)
(function(){
const CODE_BG='transparent';
const MONO='"JetBrains Mono",ui-monospace,"SF Mono",Menlo,Consolas,monospace';
const esc=s=>(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

// Dummy fallbacks for backwards compatibility in case other scripts pass these functions
window.PGS_hlCode = function(line) { return [{t:line, c:'#334155'}]; };
window.PGS_hlJson = function(line) { return [{t:line, c:'#334155'}]; };

window.PGS_codeBlock = function(code, hl) {
  let lang = 'python'; // Default
  const codeTrimmed = code.trim();
  
  // Simple heuristic to detect language based on payload shape
  if (codeTrimmed.startsWith('curl')) {
    lang = 'bash';
  } else if (codeTrimmed.startsWith('const ') || codeTrimmed.startsWith('let ') || codeTrimmed.includes('await fetch(')) {
    lang = 'javascript';
  } else if (codeTrimmed.startsWith('{') || codeTrimmed.startsWith('[')) {
    lang = 'json';
  }

  let highlighted = '';
  if (window.Prism && Prism.languages[lang]) {
    highlighted = Prism.highlight(code, Prism.languages[lang], lang);
  } else {
    highlighted = esc(code);
  }

  const lines = highlighted.split('\n');
  const nums = lines.map((_,i)=>'<div>'+(i+1)+'</div>').join('');
  const body = lines.map(ln=>'<div>'+ln+(ln===''?'<br>':'')+'</div>').join('');

  const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
  return '<div style="height:100%;flex:1;overflow:auto;background:'+CODE_BG+';padding:16px 0">' +
         '<div style="display:flex;width:max-content;min-width:100%;font-family:'+MONO+';font-size:13px;line-height:22px">' +
         '<div style="flex-shrink:0;text-align:right;color:#a3a3a3;user-select:none;padding:0 16px">' + nums + '</div>' +
         '<div class="language-'+lang+'" style="flex:1;padding-right:16px;white-space:pre;color:#0a0a0a">' + body + '</div>' +
         '</div></div>';
};
})();
