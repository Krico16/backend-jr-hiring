const { NotFound } = require('./test/utils/errors');

module.exports = async function Test2(server, queries) {
    const response = await server.query(queries); // Will return an array with the results, empty array or error

    const jsonResp = JSON.parse(response);
    const jsonLenght = Object.keys(jsonResp).length;

    if(jsonLenght <= 0){
        return new NotFound();
    }else{
        return jsonResp
    }
}



