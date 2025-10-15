const agentRepo = require('../../repositories/AgentRepository');

class AgentController {
  async getAll(req, res) {
    try {
      const agents = await agentRepo.getAll();
      res.json(agents);
    } catch (err) {
      res.status(500).json({ error: true, message: err.message });
    }
  }

  async getById(req, res) {
    try {
      const agent = await agentRepo.getById(req.params.id);
      if (!agent) {
        return res.status(404).json({ error: true, message: "Agent not found" });
      }
      res.json(agent);
    } catch (err) {
      res.status(500).json({ error: true, message: err.message });
    }
  }

  async create(req, reply) {
    try {
      const newAgent = await agentRepo.create(req.body);
      reply.status(201).send(newAgent);
    } catch (err) {
        throw err;
    }
  }

  async update(req, res) {
    try {
      const updated = await agentRepo.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: true, message: err.message });
    }
  }

  async delete(req, res) {
    try {
      await agentRepo.delete(req.params.id);
      res.json({ message: "Agent deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: true, message: err.message });
    }
  }
}

module.exports = new AgentController();
