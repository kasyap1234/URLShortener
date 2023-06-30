const shortid = require("shortid");
const ValidUrl = require("valid-url");
const router = require('express').Router();

router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  if (ValidUrl.isUri(originalUrl)) {
    try {
      let url = await Url.findOne({ originalUrl });

      if (url) {
        res.json(url);
      } else {
        const shortCode = shortid.generate();
        const shortUrl = `${req.headers.host}/${shortCode}`;
        url = new Url({
          originalUrl,
          shortUrl
        });
        await url.save();
        res.json(url);
      }
    } catch (error) {
      console.error("Error saving URL: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    console.error("Please enter a valid URL");
    res.status(400).json({ error: "Invalid URL" });
  }
});

module.exports = router;
