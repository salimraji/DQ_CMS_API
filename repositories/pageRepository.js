const Page = require('../models/pageModel');

class PageRepository {
  async createPage(data) {
    return new Page(data).save();
  }

  async getPageById(id) {
    return Page.findById(id);
  }

  async updatePage(id, data) {
    return Page.findByIdAndUpdate(id, data, { new: true });
  }

  async deletePage(id) {
    return Page.findByIdAndDelete(id);
  }

  async getAllPages() {
    return Page.find();
  }

  async getPageByType(pageType) {
    return Page.findOne({ page_type: pageType });
  }

  async deleteContentItem(pageId, contentId) {
    return Page.findByIdAndUpdate(
      pageId,
      { $pull: { content: { _id: contentId } } },
      { new: true }
    );
  }

  async addContentToPage(pageId, contentData) {
    return Page.findByIdAndUpdate(
      pageId,
      { $push: { content: contentData } },
      { new: true }
    );
  }

  async editContentInPage(pageId, contentId, contentData) {
    return Page.findOneAndUpdate(
      { _id: pageId, "content._id": contentId },
      { $set: { "content.$": contentData } },
      { new: true }
    );
  }


  async getPages(skip, limit, search){
    const searchQuery = search
        ? { "Details.Value": { $regex: search, $options: "i" } } // Case-insensitive search
        : {};

    return await Page.find(searchQuery)
        .skip(skip)
        .limit(limit);
};

async getPageCount (search) {
    const searchQuery = search
        ? { "Details.Value": { $regex: search, $options: "i" } } // Case-insensitive search
        : {};

    return await Page.countDocuments(searchQuery);
};
}

module.exports = new PageRepository();
