CREATE TABLE IF NOT EXISTS auth (
    id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS guess (
    id VARCHAR(255) NOT NULL,
    guess VARCHAR(30) NOT NULL,
    nb_try INT NOT NULL,
    day timestamp NOT NULL,
    indice VARCHAR(30) NOT NULL
);