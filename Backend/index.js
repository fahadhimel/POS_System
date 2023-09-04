const app = require("./app");
const config = require("./config/config");

const PORT = config.app.port;

app.listen(PORT, () => {
  console.log(`server raning at http://127.0.0.1:${PORT}`);
});
