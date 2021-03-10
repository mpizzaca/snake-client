const  { connect } = require('./client');
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.setEncoding('utf8');

console.log('Connecting ...');
const conn = connect();

// On connection, set our name.
// conn.on('connect', () => {
//   conn.write('Name: MP!');
// });

// Pressing w/a/s/d will send up/left/down/right move command to the server.
stdin.on('data', input => {
  if (input === 'w') {
    conn.write('Move: up');
  } else if (input === 'a') {
    conn.write('Move: left');
  } else if (input === 's') {
    conn.write('Move: down');
  } else if (input === 'd') {
    conn.write('Move: right');
  } else if (input === '\u0003') {
    process.exit();
  }
});

// When the server sends us some data, print it to console.
conn.on('data', data => {
  console.log(data);
});

// When the connection is closed, quit.
conn.on('close', () => {
  console.log('Connection closed!')
  process.exit();
});

// Fun spinner name :)
const spin = () => {
  const chars = ['|', '/', '-', '\\'];
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      conn.write('Name: ' + chars[i]);
    }, i * 200);
  }
};

setInterval(spin, 800);