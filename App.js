const express = require("express");
const db = require("./db");
const { v1: uuidv1 } = require("uuid");
const port = 3000;
const app = express();
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get("/express_api", async (req, res) => {
  const { status, data } = await getComments(req);
  res.status(status);
  if (data) res.json(data);
  else res.end();
});

app.post("/express_api", async (req, res) => {
  const { status, data } = await postComments(req);
  res.status(status);
  if (data) res.json(data);
  else res.end();
});

app.put("/express_api", async (req, res) => {
  res.status(405);
  res.end();
});

app.delete("/express_api", async (req, res) => {
  res.status(405);
  res.end();
});

async function getComments(req) {
  let status = 500,
    data = null;
  try {
    const id = req.query.id;
    if (
      id &&
      id.length > 0 &&
      id.length <= 36 &&
      uuidValidate(id)
    ) {
      const sql = "SELECT name, comment FROM Comments WHERE id=?";
      const rows = await db.query(sql, [id]);

      if (rows) {
        status = 200;
        data = {
          id: id,
          comments: rows,
        };
      } else {
        status = 204;
      }
    } else {
      status = 400;
    }
  } catch (e) {
    console.error(e);
  }
  return {
    status,
    data,
  };
}

async function postComments(req) {
  let status = 500,
    data = null;
  try {
    const id = req.body.id;
    const name = req.body.name;
    const comment = req.body.comment;
    if (
      id &&
      name &&
      comment &&
      id.length > 0 &&
      id.length <= 36 &&
      uuidValidate(id) &&
      name.length > 0 &&
      name.length <= 64 &&
      comment.length > 0
    ) {
      const sql =
        "INSERT INTO Comments(id, name, comment) " + "VALUES(?, ?, ?)";
      const result = await db.query(sql, [id, name, comment]);
      if (result.affectedRows) {
        status = 201;
        data = {
          id: result.insertId,
        };
      }
    } else {
      status = 400;
    }
  } catch (e) {
    console.error(e);
  }
  return {
    status,
    data,
  };
}

app.get("/", (req, res) => {
  res.json({
    message: "ok",
  });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
