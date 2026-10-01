(()=>{
  const $=id=>document.getElementById(id);
  const style=document.createElement('style');
  style.textContent=`
  .evidenceUX{margin-top:14px;border:1px solid #cbd8e1;border-radius:12px;background:#fff;padding:14px}
  .evidenceUXTop{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:10px}
  .evidenceUXTop b{font-size:12px;color:var(--navy)}
  .evidenceUXTop span{font-size:9px;color:var(--muted)}
  .evidenceUXGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}
  .evidenceUXCol{border:1px solid var(--line);border-radius:10px;padding:12px;background:#fafcfd;min-height:105px}
  .evidenceUXCol.known{border-color:#b8d5c8;background:var(--greenbg)}
  .evidenceUXCol.unknown{border-color:#e4cb80;background:var(--amberbg)}
  .evidenceUXCol.next{border-color:#bfcfda;background:#f1f6f9}
  .evidenceUXLabel{font-size:9px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;margin-bottom:7px}
  .evidenceUXCol.known .evidenceUXLabel{color:var(--green)}
  .evidenceUXCol.unknown .evidenceUXLabel{color:var(--amber)}
  .evidenceUXCol.next .evidenceUXLabel{color:var(--navy)}
  .evidenceUXCol ul{margin:0;padding-left:16px}
  .evidenceUXCol li,.evidenceUXCol p{font-size:10px;line-height:1.45;color:#4e6070;margin:3px 0}
  .evidenceUXCol p{font-weight:800;color:var(--navy)}
  @media(max-width:760px){.evidenceUXGrid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const friendly={
    critical_workload:'critical workload',ict_service:'supporting ICT service',impact_tolerance_minutes:'recovery target',
    failure_domain_known:'relevant failure domain',capacity_state:'assured recovery capacity / rights',
    simultaneous_demand_evidence_state:'simultaneous recovery-demand evidence',recovery_route_outside_failure_domain:'recovery-path independence',
    same_workload_supported:'same-workload support',execution_tested:'execution test',observed_recovery_minutes:'observed recovery time'
  };

  function makeBlock(id){
    const el=document.createElement('div');el.className='evidenceUX hidden';el.id=id;
    el.innerHTML=`<div class="evidenceUXTop"><b>Evidence at a glance</b><span>Plain-language view · technical trace stays optional</span></div><div class="evidenceUXGrid"><div class="evidenceUXCol known"><div class="evidenceUXLabel">KNOWN</div><ul data-known></ul></div><div class="evidenceUXCol unknown"><div class="evidenceUXLabel">UNKNOWN</div><ul data-unknown></ul></div><div class="evidenceUXCol next"><div class="evidenceUXLabel">NEEDED NEXT</div><p data-next>Run the ordered rules.</p></div></div>`;
    return el;
  }

  const parsedPanel=$('parsedPanel');
  let main=null;
  if(parsedPanel){main=makeBlock('evidenceUXMain');parsedPanel.insertAdjacentElement('afterend',main)}

  function li(text){return `<li>${String(text).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}</li>`}
  function renderMain(){
    if(!main||!parsedPanel)return;
    if(parsedPanel.classList.contains('hidden')){main.classList.add('hidden');return;}
    main.classList.remove('hidden');
    const vals=[
      ['Workload',$('pWork')?.textContent],['Recovery target',$('pTol')?.textContent],['Failure domain',$('pFail')?.textContent],
      ['Recovery route',$('pRoute')?.textContent],['Execution test',$('pTest')?.textContent],['Observed recovery',$('pRecovery')?.textContent]
    ].filter(([,v])=>v&&v!=='—'&&!/UNKNOWN/i.test(v));
    main.querySelector('[data-known]').innerHTML=vals.length?vals.map(([k,v])=>li(`${k}: ${v}`)).join(''):li('No validated facts yet.');
    const raw=$('pUnknown')?.textContent||'';
    const fields=(raw.match(/Still UNKNOWN:\s*(.*)/i)?.[1]||'').split(',').map(x=>x.trim()).filter(Boolean);
    main.querySelector('[data-unknown]').innerHTML=fields.length?fields.map(x=>li(friendly[x]||x.replaceAll('_',' '))).join(''):li('No unresolved fields in the current extraction.');
    const nxt=($('decisionNext')?.textContent||'').replace(/^Next:\s*/i,'').trim();
    main.querySelector('[data-next]').textContent=nxt||'Run the ordered recovery rules to identify the first justified action or evidence request.';
  }

  if(parsedPanel)new MutationObserver(renderMain).observe(parsedPanel,{attributes:true,subtree:true,childList:true,characterData:true});
  ['pWork','pTol','pFail','pRoute','pTest','pRecovery','pUnknown','decisionNext'].forEach(id=>{const e=$(id);if(e)new MutationObserver(renderMain).observe(e,{subtree:true,childList:true,characterData:true})});

  const systemicResult=$('systemicResult');
  if(systemicResult){
    const sys=makeBlock('evidenceUXSystemic');
    systemicResult.appendChild(sys);
    const renderSys=()=>{
      if(systemicResult.classList.contains('hidden')){sys.classList.add('hidden');return}
      sys.classList.remove('hidden');
      sys.querySelector('[data-known]').innerHTML=[li('Recovery independence: PASS'),li('Same-workload execution: PASS'),li('Simultaneous demand set: 3 synthetic institutions')].join('');
      sys.querySelector('[data-unknown]').innerHTML=[li('Assured recovery capacity'),li('Priority / entitlement rights'),li('Coordination under simultaneous recovery')].join('');
      sys.querySelector('[data-next]').textContent='Measure assured capacity and obtain entitlement / priority evidence before any B3 shortage claim.';
    };
    new MutationObserver(renderSys).observe(systemicResult,{attributes:true,attributeFilter:['class']});
    renderSys();
  }
  renderMain();
})();