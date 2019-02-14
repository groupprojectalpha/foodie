SELECT DISTINCT i.* FROM item i
JOIN list_item li on i.id = li.item
JOIN list l on l.id = li.list
JOIN shopper s on l.shopper = s.id
JOIN store_item si on si.item = i.id
JOIN store st on st.id = si.store
WHERE i.name ILIKE ${searchTerm} AND s.id != ${id} AND st.id = ${store}