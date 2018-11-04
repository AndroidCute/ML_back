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
const { newErrorWithMessage, error, operateCode } = require('../utils/error');

module.exports = app => {
  class UploadController extends app.Controller {
    * upload() {
      const { ctx } = this;
      // egg-multipart 已经帮我们处理文件二进制对象
      // node.js 和 php 的上传唯一的不同就是 ，php 是转移一个 临时文件
      // node.js 和 其他语言（java c#） 一样操作文件流
      const stream = yield ctx.getFileStream();

      let file_type = '';

      switch (path.extname(stream.filename)) {
        case '.pptx':
        case '.ppt':
          file_type = 'ppt';
          break;
        case '.doc':
          file_type = 'word';
          break;
        case '.pdf':
          file_type = 'pdf';
          break;
        case '.html':
          file_type = 'html';
          break;
        case '.mp4':
          file_type = 'movie';
          break;
        default:
          newErrorWithMessage(error.ErrFaildUpload, '文件类型错误');
          return;
      }

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
        return;
      }

      const url = 'http://127.0.0.1:7001/public/uploads/' + filename;

      const file = {
        name: stream.filename,
        url,
        file_type,
        create_at: new Date(),
      };

      const res = yield ctx.service.upload.create(file);

      if (res === operateCode.SUCCESS_AFFECTED_ROWS) {
        ctx.body = newErrorWithMessage(error.ErrSucceed, { url });
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);

        // 如果插入数据库失败，删除文件
        fs.unlink(target, function(error) {
          if (error) {
            ctx.logger.error('删除文件', filename, '出错:', error);

            return;
          }
        });
      }
    }

    * files() {
      const { ctx } = this;
      const where = ctx.request.body;
      const res = yield ctx.service.upload.getList(where);
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed, res);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

  }

  return UploadController;
};
