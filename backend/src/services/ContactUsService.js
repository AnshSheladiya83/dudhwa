/**
 * ContactUs Service (ContactUsService.js)
 */

const ContactUs = require("../models/Contacts");
const { aggregate } = require("../utils/aggregateHelpers/aggregationHelper");
const { createPaginationStages } = require("../utils/aggregateHelpers/limitStageHelper");
const { createMatchRegexStage, createMatchStage } = require("../utils/aggregateHelpers/matchStageHelper");
const { createSortStage } = require("../utils/aggregateHelpers/sortStageHelper");
const { default: mongoose } = require("mongoose");
const MSG = require("../utils/MSG");

class ContactUsService {
  // ✅ Create Contact Message
  async createContactMessage(data) {
  const contact = new ContactUs({
    ...data,
    dateOfArrival: data.dateOfArrival ? new Date(data.dateOfArrival) : null, // Convert string to Date
    numberOfPersons: data.numberOfPersons ? Number(data.numberOfPersons) : null, // Ensure Number type
    created_at: new Date(),
    created_by: null, // Public form submission
    updated_at: null,
    updated_by: null,
    is_deleted: false,
    deleted_at: null,
    deleted_by: null,
  });
    return await contact.save();
  }

  // ✅ Get All Contact Messages (Admin)
  async getAllContacts({ search, pageNumber, pageSize, sortField, sortDirection }) {
    let pipeline = [];

    // Search filter (e.g., by name or email)
    if (search) {
      pipeline.push(
        createMatchRegexStage("firstName", search),
        createMatchRegexStage("lastName", search),
        createMatchRegexStage("email", search)
      );
    }

    // Only non-deleted messages
    pipeline.push(createMatchStage("is_deleted", false));

    const totalCount = (await aggregate("contactus", pipeline)).length;

    // Sorting
    if (sortField) {
      sortDirection = sortDirection?.toLowerCase() === "asc" ? 1 : -1;
      pipeline.push(createSortStage(sortField, sortDirection));
    } else {
      pipeline.push(createSortStage("created_at", -1));
    }

    // Pagination
    pageNumber = Number(pageNumber) || 1;
    pageSize = Number(pageSize) || 10;
    pipeline.push(...createPaginationStages(pageNumber, pageSize));

    const contacts = await aggregate("contactus", pipeline);
    return { contacts, totalCount };
  }

  // ✅ Get Single Contact by ID
  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(MSG.INVALID_OBJECTID);
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const pipeline = [
      createMatchStage("_id", objectId),
      createMatchStage("is_deleted", false)
    ];

    const contacts = await aggregate("contactus", pipeline);
    return contacts[0] || null;
  }
}

module.exports = new ContactUsService();
