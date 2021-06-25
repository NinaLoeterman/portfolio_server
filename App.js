const express = require("express");
const cors = require("cors");
const app = express();

const port = 5050;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`portfolio_server listening at http://localhost:${port}`);
})