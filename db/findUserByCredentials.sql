SELECT id, email
  FROM "user"
 WHERE email = lower($1)
       AND password = crypt($2, password);
