const Url = require('../models/url.model');
const { isValidUrl, validateDomain } = require('../utils/url.validator');

class UrlService {
  async createShortUrl(originalUrl) {
    if (!isValidUrl(originalUrl)) {
      throw new Error('Invalid URL format');
    }

    const urlObject = new URL(originalUrl);
    const isValidDomain = await validateDomain(urlObject.hostname);
    
    if (!isValidDomain) {
      throw new Error('Invalid domain');
    }

    const existingUrl = await Url.findOne({ original_url: originalUrl });
    if (existingUrl) {
      return existingUrl;
    }

    const lastUrl = await Url.findOne().sort({ short_url: -1 });
    const newShortUrl = lastUrl ? lastUrl.short_url + 1 : 1;

    const newUrl = new Url({
      original_url: originalUrl,
      short_url: newShortUrl
    });

    await newUrl.save();
    return newUrl;
  }

  async getOriginalUrl(shortUrl) {
    const url = await Url.findOne({ short_url: parseInt(shortUrl) });
    if (!url) {
      throw new Error('No short URL found for the given input');
    }

    // Incrementar el contador de clicks
    url.clicks += 1;
    await url.save();

    return url.original_url;
  }
}

module.exports = new UrlService();
