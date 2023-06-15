module.exports = (data) => {
  const today = new Date();
  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>in hinh giam dinh</title>
    </head>
    <style>
      .xcg13 {
        position: relative;
        margin: 1rem auto;
      }
  
      .xcg13_header {
        display: block;
        border: 0.125rem solid black;
        height: auto;
        width: 20rem;
        float: right;
        text-align: center;
      }
  
      .xcg13_title {
        position: relative;
        display: flex;
        top: 3rem;
        width: 70rem;
        margin: 0 auto;
        border-bottom: 0.1215rem solid black;
      }
  
      .xcg13_body {
        position: relative;
      }
  
      .xcg13_body-header {
        position: relative;
        top: 2rem;
        width: 45rem;
        margin: 0 auto;
      }
  
      .formatline {
        font-weight: 500;
        padding-left: 4rem;
      }
  
      .formatTitle {
        text-align: center;
  
      }
  
      table {
        border-collapse: collapse;
      }
  
      table,
      th,
      td {
        border: 1px solid;
      }
  
      .formatTable {
        position: relative;
        top: 3rem;
        margin: 0 auto;
      }
    </style>
  
    <body>
      <div class="xcg13">
        
      
        <div class="xcg13_body">
          <div class="xcg13_body-header" style = "width: 100%">
            <h1
              style="
                color: red;
                font-weight: 700;
                text-transform: uppercase;
                text-align: center;
                text-transform: uppercase;
              "
            >
              Danh Sách sinh viên đăng ký lớp tín chỉ
            </h1>
  
            <h2
            style="
              font-weight: 700;
              text-transform: uppercase;
              text-align: center;
              text-transform: uppercase;
            "
          >
          ${`Khoa: ${data.khoa}`}
          </h2>
            <h2
              style="
                font-weight: 700;
                text-transform: uppercase;
                text-align: center;
              "
            >
            ${`Niên khóa: ${data.NIENKHOA} Học Kỳ: ${data.HOCKY}`}
            </h2>
            </h2>
            <h2
              style="
                font-weight: 700;
                text-transform: uppercase;
                text-align: center;
              "
            >
            ${`Môn học: ${data.TENMH} -  Nhóm: ${data.NHOM}`}
            </h2>
            
  
          </div>
          <div class="xcg13_body-table">
            <table class="formatTable">
            <tr>
            <td>
              
                <h2 class="formatTitle" style = "width: 5rem">STT</h2>
              
            </td>
            <td>
              
                <h2 class="formatTitle" style = "width: 15rem" >Mã sinh viên</h2>
              
            </td>
            <td>
              
                <h2 class="formatTitle" style = "width: 15rem">Họ</h2>
              
            </td>
            <td>
              
              <h2 class="formatTitle" style = "width: 10rem">Tên</h2>
            
          </td>
          <td>
              
              <h2 class="formatTitle" style = "width: 7rem">Phái</h2>
            
          </td>
          <td>
              
              <h2 class="formatTitle" style = "width: 5rem">Mã lớp</h2>
            
          </td>
          </tr>
          ${data.data.map(
            (x, index) =>
              `<tr>
              <td>
                <div>
                  <h2 class="formatTitle">${index + 1}</h2>
                </div>
              </td>
              <td>
                <div>
                  <h2 class="formatTitle">${x.MASV}</h2>
                </div>
              </td>
              <td>
                <div>
                  <h2 class="formatTitle">${x.HO}</h2>
                </div>
              </td>
              <td>
                <div>
                  <h2 class="formatTitle">${x.TEN}</h2>
                </div>
              </td>

              <td>
                <div>
                  <h2 class="formatTitle">${x.PHAI === 0 ? "Nam" : "Nữ"}</h2>
                </div>
              </td>

              <td>
                <div>
                  <h2 class="formatTitle">${x.MALTC}</h2>
                </div>
              </td>
            </tr>
  `
          )}
            </table>
  
          
          </div>
        </div>
        <div style="padding-bottom: 1rem;">
            <h2 style="display:block; position: relative; top: 3rem; left: 2rem">Số sinh viên đăng ký: ${
              data.data?.length
            } </h2>
          </div>
        <h2 class="formatline" style="display:block; position: relative; top: 3rem; left: 30rem"> ${`Ngày ${today.getDate()} tháng ${
          today.getMonth() + 1
        } năm ${today.getFullYear()}`}</h2>
        <div>
          <div style="padding-bottom: 3rem;">
            <h2 style="display:block; position: relative; top: 3rem; left: 37rem">Người in biểu </h2>
          </div>
          <div style="padding-bottom: 7rem;">
            <h2 style="display:block; position: relative; top: 3rem; left: 35rem">${
              data.USER
            } </h2>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
};
