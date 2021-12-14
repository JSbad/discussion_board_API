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

app.get("api/posts/:postId/comments", async (req, res) => {
  const { status, data } = await getComments(req);
  res.status(status);
  if (data) res.json(data);
  else res.end();
});

app.get("api/posts", async (req, res) => {
  const { status, data } = await getPosts(req);
  res.status(status);
  if (data) res.json(data);
  else res.end();
});

app.get("api/posts/:postId", async (req, res) => {
  const { status, data } = await getPosts(req);
  res.status(status);
  if (data) res.json(data);
  else res.end();
});


app.post("api/comments", async (req, res) => {
  const { status, data } = await postComments(req);
  res.status(status);
  if (data) res.json(data);
  else res.end();
});

app.post("api/posts", async (req, res) => {
  const { status, data } = await postPosts(req);
  res.status(status);
  if (data) res.json(data);
  else res.end();
});

async function getComments(req) {
  let status = 500,
    data = null;
  try {
    const postId = req.query.postId;
    if (
      postId &&
      postId.length > 0 &&
      postId.length <= 36 &&
      uuidValidate(postId)
    ) {
      const sql = "SELECT author, comment FROM Comments WHERE postId=? ORDER BY date_created";
      const rows = await db.query(sql, [postId]);

      if (rows) {
        status = 200;
        data = {
          postId: postId,
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

async function getPosts(req) {
  let status = 500,
    data = null;
  try {
    const postId = req.query.postId;
    if (
      postId &&
      postId.length > 0 &&
      postId.length <= 36 &&
      uuidValidate(postId)
    ) {
      const sql = "SELECT author, title, content, counter WHERE postId=?";
      const rows = await db.query(sql, [postId]);

      if (rows) {
        status = 200;
        data = {
          postId: postId,
          posts: rows,
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
    data
  };
}


async function postComments(req) {
  let status = 500,
    data = null;
  try {
    const postId = req.body.postId;
    const author = req.body.author;
    const comment = req.body.comment;
    if (
      postId &&
      author &&
      comment &&
      postId.length > 0 &&
      postId.length <= 36 &&
      uuidValidate(postId) &&
      author.length > 0 &&
      author.length <= 64 &&
      comment.length > 0
    ) {
      const sql =
        "INSERT INTO Comments(postId, author, comment) " + "VALUES(?, ?, ?)";
      const result = await db.query(sql, [postId, author, comment]);
      if (result.affectedRows) {
        status = 201;
        data = {
          postId,
          author,
          comment
        }
      }
    } else {
      status = 400;
    }
  } catch (e) {
    console.error(e);
  }
  return {
    status,
    JSON.stringify(data)
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
