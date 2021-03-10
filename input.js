let conn;

const handleUserInput = input => {
  // Pressing w/a/s/d will send up/left/down/right move command to the server.
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

module.exports = { setupInput };