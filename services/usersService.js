const pool = require('../db');

const usersService = {
  test() {
    db.query("SELECT * FROM cc_users", (err, results) => {
      if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
      } else {
        res.json(results);
      }
    
      console.log("Database connected successfully.");
    });
  }
}