const { NotFound, ServerError } = require('./test/utils/errors');

module.exports = async function Test2(server, queries) {
    const response = await server.query(queries); // Will return an array with the results, empty array or error
    try {
        const jsonResp = JSON.parse(response);
        const jsonLenght = Object.keys(jsonResp).length;
        return (jsonLenght <= 0) ? new NotFound() : jsonResp;
    } catch (error) {
        return new ServerError();
    }
}



