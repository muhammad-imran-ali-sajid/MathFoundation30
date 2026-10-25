(function(root){
'use strict';
const key='math-foundation-30-v1';
const id=()=>globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+Math.random().toString(36).slice(2);
const fresh=()=>({version:1,activeClass:null,classes:[],assessments:[]});
function validate(x){
const fail=()=>{throw Error('Invalid Math Foundation 30 backup. No data was changed.');};
const str=v=>typeof v==='string'&&v.length>0&&v.length<=160;
if(!x||x.version!==1||!Array.isArray(x.classes)||!Array.isArray(x.assessments)||x.classes.length>500||x.assessments.length>50000)fail();
const ids=new Set();for(const c of x.classes){if(!c||!str(c.id)||ids.has(c.id)||!str(c.name)||!Number.isInteger(c.session)||c.session<1||c.session>30||!Array.isArray(c.students)||c.students.length>1000)fail();ids.add(c.id);const students=new Set();for(const s of c.students){if(!s||!str(s.id)||students.has(s.id)||!str(s.name))fail();students.add(s.id);}}
if(x.activeClass!==null&&!ids.has(x.activeClass))fail();
const testIds=new Set();for(const a of x.assessments){if(!a)fail();const c=x.classes.find(c=>c.id===a.classId);if(!str(a.id)||testIds.has(a.id)||!c||!/^\d{4}-\d{2}-\d{2}$/.test(a.date)||!Number.isFinite(Date.parse(a.date))||new Date(a.date).toISOString().slice(0,10)!==a.date||!Object.hasOwn(root.MFContent.skills,a.skill)||!Object.hasOwn(root.MFContent.levels,a.level)||!Number.isInteger(a.session)||a.session<1||a.session>30||!Number.isInteger(a.total)||a.total<1||a.total>50||!Array.isArray(a.scores)||!a.scores.length||a.scores.length>1000)fail();testIds.add(a.id);const seen=new Set();for(const s of a.scores){if(!s||!c.students.some(v=>v.id===s.studentId)||seen.has(s.studentId)||!Number.isFinite(s.score)||s.score<0||s.score>a.total)fail();seen.add(s.studentId);}}
return {version:1,activeClass:x.activeClass,classes:x.classes.map(c=>({id:c.id,name:c.name,session:c.session,students:c.students.map(s=>({id:s.id,name:s.name}))})),assessments:x.assessments.map(a=>({id:a.id,classId:a.classId,date:a.date,skill:a.skill,level:a.level,session:a.session,total:a.total,scores:a.scores.map(s=>({studentId:s.studentId,score:s.score}))}))};
}
function summary(state,classId){const a=state.assessments.filter(a=>a.classId===classId).sort((a,b)=>b.date.localeCompare(a.date)||state.assessments.indexOf(b)-state.assessments.indexOf(a));const avg=a=>a?a.scores.reduce((n,s)=>n+s.score/a.total*100,0)/a.scores.length:null;const latest=avg(a[0]),previous=avg(a[1]);return {latest,previous,tested:a[0]?.scores.length||0,assessment:a[0],action:latest===null?'Start a quick test':latest<50?'Revisit skill':latest<70?'Repeat practice':latest<85?'Continue':'Move to next level'};}
root.MFModel={key,id,fresh,validate,summary};
})(typeof window!=='undefined'?window:globalThis);
