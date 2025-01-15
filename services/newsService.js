const newsRepository = require('../repositories/newsRepository');
const { handleImageUpload } = require('./imageHandler.js');
const timestampService = require('./timestampService');

class NewsService {
    // Create news
    async createNews(data, req) {
        if (data.image) {
            data.image = await handleImageUpload(data.image, "images" , data.title , req, "news");
        }
        const news = await newsRepository.createNews(data);

        await timestampService.updateTimestamp("News");

        return news;
    }

    // Get all the news
    async getNews({page = 1, limit = 10, search = ""}) {
        const skip = (page - 1) * limit;
        const query = search
        ? { $or: [{ title: { $regex: search, $options: 'i'}}]}
        : {}

        const news = await newsRepository.findNews(query, limit, skip)
        const total = await newsRepository.countNews(query)
        
        return { news, total }
    }

    // Get news by id
    async getNewsById(id) {
        const news = await newsRepository.getNewsById(id);
        if (!news) {
            throw new Error('News not found');
        }
        return news;
    }

    // Update a certain news
    async updateNews(id, data, req) {
        if (data.image && typeof data.image === 'string' && data.image.startsWith("data:image")) {
            data.image = await handleImageUpload(data.image, "images", data.title, req, "news");
        }
        const updatedNews = await newsRepository.updateNews(id, data);
        if (!updatedNews) {
            throw new Error('News not found');
        }
    
        await timestampService.updateTimestamp("News");
    
        return updatedNews;
    }
    // Delete a certain news
    async deleteNews(id, req) {
        const deletedNews = await newsRepository.deleteNews(id);
        if (!deletedNews) {
            throw new Error('News not found');
        }

        // Update timestamp for News collection
        await timestampService.updateTimestamp("News");

        return deletedNews;
    }
}

module.exports = new NewsService();
