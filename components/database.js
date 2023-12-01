import mongoose from 'mongoose';
const dbUri = process.env.DBURI

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  transmission: { type: String, required: true },
  engine: { type: String, required: true },
  fuelType: { type: String, required: true },
  price: { type: Number, required: true },
});

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Car = mongoose.model('Car', carSchema);
const Brand = mongoose.model('Brand', brandSchema);

dbConnect()

async function dbConnect() {
  await mongoose.connect(dbUri);
}

export {Car, Brand}