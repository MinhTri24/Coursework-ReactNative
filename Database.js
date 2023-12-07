import * as SQLite from "expo-sqlite";

const database_name = "Hiking.db";
const database_version = "1.0";
const database_displayname = "Hike Database";
const database_size = 200000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
);

const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS hike (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        location TEXT,
        date TEXT,
        parking TEXT,
        length TEXT,
        time TEXT,
        participants TEXT,
        difficulty TEXT,
        description TEXT
      );`,
      [],
      () => console.log("Database and table created successfully."),
      (error) => console.log("Error occurred while creating the table.", error)
    );
  });
};

const getHikes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM hike",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const getHikeById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM hike WHERE id = ?",
        [id],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

const updateHike = (id, title, location, date, parking, length, time, participants, difficulty, description) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE hike SET title = ?, location = ?, date = ?, parking = ?, length = ?, time = ?, participants = ?, difficulty = ?, description = ? WHERE id = ?",
        [title, location, date, parking, length, time, participants, difficulty, description, id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteHike = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM hike WHERE id = ?",
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteAllHikes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM hike",
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

const addHike = (title, location, date, parking, length, time, participants, difficulty, description) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO hike (title, location, date, parking, length, time, participants, difficulty, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [title, location, date, parking, length, time, participants, difficulty, description],
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const Database = {
  initDatabase,
  addHike,
  updateHike,
  getHikes,
  getHikeById,
  deleteHike,
  deleteAllHikes
};

export default Database;