import mongoose from 'mongoose';

const productsCollection = 'products';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['notebook', 'processor', 'graphic-card', 'storage', 'ram-memory', 'motherboard', 'power-supply', 'cooling', 'case'],
    index: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  stock: {
    type: Number,
    required: true
  },

  thumbnail: String,

  status: {
    type: Boolean,
    default: true,
    required: true
  }
});

export const productsModel = mongoose.model(productsCollection, productSchema);
