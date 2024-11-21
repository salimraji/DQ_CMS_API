const pageRepository = require('../repositories/pageRepository');
const fs = require("fs");
const path = require("path");
const handleImageUpload = require('./imageHandler');
const timestampService = require('../services/timestampService'); // Import the timestamp service

class PageService {

  // Create a page
  async createPage(data, req) {
    const page = await pageRepository.createPage(data);

    // Update timestamp for Pages collection
    await timestampService.updateTimestamp("Pages");

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

    // Update timestamp for Pages collection
    await timestampService.updateTimestamp("Pages");

    return page;
  }

  async deletePage(id, req) {
    const page = await pageRepository.deletePage(id);
    if (!page) {
      throw new Error('Page not found');
    }

    // Update timestamp for Pages collection
    await timestampService.updateTimestamp("Pages");

    return page;
  }

  async getAllPages() {
    return pageRepository.getAllPages();
  }

  async getPageByType(pageType) {
    const page = await pageRepository.getPageByType(pageType);
    if (!page) {
      throw new Error('Page not found');
    }
    return page;
  }

  async deleteContentItem(pageId, contentId, req) {
    const updatedPage = await pageRepository.deleteContentItem(pageId, contentId);
    if (!updatedPage) {
      throw new Error('Page or content item not found');
    }

    // Update timestamp for Pages collection
    await timestampService.updateTimestamp("Pages");

    return updatedPage;
  }

  async addContentToPage(pageId, contentData, req) {
    if (contentData.image) {
      contentData.image = await handleImageUpload(contentData, req);
    }
    const page = await pageRepository.addContentToPage(pageId, contentData);
    if (!page) {
      throw new Error("Page not found");
    }

    // Update timestamp for Pages collection
    await timestampService.updateTimestamp("Pages");

    return page;
  }

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

    // Update timestamp for Pages collection
    await timestampService.updateTimestamp("Pages");

    return page;
  }

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
    await pageRepository.save(page);

    // Update timestamp for Pages collection
    await timestampService.updateTimestamp("Pages");

    return page;
  }

  async deleteDetailByValue(pageId, value) {
    const page = await pageRepository.findPageById(pageId);
    if (!page) {
      return null;
    }

    const detailIndex = page.Details.findIndex(detail => detail.Value === value);
    if (detailIndex === -1) {
      return null;
    }

    page.Details.splice(detailIndex, 1);
    await pageRepository.save(page);

    // Update timestamp for Pages collection
    await timestampService.updateTimestamp("Pages");

    return page.Details;
  }

  async updateDetail(pageId, value, updates) {
    const page = await pageRepository.findPageById(pageId);
    if (!page) {
      return null;
    }

    const detail = page.Details.find((detail) => detail.Value === value);
    if (!detail) {
      return null;
    }

    detail.Children = detail.Children.map((child) => {
      if (updates[child.Key] !== undefined) {
        return { ...child, Value: updates[child.Key] };
      }
      return child;
    });

    await pageRepository.save(page);

    // Update timestamp for Pages collection
    await timestampService.updateTimestamp("Pages");

    return page;
  }
}

module.exports = new PageService();
