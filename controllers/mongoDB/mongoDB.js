const { Agent } = require('../../repositories/Mongoose');

class StatsController {
  async getActiveAgents(req, reply) {
    try {
      const activeAgents = await Agent.aggregate([
        // 1️⃣ فقط الـ Agents النشطين
        { $match: { active: { $in: [1, true] } } },

        // 2️⃣ ربط كل Agent بالـ Listings
        {
          $lookup: {
            from: "listings",        // اسم collection المرتبط
            localField: "_id",       // Agent _id
            foreignField: "agentId", // Listing.agentId (ObjectId)
            as: "listings"
          }
        },

        // 3️⃣ إنشاء حقول جديدة لحساب totalListings و totalViews فقط للـ listings سعرها > 300000
        {
          $addFields: {
            filteredListings: {
              $filter: {
                input: "$listings",
                as: "l",
                cond: { $gt: ["$$l.price", 1] } 
              }
            }
          }
        },

        // 4️⃣ حساب العدد والمجموع
        {
          $addFields: {
            totalListings: { $size: "$filteredListings" },
            totalViews: {
              $sum: {
                $map: {
                  input: "$filteredListings",
                  as: "l",
                  in: { $ifNull: ["$$l.views", 0] }
                }
              }
            }
          }
        },

        // 5️⃣ إظهار الحقول المطلوبة فقط
        {
          $project: {
            _id: 0,
            agent: "$name",
            listings: "$totalListings",
            totalViews: 1
          }
        },

        // 6️⃣ ترتيب حسب totalViews تنازلي
        { $sort: { totalViews: -1 } }
      ]);

      reply.status(201).send(activeAgents);
    } catch (err) {
      reply.status(500).send({
        error: true,
        message: err.message || "Something went wrong"
      });
    }
  }
}

module.exports = new StatsController();
