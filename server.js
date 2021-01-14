const net = require('net');
const fs = require('fs');

//code to run when server is created
const server = net.createServer((socket) => {
  //socket.pipe(process.stdout);

  socket.write('Echo server\r\n');
  socket.on('data', function(chunk) {
    console.log('writing back', chunk);
    socket.write(chunk);
  });
  // socket.on('end', () => {
  //   console.log('client disconnected');
  //   socket.end;
  // });
});

// code to call when server receives a new client
server.on('connection', (client) => {
  console.log('New client connected!');
  //console.log(client);
  client.write('Hello there!');

  client.setEncoding('utf8'); // interpret data as text
  client.on('data', (data) => {
    console.log('Message from client: ', data);

    if (data === 'Request: ')
      console.log('send request.');
      //send something
  });

  client.on('end', () => {
    client.end;
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
