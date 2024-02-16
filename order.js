const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const port = 3400;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS

const appkey = "c5419939234b7d8377a43f77b504f24c";
const appaccesstoken = "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";

const createOrderEndpoint = `https://${appkey}:${appaccesstoken}@custom-menu-checkout-compare-task.myshopify.com/admin/api/2023-10/orders.json`;

app.post("/order", (req, res) => {
  const orderData = req.body;

  const options = {
    method: "POST",
    url: createOrderEndpoint,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(orderData),
  };

  request(options, function (error, response, body) {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
      return;
    }
       res.header("Access-Control-Allow-Origin", "*");
       res.header(
         "Access-Control-Allow-Headers",
         "Origin, X-Requested-With, Content-Type, Accept"
       );
    res.send(body);
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
