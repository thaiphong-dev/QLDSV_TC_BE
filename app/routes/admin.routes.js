const { authJwt, verifySignUp } = require("../middlewares");
const controller = require("../controllers/admin.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/dsMonHoc", controller.layDsMonHoc);
  app.post("/dsGiangVien", controller.layDsGiangVien);
  app.post("/dsLop", controller.layDsLop);
  app.post("/dsLopTC", controller.layDsLopTC);
  app.post("/dsKhoa", controller.layDsKhoa);
  app.post("/taoLopTC", controller.taoLopTC);
  app.post("/dsSinhVien", controller.layDsSinhVien);
};
