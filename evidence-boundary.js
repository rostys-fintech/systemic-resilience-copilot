(()=>{
  const style=document.createElement('style');
  style.textContent=`
    .evidenceGrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.evidenceCol{border:1px solid var(--line);border-radius:11px;padding:15px;background:#fafcfd}.evidenceCol h4{font-size:12px;margin:0 0 9px;color:var(--navy)}.evidenceCol ul{margin:0;padding-left:17px}.evidenceCol li{font-size:10px;line-height:1.55;color:#4f6070;margin:5px 0}.evidenceRule{margin-top:12px;border:1px solid #d8c986;border-left:5px solid #c18a10;border-radius:10px;background:#fffaf0;padding:13px}.evidenceRule b{display:block;font-size:11px;color:#76560a;margin-bottom:5px}.evidenceRule p{margin:0;font-size:10px;line-height:1.55;color:#5d5336}.evidenceBadge{display:inline-block;padding:3px 7px;border-radius:999px;background:var(--amberbg);color:var(--amber);font-size:8px;font-weight:900;text-transform:uppercase;margin-left:6px}@media(max-width:760px){.evidenceGrid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const card=document.createElement('section');
  card.className='card';
  card.id='evidenceBoundaryCard';
  card.innerHTML=`
    <div class="head"><div class="kicker">Evidence boundary</div><h2>What public evidence can prove — and where it must stop</h2><p>The public-safe demo is reproducible, but it is intentionally not treated as equivalent to confidential supervisory information.</p></div>
    <div class="body">
      <div class="evidenceGrid">
        <div class="evidenceCol"><h4>Public / reproducible evidence can support</h4><ul><li>disclosed provider and service relationships;</li><li>named critical workload and stated failure-domain / recovery-path facts;</li><li>public incidents and explicitly disclosed recovery-test results;</li><li>a traceable record of exactly which facts support the decision.</li></ul></div>
        <div class="evidenceCol"><h4>Richer supervisory / private evidence may be required <span class="evidenceBadge">not inferred</span></h4><ul><li>complete bank-specific architecture and identity dependencies;</li><li>contractual recovery entitlements and priority rights;</li><li>assured shared-recovery capacity and the full simultaneous-demand set;</li><li>private test evidence and institution-specific breaker thresholds.</li></ul></div>
      </div>
      <div class="evidenceRule"><b>Product rule: evidence stops → inference stops.</b><p>If a required fact is missing, the state remains <strong>UNKNOWN</strong> and the next action is an evidence request or test. Public silence is not proof that private capability is absent, and shared recovery exposure is not proof of a capacity shortage.</p></div>
    </div>`;

  const footer=document.querySelector('.footer');
  if(footer&&footer.parentNode) footer.parentNode.insertBefore(card,footer);

  if(!document.querySelector('script[data-evidence-ux]')){
    const s=document.createElement('script');
    s.src='/evidence-ux.js';
    s.dataset.evidenceUx='1';
    document.body.appendChild(s);
  }
})();
