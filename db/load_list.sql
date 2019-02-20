select item.* from item
join list_item li on li.item = item.id
where list = ${list}
limit ${limit}