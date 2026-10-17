import{test}from 'node:test';import assert from 'node:assert/strict';import{fresh,winningLine,forbidden,chooseMove}from './engine.js';
test('five in each direction wins and four does not',()=>{for(const step of [1,15,16,14]){const b=fresh();for(let k=0;k<4;k++)b[52+k*step]=1;assert.equal(winningLine(b,52,1).length,0);b[52+4*step]=1;assert.equal(winningLine(b,52,1).length,5);}});
test('sequences never wrap at board edge',()=>{const b=fresh();for(let i=13;i<18;i++)b[i]=1;assert.equal(winningLine(b,15,1).length,0);});
test('contiguous open double three is forbidden for both colors, board stays intact',()=>{for(const color of [1,2]){const b=fresh();for(const i of [111,113,97,127])b[i]=color;const before=[...b];assert.equal(forbidden(b,112,color),true);assert.deepEqual(b,before);}});
test('broken three and closed three are allowed',()=>{const b=fresh();for(const i of [110,113,97,127])b[i]=1;assert.equal(forbidden(b,112,1),false);b[110]=0;b[111]=1;b[110]=2;assert.equal(forbidden(b,112,1),false);});
test('four three and immediate five take priority',()=>{const b=fresh();for(const i of [110,111,113,97,127])b[i]=1;assert.equal(forbidden(b,112,1),false);b[109]=1;assert.equal(forbidden(b,112,1),false);});
test('all AI levels win immediately, block loss, and leave board intact',()=>{for(const level of [0,1,2]){const b=fresh();for(const i of [108,109,110,111])b[i]=2;b[107]=1;const before=[...b];assert.equal(chooseMove(b,2,level),112);assert.equal(chooseMove(b,1,level),112);assert.deepEqual(b,before);}});
test('AI opens at center and selects legal moves',()=>{assert.equal(chooseMove(fresh(),2,2),112);const b=fresh();b[112]=1;for(const level of [0,1,2]){const i=chooseMove(b,2,level,()=>0);assert.equal(b[i],0);assert.equal(forbidden(b,i,2),false);}});

