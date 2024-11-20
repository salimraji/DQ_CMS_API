const pageRepository = require('../repositories/pageRepository');
const fs = require("fs");
const path = require("path");
const handleImageUpload = require('./imageHandler');
const timestampService = require('./timestampService');

class PageService {

  // Create a page
  async createPage(data, req) {
    const page = await pageRepository.createPage(data);
    await timestampService.logOperation({
      collectionName: 'pages',
      operation: 'create',
      documentId: page._id,
      performedBy: req.user?.email, 
      details: { title: page.title }, 
    });
    return page;
  }

  // Get a page by its id
  async getPageById(id) {
    const page = await pageRepository.getPageById(id);
    if (!page) {
      throw new Error('Page not found');
    }
    return page;
  }

  // Update a page
  async updatePage(id, data, req) {
    const page = await pageRepository.updatePage(id, data);
    if (!page) {
      throw new Error('Page not found');
    }
    await timestampService.logOperation({
      collectionName: 'pages',
      operation: 'update',
      documentId: id,
      performedBy: req.user?.email,
      details: { updatedFields: Object.keys(data) },
    });
    return page;
  }

  // Delete a page
  async deletePage(id, req) {
    const page = await pageRepository.deletePage(id);
    if (!page) {
      throw new Error('Page not found');
    }
    await timestampService.logOperation({
      collectionName: 'pages',
      operation: 'delete',
      documentId: id,
      performedBy: req.user?.email,
    });
    return page;
  }

  // Get all the pages
  async getAllPages() {
    return pageRepository.getAllPages();
  }

  // Get a page by its type
  async getPageByType(pageType) {
    const page = await pageRepository.getPageByType(pageType);
    if (!page) {
      throw new Error('Page not found');
    }
    return page;
  }

  // Delete a content in a page
  async deleteContentItem(pageId, contentId, req) {
    const updatedPage = await pageRepository.deleteContentItem(pageId, contentId);
    if (!updatedPage) {
      throw new Error('Page or content item not found');
    }
    await timestampService.logOperation({
      collectionName: 'pages',
      operation: 'delete_content',
      documentId: pageId,
      performedBy: req.user?._id,
      details: { contentId },
    });
    return updatedPage;
  }

  // Add content to a page
  async addContentToPage(pageId, contentData, req) {
    if (contentData.image) {
      contentData.image = await handleImageUpload(contentData, req);
    }
    const page = await pageRepository.addContentToPage(pageId, contentData);
    if (!page) {
      throw new Error("Page not found");
    }
    await timestampService.logOperation({
      collectionName: 'pages',
      operation: 'add_content',
      documentId: pageId,
      performedBy: req.user?._id,
      details: { contentData },
    });
    return page;
  }

  // Edit content in a page
  async editContentInPage(pageId, contentId, contentData, req) {
    const existingContent = await pageRepository.getContentById(pageId, contentId);
    if (!existingContent) {
      throw new Error("Page or content not found");
    }
    contentData.image = await handleImageUpload(contentData, req, existingContent.image);

    const page = await pageRepository.editContentInPage(pageId, contentId, contentData);
    if (!page) {
      throw new Error("Page or content not found");
    }
    await timestampService.logOperation({
      collectionName: 'pages',
      operation: 'edit_content',
      documentId: pageId,
      performedBy: req.user?._id,
      details: { contentId, updatedFields: contentData },
    });
    return page;
  }

  // Get paginated pages
  async getPaginatedPages(page, limit, search) {
    const skip = (page - 1) * limit;
    const [pages, total] = await Promise.all([
      pageRepository.getPages(skip, limit, search),
      pageRepository.getPageCount(search),
    ]);

    return {
      pages,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async addDetail(pageId, detail) {
    const page = await pageRepository.getPageById(pageId);
    if (!page) {
      throw new Error('Page not found');
    }

    page.Details.push(detail);
    return await pageRepository.save(page);
  }
}

module.exports = new PageService();
