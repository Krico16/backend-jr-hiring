module.exports = function Test1(server) {

  const result = new Promise((res) => {
    server.on('name', data => res(data));
  });

  return result;
}