const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const axios = require('axios');
const app = express();
const fs = require('fs');

const log = JSON.parse(fs.readFileSync('log.txt', 'utf8'));

app.use(express.json());
app.use(cors({ methods: ['GET', 'POST'] }));


const sleep = ms => new Promise(res => setTimeout(res, ms));

app.get('/server', async (req, res) => {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
  await page.setViewport({ width: 375, height: 812 });
  await page.goto(`https://${req.query.host}/`);
  const result = await page.evaluate(() => {
    setInterval(() => {
      document.body.click();
    }, 1000);
  })
  await sleep(50000);
  res.send({ type: true })
  await browser.close();
});


const listener = app.listen('3000', () => {
  console.log(`Your app is listening on port ${listener.address().port}`);

});