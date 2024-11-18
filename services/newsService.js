const newsRepository = require('../repositories/newsRepository');
const handleImageUpload = require('./imageHandler');

class NewsService {

    //Create news
    async createNews(data, req) {
        if (data.image) {
            data.image = await handleImageUpload(data, req);
        }
        
        return newsRepository.createNews(data);
    }
    //Get all the news
    async getNews() {
        return newsRepository.getNews();
    }

    //Get news by id
    async getNewsById(id) {
        return newsRepository.getNewsById(id);
    }

    //Update a certain news
    async updateNews(id, data) {
        return newsRepository.updateNews(id, data);
    }

    //Delete a certain news
    async deleteNews(id) {
        return newsRepository.deleteNews(id);
    }
}

module.exports = new NewsService();
