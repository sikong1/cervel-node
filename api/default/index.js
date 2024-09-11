/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-06 14:05:10
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-07 09:49:44
 * @FilePath: \vercel-node-app\api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = [
  {
    path: "/",
    method: "get",
    isWhiteList: true,
    handler: (req, res) => {
      res.send("Home Page Route")
    }
  },
  {
    path: "/about",
    method: "get",
    isWhiteList: true,
    handler: (req, res) => {
      res.send("about Page Route")
    }
  },
  {
    path: "/portfolio",
    method: "get",
    isWhiteList: true,
    handler: (req, res) => {
      res.send("portfolio Page Route")
    }
  },
  {
    path: "/contact",
    method: "get",
    isWhiteList: true,
    handler: (req, res) => {
      res.send("contact Page Route")
    }
  }
]