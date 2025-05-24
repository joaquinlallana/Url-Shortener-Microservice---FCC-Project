require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dns = require("dns");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { url } = require("inspector");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//MongoDB Schema
const urlSchema = new mongoose.Schema({
  original_url: String,
  short_url: Number,
});

const Url = mongoose.model("Url", urlSchema);

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));

// ---
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", async (req, res) => {
  const userUrl = req.body.url;
  let hostname;

  try {
    const urlObject = new URL(userUrl);
    if (urlObject.protocol !== "http:" && urlObject.protocol !== "https:") {
      return res.json({ error: "invalid url" });
    }
    hostname = urlObject.hostname;
  } catch (error) {
    return res.json({ error: "invalid url" });
  }

  dns.lookup(hostname, async (err, address, family) => {
    if (err) {
      return res.json({ error: "invalid url" });
    }

    const found = await Url.findOne({ original_url: userUrl });
    if (found) {
      return res.json({
        original_url: found.original_url,
        short_url: found.short_url,
      });
    } else {
      const shortUrl = await Url.findOne().sort({ short_url: -1 });
      const newShortUrl = shortUrl ? shortUrl.short_url + 1 : 1;

      const newUrl = new Url({
        original_url: userUrl,
        short_url: newShortUrl,
      });

      await newUrl.save();

      res.json({
        original_url: newUrl.original_url,
        short_url: newUrl.short_url,
      });
    }
  });
});

app.get("/api/shorturl/:shorturl", async (req, res) => {
  const shortUrlParam = parseInt(req.params.shorturl);

  const found = await Url.findOne({ short_url: shortUrlParam });

  if (found) {
    res.redirect(found.original_url);
  } else {
    res.json({ error: "No short URL found for the given input" });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
