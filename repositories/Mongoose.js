// repositories/Mongoose.js
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://dania1999ta_db_user:d5bXavRzF1apVkeU@cluster0.peldluv.mongodb.net/realEstate?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
  useUnifiedTopology: true

  }
)
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

const agentSchema = new mongoose.Schema({
  mysqlId: Number, // أضف هذا
  name: { type: String, required: true },
  active: { type: Number , default: 1 }
});

//  Listing Schema
const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  price: { type: Number, required: true },
  views: { type: Number, default: 0 }
});

//  Models
const Agent = mongoose.model('Agent', agentSchema);
const Listing = mongoose.model('Listing', listingSchema);

module.exports = { Agent, Listing };
