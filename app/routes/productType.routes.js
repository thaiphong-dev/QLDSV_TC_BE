const { authJwt, verifySignUp } = require("../middlewares");
const controller = require("../controllers/producType.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/products", controller.laySanPham);
  app.get("/promotion", controller.layDsKhuyenMai);

  app.get("/hotProducts", controller.laySanPhamHot);

  app.get("/newProducts", controller.laySanPhamMoi);

  app.post("/products/filter", controller.locSanPham);

  app.post("/products/filterName", controller.locSanPhamTheoTen);
  app.post("/productdetail", controller.layChiTietSanPham);
  app.post("/cart", controller.themGioHang);
  app.get("/cart/:maKH", controller.layGioHang);
  app.get("/ngoaiTe", controller.layNgoaiTe);

  // app.get("/sale", controller.layKhuyenMai)

  app.get("/admin/cart", controller.layGioHangAdmin);
  app.post("/admin/create-promotion", controller.themKhuyenMai);
  app.post("/admin/add-product-promotion", controller.themSanPhamKhuyenMai);
  app.post("/admin/duyet", controller.duyetDonHang);
  app.post("/admin/huy", controller.huytDonHang);
  app.post("/create-baocao-pdf", controller.taoBaoCao);
  app.get("/get-baocao-pdf", controller.inBaoCao);
  app.post("/create-hoadon-pdf", controller.taoHoaDon);
  app.get("/get-hoadon-pdf", controller.inHoaDon);
  app.get("/admin/employee", controller.layNhanVien);

  app.get("/productType", controller.layTheLoai);
  app.get("/test", controller.test);
};
