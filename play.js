const  { connect } = require('./client');
const { setupInput } = require('./input');

console.log('Connecting ...');
const conn = connect();

// On connection, set our name.
// conn.on('connect', () => {
//   conn.write('Name: MP!');
// });



setupInput();

// When the server sends us some data, print it to console
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
      conn.write('Name: MP' + chars[i]);
    }, i * 200);
  }
};

setInterval(spin, 800);