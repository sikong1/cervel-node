/*
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-06-06 09:23:38
 * @LastEditors: sikonggpw 1327325804@qq.com
 * @LastEditTime: 2023-11-15 09:54:28
 * @FilePath: \vercel-node-app\modules\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const fse = require('fs-extra')
const path = require('path')
const multiparty = require('multiparty')

// upload文件夹目录
const UPLOAD_DIR = path.resolve(__dirname, '../../uploads') // __dirname当前目录
const UPLOAD_DIR_FILE = path.resolve(__dirname, '../../files') // __dirname当前目录
// 提取文件后缀名
const extractExt = fileName => {
  return fileName.slice(fileName.lastIndexOf('.'), fileName.length)
}

const fileApi = async (req, res) => {
  const form = new multiparty.Form()

  form.parse(req, async (err, fields, files) => {
    // fields 可获取普通数据信息。
    try {
      // files 主要是获取文件数据信息。
      if (err) {
        console.log('err', err);
        return res.json({
          status: 401,
          msg: '上传失败'
        })
      }
      const fileHash = fields.fileHash[0]
      const chunkHash = fields.chunkHash[0]

      // 临时存放目录
      const filePath = path.resolve(UPLOAD_DIR, fileHash)
      //  判断目录是否存在，不存在创建目录
      if (!fse.existsSync(filePath)) {
        // fse.existsSync(filePath) 判断目录是否存在，不存在创建目录
        await fse.mkdir(filePath)
      }

      const chunkPath = path.resolve(filePath, chunkHash)

      if (!fse.existsSync(chunkPath)) {
        // 将切片放入该文件夹中;
        await fse.ensureFile(chunkPath)
        return res.send({
          status: 200,
          msg: '上传成功'
        })
      }

      res.send({
        status: 200403,
        msg: '切片已存在,已复用之前切片'
      })

    } catch (error) {
      console.log('err', error);
    }
  })
};

const mergeApi = async (req, res) => {
  try {
    const { fileHash, fileName, size } = req.body

    // 完整文件路径
    const filePath = path.resolve(UPLOAD_DIR_FILE, fileHash + extractExt(fileName))
    console.log('filePath', filePath, 'llll', fse.existsSync(filePath));

    if (!fse.existsSync(UPLOAD_DIR_FILE)) {
      await fse.mkdir(UPLOAD_DIR_FILE)
    }

    // 如果不存在该文件，就合并文件
    const chunkDir = path.resolve(UPLOAD_DIR, fileHash) // 切片总目录

    // 如果已经存在该文件，就没必要合并
    if (fse.existsSync(filePath)) {
      await fse.remove(chunkDir)
      return res.json({
        status: 200403,
        msg: '文件已存在，已复用合并'
      })
    }

    // 切片目录不存在，需要重新上传文件
    if (!fse.existsSync(chunkDir)) {
      res.json({
        status: 401,
        msg: '合并失败，请重新上传'
      })
    }

    // 开始合并操作
    const chunkPaths = await fse.readdir(chunkDir) // 所有的切片文件名(数组)
    // console.log(chunkPaths);
    // 将所有切片排序(根据末尾数字排序)
    chunkPaths.sort((a, b) => {
      return a.split('-')[1] - b.split('-')[1]
    })

    const list = chunkPaths.map((chunkName, index) => { // chunkName 每个切片文件名
      return new Promise((resolve) => {
        const chunkPath = path.resolve(chunkDir, chunkName) // 每个切片路径
        // 读取切片内容 读取流
        const readStream = fse.createReadStream(chunkPath)
        // 写入流
        const writeStream = fse.createWriteStream(filePath, { // filePath 完整文件路径
          start: index * size,
          end: (index + 1) * size
        })
        // 将读取流放到写入流中
        readStream.pipe(writeStream)

        // 读取完后, 将切片删除
        readStream.on('end', async () => {
          await fse.unlink(chunkPath)
          resolve()
        })
      })
    })

    // list中所有的文件都合并完后，将存放所有切片的目录删掉
    await Promise.all(list)
    await fse.remove(chunkDir)

    res.json({
      status: 200,
      msg: '合并成功'
    })
  } catch (error) {
    console.log('err', error);
  }
}

module.exports = {
  fileApi,
  mergeApi
};