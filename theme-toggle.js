(()=>{
  const root=document.documentElement;
  const meta=document.querySelector('meta[name="theme-color"]');
  const buttons=[...document.querySelectorAll('[data-theme-choice]')];
  const storageKey='src-ui-theme';
  const colors={light:'#d7cec2',dark:'#0b1118'};

  const apply=(theme,{persist=true}={})=>{
    const safe=theme==='dark'?'dark':'light';
    root.dataset.theme=safe;
    if(meta)meta.setAttribute('content',colors[safe]);
    buttons.forEach(btn=>{
      const selected=btn.dataset.themeChoice===safe;
      btn.setAttribute('aria-pressed',selected?'true':'false');
      btn.classList.toggle('selected',selected);
    });
    if(persist){try{localStorage.setItem(storageKey,safe)}catch{}}
    window.dispatchEvent(new CustomEvent('src-theme-change',{detail:{theme:safe}}));
  };

  let initial='light';
  try{
    const stored=localStorage.getItem(storageKey);
    if(stored==='light'||stored==='dark')initial=stored;
  }catch{}
  apply(initial,{persist:false});

  buttons.forEach(btn=>btn.addEventListener('click',()=>apply(btn.dataset.themeChoice)));
})();
