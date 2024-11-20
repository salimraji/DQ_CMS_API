const newsRepository = require('../repositories/newsRepository');
const handleImageUpload = require('./imageHandler');
const timestampService = require('./timestampService');

class NewsService {
    // Create news
    async createNews(data, req) {
        if (data.image) {
            data.image = await handleImageUpload(data, req);
        }
        const news = await newsRepository.createNews(data);
        await timestampService.logOperation({
            collectionName: 'news',
            operation: 'create',
            documentId: news._id,
            performedBy: req.user?.email, 
            details: { title: news.title, content: news.content }, 
        });
        return news;
    }

    // Get all the news
    async getNews() {
        return newsRepository.getNews();
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
        const updatedNews = await newsRepository.updateNews(id, data);
        if (!updatedNews) {
            throw new Error('News not found');
        }
        await timestampService.logOperation({
            collectionName: 'news',
            operation: 'update',
            documentId: id,
            performedBy: req.user?.email,
            details: { updatedFields: Object.keys(data) },
        });
        return updatedNews;
    }

    // Delete a certain news
    async deleteNews(id, req) {
        const deletedNews = await newsRepository.deleteNews(id);
        if (!deletedNews) {
            throw new Error('News not found');
        }
        await timestampService.logOperation({
            collectionName: 'news',
            operation: 'delete',
            documentId: id,
            performedBy: req.user?.email,
        });
        return deletedNews;
    }
}

module.exports = new NewsService();
