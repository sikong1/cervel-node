/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-07 15:03:07
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-07-07 15:03:47
 * @FilePath: \vercel-node-app\utils\index.js
 * @Description: 公共方法
 */
// 时间格式化，时间戳转换为时间
const formatTime = (time, format) => {
    const t = new Date(time);
    const tf = (i) => {
        return (i < 10 ? "0" : "") + i;
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (a) => {
        switch (a) {
            case "yyyy":
                return tf(t.getFullYear());
                break;
            case "MM":
                return tf(t.getMonth() + 1);
                break;
            case "mm":
                return tf(t.getMinutes());
                break;
            case "dd":
                return tf(t.getDate());
                break;
            case "HH":
                return tf(t.getHours());
                break;
            case "ss":
                return tf(t.getSeconds());
                break;
        }
    });
}

module.exports = {
    formatTime
}
