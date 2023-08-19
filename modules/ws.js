const { success } = require("../status");
const { formatTime } = require("../utils");

const topData = {
    content: '连接成功，请问有什么可以帮助您的吗？',
    type: 'text',
    timestamp: formatTime(new Date().getTime(), 'yyyy-MM-dd HH:mm:ss'),
    sendType: 0,
    // status:
}

let data = []

const wsRouter = function (ws, req) {
    let interval;
    data.push(topData)
    // 监听连接
    ws.send(JSON.stringify({
        status: success,
        data: data
    }));

    interval = setInterval(() => {

        if (ws.readyState === ws.OPEN) { // 判断连接状态
            // 发送消息
            // ws.send(Math.random().toFixed(2))
        } else {
            // 关闭连接
            data = []
            clearInterval(interval)
        }
    }, 1000);

    // 接收消息
    ws.on('message', function (msg) {
        data.push({
            content: msg,
            type: 'text',
            timestamp: formatTime(new Date().getTime(), 'yyyy-MM-dd HH:mm:ss'),
            sendType: 1 // 1: 客服端 0: 服务端
        })
        ws.send(JSON.stringify({
            status: success,
            data: data
        }));

        setTimeout(() => {
            data.push({
                content: '这是一条消息',
                type: 'text',
                timestamp: formatTime(new Date().getTime(), 'yyyy-MM-dd HH:mm:ss'),
                sendType: 0,
                // status:
            })
            ws.send(JSON.stringify({
                status: success,
                data: data
            }));
        }, 1000 * Math.random())
    });
}

module.exports = wsRouter;
