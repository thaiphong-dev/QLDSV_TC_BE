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
  app.post("/dsFilter", controller.layDsFilter);
  app.post("/dsDiemSv", controller.layDsDiemSinhVien);
  app.post("/dsLopTCDK", controller.layDslopTcDk);
  app.post("/dsLopTCSVDK", controller.layDsLopTCSvDK);
  app.post("/dangKyLopTC", controller.dangKyLopTC);
  app.post("/ghiDiemSV", controller.ghiDiemSV);
  app.post("/dsHocPhi", controller.layDsHocPhi);
  app.post("/laySinhVien", controller.laySinhVien);
  app.post("/layCTHocPhi", controller.layCTHocPhi);
  app.post("/dongHocPhi", controller.dongHocPhi);
};
