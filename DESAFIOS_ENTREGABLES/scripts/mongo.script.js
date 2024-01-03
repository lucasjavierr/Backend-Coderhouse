import mongoose from 'mongoose'
import { config } from '../src/config/config.js'
import { productsModel } from '../src/dao/models/products.model.js'

await mongoose.connect( config.mongo.url )

const updateProducts = async () => {
  try {
    const adminId = '658db5a5954185979a63514e'
    await productsModel.updateMany( {}, { $set: { owner: adminId } } )
  } catch ( error ) {
    console.log( error.message )
  }
}
updateProducts()