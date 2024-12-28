const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

let db;

const connectDB = async () => {
    if (!db) {
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        db = client.db();
    }
    return db;
};

const User = {
    findByEmail: async (email) => {
        const database = await connectDB();
        return database.collection('users').findOne({ email });
    },
    create: async (name, email, password) => {
        const database = await connectDB();
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await database.collection('users').insertOne({
            name,
            email,
            password: hashedPassword,
        });
        return result.insertedId;
    },
    validatePassword: async (user, password) => {
        return bcrypt.compare(password, user.password);
    },
    updatePassword: async (email, newPassword) => {
        const database = await connectDB();
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await database.collection('users').updateOne(
            { email: email },
            { $set: { password: hashedPassword } }
        );
    },
    deleteAccount: async (email) => {
        const database = await connectDB();
        await database.collection('users').deleteOne({ email });
    }
};

module.exports = User;
