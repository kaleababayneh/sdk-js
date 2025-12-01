#!/usr/bin/env node

import bs58 from 'bs58';

// Browser generates this Base58 ID
const browserBase58 = "HdpunuLwgxgnXx3hTKJaSggGrR2yHEPRxT7eW5FMweWY";

// Supernode looks for this hex
const supernodeHex = "fbf09153b79592a558e38b1c080466241a08a2db3a308973b464db58830ed86f";

// Convert browser's Base58 to hex
const browserBytes = bs58.decode(browserBase58);
const browserAsHex = Buffer.from(browserBytes).toString('hex');

// Convert supernode's hex to Base58
const supernodeBytes = Buffer.from(supernodeHex, 'hex');
const supernodeAsBase58 = bs58.encode(supernodeBytes);

console.log('====================================');
console.log('ID ENCODING COMPARISON');
console.log('====================================');
console.log('');
console.log('Browser generates (Base58):', browserBase58);
console.log('Browser as hex:            ', browserAsHex);
console.log('');
console.log('Supernode looks for (hex): ', supernodeHex);
console.log('Supernode as Base58:        ', supernodeAsBase58);
console.log('');
console.log('Are they the same?', browserAsHex === supernodeHex ? '✅ YES' : '❌ NO');

if (browserAsHex !== supernodeHex) {
  console.log('\nThese are DIFFERENT IDs! The problem is not just encoding.');
  console.log('Browser would generate:', browserAsHex);
  console.log('But supernode expects: ', supernodeHex);
}