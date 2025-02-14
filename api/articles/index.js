const getData = require("../../modules/articles/getData")
const getItemData = require("../../modules/articles/getItemData")
const setData = require("../../modules/articles/setData")



module.exports = [
  {
    path: "/articles/setData",
    method: "post",
    isWhiteList: true,
    errorBody: ["title", "content"],
    handler: setData
  },
  {
    path: "/articles/getData",
    method: "get",
    isWhiteList: true,
    handler: getData
  },
  {
    path: "/articles/getItemData",
    method: "get",
    isWhiteList: true,
    handler: getItemData
  }
]
