const listingRepo = require('../../repositories/ListingRepository');

class ListingController {
  async getAll(req, reply) {
    try {
      const listings = await listingRepo.getAll();

      // تعديل شكل المدينة (capitalize أول حرف)
      const formatted = listings.map(listing => ({
        ...listing,
        city: listing.city.charAt(0).toUpperCase() + listing.city.slice(1),
        price: listing.price.toFixed(2)
      }));

      reply.status(201).send(formatted);
    } catch (err) {
        reply.status(500).send({ error: true, message: err.message });
    }
  }

  async getById(req, reply) {
    try {
      const listing = await listingRepo.getById(req.params.id);
      if (!listing) {
        return res.status(404).json({ error: true, message: "Listing not found" });
      }

      listing.city = listing.city.charAt(0).toUpperCase() + listing.city.slice(1);
      listing.price = listing.price.toFixed(2);

      reply.status(201).send(listing);
    } catch (err) {
        reply.status(500).send({ error: true, message: err.message });
    }
  }

  async create(req, reply) {
    try {
      const newListing = await listingRepo.create(req.body);
      reply.status(201).send(newListing);
    } catch (err) {
        reply.status(500).send({ error: true, message: err.message });
    }
  }

  async update(req, reply) {
    try {
      const updated = await listingRepo.update(req.query.id, req.body);
      reply.status(201).send(updated);
    } catch (err) {
        reply.status(500).send({ error: true, message: err.message });
    }
  }

  async delete(req, reply) {
    try {
      await listingRepo.delete(req.query.id);
      reply.status(201).send({ message: "Listing deleted successfully" });
    } catch (err) {
        reply.status(500).send({ error: true, message: err.message });
    }
  }
}

module.exports = new ListingController();
