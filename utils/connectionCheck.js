import mongoose from "mongoose";

const connection = {};

const connectMongo = async () => mongoose.connect(process.env.MONGODB_URI);

const connectionCheck = async () => {
  if (connection.isConnected) return;

  const db = await connectMongo();

  connection.isConnected = db.connections[0]._readyState;
};

export default connectionCheck;
