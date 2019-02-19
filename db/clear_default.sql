delete from list_item
where list = (select id from list where name='clearabledefault' and shopper = ${id})