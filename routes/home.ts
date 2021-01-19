import express from "express";
const router: express.Router = express.Router();

router.get("/", (request: express.Request, response: express.Response) => {
  response.send("Hello World");
});

module.exports = router;
