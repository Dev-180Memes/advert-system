import mongoose from mongoose;

export async function connectToDatabase() {
   if (mongoose.connections[0].readyState) {
        return;
    }

    const mongoUri = process.env.MONGO_URI as string || 'mongodb://localhost:27017/greg-schools';

    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDb connected successfully');
    } catch (error) {
        console.error("Error connecting to MongoDb", error);
        throw new Error("Error connecting to MongoDb");
    }
}
