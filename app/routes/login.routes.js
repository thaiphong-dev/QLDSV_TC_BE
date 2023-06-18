const controller = require("../controllers/login.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/dsphanmanh", controller.layDsPhanManh);
  app.post("/dangNhap", controller.dangNhap);
  app.post("/dangNhapSV", controller.dangNhapSV);
};
