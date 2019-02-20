INSERT INTO user_store (store , shopper, nickname)
  VALUES (${storeId} , ${userId} , ${nickname});

SELECT * FROM user_store
WHERE shopper = ${userId};