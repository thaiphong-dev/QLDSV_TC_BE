const sql = require("mssql/msnodesqlv8");
var config = require("../config/db.config");
const pdf = require("html-pdf");
const dsLopTC = require("../report/dsLopTC");
const dsSVDKLopTC = require("../report/dsLopSVDKTC");

exports.taoDsLopTC = async (req, res) => {
  try {
    // Connect to SQL Server and fetch data
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );

    const result = await connection
      .request()
      .input("NIENKHOA", sql.NVarChar, req.body.NIENKHOA)
      .input("HOCKY", sql.Int, req.body.HOCKY)
      .execute("SP_In_Danh_Sach_Lop_Tin_Chi");

    let data = {
      data: result.recordset,
      khoa:
        req.body.chiNhanh === "DESKTOP-P12J8O0\\PHONG_1"
          ? "CÔNG NGHỆ THÔNG TIN"
          : "VIỄN THÔNG",
      NIENKHOA: req.body.NIENKHOA,
      HOCKY: req.body.HOCKY,
      USER: req.body.USER,
    };

    // Read the HTML template file
    pdf.create(dsLopTC(data), {}).toFile("dsLopTC.pdf", (err) => {
      if (err) {
        res.send(Promise.reject());
      }
      res.send(Promise.resolve());
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
};

exports.inDsLopTC = async (req, res) => {
  res.sendFile("P:/QLDSV_TC_reactjs/be/dsLopTC.pdf");
};

exports.taoDsSVDKLopTC = async (req, res) => {
  try {
    // Connect to SQL Server and fetch data
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );

    const result = await connection
      .request()
      .input("NIENKHOA", sql.NVarChar, req.body.NIENKHOA)
      .input("HOCKY", sql.Int, req.body.HOCKY)
      .input("MONHOC", sql.NVarChar, req.body.MONHOC)
      .input("NHOM", sql.Int, parseInt(req.body.NHOM))
      .execute("SP_In_Danh_Sach_Sinh_Vien_Dang_Ky_Lop_Tin_Chi");

    let data = {
      data: result.recordset,
      khoa:
        req.body.chiNhanh === "DESKTOP-P12J8O0\\PHONG_1"
          ? "CÔNG NGHỆ THÔNG TIN"
          : "VIỄN THÔNG",
      NIENKHOA: req.body.NIENKHOA,
      HOCKY: req.body.HOCKY,
      USER: req.body.USER,
      NHOM: req.body.NHOM,
      TENMH: req.body.TENMH,
    };

    // Read the HTML template file
    pdf.create(dsSVDKLopTC(data), {}).toFile("dsSVDKLopTC.pdf", (err) => {
      if (err) {
        res.send(Promise.reject());
      }
      res.send(Promise.resolve());
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
};

exports.inDsSVDKLopTC = async (req, res) => {
  res.sendFile("P:/QLDSV_TC_reactjs/be/dsSVDKLopTC.pdf");
};
