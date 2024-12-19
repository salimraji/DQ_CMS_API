const News = require('../models/newsModel');

class NewsRepository {
    async createNews(data) {
        return new News(data).save();
    }

    async getNews() {
        return News.find();
    }

    async findNews(query = {}, limit = 10, skip = 0){
        return News.find(query).limit(limit).skip(skip)
    }

    async countNews(query = {}){
        return News.countDocuments(query)
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
