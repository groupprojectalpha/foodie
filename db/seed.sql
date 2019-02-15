CREATE TABLE brand (
	id SERIAL PRIMARY KEY,
	name TEXT
);

INSERT INTO brand (name)
	VALUES ('Foodie');

CREATE TABLE item (
	id SERIAL PRIMARY KEY ,
	name VARCHAR(150) ,
	type VARCHAR(150) ,
	brand INT REFERENCES brand(id) ,
	itemcode TEXT UNIQUE ,
	rank INT DEFAULT 0 ,
	price INT DEFAULT 2,
	image TEXT DEFAULT 'https://www.unesale.com/ProductImages/Large/notfound.png'
);

insert into item (name, type, brand, itemcode, price) values ('Compound - Rum', 'alcohol', 1, 'SQXlr85L', 313);
insert into item (name, type, brand, itemcode, price) values ('Pastry - Baked Cinnamon Stick', 'Dr. Pepper - 355ml', 1, 'YFEAk6lUVlK0', 329);
insert into item (name, type, brand, itemcode, price) values ('Chips Potato All Dressed - 43g', 'Wood Chips - Regular', 1, 'jibHYLHjq', 922);
insert into item (name, type, brand, itemcode, price) values ('Truffle Shells - White Chocolate', 'Foie Gras', 1, 'UgqylIZ', 740);
insert into item (name, type, brand, itemcode, price) values ('Dill - Primerba, Paste', 'Jameson - Irish Whiskey', 1, 'NNvmQNek9D', 386);
insert into item (name, type, brand, itemcode, price) values ('Scallops - In Shell', 'Coffee - Dark Roast', 1, '0jxvq1', 466);
insert into item (name, type, brand, itemcode, price) values ('Bread - 10 Grain', 'Cheese - Grie Des Champ', 1, 'ljnRYgp', 853);
insert into item (name, type, brand, itemcode, price) values ('Lychee', 'Amaretto', 1, 'LPmIT7m2', 657);
insert into item (name, type, brand, itemcode, price) values ('Pesto - Primerba, Paste', 'Assorted Desserts', 1, 'yyMcBOTxJYlQ', 656);
insert into item (name, type, brand, itemcode, price) values ('Wine - Niagara,vqa Reisling', 'Wine - Magnotta, White', 1, 'cTaAOipo', 450);
insert into item (name, type, brand, itemcode, price) values ('Puree - Pear', 'Beer - True North Strong Ale', 1, 'E2vsMXhyZ', 893);
insert into item (name, type, brand, itemcode, price) values ('Tea - Black Currant', 'Bagel - Plain', 1, 'XUHiabO', 791);
insert into item (name, type, brand, itemcode, price) values ('Pizza Pizza Dough', 'Cheese - Manchego, Spanish', 1, 'Nxe5pee0neqz', 722);
insert into item (name, type, brand, itemcode, price) values ('Durian Fruit', 'Cookies - Englishbay Oatmeal', 1, 'mQ0jnidN', 970);
insert into item (name, type, brand, itemcode, price) values ('Tomato - Green', 'Cookie Dough - Peanut Butter', 1, 'A6Z9DZBWJl52', 578);
insert into item (name, type, brand, itemcode, price) values ('Cod - Black Whole Fillet', 'Doilies - 8, Paper', 1, 'O2UN6FlV', 138);
insert into item (name, type, brand, itemcode, price) values ('Chicken - Whole Fryers', 'Sauce - Sesame Thai Dressing', 1, 'hq6zo4mWI', 910);
insert into item (name, type, brand, itemcode, price) values ('Onions - Dried, Chopped', 'Beans - Fava Fresh', 1, 'T2Bi21', 623);
insert into item (name, type, brand, itemcode, price) values ('Beef Dry Aged Tenderloin Aaa', 'Water - Tonic', 1, 'yrDIgGXaRZA', 109);
insert into item (name, type, brand, itemcode, price) values ('Wine - White, Schroder And Schyl', 'Chicken - Tenderloin', 1, 'BnV4UIgH', 334);
	

CREATE TABLE shopper (
	id SERIAL PRIMARY KEY ,
	name VARCHAR(20) ,
	phone NUMERIC(10,0) ,
	hash CHAR(60) ,
	state CHAR(2) ,
	registered BOOLEAN DEFAULT true,
	budget INT DEFAULT NULL,
  email VARCHAR(150),
	default_list INT,
	uid BIGINT,
);

INSERT INTO shopper ( name , phone , hash , state)
	VALUES ('Teddy' , 5555555555 , '$2a$10$/ApxldeLIY2t18.FhfKLVOv6nxLhFpbJ789g9ID1NxWvLU7emCy16' , 'UT' , 'teddy@test.com');

CREATE TABLE store (
	id SERIAL PRIMARY KEY ,
	name TEXT ,
	store_id TEXT UNIQUE
);

INSERT INTO store (name , store_id)
	VALUES ('Foodie inc,' , 'foodie test');

CREATE TABLE list (
	id SERIAL PRIMARY KEY ,
	shopper INT REFERENCES shopper(id) ,
	name VARCHAR(20)
);

CREATE TABLE list_item (
	id SERIAL PRIMARY KEY ,
	item INT REFERENCES item(id) ,
	list INT REFERENCES list(id)
);

CREATE TABLE user_store (
	id SERIAL PRIMARY KEY ,
	store INT REFERENCES store(id) ,
	shopper INT REFERENCES shopper(id)
);

CREATE TABLE store_item (
	id SERIAL PRIMARY KEY ,
	item INT REFERENCES item(id) ,
	store INT REFERENCES store(id)
);

INSERT INTO store_item (item , store)
	VALUES (1 , 1 ),
	(2 , 1 ),
	(3 , 1 ),
	(4 , 1 ),
	(5 , 1 ),
	(6 , 1 ),
	(7 , 1 ),
	(8 , 1 ),
	(9 , 1 ),
	(10 , 1 ),
	(11 , 1 ),
	(12 , 1 ),
	(13 , 1 ),
	(14 , 1 ),
	(15 , 1 ),
	(16 , 1 ),
	(17 , 1 ),
	(18 , 1 ),
	(19 , 1 ),
	(20 , 1 );

