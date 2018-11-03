CREATE TABLE IF NOT EXISTS `user` (
    `id` int(16) UNSIGNED NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(64) DEFAULT NULL UNIQUE,
    `mobile` TEXT NOT NULL,
    `password` VARCHAR(128) NOT NULL DEFAULT '',
    `status` INT(8) DEFAULT 0,
    `created` DATETIME NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY ( `id` )
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `student` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '本表自增主键',
  `name` varchar(40) NOT NULL COMMENT '姓名',
  `avatar` varchar(240) NOT NULL COMMENT '头像url',
  `card` varchar(40) NOT NULL COMMENT '学号',
  `sex` tinyint(3) DEFAULT 0 COMMENT '性别,2男,1女',
  `age` int(10) DEFAULT 0 COMMENT '年龄',
  `native` varchar(80) NOT NULL DEFAULT '' COMMENT '籍贯',
  `science` varchar(80) NOT NULL DEFAULT '' COMMENT '系别',
  `specialty` varchar(40) NOT NULL DEFAULT '' COMMENT '专业',
  `class` varchar(40) NOT NULL DEFAULT '' COMMENT '班级',
  PRIMARY KEY (`id`),
  UNIQUE KEY (`card`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='学生学籍表';

