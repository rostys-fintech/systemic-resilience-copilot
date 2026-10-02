(()=>{
  const $=id=>document.getElementById(id);
  const q=(sel,root=document)=>root.querySelector(sel);
  const qa=(sel,root=document)=>[...root.querySelectorAll(sel)];
  const reduce=()=>window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  /* ---------- COPY AUDIT: keep only text that helps the decision flow ---------- */
  const setText=(sel,text,root=document)=>{const el=q(sel,root);if(el&&el.textContent!==text)el.textContent=text};

  function cleanStaticCopy(){
    setText('#parsedPanel .parsedTop','Validated facts');

    const decisionHead=q('#decisionCard .head p');
    if(decisionHead)decisionHead.textContent='Rules set the state and next action.';

    const whyHead=q('#whyCard .head p');
    if(whyHead)whyHead.textContent='Apertus explains and challenges; rules stay authoritative.';

    const compareTitle=q('#compareCard .head h2');
    if(compareTitle)compareTitle.textContent='Fix one weakness. Reveal the next.';

    const transition=q('.transitionNote');
    if(transition)transition.textContent='S5 passes. S6 becomes the next open question.';

    const systemicHead=q('#systemicCard .head p');
    if(systemicHead)systemicHead.textContent='Check shared recovery only after S4 and S5 pass.';

    const gate=q('#systemicGate');
    if(gate){
      const b=q('b',gate),p=q('p',gate);
      if(b)b.textContent='Why systemic analysis waits';
      if(p&&!/S5 now passes/i.test(p.textContent))p.textContent='S4 and S5 must pass before shared-capacity conclusions.';
    }

    ['wy1','wy2','wy3'].forEach((id,i)=>{const e=$(id);if(e)e.textContent=['Evidence','Challenge','References'][i]});
    ['fx1','fx2','fx3'].forEach((id,i)=>{const e=$(id);if(e)e.textContent=['Repair','Retest','Rerun rules'][i]});
    ['sys1','sys2','sys3','sys4'].forEach((id,i)=>{const e=$(id);if(e)e.textContent=['S4 / S5','Demand set','Capacity / rights','Decision'][i]});

    const sysResult=$('systemicResult');
    if(sysResult){
      const p=q(':scope > p',sysResult),next=q(':scope > .next',sysResult);
      if(p)p.textContent='Three institutions share the recovery fabric; assured capacity, priority and coordination remain unknown.';
      if(next)next.textContent='Next: measure capacity and verify priority rights.';
    }

    const evidenceMain=$('evidenceUXMain');
    const evidenceSys=$('evidenceUXSystemic');
    [evidenceMain,evidenceSys].filter(Boolean).forEach(block=>{
      const top=q('.evidenceUXTop',block);if(top)top.remove();
      const next=q('.evidenceUXCol.next .evidenceUXLabel',block);if(next)next.textContent='NEXT';
    });

    const boundary=$('evidenceBoundaryCard');
    if(boundary){
      setText('.head h2','Public evidence has a boundary',boundary);
      const publicCol=q('.evidenceCol:first-child',boundary);
      const privateCol=q('.evidenceCol:nth-child(2)',boundary);
      if(publicCol){
        setText('h4','Public evidence can support',publicCol);
        const ul=q('ul',publicCol);
        if(ul)ul.innerHTML='<li>disclosed provider and service relationships;</li><li>critical-workload and recovery-path facts;</li><li>disclosed incidents and recovery tests.</li>';
      }
      if(privateCol){
        const h=q('h4',privateCol);if(h)h.innerHTML='Private evidence may still be needed <span class="evidenceBadge">not inferred</span>';
        const ul=q('ul',privateCol);
        if(ul)ul.innerHTML='<li>complete architecture and identity dependencies;</li><li>recovery entitlement and priority rights;</li><li>assured capacity and simultaneous-demand evidence.</li>';
      }
      const rule=q('.evidenceRule',boundary);
      if(rule){
        const b=q('b',rule),p=q('p',rule);
        if(b)b.textContent='Missing evidence stays UNKNOWN.';
        if(p)p.textContent='Shared exposure alone does not prove shared failure or a capacity shortage.';
      }
    }

    /* Live model output: keep substantive explanation/challenge, remove duplicate labels and raw ID noise. */
    const ai=$('aiBox');
    if(ai){
      const h=q('h4',ai);if(h&&/Apertus live review|Grounded explanation/i.test(h.textContent))h.textContent='Apertus review';
      const technical=qa('p',ai).find(p=>/^Validated:/i.test(p.textContent.trim()));
      if(technical)technical.remove();
    }
  }

  /* Dynamic process titles are useful, but the old sentences were too verbose. */
  const titleRules={
    parseTitle:[
      [/Reading the natural-language recovery scenario\.?/i,'Reading scenario…'],
      [/Apertus is extracting only explicitly stated facts\.?/i,'Extracting explicit facts…'],
      [/Live Apertus unavailable.+/i,'Using safe fallback…'],
      [/Host validation: enums, numbers and UNKNOWN fields\.?/i,'Validating evidence…'],
      [/Validated structure handed to deterministic rules\.?/i,'Sending evidence to rules…'],
      [/Apertus extraction validated.+/i,'Evidence structured. Running rules…'],
      [/Fallback validated.+/i,'Fallback ready. Running rules…']
    ],
    rulesTitle:[
      [/Checking workload and recovery target\.?/i,'Checking workload & target…'],
      [/Checking failure-domain and recovery-path independence\.?/i,'Checking recovery independence…'],
      [/Checking same-workload execution against tolerance\.?/i,'Checking execution vs tolerance…'],
      [/Stopping at the first binding or unresolved recovery condition\.?/i,'Resolving first binding state…'],
      [/Rule analysis complete.+/i,'First binding condition identified.']
    ],
    whyTitle:[
      [/Preparing explanation…/i,'Preparing review…'],
      [/Packaging validated facts and fixed decision\.?/i,'Preparing evidence…'],
      [/Apertus is challenging the interpretation\.?/i,'Challenging interpretation…'],
      [/Checking the deterministic interpretation\.?/i,'Checking interpretation…'],
      [/Validating rule and evidence references\.?/i,'Checking references…'],
      [/Apertus review complete.+/i,'Review complete.'],
      [/Explanation ready.+/i,'Explanation ready.'],
      [/Live review failed.+/i,'Review unavailable.']
    ],
    fixTitle:[
      [/Applying the intervention…/i,'Applying fix…'],
      [/Applying the narrow intervention: repair execution\.?/i,'Repairing execution…'],
      [/Retesting the same workload at 45 minutes\.?/i,'Retesting at 45 min…'],
      [/Rerunning rules to expose the next unresolved condition\.?/i,'Rerunning rules…'],
      [/Fix verified.+/i,'S5 passed. S6 is now open.']
    ],
    systemicTitle:[
      [/Checking shared-recovery evidence…/i,'Checking shared recovery…'],
      [/S4 \/ S5 recovery prerequisites pass\.?/i,'Confirming prerequisites…'],
      [/Three simultaneous synthetic claimants identified\.?/i,'Mapping simultaneous demand…'],
      [/Assured capacity, priority and coordination remain UNKNOWN\.?/i,'Checking capacity & rights…'],
      [/Stopping at S7 UNKNOWN.+/i,'Stopping at S7 UNKNOWN…'],
      [/Systemic gate complete.+/i,'S7 UNKNOWN — evidence needed.']
    ]
  };

  function compactTitle(id){
    const el=$(id);if(!el)return;
    const apply=()=>{
      const current=el.textContent.trim();
      for(const [rx,replacement] of titleRules[id]||[]){
        if(rx.test(current)&&current!==replacement){el.textContent=replacement;break}
      }
    };
    apply();
    new MutationObserver(apply).observe(el,{childList:true,characterData:true,subtree:true});
  }
  Object.keys(titleRules).forEach(compactTitle);

  /* ---------- MOTION ---------- */
  document.documentElement.classList.add('motion-enabled');
  const revealed=new WeakSet();
  let io=null;
  if('IntersectionObserver' in window&&!reduce()){
    io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('motion-in');revealed.add(entry.target);io.unobserve(entry.target)}
      });
    },{threshold:.08,rootMargin:'0px 0px -6%'});
  }

  function registerReveal(root=document){
    const els=[];
    if(root.nodeType===1&&root.matches?.('.hero,.flow,.card,.process,.closingPrinciple,#evidenceBoundaryCard'))els.push(root);
    els.push(...qa('.hero,.flow,.card,.process,.closingPrinciple,#evidenceBoundaryCard',root));
    els.forEach(el=>{
      if(revealed.has(el)||el.classList.contains('motion-reveal'))return;
      el.classList.add('motion-reveal');
      if(reduce()||!io){el.classList.add('motion-in');revealed.add(el)}else io.observe(el);
    });
  }

  function popResult(el){
    if(!el||el.classList.contains('hidden'))return;
    el.classList.remove('motion-result');
    void el.offsetWidth;
    el.classList.add('motion-result');
    setTimeout(()=>el.classList.remove('motion-result'),900);
  }

  ['decisionCard','systemicResult','aiBox','compareCard'].forEach(id=>{
    const el=$(id);if(!el)return;
    new MutationObserver(()=>{if(!el.classList.contains('hidden'))popResult(el)}).observe(el,{attributes:true,attributeFilter:['class']});
  });

  window.addEventListener('src-theme-change',()=>{
    const root=document.documentElement;
    root.classList.remove('theme-changing');
    void root.offsetWidth;
    root.classList.add('theme-changing');
    setTimeout(()=>root.classList.remove('theme-changing'),420);
  });

  /* New evidence blocks arrive after this script on some loads. Keep copy/motion polished there too. */
  const bodyObserver=new MutationObserver(mutations=>{
    let needsClean=false;
    mutations.forEach(m=>m.addedNodes.forEach(node=>{
      if(node.nodeType!==1)return;
      registerReveal(node);
      if(node.id==='evidenceBoundaryCard'||node.id==='evidenceUXMain'||node.id==='evidenceUXSystemic'||node.id==='aiBox'||node.querySelector?.('#evidenceBoundaryCard,#evidenceUXMain,#evidenceUXSystemic'))needsClean=true;
    }));
    if(needsClean)cleanStaticCopy();
  });
  bodyObserver.observe(document.body,{childList:true,subtree:true});

  /* AI text and systemic copy update after async calls. Re-run only the presentation cleanup. */
  ['aiBox','systemicResult','systemicGate'].forEach(id=>{
    const el=$(id);if(el)new MutationObserver(cleanStaticCopy).observe(el,{childList:true,characterData:true,subtree:true});
  });

  cleanStaticCopy();
  registerReveal();
})();
