'use strict';

// node.js 文件操作对象
const fs = require('fs');
// node.js 路径操作对象
const path = require('path');
// 故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
// 当然你也可以不使用这个 哈哈 个人比较赖
// 还有我们这里使用了egg-multipart
const md5 = require('md5');
const { newErrorWithMessage, error } = require('../utils/error');

module.exports = app => {
  class UploadController extends app.Controller {
    * upload() {
      const { ctx } = this;
      // egg-multipart 已经帮我们处理文件二进制对象
      // node.js 和 php 的上传唯一的不同就是 ，php 是转移一个 临时文件
      // node.js 和 其他语言（java c#） 一样操作文件流
      const stream = yield ctx.getFileStream();
      // 新建一个文件名
      const filename = md5(stream.filename) + path
          .extname(stream.filename)
          .toLocaleLowerCase();
      // 文件生成绝对路径
      // 当然这里这样是不行的，因为你还要判断一下是否存在文件路径
      const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
      // 生成一个文件写入 文件流
      const writeStream = fs.createWriteStream(target);
      ctx.logger.info('Upload:', filename);
      try {
        // 异步把文件流 写入
        yield awaitWriteStream(stream.pipe(writeStream));
      } catch (err) {
        // 如果出现错误，关闭管道
        yield sendToWormhole(stream);
        ctx.body = newErrorWithMessage(error.ErrUpload, '上传文件出错');
      }
      // 文件响应
      ctx.body = newErrorWithMessage(error.ErrSucceed, { url: 'http://127.0.0.1:7001/public/uploads/' + filename });
    }
  }

  return UploadController;
};
