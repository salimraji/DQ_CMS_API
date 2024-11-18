const pageRepository = require('../repositories/pageRepository');
const fs = require("fs");
const path = require("path");
const handleImageUpload = require('./imageHandler');

class PageService {

  //Create a page
  async createPage(data) {
    return pageRepository.createPage(data);
  }


  //Get a page by its id
  async getPageById(id) {
    const page = await pageRepository.getPageById(id);
    if (!page) {
      throw new Error('Page not found');
    }
    return page;
  }


  //Update a page
  async updatePage(id, data) {
    const page = await pageRepository.updatePage(id, data);
    if (!page) {
      throw new Error('Page not found');
    }
    return page;
  }


  //Delete a page
  async deletePage(id) {
    const page = await pageRepository.deletePage(id);
    if (!page) {
      throw new Error('Page not found');
    }
    return page;
  }


//Get all the pages
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


  //Delete a content in a page
  async deleteContentItem(pageId, contentId) {
    const updatedPage = await pageRepository.deleteContentItem(pageId, contentId);
    if (!updatedPage) {
      throw new Error('Page or content item not found');
    }
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
      return page;
  }
  
  
}

module.exports = new PageService();
