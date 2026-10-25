(function(root){
'use strict';
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b];}return a;};
const fraction=(n,d)=>{if(!d)throw Error('Zero denominator');const g=gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}return d===1?String(n):`${n}/${d}`;};
const pools={mixedArithmetic:['add','sub','mul','div'],mixedFraction:['fractionAdd','fractionMul','fractionDiv','integerAdd','integerMul'],mastery:['add','mul','div','mixedOrder','hcf','lcm','fractionAdd','fractionDiv','integerAdd','integerMul']};
function generate(options={},rng=Math.random){
const {skill='add',level='A',count=10,session=30,table=7,tableMode='random'}=options;
if(!Object.hasOwn(root.MFContent.skills,skill)||!Object.hasOwn(root.MFContent.levels,level)||!Number.isInteger(count)||count<1||count>50||!Number.isInteger(+table)||+table<2||+table>12)throw Error('Invalid generator options');
const pick=a=>a[Math.floor(rng()*a.length)],int=(a,b)=>a+Math.floor(rng()*(b-a+1)),rank={A:0,B:1,C:2,D:3,E:2}[level];
const previous=[...new Set(root.MFContent.sessions.filter(s=>s.number<=session).map(s=>s.skill))].filter(s=>!pools[s]);
function one(request,i){
let k=request;if(pools[k])k=pools[k][i%pools[k].length];if(level==='E'&&i%3===2)k=pick(previous.length?previous:['add']);if(pools[k])k=pick(pools[k]);
const max=[10,30,100,500][rank];let a=int(1,max),b=int(1,max),text,answer,data={};
const set=(t,ans,d={})=>{text=t;answer=String(ans);data=d;};
if(k==='number'){a=int(10,[99,999,9999,99999][rank]);b=10**int(0,rank+1);set(`What is the value of the digit in the ${b===1?'ones':b===10?'tens':b===100?'hundreds':b===1000?'thousands':'ten-thousands'} place in ${a.toLocaleString('en')}?`,Math.floor(a/b)%10*b,{a,b});}
else if(k==='add')set(`${a} + ${b}`,a+b,{a,b,op:'+'});
else if(k==='sub'){[a,b]=[Math.max(a,b),Math.min(a,b)];set(`${a} − ${b}`,a-b,{a,b,op:'-'});}
else if(k==='mul'){a=int(2,[10,30,60,99][rank]);b=int(2,[5,10,12,20][rank]);set(`${a} × ${b}`,a*b,{a,b,op:'*'});}
else if(k==='div'){b=int(2,[5,10,12,20][rank]);a=b*int(1,[10,12,25,50][rank]);set(`${a} ÷ ${b}`,a/b,{a,b,op:'/'});}
else if(k==='tables'||k==='relation'){a=tableMode==='mixed'?int(2,10):+table;b=tableMode==='ordered'?i%12+1:int(1,rank===0?10:12);let m=k==='relation'?'missing':tableMode;if(m==='reverse')set(`${a*b} ÷ ${a}`,b,{a:a*b,b:a,op:'/'});else if(m==='missing')set(`${a} × □ = ${a*b}`,b,{a,product:a*b});else set(`${a} × ${b}`,a*b,{a,b,op:'*'});}
else if(['order','brackets','mixedOrder'].includes(k)){a=int(1,[9,12,20,30][rank]);b=int(2,9);let c=int(2,9);if(k==='brackets')set(`(${a} + ${b}) × ${c}`,(a+b)*c,{a,b,c,type:0});else if(k==='mixedOrder'&&i%2)set(`${b*c} ÷ ${b} × ${a} − ${c}`,c*a-c,{a,b,c,type:1});else set(`${a} + ${b} × ${c}`,a+b*c,{a,b,c,type:2});}
else if(k==='factors'){a=int(2,[12,24,40,60][rank]);if(i%2){b=int(2,5);set(`What is the ${b===2?'2nd':b===3?'3rd':b+'th'} positive multiple of ${a}?`,a*b,{a,b,type:'multiple'});}else {let factors=Array.from({length:a},(_,j)=>j+1).filter(n=>a%n===0);set(`List all positive factors of ${a}.`,factors.join(', '),{a,type:'factors'});}}
else if(k==='divisibility'){b=pick(rank===0?[2,5,10]:[2,3,4,5,9,10]);a=int(1,[10,20,40,80][rank])*b+(i%2?int(0,b-1):0);set(`Is ${a} divisible by ${b}? (yes or no)`,a%b===0?'Yes':'No',{a,b});}
else if(k==='prime'){a=int(1,[20,40,70,100][rank]);let prime=a>1&&!Array.from({length:Math.max(0,Math.floor(Math.sqrt(a))-1)},(_,j)=>j+2).some(n=>a%n===0);set(`Is ${a} prime, composite, or neither?`,a===1?'Neither':prime?'Prime':'Composite',{a});}
else if(k==='hcf'||k==='lcm'){let f=int(2,[4,6,8,10][rank]);a=f*int(1,rank+3);b=f*int(2,rank+4);set(`${k.toUpperCase()} of ${a} and ${b}`,k==='hcf'?gcd(a,b):a*b/gcd(a,b),{a,b});}
else if(k==='fractionParts'){b=int(2,[5,8,10,12][rank]);a=int(1,b-1);set(`What is the ${i%2?'denominator':'numerator'} of ${a}/${b}?`,i%2?b:a,{a,b,part:i%2});}
else if(k==='equivalent'){b=int(2,[5,8,10,12][rank]);a=int(1,b-1);let f=int(2,rank+3);set(`${a}/${b} = □/${b*f}`,a*f,{a,b,f});}
else if(k==='simplify'){b=int(2,[5,8,10,12][rank]);a=int(1,b-1);let f=int(2,rank+3);set(`Simplify ${a*f}/${b*f}.`,fraction(a,b),{a:a*f,b:b*f});}
else if(k.startsWith('fraction')||k==='compareFraction'){let d=int(2,[5,6,9,12][rank]);b=rank===0?d:int(2,[5,6,9,12][rank]);a=int(1,b-1);let c=int(1,d-1);if(k==='compareFraction')set(`${a}/${b} □ ${c}/${d}  (use <, > or =)`,a*d===c*b?'=':a*d>c*b?'>':'<',{a,b,c,d});
else if(k==='fractionAdd'){let minus=i%2===1;if(minus&&a*d<c*b)[a,b,c,d]=[c,d,a,b];set(`${a}/${b} ${minus?'−':'+'} ${c}/${d}`,fraction(a*d+(minus?-1:1)*c*b,b*d),{a,b,c,d,op:minus?'-':'+'});}
else if(k==='fractionMul')set(`${a}/${b} × ${c}/${d}`,fraction(a*c,b*d),{a,b,c,d,op:'*'});
else set(`${a}/${b} ÷ ${c}/${d}`,fraction(a*d,b*c),{a,b,c,d,op:'/'});}
else if(k==='integerCompare'){a=int(-max,max);b=int(-max,max);set(`${a} □ ${b}  (use <, > or =)`,a===b?'=':a>b?'>':'<',{a,b});}
else if(k==='integerAdd'){a=int(-max,max);b=int(-max,max);let minus=i%2===1;set(`${a} ${minus?'−':'+'} (${b})`,minus?a-b:a+b,{a,b,op:minus?'-':'+'});}
else if(k==='integerMul'){b=int(1,[5,10,12,15][rank])*pick([-1,1]);a=int(1,[5,10,12,20][rank])*pick([-1,1]);let divide=i%2===1;if(divide)a*=b;set(`(${a}) ${divide?'÷':'×'} (${b})`,divide?a/b:a*b,{a,b,op:divide?'/':'*'});}
if(text===undefined)throw Error('Missing generator '+k);
return {id:`${k.toUpperCase()}-${level}${String(i+1).padStart(2,'0')}`,skill:k,level,prompt:text,answer,data};
}
return Array.from({length:count},(_,i)=>one(skill,i));
}
root.MFEngine={generate,gcd,fraction};
})(typeof window!=='undefined'?window:globalThis);
