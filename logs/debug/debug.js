const fs = require('fs');
 fs.writeFileSync('./debug.txt', '');

client.on("debug", info => {

  return fs.appendFileSync('./debug.txt', info + '\n');
    
});