module.exports = (data) => {
  const today = new Date();
  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");
  const row = data.data.map(
    (x, index) =>
      `<tr>
    <td>
      <div>
        <h2 class="formatTitle">${index + 1}</h2>
      </div>
    </td>
    <td>
      <div>
        <h2 class="formatTitle">${x.TENMH}</h2>
      </div>
    </td>
    <td>
      <div>
        <h2 class="formatTitle">${
          x.DIEM ? (Math.floor(parseFloat(x.DIEM) * 2) / 2).toFixed(1) : ""
        }</h2>
      </div>
    </td>

    
  </tr>
`
  );
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
                color: rgb(119, 62, 62);
                font-weight: 700;
                text-transform: uppercase;
                text-align: center;
                text-transform: uppercase;
              "
            >
              Phiếu điểm sinh viên
            </h1>
  
            
            <h2
              style="
                font-weight: 700;
                text-transform: uppercase;
                text-align: center;
              "
            >
            ${`Mã SV: ${data.sinhVien.MASV} - Họ tên: ${data.sinhVien.HOTEN}`}
            </h2>
            
  
          </div>
          <div class="xcg13_body-table">
            <table class="formatTable">
            <tr style = "background-color: rgb(119, 62, 62); color: white">
            <td>
              
                <h2 class="formatTitle" style = "width: 5rem">STT</h2>
              
            </td>
            <td>
              
                <h2 class="formatTitle" style = "width: 20rem" >Tên môn học</h2>
              
            </td>
            <td>
              
                <h2 class="formatTitle" style = "width: 13rem">Điểm</h2>
              
            </td>
            
          </tr>
          ${row.join("")}
            </table>
  
          
          </div>
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
