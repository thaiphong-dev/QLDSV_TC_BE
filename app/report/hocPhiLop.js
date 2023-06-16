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
          <h2 class="formatTitle">${x.HOTEN}</h2>
        </div>
      </td>
      <td>
        <div>
          <h2 class="formatTitle">${addCommas(x?.HOCPHI)}</h2>
        </div>
      </td>
      <td>
        <div>
          <h2 class="formatTitle">${addCommas(x?.SOTIENDADONG)}</h2>
        </div>
      </td>

      
    </tr>
`
  );
  const convertMoneyToWords = (amount) => {
    const units = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];
    const words = [
      "",
      "một",
      "hai",
      "ba",
      "bốn",
      "năm",
      "sáu",
      "bảy",
      "tám",
      "chín",
      "mười",
      "mười một",
      "mười hai",
      "mười ba",
      "mười bốn",
      "mười năm",
      "mười sáu",
      "mười bảy",
      "mười tám",
      "mười chín",
    ];

    const numChunks = [];
    while (amount > 0) {
      numChunks.push(amount % 1000);
      amount = Math.floor(amount / 1000);
    }

    let result = "";

    for (let i = numChunks.length - 1; i >= 0; i--) {
      const chunk = numChunks[i];

      const hundreds = Math.floor(chunk / 100);
      const tens = Math.floor((chunk % 100) / 10);
      const ones = chunk % 10;

      if (chunk !== 0) {
        if (hundreds > 0) {
          result = result + words[hundreds] + " trăm ";
        }

        if (tens === 0 && ones === 1 && i > 0) {
          result = result + "mười ";
        } else if (tens === 1 && ones > 0) {
          result = result + "mười " + words[ones] + " ";
        } else if (tens > 1) {
          result = result + words[tens] + " mươi ";
          if (ones === 1) {
            result = result + "mốt ";
          } else if (ones > 1) {
            result = result + words[ones] + " ";
          }
        } else if (ones > 0) {
          result = result + words[ones] + " ";
        }

        result = result + units[i] + " ";
      }
    }

    result = result.trim() + " Đồng";
    return result;
  };

  let kq = 0;
  data.data?.map((x) => {
    kq += parseInt(x.SOTIENDADONG);
  });
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
              Danh sách sinh viên đóng học phí
            </h1>
  
            
            <h2
              style="
                font-weight: 700;
                text-transform: uppercase;
                text-align: center;
              "
            >
            ${`Mã Lớp: ${data.MALOP}`}
            </h2>
            <h2
              style="
                font-weight: 700;
                text-transform: uppercase;
                text-align: center;
              "
            >
            ${`Khoa: ${data.KHOA}`}
            </h2>
            
  
          </div>
          <div class="xcg13_body-table">
            <table class="formatTable">
            <tr style = "background-color: rgb(119, 62, 62); color: white">
            <td>
              
                <h2 class="formatTitle" style = "width: 5rem">STT</h2>
              
            </td>
            <td>
              
                <h2 class="formatTitle" style = "width: 20rem" >Họ và tên</h2>
              
            </td>
            <td>
              
                <h2 class="formatTitle" style = "width: 13rem">Học phí</h2>
              
            </td>
            <td>
              
                <h2 class="formatTitle" style = "width: 13rem">Số tiền đã đóng</h2>
              
            </td>
            
          </tr>
          ${row.join("")}

            </table>
  
          
          </div>
        </div>
        <div style="padding-bottom: 1rem;">
            <h2 style="display:block; position: relative; top: 3rem; left: 2rem">Tổng số sinh viên: ${
              data.data?.length
            } </h2>
            <h2 style="display:block; position: relative; top: 3rem; left: 2rem">Tổng số tiền đã đóng: ${addCommas(
              kq
            )} (${convertMoneyToWords(parseInt(kq))}) </h2>
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
