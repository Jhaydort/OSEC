import {chromium} from '../.cache/cta-check/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const p=await b.newPage({viewport:{width:1280,height:900},reducedMotion:'reduce'});
const base={full_name:'Public Test Patient',service:'colonoscopy',rating:4,review:'The team explained my procedure clearly.'};
let records=[],fail=false,delay=false,requests=0;
await p.route('**/rest/v1/patient_reviews*',async route=>{
 const req=route.request();assert.equal(req.method(),'GET');const u=new URL(req.url());
 assert.equal(u.searchParams.get('select'),'full_name,service,rating,review');
 assert.equal(u.searchParams.get('status'),'eq.approved');assert.equal(u.searchParams.get('consent_to_publish'),'eq.true');
 assert.equal(u.searchParams.get('order'),'approved_at.desc.nullslast,id.desc');requests++;
 if(delay)await new Promise(r=>setTimeout(r,700));
 if(fail){await route.fulfill({status:400,contentType:'application/json',body:JSON.stringify({message:'PRIVATE DATABASE ERROR'})});return;}
 const filtered=records.filter(r=>r.status==='approved'&&r.consent_to_publish);
 const offset=Number(u.searchParams.get('offset')??0);const page=filtered.slice(offset,offset+100).map(({full_name,service,rating,review})=>({full_name,service,rating,review}));
 await route.fulfill({status:200,headers:{'content-range':`${offset}-${offset+page.length-1}/${filtered.length}`},contentType:'application/json',body:JSON.stringify(page)});
});
async function visit(){await p.goto('http://localhost:5173/');await p.locator('.osec-patient-stories[aria-busy="false"]').waitFor();}
for(const [status,consent] of [['pending',true],['approved',false],['rejected',true]]){
 records=[{...base,status,consent_to_publish:consent}];await visit();assert.equal(await p.getByText(base.full_name,{exact:false}).count(),0);assert.equal(await p.locator('.osec-patient-stories blockquote').count(),0);console.log(`PASS mocked ${status}, consent=${consent}: hidden`);
}
records=Array.from({length:105},(_,i)=>({...base,full_name:`Public Test Patient ${i+1}`,status:'approved',consent_to_publish:true}));delay=true;
await p.goto('http://localhost:5173/');await p.getByText('Loading patient stories�').waitFor();await p.locator('.osec-patient-stories[aria-busy="false"]').waitFor();delay=false;
assert.equal(await p.locator('.osec-patient-stories__pagination button').count(),105);
assert.equal(await p.locator('.osec-patient-stories figcaption').textContent(),'Public Test Patient 1 � Colonoscopy (Lower GI Endoscopy)');assert.equal(await p.locator('.osec-patient-stories blockquote').innerText(),base.review);assert.match(await p.locator('.osec-patient-stories__rating').innerText(),/4 Review/);
await p.getByRole('button',{name:'Previous patient story',exact:true}).click();assert.match(await p.locator('figcaption').innerText(),/Patient 105/);
await p.getByRole('button',{name:'Next patient story',exact:true}).click();assert.match(await p.locator('figcaption').innerText(),/Patient 1 �/);
await p.getByRole('button',{name:'Show patient story 4',exact:true}).click();assert.match(await p.locator('figcaption').innerText(),/Patient 4 �/);
for(const width of [480,430,390,375,1280]) {await p.setViewportSize({width,height:900});assert.equal(await p.locator('.osec-patient-stories').evaluate(e=>e.scrollWidth<=e.clientWidth),true);}
await p.locator('.osec-patient-stories').screenshot({path:'.cache/cta-check/public-stories-approved.png'});
console.log('PASS mocked approved + consent: all fields, loading, 105 stories across pages, dots, arrow wrap, responsive widths');
fail=true;await visit();assert.equal(await p.getByText('PRIVATE DATABASE ERROR').count(),0);assert.equal(await p.locator('.osec-patient-stories blockquote').count(),0);console.log('PASS graceful error');
await p.unroute('**/rest/v1/patient_reviews*');
const responsePromise=p.waitForResponse(r=>r.url().includes('/rest/v1/patient_reviews?'));
await p.goto('http://localhost:5173/');const response=await responsePromise;assert.equal(response.status(),200);const data=await response.json();for(const row of data)assert.deepEqual(Object.keys(row).sort(),['full_name','rating','review','service']);await p.locator('.osec-patient-stories[aria-busy="false"]').waitFor();
console.log(`LIVE read-only query: HTTP ${response.status()}, ${data.length} public rows on first page; only four public fields returned. No database writes.`);
await b.close();
