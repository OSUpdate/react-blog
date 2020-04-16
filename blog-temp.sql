create database blog;

create table board(
	board_name varchar(30) not null unique key,
	parent varchar(30) null,
	orderNo INT auto_increment not null primary key
);
create table userinfo(
	id varchar(50) not null primary key,
	password varchar(30) not null,
	email varchar(50) not null,
    logged datetime null,
    create_date datetime not null
);
create table post(
	num INT not null AUTO_INCREMENT PRIMARY KEY,
    board_num INT not null,
	title varchar(70) not null,
    content varchar(2000) null,
	board varchar(30) not null,
    hits INT unsigned not null default '0',
    insert_date datetime,
    update_date datetime
);
create table comments(
	num int not null auto_increment primary key,
    comment varchar(500) not null,
    post varchar(70) not null,
    parent int null,
    insert_date datetime,
    update_date datetime,
    nickname varchar(50) not null,
    group_no int not null,
    password varchar(30) null
);
CREATE TABLE logged (
    `token` VARCHAR(100) NULL,
    `uid` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`uid`)
);
create table visit(
	num int not null auto_increment primary key,
	ip varchar(20) not null,
    visit_date datetime,
    page varchar(300) not null
);
insert into board (board_name,parent) values ("공지사항",null);
insert into board (board_name,parent) values ("임시 게시
bn
",null);