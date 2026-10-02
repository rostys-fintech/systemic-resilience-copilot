(()=>{
  const root=document.documentElement;
  const storageKey='src-ui-theme';
  const colors={light:'#d7cec2',dark:'#0b1118'};

  /* Load the dual-theme stylesheet after the existing visual layers so it becomes the final authority. */
  if(!document.querySelector('link[data-dual-theme]')){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='/dual-theme.css';
    link.dataset.dualTheme='1';
    document.head.appendChild(link);
  }

  /* Load art-directed page/hero backgrounds last so the live themes match the concept boards. */
  if(!document.querySelector('link[data-theme-backgrounds]')){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='/theme-backgrounds.css';
    link.dataset.themeBackgrounds='1';
    document.head.appendChild(link);
  }

  let meta=document.querySelector('meta[name="theme-color"]');
  if(!meta){meta=document.createElement('meta');meta.name='theme-color';document.head.appendChild(meta)}

  /* Inject an accessible two-state theme control into the existing header. */
  const top=document.querySelector('.top');
  const status=document.getElementById('aiStatus');
  let controls=document.getElementById('themeSwitch');
  if(top&&!controls){
    const actions=document.createElement('div');
    actions.className='topActions';
    actions.innerHTML=`
      <div class="themeSwitch" id="themeSwitch" role="group" aria-label="Appearance theme">
        <button class="themeBtn" type="button" data-theme-choice="light" aria-pressed="false" title="Light theme — Obsidian & Sand">
          <span class="themeIcon" aria-hidden="true">☀</span><span class="themeLabel">Light</span>
        </button>
        <button class="themeBtn" type="button" data-theme-choice="dark" aria-pressed="false" title="Dark theme — Smoked Navy & Pearl">
          <span class="themeIcon" aria-hidden="true">◐</span><span class="themeLabel">Dark</span>
        </button>
      </div>`;
    if(status){top.insertBefore(actions,status);actions.appendChild(status)}else top.appendChild(actions);
    controls=actions.querySelector('#themeSwitch');
  }

  const buttons=[...document.querySelectorAll('[data-theme-choice]')];
  const apply=(theme,{persist=true}={})=>{
    const safe=theme==='dark'?'dark':'light';
    root.dataset.theme=safe;
    meta.setAttribute('content',colors[safe]);
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
