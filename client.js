const net = require('net');
const conn = net.createConnection({
  host: 'localhost',
  port: 3000 // or change to ngrok port
});

// client.js
conn.on('data', (data) => {
  console.log('Server says: ', data);
});

conn.on('connect', () => {
  conn.write('Perry connected!!');
});
conn.setEncoding('utf8'); // interpret data as text


const stdin = process.stdin;

// don't worry about these next two lines of setup work.
stdin.setRawMode(true);
stdin.setEncoding('utf8');

let array = [];
stdin.on('data', (key) => {
  //conn.write(key);
  if (key !== '\\') {
    process.stdout.write(key);
    array.push(key);
    //process.stdout.write('\r');
  } else if (key === '\\') {
    //console.log(array.join(''), '\n');
    conn.write(array.join(''));
    array = [];
    process.stdout.write('\r                                      \n');
  }

  // \u0003 maps to ctrl+c input
  if (key === '\u0003') {
    process.stdout.write('\nThanks for using me, ciao!\n');
    process.exit();
  }

});


