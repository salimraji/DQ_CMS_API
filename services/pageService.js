const pageRepository = require('../repositories/pageRepository');
const fs = require("fs");
const path = require("path");
const { handleImageUpload } = require('./imageHandler');
const timestampService = require('./timestampService'); 

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

    await timestampService.updateTimestamp("Pages");

    return page;
  }

  async deletePage(id, req) {
    const page = await pageRepository.deletePage(id);
    if (!page) {
      throw new Error('Page not found');
    }

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

  async addDetail(pageId, detail, req) {
    const page = await pageRepository.getPageById(pageId);
    if (!page) {
        throw new Error('Page not found');
    }

    const pageImageChild = detail.Children.find(
        (child) => child.Key === 'PageImage' && child.Value.startsWith('data:image/')
    );

    if (pageImageChild) {
        const type = 'pages'
        const detailValue = detail.Value || `${Date.now()}`; 
        const tag = page.Tag; 
        const imageUrl = await handleImageUpload(pageImageChild.Value, tag, detailValue, req, type);
        pageImageChild.Value = imageUrl;
    }

    page.Details.push(detail);

    await pageRepository.save(page);

    await timestampService.updateTimestamp('Pages');

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

    await timestampService.updateTimestamp("Pages");

    return page.Details;
  }



  async updateDetail(pageId, value, updates, req) {
    const page = await pageRepository.findPageById(pageId);
    if (!page) {
        throw new Error('Page not found');
    }

    const detail = page.Details.find(detail => detail.Value === value);
    if (!detail) {
        throw new Error('Detail not found');
    }

    if (updates.Value !== undefined && updates.Value !== detail.Value) {
        detail.Value = updates.Value;
    }

    // Iterate over children to potentially update each one
    for (const child of detail.Children) {
        if (updates[child.Key] !== undefined) {
            if (child.Key === 'PageImage' && updates[child.Key].startsWith('data:image/')) {
                const type = 'pages';
                const detailValue = detail.Value || `${Date.now()}`;
                const tag = page.Tag;

                const imageUrl = await handleImageUpload(updates[child.Key], tag, detailValue, req, type);
                child.Value = imageUrl;  
            } else {
                child.Value = updates[child.Key];
            }
        }
    }

    page.markModified('Details');
    try {
        await page.save();
        console.log('Page successfully saved to the database with updated URL');
    } catch (error) {
        console.error('Error saving page:', error);
    }

    return page;
}






}

module.exports = new PageService();
