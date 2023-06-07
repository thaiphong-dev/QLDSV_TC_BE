const sql = require("mssql/msnodesqlv8");
var config = require("../config/db.config");

exports.layDsMonHoc = async (req, res, next) => {
  try {
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );
    let dsMonHoc = await connection
      .request()
      .input("PAGESIZE", sql.Int, req.body.pageSize)
      .input(
        "PAGENUMBER",
        sql.Int,
        (req.body.pageNumber - 1) * req.body.pageSize
      )
      .query(
        "SELECT * FROM MONHOC ORDER BY MAMH OFFSET @PAGENUMBER ROWS FETCH NEXT @PAGESIZE ROWS ONLY"
      );
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
      .input("PAGESIZE", sql.Int, req.body.pageSize)
      .input(
        "PAGENUMBER",
        sql.Int,
        (req.body.pageNumber - 1) * req.body.pageSize
      )
      .query(
        "select MALOP, TENLOP, KHOAHOC, MAKHOA, KHOA = (SELECT TENkHOA FROM KHOA WHERE MAKHOA = MAKHOA) from LOP ORDER BY MALOP OFFSET @PAGENUMBER ROWS FETCH NEXT @PAGESIZE ROWS ONLY"
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
    let data = await connection
      .request()
      .input("PAGESIZE", sql.Int, req.body.pageSize)
      .input("PAGENUMBER", sql.Int, req.body.pageNumber)
      .execute("SP_Lay_Lop_Tin_Chi");
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

exports.layDsFilter = async (req, res, next) => {
  try {
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );
    let DSNIENKHOA = await connection
      .request()
      .query(`SELECT DISTINCT NIENKHOA FROM LOPTINCHI`);

    let DSHOCKY = await connection
      .request()
      .query(`SELECT DISTINCT HOCKY FROM LOPTINCHI`);

    let DSNHOM = await connection
      .request()
      .query(`SELECT DISTINCT NHOM FROM LOPTINCHI`);
    res.status(200).send({
      data: {
        nienKhoa: DSNIENKHOA.recordset,
        hocKy: DSHOCKY.recordset,
        nhom: DSNHOM.recordset,
      },
    });
    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

exports.layDsDiemSinhVien = async (req, res, next) => {
  console.log(req.body);
  try {
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );
    let data = await connection
      .request()
      .input("NIENKHOA", sql.NVarChar, req.body.nienKhoa)
      .input("HOCKY", sql.Int, parseInt(req.body.hocKy))
      .input("MAMH", sql.NVarChar, req.body.monHoc)
      .input("NHOM", sql.Int, parseInt(req.body.nhom))
      .input("PAGESIZE", sql.Int, req.body.pageSize)
      .input("PAGENUMBER", sql.Int, req.body.pageNumber)
      .execute("SP_Lay_Danh_Sach_Diem_Sv");

    res.status(200).send({ data: data.recordset });

    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

// lấy danh sách lớp tín chỉ theo niên khóa, học kỳ
exports.layDslopTcDk = async (req, res, next) => {
  console.log(req.body);
  try {
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );
    let data = await connection
      .request()
      .input("NIENKHOA", sql.NVarChar, req.body.nienKhoa)
      .input("HOCKY", sql.Int, parseInt(req.body.hocKy))
      .input("PAGESIZE", sql.Int, req.body.pageSize)
      .input("PAGENUMBER", sql.Int, req.body.pageNumber)
      .execute("SP_Lay_Danh_Sach_Lop_Tin_Chi_Co_DK");

    res.status(200).send({ data: data.recordset });

    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

// lấy ds lớp tín chỉ của sinh viên đã dăng kí
exports.layDsLopTCSvDK = async (req, res, next) => {
  try {
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );
    let data = await connection
      .request()
      .input("NIENKHOA", sql.NVarChar, req.body.nienKhoa)
      .input("HOCKY", sql.Int, parseInt(req.body.hocKy))
      .input("MASV", sql.NVarChar, req.body.maSv)
      .input("PAGESIZE", sql.Int, req.body.pageSize)
      .input("PAGENUMBER", sql.Int, req.body.pageNumber)
      .execute("SP_Lay_Lop_Tin_Chi_Da_Dang_Ky");

    res.status(200).send({ data: data.recordset });

    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

// Dang ky lop tin chi
exports.dangKyLopTC = async (req, res, next) => {
  try {
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );

    const table = new sql.Table("DANGKYTYPE");

    // Define the table type schema
    table.columns.add("MALTC", sql.Int);
    table.columns.add("MASV", sql.VarChar);
    table.columns.add("DIEM_CC", sql.Int);
    table.columns.add("DIEM_GK", sql.Float);
    table.columns.add("DIEM_CK", sql.Float);
    table.columns.add("HUYDANGKY", sql.Bit);

    req.body.dsDangKy?.forEach((e) => {
      table.rows.add(
        e.MALTC,
        e.MASV,
        e.DIEM_CC,
        e.DIEM_GK,
        e.DIEM_CK,
        e.HUYDANGKY
      );
    });

    let data = await connection
      .request()
      .input("DANGKY", table)
      .execute("SP_Dang_Ky_Lop_Tin_Chi");

    res.status(200).send({ data: [] });

    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

// gHI ĐIỂM SINH VIÊN
exports.ghiDiemSV = async (req, res, next) => {
  try {
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );

    const table = new sql.Table("DANGKYTYPE");

    // Define the table type schema
    table.columns.add("MALTC", sql.Int);
    table.columns.add("MASV", sql.VarChar);
    table.columns.add("DIEM_CC", sql.Int);
    table.columns.add("DIEM_GK", sql.Float);
    table.columns.add("DIEM_CK", sql.Float);
    table.columns.add("HUYDANGKY", sql.Bit);

    req.body.dsDiem?.forEach((e) => {
      table.rows.add(
        e.MALTC,
        e.MASV,
        e.DIEM_CC,
        e.DIEM_GK,
        e.DIEM_CK,
        e.HUYDANGKY
      );
    });

    let data = await connection
      .request()
      .input("DANGKY", table)
      .execute("SP_Ghi_Diem_SV");

    res.status(200).send({ data: [] });

    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

exports.layDsHocPhi = async (req, res, next) => {
  try {
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );

    let hocphi = await connection
      .request()
      .input("MASV", sql.NVarChar, req.body.MASV)
      .input("PAGESIZE", sql.Int, req.body.pageSize)
      .input("PAGENUMBER", sql.Int, req.body.pageNumber)
      .execute("SP_Lay_hoc_Phi");

    res.status(200).send({
      data: hocphi.recordset,
    });

    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

exports.laySinhVien = async (req, res, next) => {
  try {
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );
    let sinhVien = await connection
      .request()
      .input("MASV", sql.NVarChar, req.body.MASV)
      .query(
        "select MASV, HOTEN = (HO +' '+ TEN), MALOP from SINHVIEN where MASV = @MASV"
      );

    res.status(200).send({
      data: sinhVien.recordset,
    });

    await connection.close();
  } catch (error) {
    console.log(error);
  }
};

exports.layCTHocPhi = async (req, res, next) => {
  try {
    let connection = await sql.connect(
      config(req.body.user, req.body.password, req.body.chiNhanh)
    );
    let ctHocPhi = await connection
      .request()
      .input("MASV", sql.NVarChar, req.body.MASV)
      .input("NIENKHOA", sql.NVarChar, req.body.NIENKHOA)
      .input("HOCKY", sql.Int, req.body.HOCKY)
      .input("PAGESIZE", sql.Int, req.body.pageSize)
      .input("PAGENUMBER", sql.Int, req.body.pageNumber)
      .query(
        "select NGAYDONG, SOTIENDONG from CT_DONGHOCPHI where MASV = @MASV AND NIENKHOA = @NIENKHOA AND HOCKY = @HOCKY ORDER BY NGAYDONG DESC OFFSET @PAGENUMBER ROWS FETCH NEXT @PAGESIZE ROWS ONLY"
      );

    res.status(200).send({
      data: ctHocPhi.recordset,
    });

    await connection.close();
  } catch (error) {
    console.log(error);
  }
};
