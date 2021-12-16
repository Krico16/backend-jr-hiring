const sift = require('sift');
const { NotFound, } = require('./test/utils/errors');

// This is a bonus but you need to do the previous tests before

class Server {
    // Create your server with query features with sift
    // We pass the db when the Server is instantiated (constructor)
    constructor(db) {
        this.db = db;
    }
    async find(model, query) {
        const result = this.db[model].filter(sift(query));
        
        return (Object.keys(result).length > 0) ? Array.from(result) : new NotFound();
    }

    async findOne(model, id) {
        return (!id) ? new NotFound(`No data found with the id equal as "${id}".`) : this.db[model].filter(obj => obj.id == id)[0];
    }

    async updateOne(model, id, newId) {
        if (!id) return new NotFound(`No data for update found with the id equal as "${id}".`);

        const data = this.db[model];

        const queryIndex = data.findIndex(query => query.id == id);
        data[queryIndex] = Object.assign(data[queryIndex], newId);
        return data[queryIndex];
    }
}

module.exports = Server;
