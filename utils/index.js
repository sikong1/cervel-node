/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-07 15:03:07
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-08-19 14:12:35
 * @FilePath: \vercel-node-app\utils\index.js
 * @Description: 公共方法
 */
// 时间格式化，时间戳转换为时间
const formatTime = (time, format) => {
  const t = new Date(time)
  const tf = (i) => {
    return (i < 10 ? "0" : "") + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (a) => {
    switch (a) {
      case "yyyy":
        return tf(t.getFullYear())
      case "MM":
        return tf(t.getMonth() + 1)
      case "mm":
        return tf(t.getMinutes())
      case "dd":
        return tf(t.getDate())
      case "HH":
        return tf(t.getHours())
      case "ss":
        return tf(t.getSeconds())
    }
  })
}

const delPassWord = (data, key = "password") => {
  if (!Array.isArray(data)) return
  return data.map(item => ({
    ...item,
    [key]: ''
  }))
}

module.exports = {
  formatTime,
  delPassWord
}
