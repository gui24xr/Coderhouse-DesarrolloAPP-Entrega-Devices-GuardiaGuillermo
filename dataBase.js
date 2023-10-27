import * as SQLite from "expo-sqlite";

//id null en el insert para que autoasigne ID

const initDB = (db) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS fotos_tomadas (id INTEGER PRIMARY KEY,path_pic TEXT, path_map TEXT)",
        [],
        () => resolve(),
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

const insertRegisterDB = (db, path_pic, path_map) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO fotos_tomadas (id,path_pic, path_map) VALUES (?,?,?);",
        [null, path_pic, path_map],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

const selectDB = (db) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM fotos_tomadas",
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

export { initDB, selectDB, insertRegisterDB };
