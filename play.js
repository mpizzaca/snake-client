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

// // Fun spinner messages :)
// const spin = () => {
//   const chars = ['|', '/', '-', '\\'];
//   for (let i = 0; i < 4; i++) {
//     setTimeout(() => {
//       conn.write('Say: ' + chars[i] + 'spin with me' + chars[i]);
//     }, i * 200);
//   }
// };
// setInterval(spin, 800);