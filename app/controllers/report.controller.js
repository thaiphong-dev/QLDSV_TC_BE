const sql = require("mssql/msnodesqlv8");
var config = require("../config/db.config");
const pdf = require("html-pdf");
const dsLopTC = require("../report/dsLopTC");
const dsSVDKLopTC = require("../report/dsLopSVDKTC");
const diemLopTC = require("../report/diemLopTC");
const diemSV = require("../report/diemSV");
const hocPhiLop = require("../report/hocPhiLop");
const diemTongKet = require("../report/diemTongKet");

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

exports.taoDiemLopTC = async (req, res) => {
  try {
    // Connect to SQL Server and fetch data
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );

    const result = await connection
      .request()
      .input("NIENKHOA", sql.NVarChar, req.body.NIENKHOA)
      .input("HOCKY", sql.Int, req.body.HOCKY)
      .input("MAMH", sql.NVarChar, req.body.MONHOC)
      .input("NHOM", sql.Int, parseInt(req.body.NHOM))
      .input("PAGESIZE", sql.Int, 1000)
      .input("PAGENUMBER", sql.Int, 1)
      .execute("SP_Lay_Danh_Sach_Diem_Sv");

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
    pdf.create(diemLopTC(data), {}).toFile("bangDiemLopTC.pdf", (err) => {
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

exports.inDiemLopTC = async (req, res) => {
  res.sendFile("P:/QLDSV_TC_reactjs/be/bangDiemLopTC.pdf");
};

exports.taoDiemSV = async (req, res) => {
  try {
    // Connect to SQL Server and fetch data
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );

    const sinhVien = await connection
      .request()
      .input("MASV", sql.NVarChar, req.body.MASV)
      .query(
        "select MASV, HOTEN = (HO +' '+ TEN), MALOP from SINHVIEN where MASV = @MASV"
      );

    const result = await connection
      .request()
      .input("MASV", sql.NVarChar, req.body.MASV)
      .execute("SP_In_Phieu_Diem_SV");

    console.log(sinhVien.recordset);
    let data = {
      data: result.recordset,
      sinhVien: sinhVien.recordset[0],
      USER: req.body.USER,
    };

    // Read the HTML template file
    pdf.create(diemSV(data), {}).toFile("bangDiemSV.pdf", (err) => {
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

exports.inDiemSV = async (req, res) => {
  res.sendFile("P:/QLDSV_TC_reactjs/be/bangDiemSV.pdf");
};

exports.taoHocPhiLop = async (req, res) => {
  try {
    // Connect to SQL Server and fetch data
    let connection = await sql.connect(
      config(req.body.user, req.body.password, "DESKTOP-P12J8O0\\PHONG_3")
    );
    console.log(req.body);

    const result = await connection
      .request()
      .input("MALOP", sql.NVarChar, req.body.MALOP)
      .input("NIENKHOA", sql.NVarChar, req.body.NIENKHOA)
      .input("HOCKY", sql.Int, req.body.HOCKY)
      .execute("SP_In_Hoc_Phi_Lop");

    let data = {
      data: result.recordset,
      KHOA:
        req.body.chiNhanh === "DESKTOP-P12J8O0\\PHONG_1"
          ? "CÔNG NGHỆ THÔNG TIN"
          : "VIỄN THÔNG",
      MALOP: req.body.MALOP,
      USER: req.body.USER,
    };
    // Read the HTML template file
    pdf.create(hocPhiLop(data), {}).toFile("bangHocPhiLop.pdf", (err) => {
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

exports.inHocPhiLop = async (req, res) => {
  res.sendFile("P:/QLDSV_TC_reactjs/be/bangHocPhiLop.pdf");
};

function removeDuplicates(array, key) {
  const uniqueMap = {};
  return array.filter((obj) => {
    const value = obj[key];
    if (!uniqueMap[value]) {
      uniqueMap[value] = true;
      return true;
    }
    return false;
  });
}

exports.taoDiemTongKet = async (req, res) => {
  try {
    // Connect to SQL Server and fetch data
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );
    const lop = await connection
      .request()
      .input("MALOP", sql.NVarChar, req.body.MALOP)
      .query("select TENLOP, KHOAHOC from LOP where MALOP = @MALOP");
    const result = await connection
      .request()
      .input("MALOP", sql.NVarChar, req.body.MALOP)
      .execute("SP_In_Bang_Diem_Tong_Ket");

    const dsMonHoc = removeDuplicates(
      result.recordset?.map((x) => ({
        TENMH: x.TENMH,
        MALTC: x.MALTC,
      })),
      "MALTC"
    );

    // tạo mảng tổng hợp điểm sinh viên
    let dsSV = removeDuplicates(
      result.recordset?.map((x) => ({
        HOTEN: x.HOTEN,
        MASV: x.MASV,
        dsDiem: [],
      })),
      "MASV"
    );
    for (let q = 0; q < dsSV.length; q++) {
      for (let i = 0; i < dsMonHoc.length; i++) {
        const element = dsMonHoc[i];
        dsSV[q].dsDiem.push({
          [`diem${i}`]: null,
          MALTC: element.MALTC,
        });
      }

      // ghi điểm vào sv
      for (let i = 0; i < result.recordset.length; i++) {
        const ele = result.recordset[i];
        if (ele.MASV === dsSV[q].MASV) {
          for (let k = 0; k < dsSV[q].dsDiem.length; k++) {
            if (dsSV[q].dsDiem[k].MALTC === ele.MALTC) {
              dsSV[q].dsDiem[k][`diem${k}`] = ele?.DIEM
                ? (Math.floor(parseFloat(ele.DIEM) * 2) / 2).toFixed(1)
                : ele?.DIEM ?? null;
            }
          }
        }
      }
    }

    let data = {
      data: dsSV,
      dsMonHoc: dsMonHoc,
      KHOA:
        req.body.chiNhanh === "DESKTOP-P12J8O0\\PHONG_1"
          ? "CÔNG NGHỆ THÔNG TIN"
          : "VIỄN THÔNG",
      LOP: lop.recordset[0],
      USER: req.body.USER,
    };
    // Read the HTML template file
    pdf.create(diemTongKet(data), {}).toFile("bangDiemTongKet.pdf", (err) => {
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

exports.inDiemTongKet = async (req, res) => {
  res.sendFile("P:/QLDSV_TC_reactjs/be/bangDiemTongKet.pdf");
};
