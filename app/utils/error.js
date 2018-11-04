/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Co,Ltd..
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2017/07/30        Tang Xiaoji
 */

'use strict';

const error = {
  ErrSucceed: {
    code: 200,
    msg: 'success',
  },
  ErrInvalidParams: {
    code: 0x1,
    msg: 'invalid params',
  },
  ErrMysql: {
    code: 0x2,
    msg: 'mysql error',
  },
  ErrDelete: {
    code: 0x3,
    msg: 'have be deleted',
  },
  ErrMysqlfound: {
    code: 0x4,
    msg: 'mysql ont found',
  },
  ErrNameFormat: {
    code: 0x5,
    msg: 'name format error',
  },
  ErrCardExist: {
    code: 0x6,
    msg: 'student card exist',
  },
  ErrUpload: {
    code: 0x7,
    msg: 'upload file error',
  },

  ErrFaildUpload: {
    code: 400,
    msg: 'faild',
  },

  // 需要登录
  ErrLoginRequired: {
    code: 0x800,
    msg: 'must login',
  },
  ErrPermissionDenied: {
    code: 0x801,
    msg: 'no such permission',
  },

  // 严重错误
  ErrNoConnection: {
    code: 0x1000,
    msg: 'connection error',
  },
  ErrDBOperationFailed: {
    code: 0x1001,
    msg: 'db error',
  },
};

const operateCode = {
  SUCCESS_AFFECTED_ROWS: 1,
};

function newErrorWithMessage(err, msg) {
  return {
    status: err.code,
    msg: msg ? msg : err.msg,
  };
}

function checkParams() {
  for (let i = 0; i < arguments.length; i++) {
    if (!arguments[i]) {
      return false;
    }
  }
  return true;
}

module.exports = {
  error,
  operateCode,
  newErrorWithMessage,
  checkParams,
};
