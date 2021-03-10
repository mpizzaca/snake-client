const  { connect } = require('./client');

console.log('Connecting ...');
const conn = connect();

conn.on('connect', () => {
  conn.write('Name: MP!');
});

conn.on('data', data => {
  console.log(data);
});