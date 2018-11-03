'use strict';

const { error, newErrorWithMessage, checkParams, operateCode } = require('../utils/error');

module.exports = app => {
  class UserController extends app.Controller {
    * register() {
      const { ctx } = this;
      const { nickname, mobile, password } = ctx.request.body;
      ctx.logger.warn("Print....", nickname, mobile, password)
      if (!checkParams(nickname, mobile, password)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }
      const res = yield ctx.service.user.register(nickname, mobile, password);
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * searchUserById() {
      const { ctx } = this;
      const { id } = ctx.request.body;
      if (!checkParams(id)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }
      const res = yield ctx.service.user.searchUserById(id);
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed, res);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysqlfound);
      }
    }

    * getAllUser() {
      const { ctx } = this;
      const res = yield ctx.service.user.getAllUser();
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed, res);
      } else {
        ctx.body = newErrorWithMessage(error.ErrNotFound);
      }
    }

    * modifyPassword() {
      const { ctx } = this;
      const { code, oldpass, newpass } = ctx.request.body;
      const token = ctx.state.user;
      if (!checkParams(code, oldpass, newpass)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }

      if (oldpass === newpass) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }

      if (!token) {
        ctx.body = newErrorWithMessage(error.ErrLoginRequired);
        return;
      }

      const res = yield ctx.service.user.modifyPassword(token.id, oldpass, newpass);

      if (res === operateCode.SUCCESS_AFFECTED_ROWS) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * delete() {
      const { ctx } = this;
      const { id } = ctx.request.body;
      if (!checkParams(id)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }
      const res = yield ctx.service.user.deleteUser(id);
      if (res === operateCode.SUCCESS_AFFECTED_ROWS) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrDelete);
      }
    }

    * ban() {
      const { ctx } = this;
      const { id } = ctx.request.body;
      if (!checkParams(id)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }

      const res = yield ctx.service.user.ban(id);
      if (res === operateCode.SUCCESS_AFFECTED_ROWS) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * resume() {
      const { ctx } = this;
      const { id } = ctx.request.body;
      if (!checkParams(id)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }

      const res = yield ctx.service.user.resume(id);
      if (res === operateCode.SUCCESS_AFFECTED_ROWS) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * login() {
      const { ctx } = this;
      const { nickname, password } = ctx.request.body;
      ctx.logger.warn("Print req", ctx.request)
      ctx.logger.warn("Print....", nickname, password)
      if (!checkParams(nickname, password)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }
      const res = yield ctx.service.user.login(nickname, password);
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed, res);
      } else {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams, "账号名或密码错误");
      }
    }

    * modifyInfo() {
      const { ctx } = this;
      const { mobile } = ctx.request.body;
      const token = ctx.state.user;
      if (!token) {
        ctx.body = newErrorWithMessage(error.ErrLoginRequired);
        return;
      }

      const res = yield ctx.service.user.modifyInfo(token.id, mobile);
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    // 根据 id 获取用户
    * getUserInfoById() {
      const { ctx } = this;
      const { id } = ctx.request.body;
      if (!checkParams(id)) {
        ctx.body = newErrorWithMessage(error.ErrInvalidParams);
        return;
      }

      const res = yield ctx.service.user.getUserInfoById(id);
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed, res);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    // 获取当前登录用户的信息
    * info() {
      const { ctx } = this;
      const token = ctx.state.user;
      if (!token) {
        ctx.body = newErrorWithMessage(error.ErrLoginRequired);
        return;
      }

      const res = yield ctx.service.user.getUserInfoById(token.id);
      if (res) {
        ctx.body = newErrorWithMessage(error.ErrSucceed, res);
      } else {
        ctx.body = newErrorWithMessage(error.ErrMysql);
      }
    }

    * testAuth() {
      const { ctx } = this;
      ctx.body = ctx.state.user;
    }
  }
  return UserController;
};
