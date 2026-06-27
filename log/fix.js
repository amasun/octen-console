const fs = require('fs');
let s = fs.readFileSync('log/billing-invoiced-v2.html', 'utf8');
const before = s.length;
s = s.replace(/>Invoiced billing \u00b7 active</g, '>Invoiced<');
s = s.replace(/chip:'Invoiced billing \u00b7 active'/g, "chip:'Invoiced'");
fs.writeFileSync('log/billing-invoiced-v2.html', s, 'utf8');
console.log('done', before, '->', s.length);
console.log('remaining "Invoiced billing":', (s.match(/Invoiced billing/g) || []).length);
