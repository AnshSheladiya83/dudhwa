/**
 * Products Service ( ProductsService.js )
 */

  const Products = require("../models/Products");
const { aggregate } = require("../utils/aggregateHelpers/aggregationHelper");
const { createPaginationStages } = require("../utils/aggregateHelpers/limitStageHelper");
const { createMatchRegexStage, createMatchStage } = require("../utils/aggregateHelpers/matchStageHelper");
const { createSortStage } = require("../utils/aggregateHelpers/sortStageHelper");
const {
  createLookupStage,
} = require("../utils/aggregateHelpers/lookupStageHelper");
const {
  createUnwindStage,
} = require("../utils/aggregateHelpers/unwindStageHelper");
const { default: mongoose } = require("mongoose");
const MSG = require("../utils/MSG");

class ProductsService {
  async create(data, userId) {
    const products = new Products({
      ...data,
      created_at: new Date(),
      created_by: userId,
      updated_at: null,
      updated_by: null,
      is_deleted: false,
      deleted_at: null,
      deleted_by: null,
    });
    return await products.save();
  }

  async getAll({ search, pageNumber, pageSize, sortField, sortDirection }) {
    let pipeline = [];

    // Search filter
    if (search) {
      pipeline.push(createMatchRegexStage("", search));
    }
    pipeline.push(createMatchStage("is_deleted", false));

    
    pipeline.push(
      createLookupStage("users", "owner", "_id", "owner_data")
    );
    pipeline.push(createUnwindStage("$owner_data"));
      

    const productsCounts = (await aggregate("products", pipeline)).length;

    // Sorting
    if (sortField) {
      sortDirection = sortDirection && sortDirection.toLowerCase() === "asc" ? 1 : -1;
      pipeline.push(createSortStage(sortField, sortDirection));
    } else {
      pipeline.push(createSortStage("created_at", -1));
    }

    // Pagination
    pageNumber = Number(pageNumber) || 1;
    pageSize = Number(pageSize) || 8;
    pipeline.push(...createPaginationStages(pageNumber, pageSize));

    const products = await aggregate("products", pipeline);

    return { products, productsCounts };
  }

  async getById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(MSG.INVALID_OBJECTID);
    }

    const objectId = new mongoose.Types.ObjectId(id);
    const pipeline = [createMatchStage("_id", objectId)];
        pipeline.push(createMatchStage("is_deleted", false));

    
    pipeline.push(
      createLookupStage("users", "owner", "_id", "owner_data")
    );
    pipeline.push(createUnwindStage("$owner_data"));
      
    const products = await aggregate("products", pipeline);
    return products[0] || null;
  }

  async updateById(id, data, userId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(MSG.INVALID_OBJECTID);
    }

    return await Products.findByIdAndUpdate(
      id,
      {
        ...data,
        updated_at: new Date(),
        updated_by: userId,
      },
      { new: true, runValidators: true }
    );
  }

  async deleteById(id, userId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(MSG.INVALID_OBJECTID);
    }

    const products = await Products.findById(id);
    if (!products || products.is_deleted) {
      return null;
    }
    products.is_deleted = true;
    products.deleted_at = new Date();
    products.deleted_by = userId;
    return await products.save();
  }

  async getSuggestions(search) {
    let pipeline = [];
    pipeline.push(createMatchRegexStage("name", search.trim()));
    pipeline.push(createMatchStage("is_deleted", false));

    const suggestions = await aggregate("products", pipeline);

    return suggestions.map((item) => ({
      text: item.name,
      id: item._id,
    }));
  }
}

module.exports = new ProductsService();