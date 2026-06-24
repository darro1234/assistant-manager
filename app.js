const SAVE_KEY='assistant_manager_mcd_v40';
const checklistData={
  Morning:{
    "Opening / Breakfast":["Breakfast area ready","Coffee machine ready","Egg cooker ready","Muffins ready","Breakfast stock up complete"],
    "Food Safety":["Food Safety Walk complete","Temperature checks complete","Date dot check complete","Delivery checked"],
    "Service":["Lobby open and clean","Customer toilets checked","DT ready","Lunch transition planned"],
    "Handover":["Issues from overnight reviewed","Manager communication updated"]
  },
  Evening:{
    "Pre-Rush":["Dinner rush preparation complete","Break plan ready","Stock up complete","Deployment checked"],
    "Operations":["Waste monitored","DT flow checked","Kitchen positioning checked","McDelivery area organised"],
    "Cleaning":["Lobby cleaning plan complete","Customer toilets checked","Beverage area stocked","Fries station ready"],
    "Handover to Overnight":["Maintenance issues communicated","Waste notes communicated","Staffing notes communicated","Overnight priorities prepared"]
  },
  Overnight:{
    "Food Safety":["Food Safety Walk complete","Temperature checks complete","DFS complete","Waste entered","Date dot check complete"],
    "Equipment":["Coffee machine cleaned","Beverage area cleaned","Dishwasher checked","Ice machine checked","Grills / Fryers checked"],
    "Security & Cash":["Back door locked","DT windows locked","Safe count complete","Tills checked"],
    "Breakfast":["Breakfast prepared","Egg cooker ready","Muffins ready","Breakfast stock up complete"],
    "Close / Open":["Kiosks restarted","Lobby ready","Kitchen ready","Stock up complete","Shift handover complete"]
  }
};
function q(id){return document.getElementById(id)}
function safeId(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'')}
function renderShiftChecklist(){
  const shift = q('shift_type')?.value || q('checklist_shift')?.value || 'Overnight';
  if(q('checklist_shift')) q('checklist_shift').value = shift;

  const box=q('dynamic_checklist');
  if(!box)return;

  let html='';
  const groups=checklistData[shift] || checklistData['Overnight'];

  Object.keys(groups).forEach(group=>{
    html += `<div class="taskGroup"><h3>${group}</h3>`;
    groups[group].forEach(task=>{
      const id='cl_'+safeId(shift+'_'+group+'_'+task);
      html += `<label class="taskCheck"><input id="${id}" type="checkbox" data-checklist-task="${task}"> ${task}</label>`;
    });
    html += '</div>';
  });

  box.innerHTML=html;
  loadData();

  document.querySelectorAll('input[data-checklist-task]').forEach(el=>{
    el.addEventListener('change',()=>{saveData();calculateChecklistCompletion();});
  });

  calculateChecklistCompletion();
}
function calculateChecklistCompletion(){
  const tasks=[...document.querySelectorAll('input[data-checklist-task]')];
  const done=tasks.filter(t=>t.checked).length;
  const total=tasks.length||1;
  const percent=Math.round(done/total*100);
  if(q('checklist_percent'))q('checklist_percent').textContent=percent+'%';
  if(q('checklist_fill'))q('checklist_fill').style.width=percent+'%';
  if(q('checklist_count'))q('checklist_count').textContent=done+' / '+total+' tasks completed';
  const shift=q('shift_type')?.value || q('checklist_shift')?.value || 'Shift';
  if(q('checklist_title'))q('checklist_title').textContent=shift+' Completion'; if(q('checklist_dynamic_title'))q('checklist_dynamic_title').textContent=shift+' Checklist';
  const missing=tasks.filter(t=>!t.checked).map(t=>t.getAttribute('data-checklist-task'));
  let msg=percent===100 ? 'Complete: '+shift+' checklist complete. Shift is ready for handover.' : 'Missing:\n- '+missing.join('\n- ');
  if(missing.includes('Waste entered'))msg+='\\n\\nWarning Warning: Waste has not been entered yet.';
  if(missing.includes('Breakfast prepared'))msg+='\\nWarning Warning: Breakfast preparation is not complete.';
  if(missing.includes('Food Safety Walk complete'))msg+='\\nWarning Warning: Food Safety Walk is not complete.';
  if(missing.includes('Back door locked'))msg+='\\nWarning Warning: Back Door lock check is missing.';
  if(missing.includes('Safe count complete'))msg+='\\nWarning Warning: Safe Count is not complete.';
  if(q('checklist_missing'))q('checklist_missing').textContent=msg;
}
function amNumber(id){const v=parseFloat(String(q(id)?.value||'').replace(',','.'));return isNaN(v)?null:v}
function amTarget(id,f){const v=amNumber(id);return v===null?f:v}
function calculateKPIHealth(){
  const targets={oepe:amTarget('target_oepe',110),kvs:amTarget('target_kvs',55),r2p:amTarget('target_r2p',80),mcdelivery:amTarget('target_mcdelivery',150),raw_waste:amTarget('target_raw',0.25),full_waste:amTarget('target_full',0.20),crew_meals:amTarget('target_crew',0.50),non_recipe:amTarget('target_nonrecipe',0.90)};
  const items=[['oepe','OEPE',' sec',targets.oepe],['kvs','KVS',' sec',targets.kvs],['r2p','R2P',' sec',targets.r2p],['mcdelivery','McDelivery',' sec',targets.mcdelivery],['raw_waste','Raw Waste','%',targets.raw_waste],['full_waste','Full Waste','%',targets.full_waste],['crew_meals','Crew Meals','%',targets.crew_meals],['non_recipe','Non-Recipe','%',targets.non_recipe]];
  let total=0,count=0,rows='',problems=[],warnings=[];
  items.forEach(([id,name,suffix,target])=>{
    const value=amNumber(id);let text='Missing',cls='',points=null;
    if(value!==null){count++; if(value<=target){text='OK';cls='statusOK';points=100}else if(value<=target*1.1){text='Close';cls='statusWarn';points=75;warnings.push(name)}else{text='Above Target';cls='statusBad';points=45;problems.push(name)} total+=points;}
    rows+=`<div class="healthItem"><div><strong>${name}</strong><br><small>${value===null ? 'No data' : value+suffix} / target ${target}${suffix}</small></div><span class="badge ${cls}">${text}</span></div>`;
  });
  const score=count?Math.round(total/count):0;let label='No KPI data',cls='statusWarn';
  if(count){if(score>=90){label='Excellent Shift';cls='statusOK'}else if(score>=75){label='Good Shift';cls='statusWarn'}else if(score>=60){label='Needs Attention';cls='statusWarn'}else{label='Critical Focus Needed';cls='statusBad'}}
  const healthHtml=`<div class="score">${count ? score : '--'}</div><div class="label">${label}</div><small>${count ? count+' KPI checked' : 'Enter KPI data first'}</small>`;
  ['shift_health_output','kpi_screen_health_output'].forEach(id=>{if(q(id)){q(id).innerHTML=healthHtml;q(id).classList.remove('statusOK','statusWarn','statusBad');q(id).classList.add(cls);}});
  ['kpi_health_grid','kpi_screen_health_grid'].forEach(id=>{if(q(id))q(id).innerHTML=rows;});
  let coach=!count ? 'Enter KPI and Waste data first, then calculate Shift Health.' : (!problems.length&&!warnings.length ? 'Great result. All entered KPI values are within target. Keep focus on service rhythm, communication and stock control.' : 'Focus areas:\n- '+problems.concat(warnings).join('\n- '));
  ['kpi_coach_output','kpi_screen_coach_output'].forEach(id=>{if(q(id))q(id).textContent=coach;});
  saveData();
}
function generateHandover(){
  const val=id=>(q(id)?.value||'').trim(); const checked=id=>q(id)?.checked;
  const shift=val('shift_type')||'Shift', date=val('shift_date')||'Today';
  const wins=[]; if(checked('hw_breakfast_ready'))wins.push('Breakfast was prepared and ready on time.'); if(checked('hw_stockup_done'))wins.push('Stock up was completed.'); if(checked('hw_coffee_clean'))wins.push('Coffee machine was cleaned.'); if(checked('hw_lobby_clean'))wins.push('Lobby was left clean.'); if(checked('hw_kitchen_good'))wins.push('Kitchen standards were good.'); if(checked('hw_dt_good'))wins.push('DT flow was stable.');
  const follow=[]; if(checked('hf_raw_watch'))follow.push('Please monitor Raw Waste.'); if(checked('hf_full_watch'))follow.push('Please monitor Full Waste.'); if(checked('hf_oepe_focus'))follow.push('Continue focus on OEPE.'); if(checked('hf_kvs_focus'))follow.push('Continue focus on KVS.'); if(checked('hf_stock_low'))follow.push('Stock needs checking.'); if(checked('hf_delivery_check'))follow.push('Delivery area needs follow up.');
  const note=val('handover_optional'); if(note)follow.push(note);
  let output=`${shift} Handover - ${date}\n\nPerformance KPIs:\n- OEPE: ${val('oepe')||'N/A'} sec\n- KVS: ${val('kvs')||'N/A'} sec\n- R2P: ${val('r2p')||'N/A'} sec\n- McDelivery: ${val('mcdelivery')||'N/A'} sec\n\nWaste:\n- Raw Waste: ${val('raw_waste')||'N/A'}%\n- Full Waste: ${val('full_waste')||'N/A'}%\n\nWins Today:\n- ${(wins.length?wins:['No specific wins selected.']).join('\n- ')}\n\nFollow Up:\n- ${(follow.length?follow:['No follow up selected.']).join('\n- ')}\n\nPlease continue to monitor open issues and keep communication clear during the next shift.`;
  if(q('handover_output')){q('handover_output').value=output;q('handover_output').dispatchEvent(new Event('input',{bubbles:true}));}
}
function generateStarFeedback(){
  const pick=a=>a[Math.floor(Math.random()*a.length)], name=(q('star_name')?.value||'Team Member').trim(), tone=q('star_tone')?.value||'Professional', notes=(q('star_notes')?.value||'').trim();
  const stationMap=[['st_kitchen','Kitchen'],['st_dt1','DT Window 1'],['st_dt2','DT Window 2'],['st_mcdelivery','McDelivery'],['st_lobby','Lobby'],['st_beverage','Beverage'],['st_stock','Stock Up'],['st_breakfast','Breakfast']];
  const stations=stationMap.filter(([id])=>q(id)?.checked).map(([,l])=>l); const st=stations.length ? stations.join(', ') : 'their assigned station';
  const openings=['Star of the Shift goes to '+name+'.',name+' is our Star of the Shift.',"Today's Star of the Shift is "+name+'.'];
  const closings=['Great work and thank you.','Well done and thank you for your hard work.','Thank you for your support and positive attitude.'];
  let output=`${pick(openings)} ${name} worked effectively on ${st} and supported the shift with good standards and teamwork. ${notes?notes+'. ':''}${pick(closings)}`;
  if(q('star_output')){q('star_output').value=output;q('star_output').dispatchEvent(new Event('input',{bubbles:true}));}
}
function fields(){return document.querySelectorAll('input:not(.navRadio), textarea, select')}
function saveData(){const data={};fields().forEach((el,i)=>{const k=el.id||el.name||('field_'+i);data[k]=el.type==='checkbox'?el.checked:el.value});localStorage.setItem(SAVE_KEY,JSON.stringify(data));}
function loadData(){const raw=localStorage.getItem(SAVE_KEY);if(!raw)return;try{const data=JSON.parse(raw);fields().forEach((el,i)=>{const k=el.id||el.name||('field_'+i);if(!(k in data))return;if(el.type==='checkbox')el.checked=!!data[k];else el.value=data[k];});}catch(e){}}
function resetSavedData(){if(confirm('Delete all saved data?')){localStorage.removeItem(SAVE_KEY);location.reload();}}
document.addEventListener('DOMContentLoaded',()=>{
  loadData();
  renderShiftChecklist();

  fields().forEach(el=>{
    el.addEventListener('input',saveData);
    el.addEventListener('change',saveData);
  });

  const shiftSelect = q('shift_type');
  if(shiftSelect){
    shiftSelect.addEventListener('change',()=>{
      saveData();
      renderShiftChecklist();
      if(q('star_shift_type')) q('star_shift_type').value = shiftSelect.value;
    });
  }

  setTimeout(()=>{calculateChecklistCompletion();},100);
});

;

function generateFullShiftReport(){
  const val = id => (document.getElementById(id)?.value || '').trim();
  const checked = id => document.getElementById(id)?.checked;
  const shift = val('shift_type') || 'Shift';
  const date = val('shift_date') || 'Today';
  const manager = val('manager_name') || 'Manager';

  // Calculate checklist completion from current visible checklist
  const checklistTasks = [...document.querySelectorAll('input[data-checklist-task]')];
  const doneTasks = checklistTasks.filter(t => t.checked);
  const missingTasks = checklistTasks.filter(t => !t.checked).map(t => t.getAttribute('data-checklist-task'));
  const checklistPercent = checklistTasks.length ? Math.round(doneTasks.length / checklistTasks.length * 100) : 0;

  // KPI score calculation
  const n = id => {
    const v = parseFloat(String(document.getElementById(id)?.value || '').replace(',', '.'));
    return isNaN(v) ? null : v;
  };
  const t = (id, fallback) => {
    const v = n(id);
    return v === null ? fallback : v;
  };
  const targets = {
    oepe: t('target_oepe',110),
    kvs: t('target_kvs',55),
    r2p: t('target_r2p',80),
    mcdelivery: t('target_mcdelivery',150),
    raw_waste: t('target_raw',0.25),
    full_waste: t('target_full',0.20),
    crew_meals: t('target_crew',0.50),
    non_recipe: t('target_nonrecipe',0.90)
  };
  const kpiItems = [
    ['oepe','OEPE',' sec',targets.oepe],
    ['kvs','KVS',' sec',targets.kvs],
    ['r2p','R2P',' sec',targets.r2p],
    ['mcdelivery','McDelivery',' sec',targets.mcdelivery],
    ['raw_waste','Raw Waste','%',targets.raw_waste],
    ['full_waste','Full Waste','%',targets.full_waste],
    ['crew_meals','Crew Meals','%',targets.crew_meals],
    ['non_recipe','Non-Recipe','%',targets.non_recipe]
  ];

  let scoreTotal = 0, scoreCount = 0;
  const kpiLines = [];
  const focus = [];
  kpiItems.forEach(([id,name,suffix,target])=>{
    const v = n(id);
    if(v === null){
      kpiLines.push(`${name}: N/A / target ${target}${suffix}`);
      return;
    }
    scoreCount++;
    let status = 'OK';
    let points = 100;
    if(v > target && v <= target * 1.10){ status = 'Close'; points = 75; focus.push(name); }
    else if(v > target * 1.10){ status = 'Above Target'; points = 45; focus.push(name); }
    scoreTotal += points;
    kpiLines.push(`${name}: ${v}${suffix} / target ${target}${suffix} - ${status}`);
  });
  const healthScore = scoreCount ? Math.round(scoreTotal / scoreCount) : null;
  const healthLabel = healthScore === null ? 'No KPI data' : healthScore >= 90 ? 'Excellent Shift' : healthScore >= 75 ? 'Good Shift' : healthScore >= 60 ? 'Needs Attention' : 'Critical Focus Needed';

  // Handover & Star
  const handover = val('handover_output');
  const star = val('star_output');

  let report = '';
  report += `FULL SHIFT REPORT\n`;
  report += `=================\n\n`;
  report += `Date: ${date}\n`;
  report += `Manager: ${manager}\n`;
  report += `Shift: ${shift}\n\n`;

  report += `SHIFT HEALTH\n`;
  report += `------------\n`;
  report += `Score: ${healthScore === null ? 'N/A' : healthScore + '/100'}\n`;
  report += `Status: ${healthLabel}\n`;
  report += `Checklist Completion: ${checklistPercent}% (${doneTasks.length}/${checklistTasks.length || 0})\n\n`;

  report += `KPI RESULTS\n`;
  report += `-----------\n`;
  report += `Sales: ${val('sales') ? 'EUR ' + val('sales') : 'N/A'}\n`;
  report += `Guests: ${val('guests') || 'N/A'}\n`;
  report += kpiLines.map(x => '- ' + x).join('\n') + '\n\n';

  report += `CHECKLIST\n`;
  report += `---------\n`;
  if(checklistTasks.length){
    report += `Completed: ${doneTasks.length}/${checklistTasks.length} (${checklistPercent}%)\n`;
    if(missingTasks.length){
      report += `Missing:\n- ${missingTasks.join('\n- ')}\n`;
    }else{
      report += `All checklist tasks completed.\n`;
    }
  }else{
    report += `No checklist data.\n`;
  }
  report += `\n`;

  report += `FOCUS AREAS\n`;
  report += `-----------\n`;
  if(focus.length){
    report += `- ${focus.join('\n- ')}\n`;
  }else{
    report += `- No major KPI focus areas from entered data.\n`;
  }
  report += `\n`;

  report += `HANDOVER\n`;
  report += `--------\n`;
  report += handover ? handover : 'No generated handover yet.';
  report += `\n\n`;

  report += `STAR OF THE SHIFT\n`;
  report += `-----------------\n`;
  report += star ? star : 'No Star of the Shift generated yet.';
  report += `\n\n`;

  report += `Generated by Manager+\n`;
  report += `(c) 2026 Dariusz Kaniewski`;

  const out = document.getElementById('full_shift_report');
  if(out){
    out.value = report;
    out.dispatchEvent(new Event('input', {bubbles:true}));
  }
}

function copyFullShiftReport(){
  const out = document.getElementById('full_shift_report');
  if(!out || !out.value.trim()){
    generateFullShiftReport();
  }
  const text = document.getElementById('full_shift_report')?.value || '';
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(()=>alert('Report copied.')).catch(()=>{
      fallbackCopyReport(text);
    });
  }else{
    fallbackCopyReport(text);
  }
}

function fallbackCopyReport(text){
  const out = document.getElementById('full_shift_report');
  if(out){
    out.focus();
    out.select();
    try{
      document.execCommand('copy');
      alert('Report copied.');
    }catch(e){
      alert('Copy failed. Please select and copy manually.');
    }
  }
}

;

function reportValue(id, empty='N/A'){
  const el = document.getElementById(id);
  const v = el ? String(el.value || '').trim() : '';
  return v || empty;
}

function reportNumber(id){
  const el = document.getElementById(id);
  if(!el) return null;
  const v = parseFloat(String(el.value || '').replace(',', '.'));
  return isNaN(v) ? null : v;
}

function reportTarget(id, fallback){
  const v = reportNumber(id);
  return v === null ? fallback : v;
}

function reportStatus(value, target){
  if(value === null) return {icon:'-', text:'No data', focus:false};
  if(value <= target) return {icon:'OK', text:'OK', focus:false};
  if(value <= target * 1.10) return {icon:'Warning', text:'Close to target', focus:true};
  return {icon:'X', text:'Above target', focus:true};
}

function buildBulletLines(items){
  if(!items || !items.length) return '- None';
  return items.map(item => '- ' + item).join('\n');
}

function generateFullShiftReport(){
  const shift = reportValue('shift_type', 'Shift');
  const date = reportValue('shift_date', 'Today');
  const manager = reportValue('manager_name', 'Manager');

  const checklistTasks = Array.from(document.querySelectorAll('input[data-checklist-task]'));
  const completedTasks = checklistTasks.filter(t => t.checked);
  const missingTasks = checklistTasks
    .filter(t => !t.checked)
    .map(t => t.getAttribute('data-checklist-task'));

  const checklistPercent = checklistTasks.length
    ? Math.round((completedTasks.length / checklistTasks.length) * 100)
    : 0;

  const targets = {
    oepe: reportTarget('target_oepe', 110),
    kvs: reportTarget('target_kvs', 55),
    r2p: reportTarget('target_r2p', 80),
    mcdelivery: reportTarget('target_mcdelivery', 150),
    raw_waste: reportTarget('target_raw', 0.25),
    full_waste: reportTarget('target_full', 0.20),
    crew_meals: reportTarget('target_crew', 0.50),
    non_recipe: reportTarget('target_nonrecipe', 0.90)
  };

  const kpis = [
    {id:'oepe', label:'OEPE', suffix:' sec', target:targets.oepe, section:'Service'},
    {id:'kvs', label:'KVS', suffix:' sec', target:targets.kvs, section:'Service'},
    {id:'r2p', label:'R2P', suffix:' sec', target:targets.r2p, section:'Service'},
    {id:'mcdelivery', label:'McDelivery', suffix:' sec', target:targets.mcdelivery, section:'Service'},
    {id:'raw_waste', label:'Raw Waste', suffix:'%', target:targets.raw_waste, section:'Waste'},
    {id:'full_waste', label:'Full Waste', suffix:'%', target:targets.full_waste, section:'Waste'},
    {id:'crew_meals', label:'Crew Meals', suffix:'%', target:targets.crew_meals, section:'Waste'},
    {id:'non_recipe', label:'Non-Recipe', suffix:'%', target:targets.non_recipe, section:'Waste'}
  ];

  let totalPoints = 0;
  let counted = 0;
  const serviceLines = [];
  const wasteLines = [];
  const focusAreas = [];

  kpis.forEach(kpi => {
    const value = reportNumber(kpi.id);
    const status = reportStatus(value, kpi.target);

    if(value !== null){
      counted++;
      if(status.text === 'OK') totalPoints += 100;
      else if(status.text === 'Close to target') totalPoints += 75;
      else totalPoints += 45;
    }

    const valueText = value === null ? 'N/A' : value + kpi.suffix;
    const line = `${status.icon} ${kpi.label}: ${valueText} / target ${kpi.target}${kpi.suffix} (${status.text})`;

    if(kpi.section === 'Service') serviceLines.push(line);
    else wasteLines.push(line);

    if(status.focus) focusAreas.push(kpi.label);
  });

  const healthScore = counted ? Math.round(totalPoints / counted) : null;
  const healthStatus =
    healthScore === null ? 'No KPI data' :
    healthScore >= 90 ? 'Excellent Shift' :
    healthScore >= 75 ? 'Good Shift' :
    healthScore >= 60 ? 'Needs Attention' :
    'Critical Focus Needed';

  const handover = reportValue('handover_output', '');
  const star = reportValue('star_output', '');

  const outstanding = [];
  if(missingTasks.length) outstanding.push(...missingTasks.slice(0, 10));
  if(focusAreas.length) outstanding.push('Review KPI focus areas: ' + focusAreas.join(', '));

  let report = '';
  report += `FULL SHIFT REPORT\n`;
  report += `Manager+\n\n`;

  report += `MANAGER DETAILS\n`;
  report += `Manager: ${manager}\n`;
  report += `Shift: ${shift}\n`;
  report += `Date: ${date}\n\n`;

  report += `SHIFT HEALTH\n`;
  report += `Score: ${healthScore === null ? 'N/A' : healthScore + '/100'}\n`;
  report += `Status: ${healthStatus}\n`;
  report += `Checklist: ${checklistTasks.length ? checklistPercent + '% completed (' + completedTasks.length + '/' + checklistTasks.length + ')' : 'No checklist data'}\n\n`;

  report += `SERVICE KPI SUMMARY\n`;
  report += `${serviceLines.join('\n') || '- No service KPI data'}\n\n`;

  report += `WASTE SUMMARY\n`;
  report += `${wasteLines.join('\n') || '- No waste data'}\n\n`;

  report += `OUTSTANDING ACTIONS\n`;
  report += `${buildBulletLines(outstanding.length ? outstanding : ['No outstanding actions from entered data'])}\n\n`;

  report += `MANAGER HANDOVER\n`;
  report += `${handover || 'No generated handover added yet.'}\n\n`;

  report += `STAR OF THE SHIFT\n`;
  report += `${star || 'No Star of the Shift generated yet.'}\n\n`;

  report += `NEXT SHIFT PRIORITY\n`;
  if(focusAreas.length){
    report += `- Continue focus on: ${focusAreas.join(', ')}.\n`;
  }else{
    report += `- Maintain current standards, communication and service rhythm.\n`;
  }

  report += `\nGenerated by Manager+\n`;
  report += `(c) 2026 Dariusz Kaniewski`;

  const out = document.getElementById('full_shift_report');
  if(out){
    out.value = report;
    out.dispatchEvent(new Event('input', {bubbles:true}));
  }
}

function copyFullShiftReport(){
  const out = document.getElementById('full_shift_report');
  if(!out || !out.value.trim()) generateFullShiftReport();

  const text = document.getElementById('full_shift_report')?.value || '';

  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text)
      .then(()=>alert('Report copied.'))
      .catch(()=>fallbackCopyReport());
  }else{
    fallbackCopyReport();
  }
}

function fallbackCopyReport(){
  const out = document.getElementById('full_shift_report');
  if(!out) return;
  out.focus();
  out.select();
  try{
    document.execCommand('copy');
    alert('Report copied.');
  }catch(e){
    alert('Copy failed. Please select and copy manually.');
  }
}

;

function cleanGeneratedText(text){
  if(!text) return '';
  return String(text)
    .replace(/\\n/g, '\n')
    .replace(/(^|[\s])n-/g, '$1-')
    .replace(/\nn-/g, '\n-')
    .replace(/:\s*n-/g, ':\n-')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function getValueClean(id, fallback=''){
  const el = document.getElementById(id);
  const v = el ? String(el.value || '').trim() : '';
  return v || fallback;
}

function checkedClean(id){
  return !!document.getElementById(id)?.checked;
}

function bulletList(items, fallback='- None'){
  const clean = (items || []).map(x => cleanGeneratedText(x)).filter(Boolean);
  if(!clean.length) return fallback;
  return clean.map(x => '- ' + x).join('\n');
}

function generateHandover(){
  const shift = getValueClean('shift_type', 'Shift');
  const date = getValueClean('shift_date', 'Today');

  const wins = [];
  if(checkedClean('hw_breakfast_ready')) wins.push('Breakfast was prepared and ready on time.');
  if(checkedClean('hw_stockup_done')) wins.push('Stock up was completed and key areas were left ready.');
  if(checkedClean('hw_coffee_clean')) wins.push('Coffee machine was cleaned and left in good condition.');
  if(checkedClean('hw_lobby_clean')) wins.push('Lobby and customer areas were left clean and presentable.');
  if(checkedClean('hw_kitchen_good')) wins.push('Kitchen standards were maintained well.');
  if(checkedClean('hw_dt_good')) wins.push('Drive Thru flow was stable and service was kept under control.');

  const follow = [];
  if(checkedClean('hf_raw_watch')) follow.push('Continue to monitor Raw Waste closely.');
  if(checkedClean('hf_full_watch')) follow.push('Continue to monitor Full Waste and make sure entries are accurate.');
  if(checkedClean('hf_oepe_focus')) follow.push('Continue focus on OEPE and Drive Thru flow.');
  if(checkedClean('hf_kvs_focus')) follow.push('Continue focus on KVS times and kitchen flow.');
  if(checkedClean('hf_stock_low')) follow.push('Stock levels need to be checked during the next shift.');
  if(checkedClean('hf_delivery_check')) follow.push('Delivery area needs follow up and organisation.');

  const optional = getValueClean('handover_optional');
  if(optional) follow.push(optional);

  const report = [
    `${shift} Handover - ${date}`,
    '',
    'PERFORMANCE KPIs',
    `- OEPE: ${getValueClean('oepe', 'N/A')} sec`,
    `- KVS: ${getValueClean('kvs', 'N/A')} sec`,
    `- R2P: ${getValueClean('r2p', 'N/A')} sec`,
    `- McDelivery: ${getValueClean('mcdelivery', 'N/A')} sec`,
    '',
    'WASTE',
    `- Raw Waste: ${getValueClean('raw_waste', 'N/A')}%`,
    `- Full Waste: ${getValueClean('full_waste', 'N/A')}%`,
    `- Crew Meals: ${getValueClean('crew_meals', 'N/A')}%`,
    `- Non-Recipe: ${getValueClean('non_recipe', 'N/A')}%`,
    '',
    'WINS TODAY',
    bulletList(wins, '- No specific wins selected.'),
    '',
    'FOLLOW UP',
    bulletList(follow, '- No follow up selected.'),
    '',
    'NEXT SHIFT NOTE',
    '- Please continue to monitor open issues and keep communication clear during the next shift.'
  ].join('\n');

  const out = document.getElementById('handover_output');
  if(out){
    out.value = cleanGeneratedText(report);
    out.dispatchEvent(new Event('input', {bubbles:true}));
  }
}

function reportNumberClean(id){
  const v = parseFloat(String(document.getElementById(id)?.value || '').replace(',', '.'));
  return isNaN(v) ? null : v;
}

function reportTargetClean(id, fallback){
  const v = reportNumberClean(id);
  return v === null ? fallback : v;
}

function statusClean(value, target){
  if(value === null) return {icon:'-', text:'No data', points:null, focus:false};
  if(value <= target) return {icon:'OK', text:'OK', points:100, focus:false};
  if(value <= target * 1.10) return {icon:'Warning', text:'Close to target', points:75, focus:true};
  return {icon:'X', text:'Above target', points:45, focus:true};
}

function generateFullShiftReport(){
  const shift = getValueClean('shift_type', 'Shift');
  const date = getValueClean('shift_date', 'Today');
  const manager = getValueClean('manager_name', 'Manager');

  const checklistTasks = Array.from(document.querySelectorAll('input[data-checklist-task]'));
  const completedTasks = checklistTasks.filter(t => t.checked);
  const missingTasks = checklistTasks
    .filter(t => !t.checked)
    .map(t => t.getAttribute('data-checklist-task'))
    .filter(Boolean);

  const checklistPercent = checklistTasks.length
    ? Math.round((completedTasks.length / checklistTasks.length) * 100)
    : 0;

  const targets = {
    oepe: reportTargetClean('target_oepe', 110),
    kvs: reportTargetClean('target_kvs', 55),
    r2p: reportTargetClean('target_r2p', 80),
    mcdelivery: reportTargetClean('target_mcdelivery', 150),
    raw_waste: reportTargetClean('target_raw', 0.25),
    full_waste: reportTargetClean('target_full', 0.20),
    crew_meals: reportTargetClean('target_crew', 0.50),
    non_recipe: reportTargetClean('target_nonrecipe', 0.90)
  };

  const kpis = [
    {id:'oepe', label:'OEPE', suffix:' sec', target:targets.oepe, section:'Service'},
    {id:'kvs', label:'KVS', suffix:' sec', target:targets.kvs, section:'Service'},
    {id:'r2p', label:'R2P', suffix:' sec', target:targets.r2p, section:'Service'},
    {id:'mcdelivery', label:'McDelivery', suffix:' sec', target:targets.mcdelivery, section:'Service'},
    {id:'raw_waste', label:'Raw Waste', suffix:'%', target:targets.raw_waste, section:'Waste'},
    {id:'full_waste', label:'Full Waste', suffix:'%', target:targets.full_waste, section:'Waste'},
    {id:'crew_meals', label:'Crew Meals', suffix:'%', target:targets.crew_meals, section:'Waste'},
    {id:'non_recipe', label:'Non-Recipe', suffix:'%', target:targets.non_recipe, section:'Waste'}
  ];

  let totalPoints = 0;
  let counted = 0;
  const serviceLines = [];
  const wasteLines = [];
  const focusAreas = [];

  kpis.forEach(kpi => {
    const value = reportNumberClean(kpi.id);
    const status = statusClean(value, kpi.target);

    if(value !== null){
      counted++;
      totalPoints += status.points;
    }

    const valueText = value === null ? 'N/A' : value + kpi.suffix;
    const line = `${status.icon} ${kpi.label}: ${valueText} / target ${kpi.target}${kpi.suffix} (${status.text})`;

    if(kpi.section === 'Service') serviceLines.push(line);
    else wasteLines.push(line);

    if(status.focus) focusAreas.push(kpi.label);
  });

  const healthScore = counted ? Math.round(totalPoints / counted) : null;
  const healthStatus =
    healthScore === null ? 'No KPI data' :
    healthScore >= 90 ? 'Excellent Shift' :
    healthScore >= 75 ? 'Good Shift' :
    healthScore >= 60 ? 'Needs Attention' :
    'Critical Focus Needed';

  const outstanding = [];
  if(missingTasks.length) outstanding.push(...missingTasks.slice(0, 10));
  if(focusAreas.length) outstanding.push('Review KPI focus areas: ' + focusAreas.join(', '));

  const handover = cleanGeneratedText(getValueClean('handover_output', ''));
  const star = cleanGeneratedText(getValueClean('star_output', ''));

  const report = [
    'FULL SHIFT REPORT',
    "Manager+",
    '',
    'MANAGER DETAILS',
    `Manager: ${manager}`,
    `Shift: ${shift}`,
    `Date: ${date}`,
    '',
    'SHIFT HEALTH',
    `Score: ${healthScore === null ? 'N/A' : healthScore + '/100'}`,
    `Status: ${healthStatus}`,
    `Checklist: ${checklistTasks.length ? checklistPercent + '% completed (' + completedTasks.length + '/' + checklistTasks.length + ')' : 'No checklist data'}` ,
    '',
    'SERVICE KPI SUMMARY',
    serviceLines.join('\n') || '- No service KPI data',
    '',
    'WASTE SUMMARY',
    wasteLines.join('\n') || '- No waste data',
    '',
    'OUTSTANDING ACTIONS',
    bulletList(outstanding.length ? outstanding : ['No outstanding actions from entered data']),
    '',
    'MANAGER HANDOVER',
    handover || 'No generated handover added yet.',
    '',
    'STAR OF THE SHIFT',
    star || 'No Star of the Shift generated yet.',
    '',
    'NEXT SHIFT PRIORITY',
    focusAreas.length
      ? `- Continue focus on: ${focusAreas.join(', ')}.`
      : '- Maintain current standards, communication and service rhythm.',
    '',
    "Generated by Manager+",
    '(c) 2026 Dariusz Kaniewski'
  ].join('\n');

  const out = document.getElementById('full_shift_report');
  if(out){
    out.value = cleanGeneratedText(report);
    out.dispatchEvent(new Event('input', {bubbles:true}));
  }
}

function copyFullShiftReport(){
  const out = document.getElementById('full_shift_report');
  if(!out || !out.value.trim()) generateFullShiftReport();

  const text = cleanGeneratedText(document.getElementById('full_shift_report')?.value || '');

  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text)
      .then(()=>alert('Report copied.'))
      .catch(()=>fallbackCopyReport());
  }else{
    fallbackCopyReport();
  }
}

function fallbackCopyReport(){
  const out = document.getElementById('full_shift_report');
  if(!out) return;
  out.value = cleanGeneratedText(out.value);
  out.focus();
  out.select();
  try{
    document.execCommand('copy');
    alert('Report copied.');
  }catch(e){
    alert('Copy failed. Please select and copy manually.');
  }
}

;

function calculateChecklistCompletion(){
  const tasks = Array.from(document.querySelectorAll('input[data-checklist-task]'));
  const done = tasks.filter(t => t.checked).length;
  const total = tasks.length || 1;
  const percent = Math.round((done / total) * 100);

  const percentEl = document.getElementById('checklist_percent');
  const fillEl = document.getElementById('checklist_fill');
  const countEl = document.getElementById('checklist_count');
  const missingEl = document.getElementById('checklist_missing');

  if(percentEl) percentEl.textContent = percent + '%';
  if(fillEl) fillEl.style.width = percent + '%';
  if(countEl) countEl.textContent = done + ' / ' + tasks.length + ' tasks completed';

  const shift = document.getElementById('shift_type')?.value || document.getElementById('checklist_shift')?.value || 'Shift';

  const titleEl = document.getElementById('checklist_title');
  const dynamicTitleEl = document.getElementById('checklist_dynamic_title');

  if(titleEl) titleEl.textContent = shift + ' Completion';
  if(dynamicTitleEl) dynamicTitleEl.textContent = shift + ' Checklist';

  const missing = tasks
    .filter(t => !t.checked)
    .map(t => t.getAttribute('data-checklist-task'))
    .filter(Boolean);

  let message = '';

  if(percent === 100){
    message = 'Complete ' + shift + ' checklist complete. Shift is ready for handover.';
  }else if(missing.length){
    message = 'Missing:\n' + missing.map(item => '- ' + item).join('\n');

    const warnings = [];
    if(missing.includes('Waste entered')) warnings.push('Warning Waste has not been entered yet.');
    if(missing.includes('Breakfast prepared')) warnings.push('Warning Breakfast preparation is not complete.');
    if(missing.includes('Food Safety Walk complete')) warnings.push('Warning Food Safety Walk is not complete.');
    if(missing.includes('Back door locked')) warnings.push('Warning Back Door lock check is missing.');
    if(missing.includes('Safe count complete')) warnings.push('Warning Safe Count is not complete.');

    if(warnings.length){
      message += '\n\nWarnings:\n' + warnings.map(item => '- ' + item).join('\n');
    }
  }else{
    message = 'No checklist tasks available.';
  }

  if(missingEl) missingEl.textContent = message;

  if(typeof saveData === 'function') saveData();
}

;

function calculateShiftScore(){
  const healthText = document.querySelector('#shift_health_output .score');
  let health = parseInt(healthText?.textContent || '0');
  if(isNaN(health)) health = 0;

  const tasks = Array.from(document.querySelectorAll('input[data-checklist-task]'));
  const done = tasks.filter(t=>t.checked).length;
  const checklist = tasks.length ? Math.round((done/tasks.length)*100) : 0;

  const finalScore = Math.round((health*0.7) + (checklist*0.3));

  let label='Needs Attention';
  if(finalScore>=90) label='Excellent Shift';
  else if(finalScore>=75) label='Good Shift';
  else label='Action Needed';

  const card=document.getElementById('shift_score_card');
  if(card){
    card.innerHTML='<div class="score">'+finalScore+'</div><div class="label">'+label+'</div><small>Health '+health+' | Checklist '+checklist+'%</small>';
  }

  const focus=[];
  const check=(id,target)=>{
    const el=document.getElementById(id);
    if(!el || !el.value) return;
    const v=parseFloat(el.value);
    if(v>target) focus.push(id);
  };

  check('oepe',110);
  check('kvs',55);
  check('r2p',80);
  check('mcdelivery',150);
  check('raw_waste',0.25);
  check('full_waste',0.20);

  let coach='';
  if(finalScore>=90){
    coach='Excellent shift performance. Service targets are under control. Maintain current standards and deployment.';
  }else{
    if(focus.includes('oepe')) coach+='- Focus on Drive Thru flow and Window 2 speed.\n';
    if(focus.includes('kvs')) coach+='- Review kitchen positioning and bottlenecks.\n';
    if(focus.includes('r2p')) coach+='- Improve order assembly and presenting speed.\n';
    if(focus.includes('mcdelivery')) coach+='- Organise McDelivery area and reduce waiting orders.\n';
    if(focus.includes('raw_waste')) coach+='- Reduce cooking levels and review forecasting.\n';
    if(focus.includes('full_waste')) coach+='- Review waste entries and production control.\n';
    if(!coach) coach='Maintain focus on standards, communication and completion of checklist tasks.';
  }

  const ai=document.getElementById('ai_coach_card');
  if(ai) ai.textContent=coach;
}

document.addEventListener('click', function(e){
  if(e.target && e.target.getAttribute('onclick')==='calculateKPIHealth()'){
    setTimeout(calculateShiftScore,100);
  }
});

const oldCalc = window.calculateKPIHealth;
if(oldCalc){
  window.calculateKPIHealth = function(){
    oldCalc();
    setTimeout(calculateShiftScore,50);
  }
}

;

function calculateShiftScore(){
  const healthText = document.querySelector('#shift_health_output .score');
  let health = parseInt(healthText?.textContent || '0');
  if(isNaN(health)) health = 0;

  const tasks = Array.from(document.querySelectorAll('input[data-checklist-task]'));
  const done = tasks.filter(t=>t.checked).length;
  const checklist = tasks.length ? Math.round((done/tasks.length)*100) : 0;

  const finalScore = Math.round((health*0.7) + (checklist*0.3));

  let label='Needs Attention';
  if(finalScore>=90) label='Excellent Shift';
  else if(finalScore>=75) label='Good Shift';
  else label='Action Needed';

  const card=document.getElementById('shift_score_card');
  if(card){
    card.innerHTML='<div class="score">'+finalScore+'</div><div class="label">'+label+'</div><small>Health '+health+' | Checklist '+checklist+'%</small>';
  }

  const num = id => {
    const el=document.getElementById(id);
    if(!el || el.value === '') return null;
    const v=parseFloat(String(el.value).replace(',', '.'));
    return isNaN(v) ? null : v;
  };

  const target = (id, fallback) => {
    const v = num(id);
    return v === null ? fallback : v;
  };

  const targets = {
    oepe: target('target_oepe',110),
    kvs: target('target_kvs',55),
    r2p: target('target_r2p',80),
    mcdelivery: target('target_mcdelivery',150),
    raw: target('target_raw',0.25),
    full: target('target_full',0.20),
    crew: target('target_crew',0.50),
    nonrecipe: target('target_nonrecipe',0.90)
  };

  const values = {
    oepe: num('oepe'),
    kvs: num('kvs'),
    r2p: num('r2p'),
    mcdelivery: num('mcdelivery'),
    raw: num('raw_waste'),
    full: num('full_waste'),
    crew: num('crew_meals'),
    nonrecipe: num('non_recipe')
  };

  let coach='';

  if(finalScore>=90){
    coach += 'Excellent shift performance. Service targets are under control. Maintain current standards, deployment and communication.\n';
  }

  if(values.oepe !== null && values.oepe > targets.oepe) coach+='- Focus on Drive Thru flow, order assembly and Window 2 speed.\n';
  if(values.kvs !== null && values.kvs > targets.kvs) coach+='- Review kitchen positioning, UHC flow and possible bottlenecks.\n';
  if(values.r2p !== null && values.r2p > targets.r2p) coach+='- Improve order readiness, packing and presenting speed.\n';
  if(values.mcdelivery !== null && values.mcdelivery > targets.mcdelivery) coach+='- Organise McDelivery area, check pending orders and reduce waiting bags.\n';

  if(values.raw !== null && values.raw > targets.raw) coach+='- Raw Waste is above target. Review cooking levels, production planning and forecasting.\n';
  if(values.full !== null && values.full > targets.full) coach+='- Full Waste is above target. Check order accuracy, product control and waste entries.\n';

  if(values.crew !== null){
    if(values.crew > targets.crew){
      coach+='- Crew Meals are above target. Review crew meal control and make sure entries are correct.\n';
    }else if(values.crew < targets.crew * 0.35){
      coach+='- Crew Meals are very low compared with target. Check if crew meals are being entered correctly into the system.\n';
    }else if(values.crew < targets.crew * 0.60){
      coach+='- Crew Meals are below expected level. This may be OK, but verify that crew meals were entered properly.\n';
    }
  }

  if(values.nonrecipe !== null){
    if(values.nonrecipe > targets.nonrecipe){
      coach+='- Non-Recipe is above target. Review non-recipe entries, promo/product corrections and possible incorrect waste categorisation.\n';
    }else if(values.nonrecipe > targets.nonrecipe * 0.85){
      coach+='- Non-Recipe is close to target. Keep monitoring entries and make sure categories are accurate.\n';
    }
  }

  if(checklist < 100){
    coach+='- Checklist is not fully complete. Review missing tasks before handover.\n';
  }

  if(!coach.trim()){
    coach='Maintain focus on standards, communication, food safety, waste accuracy and completion of checklist tasks.';
  }

  const ai=document.getElementById('ai_coach_card');
  if(ai) ai.textContent=coach.trim();
}

;

function calculateShiftScore(){
  const healthText = document.querySelector('#shift_health_output .score');
  let health = parseInt(healthText?.textContent || '0');
  if(isNaN(health)) health = 0;

  const tasks = Array.from(document.querySelectorAll('input[data-checklist-task]'));
  const done = tasks.filter(t => t.checked).length;
  const checklist = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const missingTasks = tasks
    .filter(t => !t.checked)
    .map(t => t.getAttribute('data-checklist-task'))
    .filter(Boolean);

  const finalScore = Math.round((health * 0.7) + (checklist * 0.3));

  let label = 'Needs Attention';
  if(finalScore >= 90) label = 'Excellent Shift';
  else if(finalScore >= 75) label = 'Good Shift';
  else label = 'Action Needed';

  const card = document.getElementById('shift_score_card');
  if(card){
    card.innerHTML =
      '<div class="score">' + finalScore + '</div>' +
      '<div class="label">' + label + '</div>' +
      '<small>Health ' + health + ' | Checklist ' + checklist + '%</small>';
  }

  const num = id => {
    const el = document.getElementById(id);
    if(!el || el.value === '') return null;
    const v = parseFloat(String(el.value).replace(',', '.'));
    return isNaN(v) ? null : v;
  };

  const target = (id, fallback) => {
    const v = num(id);
    return v === null ? fallback : v;
  };

  const targets = {
    oepe: target('target_oepe', 110),
    kvs: target('target_kvs', 55),
    r2p: target('target_r2p', 80),
    mcdelivery: target('target_mcdelivery', 150),
    raw: target('target_raw', 0.25),
    full: target('target_full', 0.20),
    crew: target('target_crew', 0.50),
    nonrecipe: target('target_nonrecipe', 0.90)
  };

  const values = {
    oepe: num('oepe'),
    kvs: num('kvs'),
    r2p: num('r2p'),
    mcdelivery: num('mcdelivery'),
    raw: num('raw_waste'),
    full: num('full_waste'),
    crew: num('crew_meals'),
    nonrecipe: num('non_recipe')
  };

  const shift = document.getElementById('shift_type')?.value || 'Shift';
  const tips = [];

  if(values.oepe !== null && values.oepe > targets.oepe){
    tips.push('Focus on Drive Thru flow, order assembly and Window 2 speed.');
  }
  if(values.kvs !== null && values.kvs > targets.kvs){
    tips.push('Review kitchen positioning, UHC flow and possible bottlenecks.');
  }
  if(values.r2p !== null && values.r2p > targets.r2p){
    tips.push('Improve order readiness, packing and presenting speed.');
  }
  if(values.mcdelivery !== null && values.mcdelivery > targets.mcdelivery){
    tips.push('Organise McDelivery area, check pending orders and reduce waiting bags.');
  }

  if(values.raw !== null && values.raw > targets.raw){
    tips.push('Raw Waste is above target. Review cooking levels, production planning and forecasting.');
  }
  if(values.full !== null && values.full > targets.full){
    tips.push('Full Waste is above target. Check order accuracy, product control and waste entries.');
  }

  if(values.crew !== null){
    if(values.crew > targets.crew){
      tips.push('Crew Meals are above target. Review crew meal control and make sure entries are correct.');
    }else if(values.crew < targets.crew * 0.35){
      tips.push('Crew Meals are very low compared with target. Check if crew meals are being entered correctly into the system.');
    }else if(values.crew < targets.crew * 0.60){
      tips.push('Crew Meals are below expected level. This may be OK, but verify that crew meals were entered properly.');
    }
  }

  if(values.nonrecipe !== null){
    if(values.nonrecipe > targets.nonrecipe){
      tips.push('Non-Recipe is above target. Review non-recipe entries, promo/product corrections and possible incorrect waste categorisation.');
    }else if(values.nonrecipe > targets.nonrecipe * 0.85){
      tips.push('Non-Recipe is close to target. Keep monitoring entries and make sure categories are accurate.');
    }
  }

  if(checklist < 100){
    tips.push('Checklist is not fully complete. Review missing tasks before handover.');
  }

  const lowerMissing = missingTasks.map(x => x.toLowerCase());

  if(shift === 'Overnight'){
    if(lowerMissing.some(x => x.includes('breakfast prepared'))) tips.push('Overnight: breakfast preparation is not complete. Confirm breakfast readiness before morning handover.');
    if(lowerMissing.some(x => x.includes('coffee machine'))) tips.push('Overnight: coffee machine cleaning/check has not been confirmed.');
    if(lowerMissing.some(x => x.includes('waste entered'))) tips.push('Overnight: waste has not been entered yet. Complete waste before handover.');
    if(lowerMissing.some(x => x.includes('back door'))) tips.push('Overnight: back door lock check is missing. Confirm security before leaving.');
    if(lowerMissing.some(x => x.includes('safe count'))) tips.push('Overnight: safe count is not complete. Confirm cash/security before handover.');
  }

  if(shift === 'Morning'){
    if(lowerMissing.some(x => x.includes('breakfast'))) tips.push('Morning: breakfast readiness needs attention before service builds.');
    if(lowerMissing.some(x => x.includes('lobby'))) tips.push('Morning: lobby/customer areas should be checked before peak trading.');
    if(lowerMissing.some(x => x.includes('delivery'))) tips.push('Morning: delivery check is missing. Review delivery and stock before the shift gets busy.');
  }

  if(shift === 'Evening'){
    if(lowerMissing.some(x => x.includes('stock'))) tips.push('Evening: stock up needs attention before handover to overnight.');
    if(lowerMissing.some(x => x.includes('waste'))) tips.push('Evening: waste monitoring or waste notes need follow-up.');
    if(lowerMissing.some(x => x.includes('handover'))) tips.push('Evening: prepare clear handover notes for the overnight manager.');
  }

  let coach = '';

  if(finalScore >= 90 && tips.length === 0){
    coach = 'Excellent shift performance. KPI results and checklist completion are strong. Maintain current standards, deployment and communication.';
  }else if(tips.length){
    const topTips = tips.slice(0, 6);
    coach = 'Smart AI Coach:\n' + topTips.map(t => '- ' + t).join('\n');
  }else{
    coach = 'Smart AI Coach:\n- Maintain focus on standards, communication, food safety, waste accuracy and completion of checklist tasks.';
  }

  const ai = document.getElementById('ai_coach_card');
  if(ai) ai.textContent = coach;

  if(typeof saveData === 'function') saveData();
}

;

function randomChoice(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumber(min, max, decimals=0){
  const v = Math.random() * (max - min) + min;
  return decimals ? v.toFixed(decimals) : Math.round(v);
}

function setField(id, value){
  const el = document.getElementById(id);
  if(!el) return;
  el.value = value;
  el.dispatchEvent(new Event('input', {bubbles:true}));
  el.dispatchEvent(new Event('change', {bubbles:true}));
}

function setCheck(id, value){
  const el = document.getElementById(id);
  if(!el) return;
  el.checked = !!value;
  el.dispatchEvent(new Event('change', {bubbles:true}));
}

function loadDemoData(){
  const managers = ['Dariusz', 'Anna', 'Mark', 'Sarah', 'Tom'];
  const shifts = ['Morning', 'Evening', 'Overnight'];
  const shift = randomChoice(shifts);

  const now = new Date();
  const today = [
    String(now.getDate()).padStart(2, '0'),
    String(now.getMonth() + 1).padStart(2, '0'),
    now.getFullYear()
  ].join('/');

  setField('shift_date', today);
  setField('manager_name', randomChoice(managers));
  setField('shift_type', shift);

  if(typeof renderShiftChecklist === 'function') renderShiftChecklist();

  setField('sales', randomNumber(3200, 7800, 2));
  setField('guests', randomNumber(420, 1250));
  setField('oepe', randomNumber(85, 155));
  setField('kvs', randomNumber(40, 82));
  setField('r2p', randomNumber(60, 115));
  setField('mcdelivery', randomNumber(110, 210));
  setField('labour', randomNumber(14, 24, 1));
  setField('csat', randomNumber(82, 98, 1));

  setField('raw_waste', randomNumber(0.12, 0.38, 2));
  setField('full_waste', randomNumber(0.08, 0.32, 2));
  setField('promo_waste', randomNumber(0.01, 0.08, 2));
  setField('crew_meals', randomChoice([randomNumber(0.08, 0.22, 2), randomNumber(0.35, 0.65, 2)]));
  setField('non_recipe', randomNumber(0.35, 1.10, 2));

  // Random checklist completion
  const tasks = Array.from(document.querySelectorAll('input[data-checklist-task]'));
  tasks.forEach(task => {
    setCheck(task.id, Math.random() > 0.22);
  });

  // Handover quick selections
  ['hw_breakfast_ready','hw_stockup_done','hw_coffee_clean','hw_lobby_clean','hw_kitchen_good','hw_dt_good',
   'hf_raw_watch','hf_full_watch','hf_oepe_focus','hf_kvs_focus','hf_stock_low','hf_delivery_check'
  ].forEach(id => setCheck(id, Math.random() > 0.45));

  setField('handover_optional', randomChoice([
    'Please continue to monitor service times and waste entries.',
    'Maintenance follow up may be needed if equipment issues continue.',
    'Next shift should keep focus on DT flow and stock levels.',
    'Please check that all waste and crew meals are entered correctly.'
  ]));

  // Star of the Shift demo
  const names = ['Troy', 'Pavithra', 'Ishan', 'Najma', 'Kasya', 'Brijesh', 'Tayyabali'];
  setField('star_name', randomChoice(names));
  setField('star_tone', randomChoice(['Professional', 'Warm', 'Very positive', 'Short']));
  setField('star_shift_type', shift);
  setField('star_length', randomChoice(['Standard', 'Short', 'Detailed']));

  ['st_kitchen','st_dt1','st_dt2','st_mcdelivery','st_lobby','st_beverage','st_stock','st_breakfast'].forEach(id => setCheck(id, false));
  randomChoice([
    ['st_kitchen','st_breakfast','st_stock'],
    ['st_dt2','st_beverage','st_stock'],
    ['st_mcdelivery','st_lobby'],
    ['st_dt1','st_dt2'],
    ['st_kitchen','st_stock']
  ]).forEach(id => setCheck(id, true));

  ['str_teamwork','str_cleanliness','str_speed','str_customer','str_stock','str_initiative'].forEach(id => setCheck(id, Math.random() > 0.5));

  setField('star_notes', randomChoice([
    'kept the station clean, completed stock up and supported the team',
    'worked with great pace and helped maintain good service flow',
    'showed a positive attitude and supported others during the shift',
    'maintained high standards and helped prepare the next part of the shift'
  ]));

  if(typeof calculateChecklistCompletion === 'function') calculateChecklistCompletion();
  if(typeof generateHandover === 'function') generateHandover();
  if(typeof generateStarFeedback === 'function') generateStarFeedback();
  if(typeof calculateKPIHealth === 'function') calculateKPIHealth();
  if(typeof calculateShiftScore === 'function') calculateShiftScore();
  if(typeof generateFullShiftReport === 'function') generateFullShiftReport();
  if(typeof saveData === 'function') saveData();

  alert('Demo data loaded.');
}

;

function resetSavedData(){
  if(!confirm('Clear all Assistant Manager saved data?')) return;

  try{
    Object.keys(localStorage).forEach(function(key){
      if(
        key.startsWith('assistant_manager') ||
        key.startsWith('assistant-manager') ||
        key.startsWith('sb_')
      ){
        localStorage.removeItem(key);
      }
    });

    // Also remove known older keys used during development
    [
      'assistant_manager_mcd_v26',
      'assistant_manager_mcd_v40',
      'assistant_manager_v26_autosave'
    ].forEach(function(key){
      localStorage.removeItem(key);
    });
  }catch(e){
    localStorage.clear();
  }

  // Clear visible fields before reload for immediate feedback
  document.querySelectorAll('input:not(.navRadio), textarea, select').forEach(function(el){
    if(el.type === 'checkbox'){
      el.checked = false;
    }else if(el.tagName === 'SELECT'){
      el.selectedIndex = 0;
    }else{
      el.value = '';
    }
  });

  setTimeout(function(){
    location.reload();
  }, 100);
}

;

(function(){
  const AM_KEYS = [
    'assistant_manager_mcd_v26',
    'assistant_manager_mcd_v40',
    'assistant_manager_v26_autosave',
    'assistant_manager_mcd_v44',
    'assistant_manager_mcd_current'
  ];

  function removeAssistantManagerStorage(){
    try{
      for(let i = localStorage.length - 1; i >= 0; i--){
        const key = localStorage.key(i);
        if(
          key &&
          (
            key.indexOf('assistant_manager') === 0 ||
            key.indexOf('assistant-manager') === 0 ||
            key.indexOf('assistantManager') === 0 ||
            key.indexOf('sb_') === 0
          )
        ){
          localStorage.removeItem(key);
        }
      }
      AM_KEYS.forEach(k => localStorage.removeItem(k));
    }catch(e){
      try{ localStorage.clear(); }catch(err){}
    }
  }

  function clearFields(){
    document.querySelectorAll('input:not(.navRadio), textarea, select').forEach(el => {
      if(el.type === 'checkbox'){
        el.checked = false;
      }else if(el.tagName === 'SELECT'){
        if(el.id === 'shift_type') el.value = 'Overnight';
        else if(el.id === 'checklist_shift') el.value = 'Overnight';
        else el.selectedIndex = 0;
      }else{
        el.value = '';
      }
    });

    const outputs = {
      shift_health_output: '<div class="score">--</div><div class="label">Enter KPI data and calculate</div>',
      kpi_health_grid: '',
      kpi_coach_output: 'KPI coaching tips will appear here after calculation.',
      shift_score_card: '<div class="score">--</div><div class="label">Shift Score</div>',
      ai_coach_card: 'AI Coach recommendations will appear here.',
      handover_output: '',
      star_output: '',
      full_shift_report: ''
    };

    Object.keys(outputs).forEach(id => {
      const el = document.getElementById(id);
      if(!el) return;
      if(el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') el.value = outputs[id];
      else el.innerHTML = outputs[id];
    });
  }

  window.hardResetAppData = function(){
    if(!confirm('Clear all saved data and demo data?')) return;

    removeAssistantManagerStorage();

    // Mark reset so older load functions do not restore immediately.
    try{
      sessionStorage.setItem('assistant_manager_hard_reset_done', '1');
    }catch(e){}

    clearFields();

    setTimeout(function(){
      location.href = location.pathname + '-reset=' + Date.now();
    }, 150);
  };

  // Override older reset names too.
  window.resetSavedData = window.hardResetAppData;

  // On load after hard reset, remove storage again before old autosave can restore.
  if(location.search.indexOf('reset=') !== -1){
    removeAssistantManagerStorage();
    try{ sessionStorage.removeItem('assistant_manager_hard_reset_done'); }catch(e){}
    setTimeout(clearFields, 50);
    setTimeout(function(){
      if(history && history.replaceState){
        history.replaceState(null, '', location.pathname);
      }
    }, 200);
  }
})();

;

(function(){
  const AM_STORAGE_KEYS = [
    'assistant_manager_mcd_v26',
    'assistant_manager_mcd_v40',
    'assistant_manager_v26_autosave',
    'assistant_manager_mcd_v44',
    'assistant_manager_mcd_current'
  ];

  function clearAMStorage(){
    try{
      for(let i = localStorage.length - 1; i >= 0; i--){
        const key = localStorage.key(i);
        if(!key) continue;
        if(
          key.indexOf('assistant_manager') === 0 ||
          key.indexOf('assistant-manager') === 0 ||
          key.indexOf('assistantManager') === 0 ||
          key.indexOf('sb_') === 0
        ){
          localStorage.removeItem(key);
        }
      }
      AM_STORAGE_KEYS.forEach(k => localStorage.removeItem(k));
    }catch(e){
      try{ localStorage.clear(); }catch(err){}
    }
  }

  function clearVisibleApp(){
    document.querySelectorAll('input:not(.navRadio), textarea, select').forEach(el => {
      if(el.type === 'checkbox'){
        el.checked = false;
      }else if(el.tagName === 'SELECT'){
        if(el.id === 'shift_type' || el.id === 'checklist_shift') el.value = 'Overnight';
        else el.selectedIndex = 0;
      }else{
        el.value = '';
      }
      el.dispatchEvent(new Event('input', {bubbles:true}));
      el.dispatchEvent(new Event('change', {bubbles:true}));
    });

    const setHTML = (id, html) => {
      const el = document.getElementById(id);
      if(el) el.innerHTML = html;
    };
    const setText = (id, text) => {
      const el = document.getElementById(id);
      if(el) el.textContent = text;
    };
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if(el) el.value = val;
    };

    setHTML('shift_health_output','<div class="score">--</div><div class="label">Enter KPI data and calculate</div>');
    setHTML('kpi_screen_health_output','<div class="score">--</div><div class="label">Enter KPI data and calculate</div>');
    setHTML('shift_score_card','<div class="score">--</div><div class="label">Shift Score</div>');
    setText('kpi_coach_output','KPI coaching tips will appear here after calculation.');
    setText('kpi_screen_coach_output','KPI coaching tips will appear here after calculation.');
    setText('ai_coach_card','AI Coach recommendations will appear here.');
    setHTML('kpi_health_grid','');
    setHTML('kpi_screen_health_grid','');
    setVal('handover_output','');
    setVal('star_output','');
    setVal('full_shift_report','');

    if(typeof renderShiftChecklist === 'function') renderShiftChecklist();
    if(typeof calculateChecklistCompletion === 'function') calculateChecklistCompletion();
    if(typeof calculateOvernightCompletion === 'function') calculateOvernightCompletion();
  }

  function buttonFeedback(btn, text){
    if(!btn) return;
    const old = btn.textContent;
    btn.textContent = text;
    btn.style.transform = 'scale(.97)';
    btn.style.filter = 'brightness(1.4)';
    setTimeout(() => {
      btn.style.transform = '';
      btn.style.filter = '';
      btn.textContent = old;
    }, 900);
  }

  window.clearAssistantManagerData = function(btn){
    if(!confirm('Clear all saved data and demo data?')) return;

    // Stop old autosave functions from immediately writing old values again.
    window.__AM_RESETTING__ = true;

    clearAMStorage();
    clearVisibleApp();
    clearAMStorage();

    buttonFeedback(btn, 'Cleared OK');

    setTimeout(() => {
      clearAMStorage();
      window.__AM_RESETTING__ = false;
    }, 500);
  };

  // Override old reset names.
  window.resetSavedData = function(){ window.clearAssistantManagerData(document.activeElement); };
  window.hardResetAppData = function(){ window.clearAssistantManagerData(document.activeElement); };

  // Wrap old saveData if it exists, so it does nothing during reset.
  if(typeof window.saveData === 'function'){
    const oldSaveData = window.saveData;
    window.saveData = function(){
      if(window.__AM_RESETTING__) return;
      return oldSaveData.apply(this, arguments);
    };
  }
})();

;

(function(){
  let clearArmed = false;

  function showStatus(message){
    const box = document.getElementById('homeActionStatus');
    if(!box) return;
    box.style.display = 'block';
    box.textContent = message;
    setTimeout(()=>{ box.style.display = 'none'; }, 2200);
  }

  function clearAssistantStorageOnly(){
    try{
      for(let i = localStorage.length - 1; i >= 0; i--){
        const key = localStorage.key(i);
        if(!key) continue;
        if(
          key.indexOf('assistant_manager') === 0 ||
          key.indexOf('assistant-manager') === 0 ||
          key.indexOf('assistantManager') === 0 ||
          key.indexOf('sb_') === 0
        ){
          localStorage.removeItem(key);
        }
      }
      [
        'assistant_manager_mcd_v26',
        'assistant_manager_mcd_v40',
        'assistant_manager_v26_autosave',
        'assistant_manager_mcd_v44',
        'assistant_manager_mcd_current'
      ].forEach(k => localStorage.removeItem(k));
    }catch(e){
      try{ localStorage.clear(); }catch(err){}
    }
  }

  function clearVisibleFields(){
    document.querySelectorAll('input:not(.navRadio), textarea, select').forEach(el=>{
      if(el.type === 'checkbox'){
        el.checked = false;
      }else if(el.tagName === 'SELECT'){
        if(el.id === 'shift_type' || el.id === 'checklist_shift') el.value = 'Overnight';
        else el.selectedIndex = 0;
      }else{
        el.value = '';
      }
      el.dispatchEvent(new Event('input', {bubbles:true}));
      el.dispatchEvent(new Event('change', {bubbles:true}));
    });

    const htmlReset = {
      shift_health_output:'<div class="score">--</div><div class="label">Enter KPI data and calculate</div>',
      kpi_screen_health_output:'<div class="score">--</div><div class="label">Enter KPI data and calculate</div>',
      shift_score_card:'<div class="score">--</div><div class="label">Shift Score</div>'
    };
    Object.keys(htmlReset).forEach(id=>{
      const el = document.getElementById(id);
      if(el) el.innerHTML = htmlReset[id];
    });

    ['kpi_health_grid','kpi_screen_health_grid'].forEach(id=>{
      const el=document.getElementById(id);
      if(el) el.innerHTML='';
    });

    const textReset = {
      kpi_coach_output:'KPI coaching tips will appear here after calculation.',
      kpi_screen_coach_output:'KPI coaching tips will appear here after calculation.',
      ai_coach_card:'AI Coach recommendations will appear here.',
      checklist_missing:'Missing tasks will appear here.'
    };
    Object.keys(textReset).forEach(id=>{
      const el=document.getElementById(id);
      if(el) el.textContent=textReset[id];
    });

    ['handover_output','star_output','full_shift_report'].forEach(id=>{
      const el=document.getElementById(id);
      if(el) el.value='';
    });

    if(typeof renderShiftChecklist === 'function') renderShiftChecklist();
    if(typeof calculateChecklistCompletion === 'function') calculateChecklistCompletion();
  }

  function iPhoneClearAll(btn){
    if(!clearArmed){
      clearArmed = true;
      if(btn) btn.textContent = 'Tap again to clear';
      showStatus('Tap Clear All Data again to confirm.');
      setTimeout(()=>{
        clearArmed = false;
        if(btn) btn.textContent = 'Clear All Data';
      }, 3500);
      return;
    }

    clearArmed = false;
    if(btn){
      btn.textContent = 'Cleared OK';
      btn.style.transform = 'scale(.97)';
      btn.style.filter = 'brightness(1.35)';
    }

    window.__AM_RESETTING__ = true;
    clearAssistantStorageOnly();
    clearVisibleFields();
    clearAssistantStorageOnly();

    setTimeout(()=>{
      window.__AM_RESETTING__ = false;
      if(btn){
        btn.textContent = 'Clear All Data';
        btn.style.transform = '';
        btn.style.filter = '';
      }
      showStatus('All data cleared.');
    }, 700);
  }

  function iPhoneLoadDemo(btn){
    if(btn){
      btn.textContent = 'Loading...';
      btn.style.transform = 'scale(.97)';
      btn.style.filter = 'brightness(1.35)';
    }

    try{
      if(typeof window.loadDemoData === 'function'){
        window.loadDemoData();
      }else{
        throw new Error('loadDemoData not found');
      }
      showStatus('Demo data loaded.');
    }catch(e){
      showStatus('Demo data could not load in this preview. Open in Safari or GitHub Pages.');
    }

    setTimeout(()=>{
      if(btn){
        btn.textContent = 'Load Demo Data';
        btn.style.transform = '';
        btn.style.filter = '';
      }
    }, 900);
  }

  window.clearAssistantManagerData = function(btn){ iPhoneClearAll(btn || document.getElementById('btnClearData')); };
  window.resetSavedData = window.clearAssistantManagerData;
  window.hardResetAppData = window.clearAssistantManagerData;

  document.addEventListener('DOMContentLoaded', ()=>{
    const demo = document.getElementById('btnLoadDemo');
    const clear = document.getElementById('btnClearData');

    if(demo){
      demo.addEventListener('click', e=>{
        e.preventDefault();
        iPhoneLoadDemo(demo);
      }, {passive:false});
      demo.addEventListener('touchstart', ()=>demo.style.transform='scale(.97)', {passive:true});
      demo.addEventListener('touchend', ()=>demo.style.transform='', {passive:true});
    }

    if(clear){
      clear.addEventListener('click', e=>{
        e.preventDefault();
        iPhoneClearAll(clear);
      }, {passive:false});
      clear.addEventListener('touchstart', ()=>clear.style.transform='scale(.97)', {passive:true});
      clear.addEventListener('touchend', ()=>clear.style.transform='', {passive:true});
    }
  });
})();

;

(function(){
  let clearReady = false;
  let lastTouch = 0;

  function flash(btn, text){
    if(!btn) return;
    const old = btn.textContent;
    btn.classList.add('touchFlash');
    if(text) btn.textContent = text;
    setTimeout(function(){
      btn.classList.remove('touchFlash');
      btn.textContent = old;
    }, 850);
  }

  function showHomeStatus(msg){
    let box = document.getElementById('homeActionStatus');
    if(!box){
      box = document.createElement('div');
      box.id = 'homeActionStatus';
      box.className = 'coachBox';
      const controls = document.querySelector('.homeControls');
      if(controls && controls.parentNode){
        controls.parentNode.insertBefore(box, controls.nextSibling);
      }
    }
    box.style.display = 'block';
    box.textContent = msg;
    setTimeout(function(){ box.style.display='none'; }, 2200);
  }

  function clearStorage(){
    try{
      for(let i=localStorage.length-1;i>=0;i--){
        const k = localStorage.key(i);
        if(!k) continue;
        if(k.indexOf('assistant_manager')===0 || k.indexOf('assistant-manager')===0 || k.indexOf('assistantManager')===0 || k.indexOf('sb_')===0){
          localStorage.removeItem(k);
        }
      }
      ['assistant_manager_mcd_v26','assistant_manager_mcd_v40','assistant_manager_v26_autosave','assistant_manager_mcd_v44','assistant_manager_mcd_current'].forEach(function(k){
        localStorage.removeItem(k);
      });
    }catch(e){
      try{ localStorage.clear(); }catch(err){}
    }
  }

  function clearFields(){
    document.querySelectorAll('input:not(.navRadio), textarea, select').forEach(function(el){
      if(el.type === 'checkbox') el.checked = false;
      else if(el.tagName === 'SELECT'){
        if(el.id === 'shift_type' || el.id === 'checklist_shift') el.value = 'Overnight';
        else el.selectedIndex = 0;
      }else el.value = '';
      el.dispatchEvent(new Event('input', {bubbles:true}));
      el.dispatchEvent(new Event('change', {bubbles:true}));
    });

    const htmls = {
      shift_health_output:'<div class="score">--</div><div class="label">Enter KPI data and calculate</div>',
      kpi_screen_health_output:'<div class="score">--</div><div class="label">Enter KPI data and calculate</div>',
      shift_score_card:'<div class="score">--</div><div class="label">Shift Score</div>'
    };
    Object.keys(htmls).forEach(function(id){
      const el=document.getElementById(id);
      if(el) el.innerHTML=htmls[id];
    });
    ['kpi_health_grid','kpi_screen_health_grid'].forEach(function(id){
      const el=document.getElementById(id);
      if(el) el.innerHTML='';
    });
    ['handover_output','star_output','full_shift_report'].forEach(function(id){
      const el=document.getElementById(id);
      if(el) el.value='';
    });
    const txt = {
      kpi_coach_output:'KPI coaching tips will appear here after calculation.',
      kpi_screen_coach_output:'KPI coaching tips will appear here after calculation.',
      ai_coach_card:'AI Coach recommendations will appear here.'
    };
    Object.keys(txt).forEach(function(id){
      const el=document.getElementById(id);
      if(el) el.textContent=txt[id];
    });

    if(typeof renderShiftChecklist === 'function') renderShiftChecklist();
    if(typeof calculateChecklistCompletion === 'function') calculateChecklistCompletion();
  }

  window.amTouchLoadDemo = function(btn){
    const now = Date.now();
    if(now - lastTouch < 350) return;
    lastTouch = now;
    flash(btn, 'Loading...');
    try{
      if(typeof loadDemoData === 'function'){
        loadDemoData();
        showHomeStatus('Demo data loaded.');
      }else{
        showHomeStatus('Demo loader not available in this preview.');
      }
    }catch(e){
      showHomeStatus('Open this file in Safari, not preview mode.');
    }
  };

  window.amTouchClearData = function(btn){
    const now = Date.now();
    if(now - lastTouch < 350) return;
    lastTouch = now;

    if(!clearReady){
      clearReady = true;
      flash(btn, 'Tap again');
      showHomeStatus('Tap Clear All Data again to confirm.');
      setTimeout(function(){ clearReady=false; }, 3500);
      return;
    }

    clearReady = false;
    window.__AM_RESETTING__ = true;
    clearStorage();
    clearFields();
    clearStorage();
    flash(btn, 'Cleared OK');
    showHomeStatus('All data cleared.');
    setTimeout(function(){ window.__AM_RESETTING__ = false; }, 800);
  };

  // Avoid old handlers fighting with this version
  window.clearAssistantManagerData = window.amTouchClearData;
  window.resetSavedData = function(){ window.amTouchClearData(document.getElementById('btnClearData')); };
  window.hardResetAppData = window.resetSavedData;

  document.addEventListener('DOMContentLoaded', function(){
    const controls = document.querySelector('.homeControls');
    if(controls){
      controls.style.position = 'relative';
      controls.style.zIndex = '9999';
      controls.style.pointerEvents = 'auto';
    }
    ['btnLoadDemo','btnClearData'].forEach(function(id){
      const b=document.getElementById(id);
      if(b){
        b.style.pointerEvents='auto';
        b.style.position='relative';
        b.style.zIndex='10000';
      }
    });
  });
})();

;

(function(){
  function setupManagerPlusDate(){
    var el = document.getElementById('shift_date');
    if(!el) return;

    el.addEventListener('input', function(){
      var digits = String(el.value || '').replace(/\D/g, '').slice(0, 8);
      var formatted = '';

      if(digits.length <= 2){
        formatted = digits;
      }else if(digits.length <= 4){
        formatted = digits.slice(0,2) + '/' + digits.slice(2);
      }else{
        formatted = digits.slice(0,2) + '/' + digits.slice(2,4) + '/' + digits.slice(4);
      }

      el.value = formatted;

      if(typeof saveData === 'function'){
        try{ saveData(); }catch(e){}
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', setupManagerPlusDate);
  }else{
    setupManagerPlusDate();
  }
})();

;

function copyTextarea(id){
  const el=document.getElementById(id);
  if(!el || !el.value.trim()){
    alert('Nothing to copy.');
    return;
  }
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(el.value)
      .then(()=>alert('Copied.'))
      .catch(()=>fallbackCopyTextarea(el));
  }else{
    fallbackCopyTextarea(el);
  }
}
function fallbackCopyTextarea(el){
  el.focus();
  el.select();
  try{
    document.execCommand('copy');
    alert('Copied.');
  }catch(e){
    alert('Copy failed.');
  }
}

;

(function(){
window.amToast=function(msg){
 let t=document.getElementById('amToast');
 if(!t){
   t=document.createElement('div');
   t.id='amToast';
   t.className='toastMsg';
   document.body.appendChild(t);
 }
 t.textContent=msg;
 t.classList.add('show');
 clearTimeout(window.__amToastTimer);
 window.__amToastTimer=setTimeout(()=>t.classList.remove('show'),2200);
};

window.alert=function(msg){
 amToast(String(msg||''));
};

window.confirm=function(msg){
 amToast(String(msg||''));
 return true;
};
})();

;

/* Manager+ v6.0 Restaurant Profile + Editable Shift Tasks */
(function(){
  const PROFILE_KEY = 'manager_plus_profile_v60';
  const TASKS_KEY = 'manager_plus_shift_tasks_v60';

  function clone(obj){
    return JSON.parse(JSON.stringify(obj));
  }

  function defaultTasks(){
    return clone(window.checklistData || checklistData);
  }

  function loadProfile(){
    try{
      return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
    }catch(e){
      return {};
    }
  }

  function saveProfile(){
    const profile = {
      restaurantName: String(document.getElementById('restaurant_name')?.value || '').trim(),
      defaultManagerName: String(document.getElementById('default_manager_name')?.value || '').trim()
    };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));

    const manager = document.getElementById('manager_name');
    if(manager && !String(manager.value || '').trim() && profile.defaultManagerName){
      manager.value = profile.defaultManagerName;
      manager.dispatchEvent(new Event('input', {bubbles:true}));
    }

    if(typeof saveData === 'function') saveData();
  }

  function applyProfile(){
    const profile = loadProfile();

    const restaurantInput = document.getElementById('restaurant_name');
    const defaultManagerInput = document.getElementById('default_manager_name');
    const managerInput = document.getElementById('manager_name');

    if(restaurantInput && profile.restaurantName) restaurantInput.value = profile.restaurantName;
    if(defaultManagerInput && profile.defaultManagerName) defaultManagerInput.value = profile.defaultManagerName;

    if(managerInput && !String(managerInput.value || '').trim() && profile.defaultManagerName){
      managerInput.value = profile.defaultManagerName;
    }
  }

  function loadShiftTasks(){
    try{
      const saved = JSON.parse(localStorage.getItem(TASKS_KEY) || 'null');
      if(saved && typeof saved === 'object') return saved;
    }catch(e){}
    const d = defaultTasks();
    localStorage.setItem(TASKS_KEY, JSON.stringify(d));
    return d;
  }

  function saveShiftTasks(data){
    localStorage.setItem(TASKS_KEY, JSON.stringify(data));
  }

  window.getManagerPlusShiftTasks = function(){
    return loadShiftTasks();
  };

  window.renderShiftTaskEditor = function(){
    const holder = document.getElementById('shift_task_editor');
    if(!holder) return;

    const data = loadShiftTasks();
    const shifts = ['Morning','Evening','Overnight'];

    let html = '';

    shifts.forEach(shift => {
      html += '<div class="taskEditorGroup">';
      html += '<h4>' + shift + '</h4>';

      const groups = data[shift] || {};
      const groupNames = Object.keys(groups);

      if(!groupNames.length){
        html += '<div class="customTaskRow"><span>No tasks yet.</span></div>';
      }

      groupNames.forEach(group => {
        const tasks = groups[group] || [];
        if(tasks.length){
          html += '<label class="fieldLabel">' + group + '</label>';
        }

        tasks.forEach((task, index) => {
          html += '<div class="customTaskRow">';
          html += '<span>' + task + '</span>';
          html += '<button class="deleteTaskBtn" type="button" onclick="deleteShiftTask(' + JSON.stringify(shift) + ',' + JSON.stringify(group) + ',' + index + ')">Delete</button>';
          html += '</div>';
        });
      });

      html += '<div class="addTaskBox">';
      html += '<input id="new_task_' + shift + '" type="text" placeholder="Add new ' + shift + ' task">';
      html += '<button class="generateBtn" type="button" onclick="addShiftTask(' + JSON.stringify(shift) + ')">Add Task</button>';
      html += '</div>';

      html += '</div>';
    });

    holder.innerHTML = html;
  };

  window.addShiftTask = function(shift){
    const input = document.getElementById('new_task_' + shift);
    const task = String(input?.value || '').trim();

    if(!task){
      alert('Enter task name first.');
      return;
    }

    const data = loadShiftTasks();
    if(!data[shift]) data[shift] = {};
    if(!data[shift]['Custom Tasks']) data[shift]['Custom Tasks'] = [];

    data[shift]['Custom Tasks'].push(task);
    saveShiftTasks(data);

    if(input) input.value = '';

    renderShiftTaskEditor();
    if(typeof renderShiftChecklist === 'function') renderShiftChecklist();

    alert('Task added.');
  };

  window.deleteShiftTask = function(shift, group, index){
    const data = loadShiftTasks();

    if(!data[shift] || !data[shift][group]) return;

    data[shift][group].splice(index, 1);

    if(data[shift][group].length === 0){
      delete data[shift][group];
    }

    saveShiftTasks(data);

    renderShiftTaskEditor();
    if(typeof renderShiftChecklist === 'function') renderShiftChecklist();

    alert('Task deleted.');
  };

  window.restoreDefaultShiftTasks = function(){
    const d = defaultTasks();
    saveShiftTasks(d);
    renderShiftTaskEditor();
    if(typeof renderShiftChecklist === 'function') renderShiftChecklist();
    alert('Default tasks restored.');
  };

  window.renderShiftChecklist = function(){
    const shift = document.getElementById('shift_type')?.value || document.getElementById('checklist_shift')?.value || 'Overnight';

    const hiddenShift = document.getElementById('checklist_shift');
    if(hiddenShift) hiddenShift.value = shift;

    const box = document.getElementById('dynamic_checklist');
    if(!box) return;

    const allTasks = loadShiftTasks();
    const groups = allTasks[shift] || {};
    let html = '';

    Object.keys(groups).forEach(group => {
      html += '<div class="taskGroup"><h3>' + group + '</h3>';
      (groups[group] || []).forEach(task => {
        const id = 'cl_' + safeId(shift + '_' + group + '_' + task);
        html += '<label class="taskCheck"><input id="' + id + '" type="checkbox" data-checklist-task="' + task + '"> ' + task + '</label>';
      });
      html += '</div>';
    });

    box.innerHTML = html;

    if(typeof loadData === 'function') loadData();

    document.querySelectorAll('input[data-checklist-task]').forEach(el => {
      el.addEventListener('change', () => {
        if(typeof saveData === 'function') saveData();
        if(typeof calculateChecklistCompletion === 'function') calculateChecklistCompletion();
      });
    });

    if(typeof calculateChecklistCompletion === 'function') calculateChecklistCompletion();
  };

  const oldGenerateFullShiftReport = window.generateFullShiftReport;
  window.generateFullShiftReport = function(){
    if(typeof oldGenerateFullShiftReport === 'function'){
      oldGenerateFullShiftReport();
    }

    const profile = loadProfile();
    const restaurant = profile.restaurantName || String(document.getElementById('restaurant_name')?.value || '').trim();
    const out = document.getElementById('full_shift_report');

    if(out && restaurant && out.value && !out.value.includes('Restaurant:')){
      out.value = out.value.replace('MANAGER DETAILS\n', 'MANAGER DETAILS\nRestaurant: ' + restaurant + '\n');
      out.dispatchEvent(new Event('input', {bubbles:true}));
    }
  };

  document.addEventListener('DOMContentLoaded', function(){
    applyProfile();
    renderShiftTaskEditor();

    ['restaurant_name','default_manager_name'].forEach(id => {
      const el = document.getElementById(id);
      if(el){
        el.addEventListener('input', saveProfile);
        el.addEventListener('change', saveProfile);
      }
    });

    setTimeout(function(){
      applyProfile();
      if(typeof renderShiftChecklist === 'function') renderShiftChecklist();
    }, 150);
  });
})();

;

/* Manager+ v6.0.1 fix: visible editable tasks + target defaults */
(function(){
  const PROFILE_KEY = 'manager_plus_profile_v60';
  const TASKS_KEY = 'manager_plus_shift_tasks_v60';

  function deepClone(obj){
    return JSON.parse(JSON.stringify(obj || {}));
  }

  const DEFAULT_SHIFT_TASKS = deepClone(window.checklistData || {
    Morning:{
      "Opening / Breakfast":["Breakfast area ready","Coffee machine ready","Egg cooker ready","Muffins ready","Breakfast stock up complete"],
      "Food Safety":["Food Safety Walk complete","Temperature checks complete","Date dot check complete","Delivery checked"],
      "Service":["Lobby open and clean","Customer toilets checked","DT ready","Lunch transition planned"],
      "Handover":["Issues from overnight reviewed","Manager communication updated"]
    },
    Evening:{
      "Pre-Rush":["Dinner rush preparation complete","Break plan ready","Stock up complete","Deployment checked"],
      "Operations":["Waste monitored","DT flow checked","Kitchen positioning checked","McDelivery area organised"],
      "Cleaning":["Lobby cleaning plan complete","Customer toilets checked","Beverage area stocked","Fries station ready"],
      "Handover to Overnight":["Maintenance issues communicated","Waste notes communicated","Staffing notes communicated","Overnight priorities prepared"]
    },
    Overnight:{
      "Food Safety":["Food Safety Walk complete","Temperature checks complete","DFS complete","Waste entered","Date dot check complete"],
      "Equipment":["Coffee machine cleaned","Beverage area cleaned","Dishwasher checked","Ice machine checked","Grills / Fryers checked"],
      "Security & Cash":["Back door locked","DT windows locked","Safe count complete","Tills checked"],
      "Breakfast":["Breakfast prepared","Egg cooker ready","Muffins ready","Breakfast stock up complete"],
      "Close / Open":["Kiosks restarted","Lobby ready","Kitchen ready","Stock up complete","Shift handover complete"]
    }
  });

  function toast(msg){
    if(typeof window.amToast === 'function') window.amToast(msg);
    else if(window.alert) window.alert(msg);
  }

  function loadTasks(){
    try{
      const saved = JSON.parse(localStorage.getItem(TASKS_KEY) || 'null');
      if(saved && typeof saved === 'object') return saved;
    }catch(e){}
    const fresh = deepClone(DEFAULT_SHIFT_TASKS);
    localStorage.setItem(TASKS_KEY, JSON.stringify(fresh));
    return fresh;
  }

  function saveTasks(data){
    localStorage.setItem(TASKS_KEY, JSON.stringify(data));
  }

  function loadProfile(){
    try{
      return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
    }catch(e){
      return {};
    }
  }

  function saveProfile(){
    const profile = {
      restaurantName: String(document.getElementById('restaurant_name')?.value || '').trim(),
      defaultManagerName: String(document.getElementById('default_manager_name')?.value || '').trim()
    };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));

    const manager = document.getElementById('manager_name');
    if(manager && !String(manager.value || '').trim() && profile.defaultManagerName){
      manager.value = profile.defaultManagerName;
      manager.dispatchEvent(new Event('input', {bubbles:true}));
    }

    if(typeof saveData === 'function') saveData();
  }

  function applyProfile(){
    const profile = loadProfile();
    const restaurantInput = document.getElementById('restaurant_name');
    const managerDefaultInput = document.getElementById('default_manager_name');
    const managerInput = document.getElementById('manager_name');

    if(restaurantInput && profile.restaurantName) restaurantInput.value = profile.restaurantName;
    if(managerDefaultInput && profile.defaultManagerName) managerDefaultInput.value = profile.defaultManagerName;
    if(managerInput && !String(managerInput.value || '').trim() && profile.defaultManagerName){
      managerInput.value = profile.defaultManagerName;
    }
  }

  function ensureTargetDefaults(){
    const defaults = {
      target_oepe:'110',
      target_kvs:'55',
      target_r2p:'80',
      target_mcdelivery:'150',
      target_raw:'0.25',
      target_full:'0.20',
      target_crew:'0.50',
      target_nonrecipe:'0.90'
    };

    Object.keys(defaults).forEach(id => {
      const el = document.getElementById(id);
      if(el && String(el.value || '').trim() === ''){
        el.value = defaults[id];
        el.dispatchEvent(new Event('input', {bubbles:true}));
      }
    });
  }

  window.renderShiftTaskEditor = function(){
    const holder = document.getElementById('shift_task_editor');
    if(!holder) return;

    const data = loadTasks();
    const shifts = ['Morning','Evening','Overnight'];

    holder.innerHTML = '';

    shifts.forEach(shift => {
      const groupBox = document.createElement('div');
      groupBox.className = 'taskEditorGroup';

      const title = document.createElement('h4');
      title.textContent = shift;
      groupBox.appendChild(title);

      const groups = data[shift] || {};
      const groupNames = Object.keys(groups);

      if(!groupNames.length){
        const empty = document.createElement('div');
        empty.className = 'customTaskRow';
        empty.innerHTML = '<span>No tasks yet.</span>';
        groupBox.appendChild(empty);
      }

      groupNames.forEach(group => {
        const tasks = groups[group] || [];
        if(tasks.length){
          const label = document.createElement('label');
          label.className = 'fieldLabel';
          label.textContent = group;
          groupBox.appendChild(label);
        }

        tasks.forEach((task, index) => {
          const row = document.createElement('div');
          row.className = 'customTaskRow';

          const span = document.createElement('span');
          span.textContent = task;

          const btn = document.createElement('button');
          btn.className = 'deleteTaskBtn';
          btn.type = 'button';
          btn.textContent = 'Delete';
          btn.addEventListener('click', function(){
            window.deleteShiftTask(shift, group, index);
          });

          row.appendChild(span);
          row.appendChild(btn);
          groupBox.appendChild(row);
        });
      });

      const addBox = document.createElement('div');
      addBox.className = 'addTaskBox';

      const input = document.createElement('input');
      input.id = 'new_task_' + shift;
      input.type = 'text';
      input.placeholder = 'Add new ' + shift + ' task';

      const addBtn = document.createElement('button');
      addBtn.className = 'generateBtn';
      addBtn.type = 'button';
      addBtn.textContent = 'Add Task';
      addBtn.addEventListener('click', function(){
        window.addShiftTask(shift);
      });

      addBox.appendChild(input);
      addBox.appendChild(addBtn);
      groupBox.appendChild(addBox);

      holder.appendChild(groupBox);
    });
  };

  window.addShiftTask = function(shift){
    const input = document.getElementById('new_task_' + shift);
    const task = String(input?.value || '').trim();

    if(!task){
      toast('Enter task name first.');
      return;
    }

    const data = loadTasks();
    if(!data[shift]) data[shift] = {};
    if(!data[shift]['Custom Tasks']) data[shift]['Custom Tasks'] = [];

    data[shift]['Custom Tasks'].push(task);
    saveTasks(data);

    if(input) input.value = '';

    window.renderShiftTaskEditor();
    if(typeof window.renderShiftChecklist === 'function') window.renderShiftChecklist();

    toast('Task added.');
  };

  window.deleteShiftTask = function(shift, group, index){
    const data = loadTasks();

    if(!data[shift] || !data[shift][group]) return;

    data[shift][group].splice(index, 1);
    if(data[shift][group].length === 0){
      delete data[shift][group];
    }

    saveTasks(data);

    window.renderShiftTaskEditor();
    if(typeof window.renderShiftChecklist === 'function') window.renderShiftChecklist();

    toast('Task deleted.');
  };

  window.restoreDefaultShiftTasks = function(){
    const fresh = deepClone(DEFAULT_SHIFT_TASKS);
    saveTasks(fresh);
    window.renderShiftTaskEditor();
    if(typeof window.renderShiftChecklist === 'function') window.renderShiftChecklist();
    toast('Default tasks restored.');
  };

  window.renderShiftChecklist = function(){
    const shift = document.getElementById('shift_type')?.value || document.getElementById('checklist_shift')?.value || 'Overnight';
    const hiddenShift = document.getElementById('checklist_shift');
    if(hiddenShift) hiddenShift.value = shift;

    const box = document.getElementById('dynamic_checklist');
    if(!box) return;

    const data = loadTasks();
    const groups = data[shift] || {};
    box.innerHTML = '';

    Object.keys(groups).forEach(group => {
      const groupWrap = document.createElement('div');
      groupWrap.className = 'taskGroup';

      const h = document.createElement('h3');
      h.textContent = group;
      groupWrap.appendChild(h);

      (groups[group] || []).forEach(task => {
        const id = 'cl_' + safeId(shift + '_' + group + '_' + task);

        const label = document.createElement('label');
        label.className = 'taskCheck';

        const input = document.createElement('input');
        input.id = id;
        input.type = 'checkbox';
        input.setAttribute('data-checklist-task', task);

        label.appendChild(input);
        label.appendChild(document.createTextNode(' ' + task));
        groupWrap.appendChild(label);
      });

      box.appendChild(groupWrap);
    });

    if(typeof loadData === 'function') loadData();

    document.querySelectorAll('input[data-checklist-task]').forEach(el => {
      el.addEventListener('change', () => {
        if(typeof saveData === 'function') saveData();
        if(typeof calculateChecklistCompletion === 'function') calculateChecklistCompletion();
      });
    });

    if(typeof calculateChecklistCompletion === 'function') calculateChecklistCompletion();
  };

  const previousFullReport = window.generateFullShiftReport;
  window.generateFullShiftReport = function(){
    if(typeof previousFullReport === 'function') previousFullReport();

    const profile = loadProfile();
    const restaurant = profile.restaurantName || String(document.getElementById('restaurant_name')?.value || '').trim();
    const out = document.getElementById('full_shift_report');

    if(out && restaurant && out.value && out.value.indexOf('Restaurant:') === -1){
      out.value = out.value.replace('MANAGER DETAILS\n', 'MANAGER DETAILS\nRestaurant: ' + restaurant + '\n');
      out.dispatchEvent(new Event('input', {bubbles:true}));
    }
  };

  document.addEventListener('DOMContentLoaded', function(){
    ensureTargetDefaults();
    applyProfile();

    ['restaurant_name','default_manager_name'].forEach(id => {
      const el = document.getElementById(id);
      if(el){
        el.addEventListener('input', saveProfile);
        el.addEventListener('change', saveProfile);
      }
    });

    setTimeout(function(){
      ensureTargetDefaults();
      applyProfile();
      window.renderShiftTaskEditor();
      window.renderShiftChecklist();
    }, 250);
  });
})();

;

/* Manager+ v6.0.2 Save Configuration + Export Configuration File */
(function(){
  const CONFIG_KEY = 'manager_plus_full_configuration_v602';
  const PROFILE_KEY = 'manager_plus_profile_v60';
  const TASKS_KEY = 'manager_plus_shift_tasks_v60';

  function getValue(id){
    return String(document.getElementById(id)?.value || '').trim();
  }

  function setValue(id, value){
    const el = document.getElementById(id);
    if(!el) return;
    el.value = value;
    el.dispatchEvent(new Event('input', {bubbles:true}));
    el.dispatchEvent(new Event('change', {bubbles:true}));
  }

  function getJson(key, fallback){
    try{
      const parsed = JSON.parse(localStorage.getItem(key) || 'null');
      return parsed || fallback;
    }catch(e){
      return fallback;
    }
  }

  function toast(msg){
    if(typeof window.amToast === 'function') window.amToast(msg);
    else alert(msg);
  }

  function collectConfiguration(){
    const profile = {
      restaurantName: getValue('restaurant_name'),
      defaultManagerName: getValue('default_manager_name')
    };

    const targets = {
      oepe: getValue('target_oepe'),
      kvs: getValue('target_kvs'),
      r2p: getValue('target_r2p'),
      mcdelivery: getValue('target_mcdelivery'),
      rawWaste: getValue('target_raw'),
      fullWaste: getValue('target_full'),
      crewMeals: getValue('target_crew'),
      nonRecipe: getValue('target_nonrecipe')
    };

    const tasks = getJson(TASKS_KEY, window.getManagerPlusShiftTasks ? window.getManagerPlusShiftTasks() : {});

    return {
      app: 'Manager+',
      version: '6.0.2',
      savedAt: new Date().toISOString(),
      profile,
      targets,
      tasks
    };
  }

  window.saveManagerPlusConfiguration = function(){
    const config = collectConfiguration();

    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    localStorage.setItem(PROFILE_KEY, JSON.stringify(config.profile));
    localStorage.setItem(TASKS_KEY, JSON.stringify(config.tasks));

    Object.entries({
      target_oepe: config.targets.oepe,
      target_kvs: config.targets.kvs,
      target_r2p: config.targets.r2p,
      target_mcdelivery: config.targets.mcdelivery,
      target_raw: config.targets.rawWaste,
      target_full: config.targets.fullWaste,
      target_crew: config.targets.crewMeals,
      target_nonrecipe: config.targets.nonRecipe
    }).forEach(([id, value]) => setValue(id, value));

    if(typeof saveData === 'function') saveData();
    if(typeof renderShiftChecklist === 'function') renderShiftChecklist();

    toast('Configuration saved.');
  };

  window.exportManagerPlusConfiguration = function(){
    const config = collectConfiguration();

    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    localStorage.setItem(PROFILE_KEY, JSON.stringify(config.profile));
    localStorage.setItem(TASKS_KEY, JSON.stringify(config.tasks));

    const safeRestaurant = (config.profile.restaurantName || 'restaurant')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'restaurant';

    const filename = 'managerplus-config-' + safeRestaurant + '.json';
    const blob = new Blob([JSON.stringify(config, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    setTimeout(function(){
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);

    toast('Configuration file saved.');
  };
})();

;

/* Manager+ v6.0.3 Load Configuration from File */
(function(){
  const CONFIG_KEY = 'manager_plus_full_configuration_v602';
  const PROFILE_KEY = 'manager_plus_profile_v60';
  const TASKS_KEY = 'manager_plus_shift_tasks_v60';

  function toast(msg){
    if(typeof window.amToast === 'function') window.amToast(msg);
    else alert(msg);
  }

  function setValue(id, value){
    const el = document.getElementById(id);
    if(!el) return;
    el.value = value || '';
    el.dispatchEvent(new Event('input', {bubbles:true}));
    el.dispatchEvent(new Event('change', {bubbles:true}));
  }

  function applyImportedConfiguration(config){
    if(!config || typeof config !== 'object'){
      toast('Invalid configuration file.');
      return;
    }

    const profile = config.profile || {};
    const targets = config.targets || {};
    const tasks = config.tasks || {};

    setValue('restaurant_name', profile.restaurantName || '');
    setValue('default_manager_name', profile.defaultManagerName || '');

    if(profile.defaultManagerName){
      setValue('manager_name', profile.defaultManagerName);
    }

    setValue('target_oepe', targets.oepe || '110');
    setValue('target_kvs', targets.kvs || '55');
    setValue('target_r2p', targets.r2p || '80');
    setValue('target_mcdelivery', targets.mcdelivery || '150');
    setValue('target_raw', targets.rawWaste || '0.25');
    setValue('target_full', targets.fullWaste || '0.20');
    setValue('target_crew', targets.crewMeals || '0.50');
    setValue('target_nonrecipe', targets.nonRecipe || '0.90');

    localStorage.setItem(PROFILE_KEY, JSON.stringify({
      restaurantName: profile.restaurantName || '',
      defaultManagerName: profile.defaultManagerName || ''
    }));

    if(tasks && Object.keys(tasks).length){
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }

    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));

    if(typeof renderShiftTaskEditor === 'function') renderShiftTaskEditor();
    if(typeof renderShiftChecklist === 'function') renderShiftChecklist();
    if(typeof calculateChecklistCompletion === 'function') calculateChecklistCompletion();
    if(typeof saveData === 'function') saveData();

    toast('Configuration loaded.');
  }

  window.importManagerPlusConfigurationFile = function(event){
    const input = event.target;
    const file = input.files && input.files[0];

    if(!file){
      toast('No file selected.');
      return;
    }

    const reader = new FileReader();

    reader.onload = function(e){
      try{
        const config = JSON.parse(e.target.result);
        applyImportedConfiguration(config);
      }catch(err){
        toast('Invalid configuration file.');
      }finally{
        input.value = '';
      }
    };

    reader.onerror = function(){
      toast('Could not read configuration file.');
      input.value = '';
    };

    reader.readAsText(file);
  };
})();

;

/* Manager+ v6.0.4 Dynamic Handover from Settings Tasks */
(function(){
  const TASKS_KEY = 'manager_plus_shift_tasks_v60';

  function readTasks(){
    try{
      const saved = JSON.parse(localStorage.getItem(TASKS_KEY) || 'null');
      if(saved && typeof saved === 'object') return saved;
    }catch(e){}
    return window.checklistData || checklistData || {};
  }

  function getCurrentShift(){
    return document.getElementById('shift_type')?.value || document.getElementById('checklist_shift')?.value || 'Overnight';
  }

  function taskId(shift, group, task){
    return 'hw_dyn_' + safeId(shift + '_' + group + '_' + task);
  }

  window.renderDynamicHandover = function(){
    const box = document.getElementById('dynamic_handover_items');
    if(!box) return;

    const shift = getCurrentShift();
    const data = readTasks();
    const groups = data[shift] || {};
    let html = '';

    Object.keys(groups).forEach(group => {
      (groups[group] || []).forEach(task => {
        const id = taskId(shift, group, task);
        html += '<label class="check"><input id="' + id + '" type="checkbox" data-handover-task="' + task + '" data-handover-group="' + group + '"> ' + task + '</label>';
      });
    });

    if(!html){
      html = '<div class="coachBox" style="margin-top:0">No handover items available for this shift. Add tasks in Settings.</div>';
    }

    box.innerHTML = html;

    if(typeof loadData === 'function') loadData();

    document.querySelectorAll('input[data-handover-task]').forEach(el => {
      el.addEventListener('change', () => {
        if(typeof saveData === 'function') saveData();
      });
    });
  };

  window.generateHandover = function(){
    const shift = getValueClean ? getValueClean('shift_type', 'Shift') : getCurrentShift();
    const date = typeof getValueClean === 'function' ? getValueClean('shift_date', 'Today') : (document.getElementById('shift_date')?.value || 'Today');

    const selected = Array.from(document.querySelectorAll('input[data-handover-task]:checked'))
      .map(el => String(el.getAttribute('data-handover-task') || '').trim())
      .filter(Boolean);

    const optional = typeof getValueClean === 'function' ? getValueClean('handover_optional') : String(document.getElementById('handover_optional')?.value || '').trim();

    const lines = [
      `${shift} Handover - ${date}`,
      '',
      'PERFORMANCE KPIs',
      `- OEPE: ${typeof getValueClean === 'function' ? getValueClean('oepe', 'N/A') : (document.getElementById('oepe')?.value || 'N/A')} sec`,
      `- KVS: ${typeof getValueClean === 'function' ? getValueClean('kvs', 'N/A') : (document.getElementById('kvs')?.value || 'N/A')} sec`,
      `- R2P: ${typeof getValueClean === 'function' ? getValueClean('r2p', 'N/A') : (document.getElementById('r2p')?.value || 'N/A')} sec`,
      `- McDelivery: ${typeof getValueClean === 'function' ? getValueClean('mcdelivery', 'N/A') : (document.getElementById('mcdelivery')?.value || 'N/A')} sec`,
      '',
      'WASTE',
      `- Raw Waste: ${typeof getValueClean === 'function' ? getValueClean('raw_waste', 'N/A') : (document.getElementById('raw_waste')?.value || 'N/A')}%`,
      `- Full Waste: ${typeof getValueClean === 'function' ? getValueClean('full_waste', 'N/A') : (document.getElementById('full_waste')?.value || 'N/A')}%`,
      `- Crew Meals: ${typeof getValueClean === 'function' ? getValueClean('crew_meals', 'N/A') : (document.getElementById('crew_meals')?.value || 'N/A')}%`,
      `- Non-Recipe: ${typeof getValueClean === 'function' ? getValueClean('non_recipe', 'N/A') : (document.getElementById('non_recipe')?.value || 'N/A')}%`,
      '',
      'COMPLETED / READY',
      selected.length ? selected.map(x => '- ' + x).join('\n') : '- No handover items selected.',
      '',
      'FOLLOW UP / NOTES',
      optional ? '- ' + optional : '- No additional notes.',
      '',
      'NEXT SHIFT NOTE',
      '- Please continue to monitor open issues and keep communication clear during the next shift.'
    ].join('\\n');

    const out = document.getElementById('handover_output');
    if(out){
      out.value = typeof cleanGeneratedText === 'function' ? cleanGeneratedText(lines) : lines;
      out.dispatchEvent(new Event('input', {bubbles:true}));
    }
  };

  const oldRenderShiftChecklist = window.renderShiftChecklist;
  if(typeof oldRenderShiftChecklist === 'function'){
    window.renderShiftChecklist = function(){
      oldRenderShiftChecklist.apply(this, arguments);
      setTimeout(window.renderDynamicHandover, 50);
    };
  }

  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(window.renderDynamicHandover, 300);

    const shiftSelect = document.getElementById('shift_type');
    if(shiftSelect){
      shiftSelect.addEventListener('change', function(){
        setTimeout(window.renderDynamicHandover, 80);
      });
    }
  });
})();

;

/* Manager+ v6.0.5 Handover generated from completed Checklist tasks */
(function(){
  function getCurrentShift(){
    return document.getElementById('shift_type')?.value || document.getElementById('checklist_shift')?.value || 'Overnight';
  }

  window.renderDynamicHandover = function(){
    const box = document.getElementById('dynamic_handover_items');
    if(!box) return;

    const shift = getCurrentShift();
    const checklistTasks = Array.from(document.querySelectorAll('input[data-checklist-task]'));
    const completed = checklistTasks
      .filter(el => el.checked)
      .map(el => String(el.getAttribute('data-checklist-task') || '').trim())
      .filter(Boolean);

    if(!checklistTasks.length){
      box.innerHTML = '<div class="coachBox" style="margin-top:0">No checklist tasks available for this shift. Add tasks in Settings.</div>';
      return;
    }

    if(!completed.length){
      box.innerHTML = '<div class="coachBox" style="margin-top:0">No completed checklist tasks yet. Complete tasks in Checklist and they will appear in the handover.</div>';
      return;
    }

    box.innerHTML = completed.map(task => {
      return '<label class="check"><input type="checkbox" checked disabled> ' + task + '</label>';
    }).join('');
  };

  window.generateHandover = function(){
    const shift = typeof getValueClean === 'function' ? getValueClean('shift_type', 'Shift') : getCurrentShift();
    const date = typeof getValueClean === 'function' ? getValueClean('shift_date', 'Today') : (document.getElementById('shift_date')?.value || 'Today');

    const completed = Array.from(document.querySelectorAll('input[data-checklist-task]:checked'))
      .map(el => String(el.getAttribute('data-checklist-task') || '').trim())
      .filter(Boolean);

    const optional = typeof getValueClean === 'function' ? getValueClean('handover_optional') : String(document.getElementById('handover_optional')?.value || '').trim();

    const getVal = (id, fallback='N/A') => {
      if(typeof getValueClean === 'function') return getValueClean(id, fallback);
      return String(document.getElementById(id)?.value || '').trim() || fallback;
    };

    const report = [
      `${shift} Handover - ${date}`,
      '',
      'PERFORMANCE KPIs',
      `- OEPE: ${getVal('oepe')} sec`,
      `- KVS: ${getVal('kvs')} sec`,
      `- R2P: ${getVal('r2p')} sec`,
      `- McDelivery: ${getVal('mcdelivery')} sec`,
      '',
      'WASTE',
      `- Raw Waste: ${getVal('raw_waste')}%`,
      `- Full Waste: ${getVal('full_waste')}%`,
      `- Crew Meals: ${getVal('crew_meals')}%`,
      `- Non-Recipe: ${getVal('non_recipe')}%`,
      '',
      'COMPLETED CHECKLIST TASKS',
      completed.length ? completed.map(x => '- ' + x).join('\n') : '- No completed checklist tasks yet.',
      '',
      'FOLLOW UP / NOTES',
      optional ? '- ' + optional : '- No additional notes.',
      '',
      'NEXT SHIFT NOTE',
      '- Please continue to monitor open issues and keep communication clear during the next shift.'
    ].join('\n');

    const out = document.getElementById('handover_output');
    if(out){
      out.value = typeof cleanGeneratedText === 'function' ? cleanGeneratedText(report) : report;
      out.dispatchEvent(new Event('input', {bubbles:true}));
    }
  };

  const previousChecklistCompletion = window.calculateChecklistCompletion;
  if(typeof previousChecklistCompletion === 'function'){
    window.calculateChecklistCompletion = function(){
      previousChecklistCompletion.apply(this, arguments);
      setTimeout(window.renderDynamicHandover, 50);
    };
  }

  const previousRenderShiftChecklist = window.renderShiftChecklist;
  if(typeof previousRenderShiftChecklist === 'function'){
    window.renderShiftChecklist = function(){
      previousRenderShiftChecklist.apply(this, arguments);
      setTimeout(window.renderDynamicHandover, 80);
    };
  }

  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(window.renderDynamicHandover, 400);

    const shiftSelect = document.getElementById('shift_type');
    if(shiftSelect){
      shiftSelect.addEventListener('change', function(){
        setTimeout(window.renderDynamicHandover, 120);
      });
    }

    document.addEventListener('change', function(e){
      if(e.target && e.target.matches('input[data-checklist-task]')){
        setTimeout(window.renderDynamicHandover, 50);
      }
    });
  });
})();

;

/* Manager+ v7.0 History module */
(function(){
  const HISTORY_KEY='manager_plus_shift_history_v70';
  function toast(msg){ if(typeof window.amToast==='function') window.amToast(msg); else alert(msg); }
  function getText(id,fallback=''){ return String(document.getElementById(id)?.value || '').trim() || fallback; }
  function num(id){ const v=parseFloat(String(document.getElementById(id)?.value||'').replace(',','.')); return isNaN(v)?null:v; }
  function loadHistory(){ try{ const d=JSON.parse(localStorage.getItem(HISTORY_KEY)||'[]'); return Array.isArray(d)?d:[]; }catch(e){ return []; } }
  function saveHistory(records){ localStorage.setItem(HISTORY_KEY, JSON.stringify(records)); }
  function checklistStats(){ const tasks=Array.from(document.querySelectorAll('input[data-checklist-task]')); const done=tasks.filter(t=>t.checked).length; return {done,total:tasks.length,percent:tasks.length?Math.round(done/tasks.length*100):0}; }
  function avg(arr){ const a=arr.filter(v=>typeof v==='number'&&!isNaN(v)); return a.length?a.reduce((x,y)=>x+y,0)/a.length:null; }
  function fmt(v,s=''){ if(v===null||v===undefined||isNaN(v)) return 'N/A'; return (Number.isInteger(v)?v:v.toFixed(2))+s; }
  function shiftScore(){ if(typeof calculateShiftScore==='function') calculateShiftScore(); const s=parseInt(document.querySelector('#shift_score_card .score')?.textContent||'',10); return isNaN(s)?null:s; }
  function healthScore(){ if(typeof calculateKPIHealth==='function') calculateKPIHealth(); const s=parseInt(document.querySelector('#shift_health_output .score')?.textContent||'',10); return isNaN(s)?null:s; }
  function buildRecord(){
    if(typeof generateFullShiftReport==='function') generateFullShiftReport();
    const ch=checklistStats();
    return {
      id:'hist_'+Date.now(),
      savedAt:new Date().toISOString(),
      date:getText('shift_date','Today'),
      shift:getText('shift_type','Shift'),
      manager:getText('manager_name','Manager'),
      restaurant:getText('restaurant_name',''),
      healthScore:healthScore(),
      shiftScore:shiftScore(),
      checklistPercent:ch.percent,
      checklistDone:ch.done,
      checklistTotal:ch.total,
      kpi:{sales:num('sales'),guests:num('guests'),oepe:num('oepe'),kvs:num('kvs'),r2p:num('r2p'),mcdelivery:num('mcdelivery'),labour:num('labour'),csat:num('csat')},
      waste:{raw:num('raw_waste'),full:num('full_waste'),promo:num('promo_waste'),crewMeals:num('crew_meals'),nonRecipe:num('non_recipe')},
      report:String(document.getElementById('full_shift_report')?.value||'').trim()
    };
  }
  window.saveShiftToHistory=function(){
    const r=buildRecord();
    if(!r.report){ toast('Generate report first.'); return; }
    const records=loadHistory();
    records.unshift(r);
    saveHistory(records);
    renderHistory();
    toast('Shift saved to history.');
  };
  function compare(records){
    if(records.length<2) return 'Need at least 2 saved shifts to compare.';
    const a=records[0], b=records[1], out=[];
    function t(label,newer,older,lowerBetter){
      if(newer===null||newer===undefined||older===null||older===undefined) return;
      const same=Number(newer)===Number(older);
      const better=lowerBetter?Number(newer)<Number(older):Number(newer)>Number(older);
      out.push(label+': '+older+' -> '+newer+' '+(same ? '- same' : better ? 'better' : 'worse'));
    }
    t('Shift Score',a.shiftScore,b.shiftScore,false);
    t('Checklist',a.checklistPercent,b.checklistPercent,false);
    t('OEPE',a.kpi?.oepe,b.kpi?.oepe,true);
    t('KVS',a.kpi?.kvs,b.kpi?.kvs,true);
    t('Raw Waste',a.waste?.raw,b.waste?.raw,true);
    t('Full Waste',a.waste?.full,b.waste?.full,true);
    return out.length?out.join('\n'):'Not enough comparable data.';
  }
  window.renderHistory=function(){
    const records=loadHistory();
    const stats=document.getElementById('history_stats');
    const list=document.getElementById('history_list');
    if(stats){
      if(!records.length){
        stats.innerHTML='<div class="historyStat"><small>Saved Shifts</small><strong>0</strong></div><div class="historyStat"><small>Average Score</small><strong>N/A</strong></div><div class="historyStat"><small>Average Checklist</small><strong>N/A</strong></div><div class="historyStat"><small>Average OEPE</small><strong>N/A</strong></div>';
      }else{
        stats.innerHTML='<div class="historyStat"><small>Saved Shifts</small><strong>'+records.length+'</strong></div><div class="historyStat"><small>Average Score</small><strong>'+fmt(avg(records.map(r=>r.shiftScore)))+'</strong></div><div class="historyStat"><small>Average Checklist</small><strong>'+fmt(avg(records.map(r=>r.checklistPercent)),'%')+'</strong></div><div class="historyStat"><small>Average OEPE</small><strong>'+fmt(avg(records.map(r=>r.kpi?.oepe)),' sec')+'</strong></div><div class="historyStat"><small>Average Raw Waste</small><strong>'+fmt(avg(records.map(r=>r.waste?.raw)),'%')+'</strong></div><div class="historyStat"><small>Last vs Previous</small><strong style="font-size:14px;white-space:pre-wrap">'+compare(records)+'</strong></div>';
      }
    }
    if(!list) return;
    if(!records.length){ list.textContent='No saved shifts yet.'; return; }
    list.innerHTML=records.map((r,i)=>{
      const title=(r.date||'Today')+' - '+(r.shift||'Shift')+' - Score '+(r.shiftScore===null ? 'N/A' : r.shiftScore);
      const meta=(r.restaurant ? 'Restaurant: '+r.restaurant+'<br>' : '')+'Manager: '+(r.manager||'Manager')+'<br>Checklist: '+(r.checklistPercent == null ? 0 : r.checklistPercent)+'%<br>OEPE: '+(r.kpi?.oepe == null ? 'N/A' : r.kpi.oepe)+' sec<br>Raw Waste: '+(r.waste?.raw == null ? 'N/A' : r.waste.raw)+'%';
      const report=String(r.report||'').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      return '<div class="historyRecord"><div class="historyRecordTitle">'+title+'</div><div class="historyRecordMeta">'+meta+'</div><div class="historyActions"><button class="generateBtn" type="button" onclick="toggleHistoryReport('+i+')">View Report</button><button class="resetBtn" type="button" onclick="deleteHistoryRecord('+JSON.stringify(r.id)+')">Delete</button></div><div id="history_report_'+i+'" class="historyReportBox"><textarea readonly>'+report+'</textarea><button class="generateBtn" type="button" onclick="copyHistoryReport('+i+')">Copy This Report</button></div></div>';
    }).join('');
  };
  window.toggleHistoryReport=function(i){ const b=document.getElementById('history_report_'+i); if(b) b.style.display=b.style.display==='block' ? 'none' : 'block'; };
  window.deleteHistoryRecord=function(id){ saveHistory(loadHistory().filter(r=>r.id!==id)); renderHistory(); toast('History record deleted.'); };
  window.copyHistoryReport=function(i){ const r=loadHistory()[i]?.report||''; if(!r){toast('Nothing to copy.');return;} if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(r).then(()=>toast('Report copied.')).catch(()=>toast('Copy failed.'));}else toast('Copy not available.'); };
  window.clearShiftHistory=function(){ localStorage.removeItem(HISTORY_KEY); renderHistory(); toast('History cleared.'); };
  window.exportHistoryToFile=function(){
    const blob=new Blob([JSON.stringify({app:'Manager+',version:'7.0',exportedAt:new Date().toISOString(),history:loadHistory()},null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob), a=document.createElement('a');
    a.href=url; a.download='managerplus-history.json'; document.body.appendChild(a); a.click();
    setTimeout(()=>{document.body.removeChild(a);URL.revokeObjectURL(url);},100);
    toast('History file saved.');
  };
  window.importHistoryFromFile=function(event){
    const input=event.target, file=input.files&&input.files[0];
    if(!file){toast('No file selected.');return;}
    const reader=new FileReader();
    reader.onload=e=>{try{const p=JSON.parse(e.target.result); const h=Array.isArray(p)?p:p.history; if(!Array.isArray(h)){toast('Invalid history file.');return;} saveHistory(h); renderHistory(); toast('History loaded.');}catch(err){toast('Invalid history file.');}finally{input.value='';}};
    reader.onerror=()=>{toast('Could not read history file.'); input.value='';};
    reader.readAsText(file);
  };
  document.addEventListener('DOMContentLoaded',()=>setTimeout(renderHistory,500));
})();

;

/* Manager+ v7.0.1 History visibility/save hotfix */
(function(){
  const HISTORY_KEY = 'manager_plus_shift_history_v70';

  function toast(msg){
    if(typeof window.amToast === 'function') window.amToast(msg);
    else alert(msg);
  }

  function getVal(id, fallback=''){
    return String(document.getElementById(id)?.value || '').trim() || fallback;
  }

  function getNum(id){
    const v = parseFloat(String(document.getElementById(id)?.value || '').replace(',', '.'));
    return isNaN(v) ? null : v;
  }

  function loadHistory(){
    try{
      const data = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
      return Array.isArray(data) ? data : [];
    }catch(e){
      return [];
    }
  }

  function saveHistory(records){
    localStorage.setItem(HISTORY_KEY, JSON.stringify(records));
  }

  function checklistStats(){
    const tasks = Array.from(document.querySelectorAll('input[data-checklist-task]'));
    const done = tasks.filter(t => t.checked).length;
    return {
      done,
      total: tasks.length,
      percent: tasks.length ? Math.round(done / tasks.length * 100) : 0
    };
  }

  function readShiftScore(){
    if(typeof window.calculateShiftScore === 'function'){
      try{ window.calculateShiftScore(); }catch(e){}
    }
    const value = parseInt(document.querySelector('#shift_score_card .score')?.textContent || '', 10);
    return isNaN(value) ? null : value;
  }

  function readHealthScore(){
    if(typeof window.calculateKPIHealth === 'function'){
      try{ window.calculateKPIHealth(); }catch(e){}
    }
    const value = parseInt(document.querySelector('#shift_health_output .score')?.textContent || '', 10);
    return isNaN(value) ? null : value;
  }

  function average(values){
    const clean = values.filter(v => typeof v === 'number' && !isNaN(v));
    if(!clean.length) return null;
    return clean.reduce((a,b) => a + b, 0) / clean.length;
  }

  function formatValue(value, suffix=''){
    if(value === null || value === undefined || isNaN(value)) return 'N/A';
    return (Number.isInteger(value) ? value : value.toFixed(2)) + suffix;
  }

  function compareLastTwo(records){
    if(records.length < 2) return 'Need 2 saved shifts.';

    const current = records[0];
    const previous = records[1];
    const rows = [];

    function row(label, now, before, lowerIsBetter){
      if(now === null || now === undefined || before === null || before === undefined) return;
      const n = Number(now);
      const b = Number(before);
      if(isNaN(n) || isNaN(b)) return;

      const same = n === b;
      const better = lowerIsBetter ? n < b : n > b;
      rows.push(label + ': ' + before + ' -> ' + now + ' ' + (same ? '- same' : better ? 'better' : 'worse'));
    }

    row('Score', current.shiftScore, previous.shiftScore, false);
    row('Checklist', current.checklistPercent, previous.checklistPercent, false);
    row('OEPE', current.kpi?.oepe, previous.kpi?.oepe, true);
    row('KVS', current.kpi?.kvs, previous.kpi?.kvs, true);
    row('Raw', current.waste?.raw, previous.waste?.raw, true);
    row('Full', current.waste?.full, previous.waste?.full, true);

    return rows.length ? rows.join('\n') : 'Not enough comparable data.';
  }

  function buildRecord(){
    if(typeof window.generateFullShiftReport === 'function'){
      try{ window.generateFullShiftReport(); }catch(e){}
    }

    const checklist = checklistStats();
    const reportText = String(document.getElementById('full_shift_report')?.value || '').trim();

    return {
      id: 'hist_' + Date.now(),
      savedAt: new Date().toISOString(),
      date: getVal('shift_date', 'Today'),
      shift: getVal('shift_type', 'Shift'),
      manager: getVal('manager_name', 'Manager'),
      restaurant: getVal('restaurant_name', ''),
      healthScore: readHealthScore(),
      shiftScore: readShiftScore(),
      checklistPercent: checklist.percent,
      checklistDone: checklist.done,
      checklistTotal: checklist.total,
      kpi: {
        sales: getNum('sales'),
        guests: getNum('guests'),
        oepe: getNum('oepe'),
        kvs: getNum('kvs'),
        r2p: getNum('r2p'),
        mcdelivery: getNum('mcdelivery'),
        labour: getNum('labour'),
        csat: getNum('csat')
      },
      waste: {
        raw: getNum('raw_waste'),
        full: getNum('full_waste'),
        promo: getNum('promo_waste'),
        crewMeals: getNum('crew_meals'),
        nonRecipe: getNum('non_recipe')
      },
      report: reportText
    };
  }

  window.saveShiftToHistory = function(){
    const record = buildRecord();

    if(!record.report){
      toast('Generate report first.');
      return;
    }

    const records = loadHistory();
    records.unshift(record);
    saveHistory(records);

    window.renderHistory();

    const historyRadio = document.getElementById('history');
    if(historyRadio) historyRadio.checked = true;

    toast('Shift saved to history.');
  };

  window.renderHistory = function(){
    const records = loadHistory();
    const stats = document.getElementById('history_stats');
    const list = document.getElementById('history_list');

    if(stats){
      if(!records.length){
        stats.innerHTML =
          '<div class="historyStat"><small>Saved Shifts</small><strong>0</strong></div>' +
          '<div class="historyStat"><small>Average Score</small><strong>N/A</strong></div>' +
          '<div class="historyStat"><small>Average Checklist</small><strong>N/A</strong></div>' +
          '<div class="historyStat"><small>Average OEPE</small><strong>N/A</strong></div>';
      }else{
        stats.innerHTML =
          '<div class="historyStat"><small>Saved Shifts</small><strong>' + records.length + '</strong></div>' +
          '<div class="historyStat"><small>Average Score</small><strong>' + formatValue(average(records.map(r => r.shiftScore))) + '</strong></div>' +
          '<div class="historyStat"><small>Average Checklist</small><strong>' + formatValue(average(records.map(r => r.checklistPercent)), '%') + '</strong></div>' +
          '<div class="historyStat"><small>Average OEPE</small><strong>' + formatValue(average(records.map(r => r.kpi?.oepe)), ' sec') + '</strong></div>' +
          '<div class="historyStat"><small>Average Raw Waste</small><strong>' + formatValue(average(records.map(r => r.waste?.raw)), '%') + '</strong></div>' +
          '<div class="historyStat"><small>Last vs Previous</small><strong style="font-size:14px;white-space:pre-wrap">' + compareLastTwo(records) + '</strong></div>';
      }
    }

    if(!list) return;

    if(!records.length){
      list.textContent = 'No saved shifts yet.';
      return;
    }

    list.innerHTML = '';

    records.forEach(function(record, index){
      const card = document.createElement('div');
      card.className = 'historyRecord';

      const title = document.createElement('div');
      title.className = 'historyRecordTitle';
      title.textContent = (record.date || 'Today') + ' - ' + (record.shift || 'Shift') + ' - Score ' + (record.shiftScore === null || record.shiftScore === undefined ? 'N/A' : record.shiftScore);

      const meta = document.createElement('div');
      meta.className = 'historyRecordMeta';
      meta.innerHTML =
        (record.restaurant ? 'Restaurant: ' + record.restaurant + '<br>' : '') +
        'Manager: ' + (record.manager || 'Manager') + '<br>' +
        'Checklist: ' + (record.checklistPercent == null ? 0 : record.checklistPercent) + '%<br>' +
        'OEPE: ' + (record.kpi?.oepe == null ? 'N/A' : record.kpi.oepe) + ' sec<br>' +
        'Raw Waste: ' + (record.waste?.raw == null ? 'N/A' : record.waste.raw) + '%';

      const actions = document.createElement('div');
      actions.className = 'historyActions';

      const viewBtn = document.createElement('button');
      viewBtn.className = 'generateBtn';
      viewBtn.type = 'button';
      viewBtn.textContent = 'View Report';

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'resetBtn';
      deleteBtn.type = 'button';
      deleteBtn.textContent = 'Delete';

      const reportBox = document.createElement('div');
      reportBox.className = 'historyReportBox';

      const area = document.createElement('textarea');
      area.readOnly = true;
      area.value = record.report || '';

      const copyBtn = document.createElement('button');
      copyBtn.className = 'generateBtn';
      copyBtn.type = 'button';
      copyBtn.textContent = 'Copy This Report';

      viewBtn.addEventListener('click', function(){
        reportBox.style.display = reportBox.style.display === 'block' ? 'none' : 'block';
      });

      deleteBtn.addEventListener('click', function(){
        const updated = loadHistory().filter(r => r.id !== record.id);
        saveHistory(updated);
        window.renderHistory();
        toast('History record deleted.');
      });

      copyBtn.addEventListener('click', function(){
        const text = record.report || '';
        if(!text){
          toast('Nothing to copy.');
          return;
        }

        if(navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(text).then(() => toast('Report copied.')).catch(() => toast('Copy failed.'));
        }else{
          area.focus();
          area.select();
          try{
            document.execCommand('copy');
            toast('Report copied.');
          }catch(e){
            toast('Copy failed.');
          }
        }
      });

      actions.appendChild(viewBtn);
      actions.appendChild(deleteBtn);
      reportBox.appendChild(area);
      reportBox.appendChild(copyBtn);

      card.appendChild(title);
      card.appendChild(meta);
      card.appendChild(actions);
      card.appendChild(reportBox);

      list.appendChild(card);
    });
  };

  window.clearShiftHistory = function(){
    localStorage.removeItem(HISTORY_KEY);
    window.renderHistory();
    toast('History cleared.');
  };

  window.exportHistoryToFile = function(){
    const records = loadHistory();
    const blob = new Blob([JSON.stringify({
      app: 'Manager+',
      version: '7.0.1',
      exportedAt: new Date().toISOString(),
      history: records
    }, null, 2)], {type:'application/json'});

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = 'managerplus-history.json';

    document.body.appendChild(a);
    a.click();

    setTimeout(function(){
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);

    toast('History file saved.');
  };

  window.importHistoryFromFile = function(event){
    const input = event.target;
    const file = input.files && input.files[0];

    if(!file){
      toast('No file selected.');
      return;
    }

    const reader = new FileReader();

    reader.onload = function(e){
      try{
        const parsed = JSON.parse(e.target.result);
        const imported = Array.isArray(parsed) ? parsed : parsed.history;

        if(!Array.isArray(imported)){
          toast('Invalid history file.');
          return;
        }

        saveHistory(imported);
        window.renderHistory();
        toast('History loaded.');
      }catch(err){
        toast('Invalid history file.');
      }finally{
        input.value = '';
      }
    };

    reader.onerror = function(){
      toast('Could not read history file.');
      input.value = '';
    };

    reader.readAsText(file);
  };

  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(window.renderHistory, 500);

    const historyRadio = document.getElementById('history');
    if(historyRadio){
      historyRadio.addEventListener('change', function(){
        if(historyRadio.checked) setTimeout(window.renderHistory, 50);
      });
    }
  });
})();

;

const MANAGER_PLUS_VERSION = document.querySelector('meta[name="manager-plus-version"]')?.content || "7.2.3";

function updateManagerPlusVersion(){
  const versionLabel = document.getElementById("appVersion");
  if (versionLabel) versionLabel.textContent = MANAGER_PLUS_VERSION;
}

function openManagerPlusRouteFromHash(){
  const routes = {
    "#home": "home",
    "#dashboard": "dash",
    "#dash": "dash",
    "#kpi": "kpi",
    "#waste": "waste",
    "#checklist": "checklist",
    "#handover": "handover",
    "#star": "star",
    "#settings": "settings",
    "#report": "report",
    "#history": "history"
  };
  const target = routes[window.location.hash.toLowerCase()];
  const radio = target ? document.getElementById(target) : null;
  if (radio) radio.checked = true;
}

window.addEventListener("DOMContentLoaded", function(){
  updateManagerPlusVersion();
  openManagerPlusRouteFromHash();
});
window.addEventListener("hashchange", openManagerPlusRouteFromHash);

if ("serviceWorker" in navigator && window.location.protocol !== "file:") {
  window.addEventListener("load", function(){
    navigator.serviceWorker.register("./service-worker.js").catch(function(error){
      console.warn("Manager+ service worker registration failed:", error);
    });
  });
}

