const bcrypt = require('bcrypt');

const myPlaintextPassword = 'Banana@Dog';
const hash = '$2b$05$1XO1d.kTEB6p1G9J6lHZAOyoGHFRdYsne81Q3LZwfSC.PLG0mSLOC';

bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
  if (err) {
    console.error(err);
  } else if (result) {
    console.log("Password matches!");
  } else {
    console.log("Password does not match.");
  }
});
