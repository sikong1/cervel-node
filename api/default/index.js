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
  },
  {
    path: "/getData",
    method: "get",
    isWhiteList: true,
    handler: (req, res) => {
      res.send({
        code: 200,
        msg: "success",
        data: [
          {
            image:
              "https://front-end-huawei-cdn.devops.cndinfo.com/npm/@cndinfo/cube-design-icons/0.3.0/png/mall-confirm-colored.png",
            label: "待确认"
          },
          {
            image:
              "https://front-end-huawei-cdn.devops.cndinfo.com/npm/@cndinfo/cube-design-icons/0.3.0/png/mall-payment-colored.png",
            label: "待付款",
            badge: {
              text: 3,
              bgColor: "#DD1022"
            }
          },
          {
            image:
              "https://front-end-huawei-cdn.devops.cndinfo.com/npm/@cndinfo/cube-design-icons/0.3.0/png/mall-shipping-colored.png",
            label: "待发货"
          },
          {
            image:
              "https://front-end-huawei-cdn.devops.cndinfo.com/npm/@cndinfo/cube-design-icons/0.3.0/png/mall-delivery-colored.png",
            label: "待收货"
          },
          {
            image:
              "https://front-end-huawei-cdn.devops.cndinfo.com/npm/@cndinfo/cube-design-icons/0.3.0/png/mall-order-colored.png",
            label: "订单"
          }
        ]
      })
    }
  }
]
