const { authJwt, verifySignUp } = require("../middlewares");
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
};
