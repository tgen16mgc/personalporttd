const fs = require('fs');
console.log("Card size:", fs.statSync('public/card.glb').size);
console.log("Lanyard image size:", fs.statSync('public/lanyard.png').size);
