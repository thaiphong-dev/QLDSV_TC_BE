const controller = require("../controllers/report.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/taoDsLopTC", controller.taoDsLopTC);
  app.get("/inDsLopTC", controller.inDsLopTC);

  app.post("/taoDsSVDKLopTC", controller.taoDsSVDKLopTC);
  app.get("/inDsSVDKLopTC", controller.inDsSVDKLopTC);

  app.post("/taoDiemLopTC", controller.taoDiemLopTC);
  app.get("/inDiemLopTC", controller.inDiemLopTC);

  app.post("/taoDiemSV", controller.taoDiemSV);
  app.get("/inDiemSV", controller.inDiemSV);

  app.post("/taoHocPhiLop", controller.taoHocPhiLop);
  app.get("/inHocPhiLop", controller.inHocPhiLop);

  app.post("/taoDiemTongKet", controller.taoDiemTongKet);
  app.get("/inDiemTongKet", controller.inDiemTongKet);
};
