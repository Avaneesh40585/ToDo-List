CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL
);

INSERT INTO items (title) VALUES ('Buy milk'), ('Finish homework');