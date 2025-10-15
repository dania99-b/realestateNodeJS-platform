const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
class ListingRepository {
    async getAll() {
        return prisma.listing.findMany({
         
        });
      }
    
      async getById(id) {
        return prisma.listing.findUnique({
          where: { id: Number(id) },
          include: { agent: true },
        });
      }
    
      async create(data) {
        // تحويل اسم المدينة إلى lowercase قبل الحفظ
        if (data.city) data.city = data.city.toLowerCase();
    
        return prisma.listing.create({ data });
      }
    
      async update(id, data) {
        if (data.city) data.city = data.city.toLowerCase();
    
        return prisma.listing.update({
          where: { id: Number(id) },
          data,
        });
      }
    
      async delete(id) {
        return prisma.listing.delete({
          where: { id: Number(id) },
        });
      }
    }

module.exports = new ListingRepository();