const urlService = require('../services/url.service');

const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    const result = await urlService.createShortUrl(url);
    res.json({
      original_url: result.original_url,
      short_url: result.short_url
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const redirectToOriginalUrl = async (req, res) => {
  try {
    const { shorturl } = req.params;
    const originalUrl = await urlService.getOriginalUrl(shorturl);
    res.redirect(originalUrl);
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  createShortUrl,
  redirectToOriginalUrl
};
