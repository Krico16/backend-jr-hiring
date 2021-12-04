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
        if (Object.keys(result).length > 0) return Array.from(result); else return new NotFound();
    }

    async findOne(model, id) {
        return (id == null) ? new NotFound(`No data found with the id equal as "${id}".`) : this.db[model].filter(obj => obj.id == id)[0];
    }

    async updateOne(model, id, newId) {

        if (id == null) {
            return new NotFound(`No data for update found with the id equal as "${id}".`);
        } else {
            var res = null;
            const data = this.db[model];
            data.forEach((element, index) => {
                if (element['id'] == id) {
                    const finded = data[index];
                    data[index] = { ...finded, ...newId };
                    res = data[index];
                }
            });
            return res;
        }
    }
}

module.exports = Server;
