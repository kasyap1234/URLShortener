const shortid = require("shortid");
const ValidUrl = require("valid-url");
const router = require('express').Router();

router.post('/shorten/new', async (req, res) => {
  const { originalUrl } = req.body;
  if (!ValidUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  
  try {
    let url = await Url.findOne({ originalUrl });
    if (url) {
      res.json(url);
    } else {
      const shortcode = shortid.generate();
      const shortUrl = `${req.headers.host}/${shortcode}`;
      url = new Url({
        originalUrl,
        shortUrl
      });
      await url.save();
      res.json(url);
    }
  } catch (error) {
    console.error("Error in URL shortening: ", error);
  }
});
router.get('/:shortcode', async (req, res) => {
    const {shortcode} = req.params;
    try{
        const url=await Url.findOne({shortUrl: `${req.headers.host}/${shortcode}`});
        if(url){
            res.redirect(url.originalUrl); 

        }
        
    }

module.exports = router;
