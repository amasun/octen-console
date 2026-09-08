(function(){
  const GROUPS=[
    {name:'Anthropic',color:'#e05d44',rows:[
      ['claude-opus-4.8','$5.00','$25.00','$0.50','$6.25 (5m) · $10 (1h)'],
      ['claude-opus-4.6','$5.00','$25.00','$0.50','$6.25 (5m) · $10 (1h)'],
      ['claude-sonnet-4.6','$3.00','$15.00','$0.30','$3.75 (5m) · $6 (1h)'],
      ['claude-haiku-4.5','$1.00','$5.00','$0.10','$1.25 (5m) · $2 (1h)'],
    ]},
    {name:'Google',color:'#4285f4',rows:[
      ['gemini-3.5-flash','$1.50','$9.00','$0.15','—'],
      ['gemini-3.1-pro-preview','$2.00','$12.00','$0.20','—'],
      ['gemini-3.1-flash-lite','$0.25','$1.50','$0.03','—'],
      ['gemini-3-flash-preview','$0.50','$3.00','$0.05','—'],
    ]},
    {name:'OpenAI',color:'#10a37f',rows:[
      ['gpt-5.5-pro','$30.00','$180.00','$3.00','—'],
      ['gpt-5.5','$5.00','$30.00','$0.50','—'],
      ['gpt-5.4','$2.50','$15.00','$0.25','—'],
    ]},
    {name:'Moonshot',color:'#3b82f6',rows:[
      ['kimi-k2.6','$0.75','$3.50','$0.19','—'],
      ['kimi-k2.5','$0.45','$2.20','$0.11','—'],
    ]},
    {name:'MiniMax',color:'#f59e0b',rows:[
      ['minimax-m2.5','$0.25','$1.20','—','—'],
    ]},
    {name:'Alibaba',color:'#7c3aed',rows:[
      ['qwen3.6-plus','$0.50','$3.00','$0.05','$0.625 (5m)'],
    ]},
  ];
  function render(){
    const tb=document.getElementById('billing-model-rows'); if(!tb)return;
    let h='';
    GROUPS.forEach(g=>{
      h+='<tr><td colspan="5" class="pt-4 pb-1.5"><span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-white" style="background:'+g.color+'">'+g.name+'</span></td></tr>';
      g.rows.forEach((r,i)=>{
        const last=i===g.rows.length-1;
        h+='<tr class="'+(last?'':'border-b border-slate-50')+'">'+
          '<td class="py-3 pr-4 text-[#0a0a0a] font-mono text-xs">'+r[0]+'</td>'+
          '<td class="py-3 px-3 text-right text-[#0a0a0a] font-medium tabular-nums text-xs">'+r[1]+'</td>'+
          '<td class="py-3 px-3 text-right text-[#0a0a0a] font-medium tabular-nums text-xs">'+r[2]+'</td>'+
          '<td class="py-3 px-3 text-right text-[#737373] tabular-nums text-xs">'+r[3]+'</td>'+
          '<td class="py-3 pl-3 text-right text-[#737373] tabular-nums text-xs">'+r[4]+'</td>'+
        '</tr>';
      });
    });
    tb.innerHTML=h;
  }

  // Tab groups (spend-tab, payg-tab). These moved out of the template because
  // innerHTML injection never executes inline <script>, so the tabs were dead.
  function wireTabs(tabSel, panelSel, tabKey, panelKey){
    const tabs = document.querySelectorAll(tabSel);
    const panels = document.querySelectorAll(panelSel);
    tabs.forEach(t => t.addEventListener('click', () => {
      const key = t.dataset[tabKey];
      tabs.forEach(x => {
        const active = x.dataset[tabKey] === key;
        x.style.color = active ? '#039855' : '';
        x.style.borderColor = active ? '#039855' : '';
        x.classList.toggle('text-[#737373]', !active);
        x.classList.toggle('border-transparent', !active);
      });
      panels.forEach(p => p.classList.toggle('hidden', p.dataset[panelKey] !== key));
    }));
  }

  function init(){
    render();
    wireTabs('.spend-tab', '.spend-panel', 'spendTab', 'spendPanel');
    wireTabs('.payg-tab', '.payg-panel', 'paygTab', 'paygPanel');
  }

  // SPA lifecycle: #billing-model-rows and the tab elements only exist after the
  // billing page is injected, so DOMContentLoaded alone never fires against real DOM.
  window.pageInit = window.pageInit || {};
  window.pageInit['billing'] = init;
  document.addEventListener('DOMContentLoaded',init);
})();



