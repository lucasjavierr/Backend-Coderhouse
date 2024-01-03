import mongoose from 'mongoose'

const usersCollection = 'users'

const userSchema = new mongoose.Schema( {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: Number,
  gender: { type: String, enum: [ 'masculino', 'femenino', null ], index: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
  role: { type: String, required: true, enum: [ 'USER', 'ADMIN', 'PREMIUM' ], default: 'USER' }
} )

export const usersModel = mongoose.model( usersCollection, userSchema )
