#!/usr/bin/env node

// Verify that the fixed ID generation produces the expected supernode ID

import { compress } from './dist/esm/internal/zstd.js';
import { blake3HashBytes } from './dist/esm/internal/hash.js';
import bs58 from 'bs58';

// The combined index signature from the actual failed upload
const indexWithSignature = "eyJsYXlvdXRfaWRzIjpbIkVDM0RMeE1YdkVOQnk2SlJQckE5TERiSG81RER4R1B0YldpRzYydFNnQ3BLIiwiNG5qVzJwZTNGM1daQ3Z1UlV2dWE2OWFMQWVjYlplU1V2WGhSWFpMd1pYclQiLCI2eEU3QlRmWFdEdlA0MU1NZVRvNEtkRlU1M0JhaFFuVGdyOGhLVmd4VEdTYSIsIkVlOWs2ZEpvcFlFRXBqaVlGZ0p0YXo3b01zcnVvVnpzeThhcU5tOHdUUTlaIiwiOUsxRFpuUXk1NDFNaE5KakVGSFFtVWFlYlV6RGJXZ05jU3dNeWlQRkhTcUoiLCI4UkFOUEg4QlREdjdQODFoaE1md0NZWUpoY3FWV2lUQzdSWVIzQ200NmhSRSIsIkg4WEhwVzhkM0FDTDFXVWtnaWlENURhdWFWaHQySGs2OHprcGluVEZMS3pIIiwiSEt5cmFnMkdzRXhTalkxVU55RWNxOEdYNVlSU2RoODJ3ZUxBcTlxbnlQdGgiLCJDUjYzRW9qZzRIN1o1YWpFTnZqSzZZVUY2amoycnFuQmE5ODJRN2p5RTlSbiIsIkhHczNRcXJuWFVzVFZBNDZiMnRvVUQxSjNtaUtORVo2ajdMUlZyNUppZEtvIiwiR2pyb0pRNWpUa1lSdkZUNVg1Vko4N0ZqTXFZbnJYYlE5OUpTS0pIVlNZZE0iLCJCcVV2ZGZUVHNNVkN0MXZVZ2dqQTFIcTFXdTJWUGlVb0dQZnVjSzgxbUN0VCIsIkZvRHEyQkJjNnJEbkZVSEZHUzYxN1VtblltZG5BSmJpbXRZdjRoNU5qTGVlIiwiNllyWFZwczdTeEpLWkx0WW5YUWhOOHBOZTExREwxU3YydGg0NU1XTnV2NnQiLCJETHVVSk1hd0c5Zm1qZW9QSEpNVldHU01oUU1rYkJneno4aE1TZjN3dXpBTiIsIkRuSFZ2ZjhhanFWV0N5bjE4Y1pUN21oU3dGcW5kOWF4SFdoQ1U0cU40cW1vIiwiMjVqSlhYbUZucVhZWTdFZlNZOTkzYkVhb1Zkc001M0RSUnRWTFF5V2lxVlciLCIyY1VkU2dVNEtGN3dMSE1TRXpMcmk2ZXNla010QVhwN2dnTnI4Mzlodjg0QSIsIjl1RlF6dTVYVTVqb0hXZFY3S0tBSGhhdzdCb1g2YWVUODNBcTkzRWU3dWNhIiwiQURycmtzMzhoVFJ1eG80OVlSZVR2R2VNaldvcXVWOHdNZGYzZ0toY2g2TVkiLCI0MUdIdnBtQ2ZpMXlTRHdKczhyOUhkd2FlRkp6YWhuV2E3aHZ2ZXZBOTlqVSIsImE1akJpa0FtdGVSV1h6R3VFTnp3c3F6UDh1YThIb2tRMVhaa3d4OThpWVoiLCJIbUdiMVAxQUN3clkxS01KQzlhVGJDUnk1NjNyNXV3aFc3Y0xwcGhZbUdVRiIsImZoRnRSbmIyVDJIcmNYaXVzY2MyclN5VXdENXBlUktBRnphSzlvZ0ZldVkiLCI0SGtkNUVjcmg2cnE2b1JGTWkxTGpBd0RKZXo2anVjUE16OUo5eXZNRHBVWiIsImU1WlVwNmZoVGE1WG9hMjJTSkdneVAxcnhqeHBYZHZlNnNOS2JWWjRhdVAiLCJFZ0o4WlRZNEVMNHlZUE1yaG1HdjN2eVlFenBhQlRQb0d4WWJTb1k1ZWVIVSIsIjNjOVg1a0R6bmpQU05lcHpvMnc0TFZXNGE3VkdYUEtLaURqcm5rV2dmWnoxIiwiQWthMXJ0TTU2U1pBVHEyQ3B5OWJUeFlEb1FYeWREY1FyVFVZa1lXSExmY3IiLCJBSHZqcGZ4RTQxeFhyZnRuZ2FkUFpkY3Boa2hmSjdNaDFUQU0yTnZxQm56USIsIjR4ZHdOV2NEaXc2aDFFc0NXVEs1ek43YW1CMkpIWXVxV2p4MXhoV3gyN294IiwiQXV4cW1qa1U4WnJUSEZBNnZpUlRvdjM0ZFFHQVNjTDFuVDQ5eG5hUW4yNWciLCI2WkJFYnVRQ2h2Y1FnVEJBSzFHTkdmc054YWlSN29HRVlySHYyWGI1Q1RkaCIsIjRYQ0FGeGRSNEVwQ2lnRm9KY1I4QmM4bjlwdHpwNWlabzZVWlhGMkJiTjl6IiwiQlhhVkZhVE1ib0NtS2hwRThqd0JOTTM0eVFnVGRmNGdEZlg4dGdSVTQ0WUsiLCI4TGJCR3VTajhpTlFjTWJNUkRZaDVpUUthSzVhRW9nckpKamtXdDdRdHM5SCIsIkhFUUFNV3lXZDc0RnRtOVNrWDVZUlR6WERRYVJpTjM3ZXBHV0RSejdZMWN2IiwiMlo5bnhaWGJ0ZHhpS3NqdVZYTlhMbmV0Um1XcXBMc1laRkRxTjdWVkFzdVUiLCJIeFU2SlhaYjVQRWVEZEJUZG9IQVdmVnRpV2JMbm1LU0xUYWJ3OE5xWHQ4VyIsIjIxWTE3UjZOaFBQc1dCOVRHU3hBNUpNUGJqMktZNkNqR2V2NEtKVlpHVGpIIiwiRmNMVHc4QVE2a0dmbThLU1ZRWGFxRE1uUUt4aDI5aExtc0hzTHppVmNRQzEiLCI5c29SYzRNRXptRlZyaDNCclVGUGlCMjdoU2lLR2VWZUVnNlpvU2lrdkdxVCIsIkI4OEI3Vmk4aHUxdWMxNVR5V0Uxc01Gc3k1cXNncFVoUHpuM28zYk4zZlhUIiwiSFpva295V0w4cWJiZ3BmY3NwWldRODhwbUJOZzNEUjh6QlNhdFNZdU5IMlIiLCIzaWZybk51YlROZWVWM3BKRjFhZVJ4dWFKTnU5djlOcGZua1dDWU1taFBQWiIsIjd0clZjd1FZWWt2TFN0QWlWZXJYMlJ0RmhEV2QySnFIZmNLVGhzcnJCUlFjIiwiR1hLeXFCblpoYnJtcFFOUkV4TVN1a1BrYWZzak5TY0RoNWlkTG03bnNCUFEiLCI3N0pSZzRQMWZjeHJqR1ZLTHpZd2tVeHRRdm9FUVBCSGJNUmtYOGZ0Yjg4aiIsIkhuZ1FBQTdqVHRLdkJvY21YUWprYktKY0xjcUtCWng4djFkSk1NYjVXV0hXIiwiMjNCWFNabVQ0Y0x2UVNSMWJVRDhUeEw4VFJjM1c2ZWZ0WG9WZ0NMQU1SeFMiXSwibGF5b3V0X3NpZ25hdHVyZSI6IkdaSnhlQU12QmRuWlRwWkhlN1NrcThZVUtSZi8rTW1Ba3VsaW5VdFR0eEpoZHJMM29jY2dTOWpTNDcwSS81VW5VSEdEU09keFJ5RGladWtoa0lGU3F3PT0ifQ==.o2tqhv5/qGqeYLGgE3oPXzDUCMJy6NJGj7hCTQDY0LHRXFIcDIqCGhz4nMnOIKJ1s3YRwlJhc3xQqzsJCQMtBA==";

// The ID that supernode is looking for (from error log)
const expectedSupernodeId = "DnHVvf8ajqVWCyn18cZT7mhSwFqnd9axHWhCU4qN4qmo";

// Constants
const ic = 6;
const max = 50;

console.log('====================================');
console.log('VERIFYING INDEX ID GENERATION FIX');
console.log('====================================');
console.log('');

// Generate first ID manually
async function generateFirstId() {
  const counter = ic + 0; // First ID
  const input = `${indexWithSignature}.${counter}`;

  console.log('Generating first index ID with fixed method:');
  console.log('  Input length:', input.length);
  console.log('  Input (first 100 chars):', input.substring(0, 100) + '...');
  console.log('');

  // Compress with zstd
  const compressed = await compress(input);
  console.log('  Compressed size:', compressed.length, 'bytes');

  // Hash with BLAKE3
  const hashBytes = await blake3HashBytes(compressed);
  console.log('  BLAKE3 hash (hex):', Buffer.from(hashBytes).toString('hex'));

  // Encode with Base58
  const id = bs58.encode(hashBytes);
  console.log('  Base58 ID:', id);
  console.log('');

  return id;
}

// Generate all IDs to find where the expected one is
async function generateAllIds() {
  const ids = [];
  for (let i = 0; i < max; i++) {
    const counter = ic + i;
    const input = `${indexWithSignature}.${counter}`;
    const compressed = await compress(input);
    const hashBytes = await blake3HashBytes(compressed);
    const id = bs58.encode(hashBytes);
    ids.push(id);
  }
  return ids;
}

// Run the test
const firstId = await generateFirstId();
const allIds = await generateAllIds();

console.log('RESULTS:');
console.log('--------');
console.log('First generated ID:', firstId);
console.log('Supernode expects: ', expectedSupernodeId);
console.log('');

const foundIndex = allIds.indexOf(expectedSupernodeId);
if (foundIndex === 0) {
  console.log('✅ SUCCESS! The first generated ID matches what supernode expects!');
} else if (foundIndex > 0) {
  console.log('⚠️  PARTIAL SUCCESS: Found the expected ID at index', foundIndex, '(not first)');
  console.log('   This suggests there might be an offset issue');
} else {
  console.log('❌ FAILED: Expected ID not found in generated list');
  console.log('   The IDs still don\'t match');
  console.log('');
  console.log('First 5 generated IDs:');
  for (let i = 0; i < 5; i++) {
    console.log(`  [${i}]: ${allIds[i]}`);
  }
}