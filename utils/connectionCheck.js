import mongoose from "mongoose";

const connection = {};

const connectMongo = async () => mongoose.connect(process.env.MONGODB_URI);

const connectionCheck = async () => {
  if (connection.isConnected) {
    console.log("Already connected");
    return;
  }

  console.log("Connecting to Mongo");
  const db = await connectMongo();

  connection.isConnected = db.connections[0]._readyState;
};

export default connectionCheck;
