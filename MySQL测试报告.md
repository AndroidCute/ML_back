# 测试 MySQL 断线重连，跨库操作

## 断线重连

将载有 MySQL数据库的 docker 容器停止后，前端请求错误，但后台程序仍然运行中，docker 容器重启，前端请求成功。

## 数据库跨库操作

### 多库连接

* /config/plugin.js

```js
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
```

* /config/config.local.js

```js
exports.mysql = {
  clients: {
    db1: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'password',
      database: 'databasename1',
    },
    db2: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'password',
      database: 'databasename2',
    },
  },
  app: true,
  agent: false,
};
```

* service 操作

```js
const client1 = app.mysql.get('db1');
const res1 = yield client1.get(tablesname, {where});

const client2 = app.mysql.get('db2');
const res2 = yield client2.get(tablesname, {where});
```

```js
const client1 = app.mysql.get('db1');
const res1 = yield client1.insert(tables.user, {
  nickname: "name",
  mobile: "15733204444",
  password: "111111",
});
const client2 = app.mysql.get('db2');
const res2 = yield client2.insert(tables.avatar, {
  avatar: 'avatar',
});
```
