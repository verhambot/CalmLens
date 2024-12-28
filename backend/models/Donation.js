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

const Donation = {
    create: async (email, amount, method) => {
        const database = await connectDB();
        const timestamp = new Date();
        const result = await database.collection('donations').insertOne({
            email,
            amount,
            method,
            timestamp,
        });
        return result.insertedId;
    },
    findByUserEmail: async (email) => {
        const database = await connectDB();
        return database.collection('donations').find({ email }).toArray();
    },
    findAll: async () => {
        const database = await connectDB();
        return database.collection('donations').find({}).toArray();
    },
    getTotalByEmail: async (email) => {
        const database = await connectDB();
        const donations = await database
            .collection('donations')
            .aggregate([
                { $match: { email } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ])
            .toArray();
        return donations[0]?.total || 0;
    }
};

module.exports = Donation;