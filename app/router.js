
'use strict';

module.exports = app => {
  const auth = app.middlewares.auth();

  // user
  app.post('/user/register', 'user.register');
  app.post('/user/user', app.jwt, 'user.searchUserById');
  app.get('/user/all', app.jwt, 'user.getAllUser');
  app.post('/user/password/modify', app.jwt, 'user.modifyPassword');
  app.post('/user/delete', app.jwt, 'user.delete');
  app.post('/user/ban', app.jwt, 'user.ban');
  app.post('/user/resume', app.jwt, 'user.resume');
  app.post('/user/login', 'user.login');
  app.post('/user/userinfo/modify', app.jwt, 'user.modifyInfo');
  app.post('/user/userinfo/get', app.jwt, 'user.getUserInfoById'); // 根据 id 获取用户信息
  app.get('/user/info', app.jwt, 'user.info'); // 获取当前登录用户的信息
  app.get('/auth', app.jwt, auth, 'user.testAuth');

  // test
  app.get('/test/multiQuery', 'test.multiQuery');
  app.get('/test/multiInsert', 'test.multiInsert');
  app.get('/test/knex', 'test.knexTest');

  // goods
  app.post('/student/create', 'student.create');
  app.get('/student/getAll', 'student.getAll');
  app.post('/student/getList', 'student.getList');
  app.post('/student/modify', 'student.modify');
  app.post('/student/deleted', 'student.deleted');
  app.get('/student/pieAgeCount', 'student.pieAgeCount');

  // upload
  app.post('/upload/avator', 'upload.upload');
};
