CREATE TABLE "todo" (
  "id" SERIAL NOT NULL PRIMARY KEY,
  "text" TEXT,
  "completedAt" TIMESTAMPTZ,
  "deletedAt" TIMESTAMPTZ
);

COMMENT ON TABLE "todo" IS 'canonical todo items table';
COMMENT ON COLUMN "todo"."id" IS 'todo item id';
COMMENT ON COLUMN "todo"."text" IS 'todo item text';
COMMENT ON COLUMN "todo"."completedAt" IS 'timestamp at which the todo was completed';
COMMENT ON COLUMN "todo"."deletedAt" IS 'timestamp at which the todo was deleted';
