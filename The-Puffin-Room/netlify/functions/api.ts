import express from 'express';
import serverless from "serverless-http";

const api = express();
const router = Router();

api.use("/api/", router);

router.get('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
  });

export const handler = serverless(api);

