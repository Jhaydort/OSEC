import {test} from 'node:test';
import assert from 'node:assert/strict';
import {countStoryWords,validatePatientStory} from '../src/data/patientStory.ts';
test('45-word limit handles whitespace, deletion and pasted text without truncation',()=>{
 assert.equal(countStoryWords('  \n\t '),0);assert.equal(countStoryWords('one  two\nthree\tfour'),4);
 for(const n of [18,44,45,46,80]){const review=Array(n).fill('word').join(' \n ');const errors=validatePatientStory({fullName:'Test',email:'test@example.com',phoneNumber:'08000000000',service:'test',rating:5,review,consentToPublish:false},['test']);assert.equal(countStoryWords(review),n);assert.equal(Boolean(errors.review),n>45);}
});
