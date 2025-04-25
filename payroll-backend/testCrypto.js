const { encrypt, decrypt } = require('./cryptoDesign');

const sampleSalary = "50000";
const encrypted = encrypt(sampleSalary);
console.log("Encrypted:", encrypted);

const decrypted = decrypt(encrypted);
console.log("Decrypted:", decrypted);
