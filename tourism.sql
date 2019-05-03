# Host: localhost  (Version: 5.5.53)
# Date: 2019-04-25 20:11:11
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "accommodation"
#

CREATE TABLE `accommodation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '商家名称',
  `des` varchar(255) NOT NULL DEFAULT '' COMMENT '简介',
  `img` varchar(255) NOT NULL DEFAULT '' COMMENT '图片',
  `address` varchar(255) NOT NULL DEFAULT '' COMMENT '位置',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='住宿信息表';

#
# Data for table "accommodation"
#

INSERT INTO `accommodation` VALUES (4,'乐山酒店','这里是乐山酒店','public/uploads/attr.jpg','四川省乐山市');

#
# Structure for table "admin"
#

CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adminname` varchar(255) NOT NULL DEFAULT '' COMMENT '管理员名字',
  `password` varchar(255) NOT NULL DEFAULT '' COMMENT '管理员密码',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='管理员表';

#
# Data for table "admin"
#

INSERT INTO `admin` VALUES (1,'admin','123');

#
# Structure for table "attractions"
#

CREATE TABLE `attractions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `des` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  `img` varchar(255) NOT NULL DEFAULT '' COMMENT '景点图片',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '景点名称',
  `price` float(8,2) NOT NULL DEFAULT '0.00' COMMENT '门票价格',
  `address` varchar(255) NOT NULL DEFAULT '' COMMENT '位置',
  `interest` varchar(255) NOT NULL DEFAULT '' COMMENT '兴趣爱好',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COMMENT='景点表';

#
# Data for table "attractions"
#

INSERT INTO `attractions` VALUES (36,'这里是乐山大佛景区','public/uploads/banner.jpg','乐山大佛',99.00,'四川省乐山市','佛教'),(37,'乐山市乐山市乐山市乐山市乐山市','public/uploads/9afc6a37c2506b9eaee0bc2a232c9c0.jpg','乐山寺',5599.00,'乐山市','佛教'),(38,'顶顶顶顶顶','public/uploads/111.png','多对都',5599.00,'动懂','民族');

#
# Structure for table "class"
#

CREATE TABLE `class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `con` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COMMENT='兴趣';

#
# Data for table "class"
#

INSERT INTO `class` VALUES (20,'佛教'),(22,'道教');

#
# Structure for table "comment"
#

CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `t_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '游记id',
  `content` varchar(255) NOT NULL DEFAULT '' COMMENT '评论内容',
  `create_time` varchar(255) NOT NULL DEFAULT '' COMMENT '评论时间',
  `f` varchar(11) NOT NULL DEFAULT '0' COMMENT '评论人',
  `t` varchar(11) NOT NULL DEFAULT '0' COMMENT '接收人',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COMMENT='游记评论表';

#
# Data for table "comment"
#

INSERT INTO `comment` VALUES (24,17,'评论游记','1555165415476','user5','0'),(25,17,'自己回复自己','1555165427147','user5','0'),(26,17,'评论你','1555165476063','user2','0'),(27,17,'8888','1555165503073','user2','0'),(28,17,'胡很快就会','1555165509764','user2','0'),(29,17,'范德萨范德萨','1555165734311','user2','0'),(30,17,'发的顺丰','1555165970076','user2','user2'),(31,18,'评论这篇游记','1555166171356','user6',''),(32,18,'自己评论自己一次','1555166181494','user6','user6'),(33,18,'我来评论你','1555166212143','user5','user6');

#
# Structure for table "food"
#

CREATE TABLE `food` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '店铺名称',
  `des` varchar(255) NOT NULL DEFAULT '' COMMENT '店铺描述',
  `img` varchar(255) NOT NULL DEFAULT '' COMMENT '图片',
  `price` float(8,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '人均消费',
  `address` varchar(255) NOT NULL DEFAULT '' COMMENT '位置',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='餐饮';

#
# Data for table "food"
#

INSERT INTO `food` VALUES (12,'乐山饭店','这里是乐山饭店','public/uploads/111.png',100.00,'四川省乐山市');

#
# Structure for table "recreation"
#

CREATE TABLE `recreation` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '名称',
  `des` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  `img` varchar(255) NOT NULL DEFAULT '' COMMENT '图片',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='娱乐';

#
# Data for table "recreation"
#

INSERT INTO `recreation` VALUES (5,'乐山ktv','乐山ktv乐山ktv乐山ktv乐山ktv','public/uploads/237e592afecbd6e2d65f4f8f05f28a8.png');

#
# Structure for table "topic"
#

CREATE TABLE `topic` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL DEFAULT '' COMMENT '内容',
  `img` varchar(255) NOT NULL DEFAULT '' COMMENT '图片',
  `u_id` varchar(255) NOT NULL DEFAULT '' COMMENT '发布人id',
  `create_time` varchar(255) NOT NULL DEFAULT '' COMMENT '发布时间',
  `title` varchar(255) NOT NULL DEFAULT '' COMMENT '标题',
  `tag` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='话题';

#
# Data for table "topic"
#

INSERT INTO `topic` VALUES (15,'11111','public/uploads/banner.jpg','1','1555164367580','123',0),(16,'　【学习进行时】仲春三月，习近平总书记格外忙碌：出席全国两会，访问欧洲三国，主持中央深改委会议、中央政治局会议，同思政课教师座谈……新华社《学习进行时》原创品牌栏目“讲习所”今天推出文章，为您梳理回顾习近平总书记三月份的活动。　【学习进行时】仲春三月，习近平总书记格外忙碌：出席全国两会，访问欧洲三国，主持中央深改委会议、中央政治局会议，同思政课教师座谈……新华社《学习进行时》原创品牌栏目“讲习所”今天推出文章，为您梳理回顾习近平总书记三月份的活动。','public/uploads/b5b17dc9f20a3e658e0cb9c96e57807f.jpg','1','1555164624222','习近平的2019·三月：在春天里深耕厚植',1),(18,'一次打喷嚏能打200个？过敏性鼻炎不致命，却能折磨1亿中国人一次打喷嚏能打200个？过敏性鼻炎不致命，却能折磨1亿中国人一次打喷嚏能打200个？过敏性鼻炎不致命，却能折磨1亿中国人一次打喷嚏能打200个？过敏性鼻炎不致命，却能折磨1亿中国人一次打喷嚏能打200个？过敏性鼻炎不致命，却能折磨1亿中国人一次打喷嚏能打200个？过敏性鼻炎不致命，却能折磨1亿中国人','public/uploads/2044af2e9fb6ac091ec955bd14925ee.png','1','1555166147918','一次打喷嚏能打200个？过敏性鼻炎不致命',1);

#
# Structure for table "user"
#

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(255) NOT NULL DEFAULT '' COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='用户表';

#
# Data for table "user"
#

INSERT INTO `user` VALUES (1,'user1','123'),(3,'123','123'),(4,'user2','123'),(5,'user5','123'),(6,'user6','123');

#
# Structure for table "way"
#

CREATE TABLE `way` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cls` varchar(255) NOT NULL DEFAULT '' COMMENT '分类',
  `route` varchar(255) NOT NULL DEFAULT '' COMMENT '路线',
  `route_detail` varchar(255) NOT NULL DEFAULT '' COMMENT '路线详情',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='路线';

#
# Data for table "way"
#

INSERT INTO `way` VALUES (1,'佛教','37,36','乐山寺|public/uploads/9afc6a37c2506b9eaee0bc2a232c9c0.jpg,乐山大佛|public/uploads/banner.jpg'),(2,'佛教','36','乐山大佛|public/uploads/banner.jpg');
