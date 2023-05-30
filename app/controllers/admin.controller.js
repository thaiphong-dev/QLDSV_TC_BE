const sql = require("mssql/msnodesqlv8");
var config = require("../config/db.config");

exports.layDsMonHoc = async (req, res, next) => {
  try {
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );
    let dsMonHoc = await connection.request().query("SELECT * FROM MONHOC");
    res.status(200).send({ data: dsMonHoc.recordset });
    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

exports.layDsKhoa = async (req, res, next) => {
  try {
    let connection = await sql.connect(
      config("sa", "123", "DESKTOP-P12J8O0\\PHONG")
    );
    let dsKhoa = await connection.request().query("SELECT * FROM KHOA");
    res.status(200).send({ data: dsKhoa.recordset });
    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

exports.layDsGiangVien = async (req, res, next) => {
  try {
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );
    let dsMonHoc = await connection
      .request()
      .query("SELECT MAGV, HOTEN = ( HO+ ' '+ TEN), MAKHOA FROM   GIANGVIEN");
    res.status(200).send({ data: dsMonHoc.recordset });
    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

exports.layDsLop = async (req, res, next) => {
  try {
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );
    let dsLop = await connection
      .request()
      .query(
        "select MALOP, TENLOP, KHOAHOC, MAKHOA, KHOA = (SELECT TENkHOA FROM KHOA WHERE MAKHOA = MAKHOA) from LOP"
      );

    // let dsSV = await connection.request().query("select * from SINHVIEN");

    // let dsLopVaSV = dsLop.recordset.map((x) => ({
    //   ...x,
    //   dsSinhVien: dsSV.recordset.filter((y) => y.MALOP === x.MALOP),
    // }));

    res.status(200).send({ data: dsLop.recordset });
    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

exports.layDsLopTC = async (req, res, next) => {
  try {
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );
    let data = await connection.request().execute("SP_Lay_Lop_Tin_Chi");
    res.status(200).send({ data: data.recordset });
    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

exports.taoLopTC = async (req, res, next) => {
  console.log(req.body);
  try {
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );
    let flag = await connection
      .request()
      .input("nienkhoa", sql.NVarChar, req.body.nienKhoa)
      .input("hocki", sql.Int, parseInt(req.body.hocKy))
      .input("mamh", sql.NVarChar, req.body.monHoc)
      .input("nhom", sql.Int, parseInt(req.body.nhom))
      .execute("SP_CheckExistLTC");

    if (flag.returnValue === 1) {
      res.statusMessage = "duplicated";
      res.status(300).end();
    } else {
      let data = await connection
        .request()
        .input("NIENKHOA", sql.NVarChar, req.body.nienKhoa.trim())
        .input("HOCKY", sql.Int, parseInt(req.body.hocKy))
        .input("MAMH", sql.NVarChar, req.body.monHoc.trim())
        .input("NHOM", sql.Int, parseInt(req.body.nhom))
        .input("MAGV", sql.NVarChar, req.body.giangVien.trim())
        .input("MAKHOA", sql.NVarChar, req.body.khoa.trim())
        .input("SOSVTOITHIEU", sql.Int, parseInt(req.body.svtoithieu))
        .input("HUYLOP", sql.Bit, req.body.huyLop)
        .query(
          `insert into LOPTINCHI (NIENKHOA, HOCKY, MAMH, NHOM, MAGV, MAKHOA, SOSVTOITHIEU, HUYLOP) values (@NIENKHOA, @HOCKY, @MAMH, @NHOM, @MAGV, @MAKHOA, @SOSVTOITHIEU, @HUYLOP)`
        );

      res.status(200).send({
        data: data.returnValue,
        message: "Tạo thành công",
        status: 200,
      });
    }
    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

exports.layDsSinhVien = async (req, res, next) => {
  try {
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );
    let DSSINHVIEN = await connection
      .request()
      .input("MALOP", sql.NVarChar, req.body.maLop)
      .query(
        `SELECT MASV, HOTEN = ( HO+ ' '+ TEN), PHAI, DIACHI, NGAYSINH, MALOP, DANGHIHOC FROM SINHVIEN WHERE MALOP = @MALOP`
      );
    res.status(200).send({ data: DSSINHVIEN.recordset });
    await connection.close();
  } catch (error) {
    console.log(error);
  }
};
