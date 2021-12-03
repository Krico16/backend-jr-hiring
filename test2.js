const { NotFound } = require('./test/utils/errors');

/**
 * createdAt value does not exists in users
 * 
 */

module.exports = async function Test2(server, queries) {
    const response = await server.query(queries); // Will return an array with the results, empty array or error

    // Response converted to JSON
    const jsonResponse = JSON.parse(response);
    try {

        // Replace undefined for null on queries
        const val = JSON.stringify(queries, (key, value) => value === undefined ? null : value)
        // Parse formated JSON string to JSON object
        const jsonVal = JSON.parse(val)

        for (const i in jsonVal) {
            if (typeof jsonVal[i] == 'object') {
                for (const o in jsonVal[i]) {
                    if (jsonVal[i][o] == null) return jsonResponse
                }
            } else {
                return new NotFound()
            }
        }
    } catch (error) {
        throw new NotFound();
    }
}



