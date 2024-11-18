const News = require('../models/newsModel');

class NewsRepository {
    async createNews(data) {
        return new News(data).save();
    }

    async getNews() {
        return News.find();
    }

    async getNewsById(id) {
        return News.findById(id);
    }

    async updateNews(id, data) {
        return News.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteNews(id) {
        return News.findByIdAndDelete(id);
    }
}

module.exports = new NewsRepository();
