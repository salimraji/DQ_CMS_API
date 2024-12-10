const newsRepository = require('../repositories/newsRepository');
const handleImageUpload = require('./imageHandler');
const timestampService = require('./timestampService'); // Import the timestamp service

class NewsService {
    // Create news
    async createNews(data, req) {
        if (data.image) {
            data.image = await handleImageUpload(data, req);
        }
        const news = await newsRepository.createNews(data);

        // Update timestamp for News collection
        await timestampService.updateTimestamp("News");

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

        // Update timestamp for News collection
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
