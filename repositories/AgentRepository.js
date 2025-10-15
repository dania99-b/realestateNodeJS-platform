const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AgentRepository {
  async getAll() {
    return prisma.agent.findMany({
      include: { listings: true }, // لو حابب ترجع الـ listings الخاصة بالـ agent
    });
  }

  async getById(id) {
    return prisma.agent.findUnique({
      where: { id: Number(id) }
    });
  }

  async create(data) {
    // تحقق إذا Agent موجود بالفعل
    const existing = await prisma.agent.findFirst({
      where: {
        OR:[

        {email: data.email },
        {phone:data.phone}
        ]
    }});
  
    if (existing) {
        throw new Error("Agent already exist"); // هذا سيتم تحويله تلقائياً بواسطة Error Handler
   
    }
  
    return prisma.agent.create({ data });
  }
  

  async update(id, data) {
    return prisma.agent.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id) {
    return prisma.agent.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new AgentRepository();
