const fs = require('fs');

client.on("error", error => {

  console.error(error);
  return fs.appendFileSync('./error.txt', error.toString() + '\n');
    
});

process.on('unhandledRejection', error => {
  
  console.error(error);
  return fs.appendFileSync('./error.txt', error.toString() + '\n');
  
});

client.on('shardError', error => {

  console.error(error);
  return fs.appendFileSync('./error.txt', error.toString() + '\n');
  
});