const axios = require("axios");

const endpoints = [
  { method: "get", url: "http://localhost:3000/fast" },
  { method: "get", url: "http://localhost:3000/slow" },
  { method: "post", url: "http://localhost:3000/data", data: { key: "value" } },
];

const performRequest = async (request, index) => {
  try {
    const start = Date.now();
    const response = await axios(request);
    const duration = Date.now() - start;
    console.log(
      `Request ${index} to ${request.url} responded with status ${response.status} in ${duration}ms`
    );
  } catch (error) {
    console.error(
      `Request ${index} to ${request.url} failed: ${error.message}`
    );
  }
};

const runTests = async () => {
  const requests = [];
  for (let i = 0; i < 100; i++) {
    const request = endpoints[Math.floor(Math.random() * endpoints.length)];
    requests.push(performRequest(request, i));
  }
  await Promise.all(requests);
  console.log("All tests completed");
};

runTests();
