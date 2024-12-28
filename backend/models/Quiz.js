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

const Quiz = {
    addQuizResult: async (email, quizType, score) => {
        const database = await connectDB();
        const result = await database.collection('quizResults').insertOne({
            email,
            quizType,
            score,
            timestamp: new Date(),
        });
        return result.insertedId;
    },
    getUserQuizResults: async (email) => {
        const database = await connectDB();
        return database.collection('quizResults').find({ email }).toArray();
    },
    getQuizResultsByType: async (email, quizType) => {
        const database = await connectDB();
        return database.collection('quizResults').find({ email, quizType }).toArray();
    },
    getLatestResultsByType: async (email) => {
        const database = await connectDB();
        const pipeline = [
            { $match: { email } },
            { $sort: { quizType: 1, timestamp: -1 } },
            {
                $group: {
                    _id: "$quizType",
                    latestResult: { $first: "$$ROOT" },
                },
            },
            { $replaceRoot: { newRoot: "$latestResult" } }
        ];

        return database.collection('quizResults').aggregate(pipeline).toArray();
    },
};

module.exports = Quiz;