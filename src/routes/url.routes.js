const express = require('express');
const router = express.Router();
const urlController = require('../controllers/url.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Url:
 *       type: object
 *       required:
 *         - original_url
 *       properties:
 *         original_url:
 *           type: string
 *           description: The original URL to shorten
 *         short_url:
 *           type: integer
 *           description: The generated short URL identifier
 *       example:
 *         original_url: https://www.google.com
 *         short_url: 1
 */

/**
 * @swagger
 * /api/shorturl:
 *   post:
 *     summary: Create a short URL
 *     tags: [URLs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL to shorten
 *     responses:
 *       200:
 *         description: The shortened URL
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Url'
 *       400:
 *         description: Invalid URL provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/shorturl', urlController.createShortUrl);

/**
 * @swagger
 * /api/shorturl/{shorturl}:
 *   get:
 *     summary: Redirect to original URL
 *     tags: [URLs]
 *     parameters:
 *       - in: path
 *         name: shorturl
 *         schema:
 *           type: integer
 *         required: true
 *         description: The short URL identifier
 *     responses:
 *       302:
 *         description: Redirects to the original URL
 *       404:
 *         description: Short URL not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/shorturl/:shorturl', urlController.redirectToOriginalUrl);

module.exports = router;
