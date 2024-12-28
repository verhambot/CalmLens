const { MongoClient } = require('mongodb');

let db;

const connectDB = async () => {
    if (!db) {
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        db = client.db();
    }
    return db;
};

const HelpInfo = {
    getAllHelpInfo: async (e) => {
        const database = await connectDB();
        return database.collection('helpInfo').find({}).toArray();
    }
};

module.exports = HelpInfo;