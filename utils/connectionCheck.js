import mongoose from "mongoose";

// const connection = {};
// console.log(connection);

const uri= process.env.MONGODB_URI;
const connectionCheck = async () => mongoose.connect(uri);

// const connectionCheck = async () => {
//   if (connection.isConnected) return;

//   const db = await mongoose.connect(process.env.MONGODB_URI);

//   connection.isConnected = db.connections[0]._readyState;
// };

export default connectionCheck;
