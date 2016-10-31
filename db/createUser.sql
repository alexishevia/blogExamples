-- usage:
--   db.createUser(['foo@bar.com', 'foobarpwd'], cb)

INSERT INTO "user"(email, password)
     VALUES (lower($1), crypt($2, gen_salt('bf', 8)))
  RETURNING id, email;
