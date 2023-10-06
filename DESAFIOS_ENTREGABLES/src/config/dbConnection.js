import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://lucasjavier:ClusterCoderñ@clustercoder.mj6fwlw.mongodb.net/ecommerceDB?retryWrites=true&w=majority');
    console.log('Base de datos conectada correctamente');
  } catch (error) {
    console.log(`Hubo un error al conectarse a la base de datos: ${error}`);
  }
};
