import mongoose, { Schema, model, models } from 'mongoose';

const accountSchema = new mongoose.Schema({
    email: String,
    password: String,
  });

const Account = models.Account || model('Account', accountSchema);

export default Account;
