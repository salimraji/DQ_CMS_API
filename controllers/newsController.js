const newsService = require('../services/newsService');

class NewsController {
    async createNews(req, res) {
        try {
            const news = await newsService.createNews(req.body, req);
            res.status(201).json({ message: 'News created successfully', data: news });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getNews(req, res) {
        try {
            const {page, limit, search} = req.query
            const newsList = await newsService.getNews({page: Number(page), limit: Number(limit), search});
            res.status(200).json(newsList);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getNewsById(req, res) {
        try {
            const news = await newsService.getNewsById(req.params.id);
            if (news) {
                res.status(200).json(news);
            } else {
                res.status(404).json({ message: 'News not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateNews(req, res) {
        try {
            const updatedNews = await newsService.updateNews(req.params.id, req.body, req);
            if (updatedNews) {
                res.status(200).json({ message: 'News updated successfully', data: updatedNews });
            } else {
                res.status(404).json({ message: 'News not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteNews(req, res) {
        try {
            const deletedNews = await newsService.deleteNews(req.params.id, req);
            if (deletedNews) {
                res.status(200).json({ message: 'News deleted successfully' });
            } else {
                res.status(404).json({ message: 'News not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new NewsController();
