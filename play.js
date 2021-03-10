const  { connect } = require('./client');
const { setupInput } = require('./input');

console.log('Connecting ...');
const conn = connect();

setupInput(conn);

// On connection, set our name.
conn.on('connect', () => {
  conn.write('Name: MP');
});

// When the server sends us some data, print it to console
conn.on('data', data => {
  console.log(data);
});

// When the connection is closed, quit.
conn.on('close', () => {
  console.log('Connection closed!')
  process.exit();
});

// Fun spinner messages :)
const spin = () => {
  const chars = ['|', '/', '-', '\\'];
  const colors = ['\u001b[31m', '\u001b[37m', '\u001b[33m', '\u001b[34m'];
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      conn.write('Say: ' + colors[i] + chars[i] + '\u001b[0mwow' + colors[i] + chars[i]);
    }, i * 200);
  }
};
setInterval(spin, 800);