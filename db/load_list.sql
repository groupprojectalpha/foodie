select * from item i
join list_item li on li.item = i.id
where list = ${list}
limit ${limit}