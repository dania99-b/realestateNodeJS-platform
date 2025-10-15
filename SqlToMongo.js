// migrateToMongo.js
const mysql = require('mysql2/promise');
const mongoose = require('mongoose');

// 1️⃣ اتصال MongoDB
mongoose.connect(
  'mongodb+srv://dania1999ta_db_user:d5bXavRzF1apVkeU@cluster0.peldluv.mongodb.net/realEstate?retryWrites=true&w=majority&appName=Cluster0');

const agentSchema = new mongoose.Schema({
  mysqlId: Number,
  name: String,
  email:String,
  phone:String,
  active: Number
  
});
const listingSchema = new mongoose.Schema({
  mysqlId: Number,
  title: String,
  price: Number,
  views: Number,
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }
});

const Agent = mongoose.model('Agent', agentSchema);
const Listing = mongoose.model('Listing', listingSchema);

async function migrate() {
  // 2️⃣ اتصال MySQL
  const connection = await mysql.createConnection({
    host: 'localhost',     // عدّل حسب إعداداتك
    user: 'root',
    password: '',      // لا باسورد,
    database: 'realEstate'
  });

  // 3️⃣ جلب البيانات من MySQL
  const [agents] = await connection.execute('SELECT * FROM agent');
  const [listings] = await connection.execute('SELECT * FROM listing');

  // 4️⃣ مسح البيانات القديمة في MongoDB (اختياري)
  await Agent.deleteMany({});
  await Listing.deleteMany({});

  // 5️⃣ إدخال الـ agents في MongoDB
  const agentMap = {};
  for (let a of agents) {
    const agent = new Agent({
      mysqlId: a.id,
      name: a.name,
      phone: a.phone,
      email: a.email,
      active: a.active
    });
    await agent.save();
    agentMap[a.id] = agent._id; // حفظ الـ ObjectId للربط مع listings
  }

  // 6️⃣ إدخال الـ listings وربطها بالـ agents
  for (let l of listings) {
    const listing = new Listing({
      mysqlId: l.id,
      title: l.title,
      price: l.price,
      views: l.views,
      agentId: agentMap[l.agentId]
    });
    await listing.save();
  }

  console.log('✅ Migration complete!');
  process.exit(0);
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});
