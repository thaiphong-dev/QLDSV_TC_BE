const config = (user, password, server) => {
  return {
    server: server,
    driver: "msnodesqlv8",
    database: "QLDSV_TC",
    user: user,
    password: password,
    optons: {
      trustedConnection: true,
    },
  };
};
// [

//   {
//     server: "DESKTOP-P12J8O0\\PHONG_1",
//     driver: "msnodesqlv8",
//     database: "QLDSV_TC",
//     user: "sa",
//     password: "123",
//     optons: {
//       trustedConnection: true,
//     },
//   },
//   {
//     server: "DESKTOP-P12J8O0\\PHONG_2",
//     driver: "msnodesqlv8",
//     database: "QLDSV_TC",
//     user: "sa",
//     password: "123",
//     optons: {
//       trustedConnection: true,
//     },
//   },
//   {
//     server: "DESKTOP-P12J8O0\\PHONG_3",
//     driver: "msnodesqlv8",
//     database: "QLDSV_TC",
//     user: "sa",
//     password: "123",
//     optons: {
//       trustedConnection: true,
//     },
//   },
// ];

module.exports = config;
