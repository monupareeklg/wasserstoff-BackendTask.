const express = require("express");
const axios = require("axios");
const router = express.Router();

const endpoints = [
  "http://mock_rest_1:3001",
  "http://mock_rest_2:3002",
  "http://mock_rest_3:3003",
  "http://mock_rest_4:3004",
];

const getRandomEndpoint = () => {
  return endpoints[Math.floor(Math.random() * endpoints.length)];
};

router.all("*", async (req, res) => {
  try {
    const endpoint = getRandomEndpoint();
    const response = await axios({
      method: req.method,
      url: endpoint + req.url,
      headers: req.headers,
      data: req.body,
    });

    res.status(response.status).send(response.data);
  } catch (error) {
    console.error("Error routing request:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
