const pageService = require('../services/pageService');

class PageController {
  // Create a new page
  async createPage(req, res) {
    try {
      const page = await pageService.createPage(req.body, req);
      res.status(201).json(page);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get a page by ID
  async getPageById(req, res) {
    try {
      const page = await pageService.getPageById(req.params.id);
      res.json(page);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Update a page by ID
  async updatePage(req, res) {
    try {
      const page = await pageService.updatePage(req.params.id, req.body, req);
      res.json(page);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Delete a page by ID
  async deletePage(req, res) {
    try {
      const page = await pageService.deletePage(req.params.id, req);
      res.json({ message: 'Page deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Get all pages
  async getAllPages(req, res) {
    try {
      const pages = await pageService.getAllPages();
      res.json(pages);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  //Get page by type

  async getPageByType(req, res) {
    try {
      const pageType = req.params.type;
      const page = await pageService.getPageByType(pageType);
      res.json(page);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Delete a content

  async deleteContentItem(req, res) {
    try {
      const { pageId, contentId } = req.params;
      const updatedPage = await pageService.deleteContentItem(pageId, contentId);
      res.json(updatedPage);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async addContentToPage(req, res) {
    try {
      const pageId = req.params.pageId;
      const contentData = req.body;
      const updatedPage = await pageService.addContentToPage(pageId, contentData);
      res.status(200).json(updatedPage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Edit specific content within a page
  async editContentInPage(req, res) {
    try {
      const pageId = req.params.pageId;
      const contentId = req.params.contentId;
      const contentData = req.body;
      const updatedPage = await pageService.editContentInPage(pageId, contentId, contentData);
      res.status(200).json(updatedPage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPages(req, res){
    try {
        const { page = 1, limit = 10, search = "" } = req.query;
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const result = await pageService.getPaginatedPages(pageNumber, limitNumber, search);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getPages controller:", error);
        res.status(500).json({ error: "An error occurred while fetching pages" });
    }
  };

  async addDetail(req, res) {
    const { pageId } = req.params;
    const { name, mobile, contact, address, longitude, latitude, order } = req.body;

    if (!name || !mobile || !contact || !address || !longitude || !latitude || !order) {
      return res.status(400).send({ error: 'All fields are required.' });
    }

    const newDetail = {
      Key: "Name",
      Value: name,
      Type: 0,
      ContentDetailsID: 0,
      LanguageCode: "en",
      Children: [
        { Key: "Mobile", Value: mobile, Type: 0, ContentDetailsID: 0, LanguageCode: "en", Children: [], Order: 0 },
        { Key: "Contact", Value: contact, Type: 0, ContentDetailsID: 0, LanguageCode: "en", Children: [], Order: 0 },
        { Key: "Address", Value: address, Type: 0, ContentDetailsID: 0, LanguageCode: "en", Children: [], Order: 0 },
        { Key: "Longitude", Value: longitude, Type: 0, ContentDetailsID: 0, LanguageCode: "en", Children: [], Order: 0 },
        { Key: "Latitude", Value: latitude, Type: 0, ContentDetailsID: 0, LanguageCode: "en", Children: [], Order: 0 },
        { Key: "Order", Value: order.toString(), Type: 0, ContentDetailsID: 0, LanguageCode: "en", Children: [], Order: 0 }
      ],
      Order: parseInt(order)
    };

    try {
      const updatedPage = await pageService.addDetail(pageId, newDetail);
      res.status(201).send({ message: 'Detail added successfully.', page: updatedPage });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

}

module.exports = new PageController();
