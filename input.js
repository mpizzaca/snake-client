const { MOVE_UP_KEY, MOVE_LEFT_KEY, MOVE_DOWN_KEY, MOVE_RIGHT_KEY, 
      MOVE_UP_COMMAND, MOVE_LEFT_COMMAND, MOVE_DOWN_COMMAND, MOVE_RIGHT_COMMAND } = require('./constants');

let conn;

const handleUserInput = input => {
  // Pressing w/a/s/d will send up/left/down/right move command to the server.
  if (input === MOVE_UP_KEY) {
    conn.write(MOVE_UP_COMMAND);
  } else if (input === MOVE_LEFT_KEY) {
    conn.write(MOVE_LEFT_COMMAND);
  } else if (input === MOVE_DOWN_KEY) {
    conn.write(MOVE_DOWN_COMMAND);
  } else if (input === MOVE_RIGHT_KEY) {
    conn.write(MOVE_RIGHT_COMMAND);
  } else if (input === '\u0003') {
    process.exit();
  } else if (input === '1') {
    conn.write('Say: /(´▽`)/');
  } else if (input === '2') {
    conn.write('Say: \\(´▽`)\\');
  } else if (input === '3') {
    conn.write('Say: \u001b[31mRed!')
  } else if (input === '4') {
    conn.write('Say: \u001b[34mBlue!')
  } else if (input === '5') {
    conn.write('Say: \u001b[32mGreen!')
  }
};

const setupInput = connection => {
  // setup stdin
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  
  // setup conneciton
  conn = connection;
  
  // input handling
  stdin.on('data', handleUserInput);
  
  return stdin;
};

// Fun spinner messages :)
let msg = 'spin';
const spin = () => {
  const chars = ['|', '/', '-', '\\'];
  const colors = ['\u001b[31m', '\u001b[37m', '\u001b[33m', '\u001b[34m'];
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      conn.write('Say: ' + colors[i] + chars[i] + '\u001b[0m' + msg + colors[i] + chars[i]);
    }, i * 200);
  }
};
setInterval(spin, 800);

module.exports = { setupInput };