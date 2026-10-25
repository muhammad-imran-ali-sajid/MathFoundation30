'use strict';
const assert=require('node:assert/strict');require('../js/content.js');require('../js/engine.js');require('../js/model.js');
let seed=8401;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const factors=n=>Array.from({length:n},(_,i)=>i+1).filter(v=>n%v===0);
const frac=s=>{const [n,d=1]=s.split('/').map(Number);return n/d;};
let checked=0;
function verify(q){const {a,b,c,d,f,op,type,part}=q.data;let expected;switch(q.skill){
case 'number':expected=Math.trunc(a/b)%10*b;break;
case 'add':case 'sub':case 'mul':case 'div':case 'integerAdd':case 'integerMul':expected=op==='+'?a+b:op==='-'?a-b:op==='*'?a*b:a/b;break;
case 'tables':case 'relation':expected=q.data.product?q.data.product/a:op==='/'?a/b:a*b;break;
case 'order':case 'brackets':case 'mixedOrder':expected=type===0?(a+b)*c:type===1?(b*c)/b*a-c:a+b*c;break;
case 'factors':expected=type==='multiple'?a*b:factors(a).join(', ');break;
case 'divisibility':expected=a%b===0?'Yes':'No';break;
case 'prime':expected=a===1?'Neither':factors(a).length===2?'Prime':'Composite';break;
case 'hcf':expected=Math.max(...factors(a).filter(v=>b%v===0));break;
case 'lcm':{let n=Math.max(a,b);while(n%a||n%b)n++;expected=n;break;}
case 'fractionParts':expected=part?b:a;break;
case 'equivalent':expected=a*f;break;
case 'simplify':expected=a/b;break;
case 'compareFraction':expected=a/b===c/d?'=':a/b>c/d?'>':'<';break;
case 'fractionAdd':expected=op==='+'?a/b+c/d:a/b-c/d;break;
case 'fractionMul':expected=a/b*(c/d);break;
case 'fractionDiv':expected=(a/b)/(c/d);break;
case 'integerCompare':expected=a===b?'=':a>b?'>':'<';break;
default:throw Error('Untested skill '+q.skill);
}
assert.ok(q.prompt&&q.id);assert.ok(!/undefined|NaN|Infinity/.test(q.answer));
if(typeof expected==='number'){assert.ok(Math.abs(frac(q.answer)-expected)<1e-9,JSON.stringify(q));assert.ok(Math.abs(expected)<=100000);if(!q.skill.startsWith('integer'))assert.ok(expected>=0);if(q.answer.includes('/')){const [n,den]=q.answer.split('/').map(Number);assert.ok(den>0);assert.equal(factors(Math.abs(n)).filter(v=>den%v===0).length,1);}}
else assert.equal(q.answer,expected);
if(q.skill==='div'||q.skill==='integerMul'&&op==='/'){assert.notEqual(b,0);assert.ok(Number.isInteger(expected));}
if(q.skill==='sub')assert.ok(a>=b);
if(['fractionAdd','fractionMul','fractionDiv','compareFraction'].includes(q.skill)){assert.ok(b>=2&&d>=2&&b<=12&&d<=12);assert.ok(a>0&&a<b&&c>0&&c<d);if(q.level==='A')assert.equal(b,d);}
if(['add','sub','integerAdd','integerCompare'].includes(q.skill)){let max={A:10,B:30,C:100,D:500,E:100}[q.level];assert.ok(Math.abs(a)<=max&&Math.abs(b)<=max);}
checked++;
}
for(const skill of Object.keys(MFContent.skills))for(const level of Object.keys(MFContent.levels))for(let run=0;run<50;run++)MFEngine.generate({skill,level,count:20},random).forEach(verify);
for(let table=2;table<=12;table++)for(const tableMode of ['ordered','random','missing','reverse','mixed'])MFEngine.generate({skill:'tables',level:'D',count:20,table,tableMode},random).forEach(verify);
for(const bad of [{count:0},{count:51},{level:'X'},{skill:'unknown'},{table:0},{skill:'__proto__'},{level:'constructor'}])assert.throws(()=>MFEngine.generate(bad));
assert.throws(()=>MFEngine.fraction(1,0));assert.equal(MFEngine.fraction(-2,-4),'1/2');assert.equal(MFEngine.fraction(0,4),'0');
assert.equal(MFContent.sessions.length,30);assert.equal(new Set(MFContent.sessions.map(s=>s.id)).size,30);
const fixture={version:1,activeClass:'c',classes:[{id:'c',name:'Test class',session:8,students:[{id:'a',name:'A'},{id:'b',name:'B'}]}],assessments:[{id:'t',classId:'c',date:'2026-10-25',session:8,skill:'div',level:'A',total:5,scores:[{studentId:'a',score:4},{studentId:'b',score:0}]}]};
assert.deepEqual(MFModel.validate(JSON.parse(JSON.stringify(fixture))),fixture);assert.equal(MFModel.summary(fixture,'c').latest,40);assert.equal(MFModel.summary(fixture,'c').tested,2);
for(const change of [x=>x.version=2,x=>x.assessments[0].date='2026-02-31',x=>x.assessments[0].skill='__proto__',x=>x.classes[0].session=31,x=>x.assessments[0].scores[0].score=6,x=>x.assessments[0].scores[0].studentId='missing',x=>x.assessments.push(x.assessments[0]),x=>x.assessments[0].scores.push(x.assessments[0].scores[0])]){let x=structuredClone(fixture);change(x);assert.throws(()=>MFModel.validate(x));}
console.log(`PASS: ${checked.toLocaleString()} generated questions independently checked; all skills × five levels, table modes, boundaries, fraction reduction, invalid options, and backup validation.`);
