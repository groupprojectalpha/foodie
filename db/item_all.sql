SELECT DISTINCT item.* FROM item
JOIN list_item li on li.item = item.id
JOIN list l on li.list = l.id
WHERE l.shopper = $(id)
ORDER BY rank DESC
LIMIT 25 