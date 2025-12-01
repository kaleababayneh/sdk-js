#!/usr/bin/env node

/**
 * Test script to demonstrate ID generation differences
 * This shows what IDs the browser generates vs what the supernode expects
 */

const { generateIds } = require('./dist/cjs/wasm/lep1.js');

async function testIdGeneration() {
  // Example values (you can replace with actual values from your logs)
  const layoutB64 = "eyJibG9ja3MiOlt7ImJsb2NrX2lkIjowLCJlbmNvZGVyX3BhcmFtZXRlcnMiOls...";  // truncated
  const layoutSig = "Cv7MxPu30LxMCZLR5S7KjJEeRdqFBAYuzFaB...";  // truncated

  // Index file would be built from layout IDs
  const indexB64 = "eyJsYXlvdXRfaWRzIjpbIjFCNEFBN0M3WTMxSDY3S0M1UjNOS1o1TkpG...";  // truncated
  const creatorSig = "xVuqQo0VnZBQUFBQUF1WGJaZkJBQUFBQWF0...";  // truncated

  const ic = 1234;  // example initial counter
  const max = 10000; // example max symbols

  console.log('====================================');
  console.log('ID GENERATION COMPARISON');
  console.log('====================================\n');

  // What browser generates for layout IDs (goes in index file)
  const layoutIds = await generateIds(layoutB64, layoutSig, ic, max);
  console.log('1. LAYOUT IDs (for index file structure):');
  console.log('   Input:', `${layoutB64.substring(0, 30)}...${layoutSig.substring(0, 30)}...`);
  console.log('   First ID:', layoutIds[0]);
  console.log('   Last ID:', layoutIds[layoutIds.length - 1]);
  console.log('   Count:', layoutIds.length);
  console.log('');

  // What supernode generates for storage (from index + full signature)
  const indexIds = await generateIds(indexB64, creatorSig, ic, max);
  console.log('2. INDEX IDs (what supernode uses for storage):');
  console.log('   Input:', `${indexB64.substring(0, 30)}...${creatorSig.substring(0, 30)}...`);
  console.log('   First ID:', indexIds[0]);
  console.log('   Last ID:', indexIds[indexIds.length - 1]);
  console.log('   Count:', indexIds.length);
  console.log('');

  console.log('3. KEY INSIGHT:');
  console.log('   - Browser was only generating layout IDs');
  console.log('   - Supernode stores files using index IDs');
  console.log('   - These are COMPLETELY DIFFERENT!');
  console.log('   - That\'s why downloads fail - wrong IDs!');
  console.log('');

  console.log('4. THE PROBLEM:');
  console.log('   The browser never actually uses or sends index IDs anywhere.');
  console.log('   The supernode generates its own index IDs from the signatures field.');
  console.log('   If these don\'t match, downloads will fail.\n');

  console.log('5. TO DEBUG:');
  console.log('   1. Run an upload with the new debug logging');
  console.log('   2. Check what index IDs the browser logs');
  console.log('   3. Check what rq_ids_ids the supernode puts in blockchain');
  console.log('   4. If they don\'t match, we found the problem!');
}

testIdGeneration().catch(console.error);