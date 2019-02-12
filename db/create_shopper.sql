INSERT INTO shopper (name, email, hash, state, phone)
  VALUES (${name} , ${email} , ${hash} , ${state} , ${phone})
  returning *