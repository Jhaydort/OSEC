import {test} from 'node:test';
import assert from 'node:assert/strict';
import {initialPatientStoryValues, normalizePatientStory, validatePatientStory, toPatientReviewInsert} from '../src/data/patientStory.ts';
const serviceIds=['specialist-consultation','colonoscopy'];
const valid={fullName:' Ada Visitor ',email:' ada@example.com ',service:'colonoscopy',phoneNumber:'+234 (816) 435-3633',rating:4,review:' The team explained everything clearly. ',consentToPublish:false};
test('empty and whitespace-only feedback produces required errors',()=>{
 assert.deepEqual(Object.keys(validatePatientStory(initialPatientStoryValues,serviceIds)),['fullName','email','service','phoneNumber','rating','review']);
 const errors=validatePatientStory({...valid,fullName:' \t',review:'\n '},serviceIds);assert.equal(errors.fullName,'Please enter your name.');assert.equal(errors.review,'Please share your experience.');
});
test('private feedback is valid and consent is never required',()=>{
 assert.deepEqual(validatePatientStory(valid,serviceIds),{});assert.deepEqual(validatePatientStory({...valid,consentToPublish:true},serviceIds),{});assert.equal(initialPatientStoryValues.consentToPublish,false);assert.equal(initialPatientStoryValues.rating,0);
});
test('reject invalid emails, unknown services and invalid ratings',()=>{
 for(const email of ['ada','ada@','ada @example.com','ada@example'])assert.ok(validatePatientStory({...valid,email},serviceIds).email);
 assert.ok(validatePatientStory({...valid,service:'invented-service'},serviceIds).service);
 for(const rating of [0,6,-1,2.5,NaN])assert.ok(validatePatientStory({...valid,rating},serviceIds).rating);
 for(const rating of [1,2,3,4,5])assert.equal(validatePatientStory({...valid,rating},serviceIds).rating,undefined);
});
test('phone validation accepts common formats and extensions',()=>{
 for(const phoneNumber of ['08164353633','+234 816 435 3633','+1 (212) 555-0100 ext. 12','020 7946 0958','555.1234'])assert.equal(validatePatientStory({...valid,phoneNumber},serviceIds).phoneNumber,undefined,phoneNumber);
 for(const phoneNumber of ['abc','123','+1234567890123456','++2348164353633'])assert.ok(validatePatientStory({...valid,phoneNumber},serviceIds).phoneNumber,phoneNumber);
});
test('normalization preserves consent and does not mutate input',()=>{
 const payload=normalizePatientStory(valid);assert.equal(payload.fullName,'Ada Visitor');assert.equal(payload.email,'ada@example.com');assert.equal(payload.review,'The team explained everything clearly.');assert.equal(payload.consentToPublish,false);assert.equal(valid.fullName,' Ada Visitor ');assert.deepEqual(Object.keys(payload),['fullName','email','service','phoneNumber','rating','review','consentToPublish']);
});

test('insert mapping is an allowlist with immutable moderation values',()=>{
 const row=toPatientReviewInsert({...valid,status:'approved',approved_at:'2026-01-01',display_name:'Untrusted'});
 assert.deepEqual(row,{full_name:'Ada Visitor',email:'ada@example.com',phone_number:'+234 (816) 435-3633',service:'colonoscopy',rating:4,review:'The team explained everything clearly.',consent_to_publish:false,status:'pending',approved_at:null});
 assert.equal(toPatientReviewInsert({...valid,consentToPublish:true}).consent_to_publish,true);
});
