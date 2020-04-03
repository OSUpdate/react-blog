create database blog;

create table board(
	board_name varchar(30) not null primary key,
	parent varchar(30) null,
	orderNo INT not null
);
create table userinfo(
	id varchar(50) not null primary key,
	password varchar(30) not null,
	email varchar(50) not null
);
create table post(
	num INT not null AUTO_INCREMENT PRIMARY KEY,
	title varchar(30) not null,
    content varchar(2000) null,
	board varchar(30) not null,
    hits INT unsigned not null default '0',
    insert_date datetime,
    update_date datetime
);
create table comments(
	num int not null auto_increment primary key,
    comment varchar(500) not null,
    post varchar(30) not null,
    insert_date datetime,
    update_date datetime,
    nickname varchar(50) not null,
    password varchar(30) null
);