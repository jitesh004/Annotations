const express = require("express");
const app = express();
const port = 3001;

const images_model = require("./images_model");
const annotates_model = require("./annotates_model");
const comments_model = require("./comments_model");

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/getImages", (req, res) => {
  images_model
    .getImages()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/uploadImage", (req, res) => {
  images_model
    .createImages(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/:id/deleteImage", (req, res) => {
  console.log(req.params);
  images_model
    .deleteImage(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/:id/getAnnotates", (req, res) => {
  console.log(req.params);
  annotates_model
    .getAnnotates(req.params.id)
    .then((response) => {
      const annotates = [];
      response &&
        response.rows &&
        response.rows.length &&
        response.rows.map((row) => {
          const temp = row.annotates_position;
          temp.id = row.id;
          annotates.push(temp);
        });
      res.status(200).send(annotates);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/setAnnotates", (req, res) => {
  console.log(req.body);
  annotates_model
    .setAnnotates(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/:id/deleteAnnotate", (req, res) => {
  annotates_model
    .deleteAnnotates(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/:id/getComments", (req, res) => {
  console.log(req.params);
  comments_model
    .getComments(req.params.id)
    .then((response) => {
      const comments = [];
      response &&
        response.rows &&
        response.rows.length &&
        response.rows.map((row) => {
          comments.push({
            createdAt: row.created_date,
            fullName: row.fullname,
            text: row.comment,
          });
        });
      res.status(200).send(comments);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/setComment", (req, res) => {
  console.log(req.body);
  comments_model
    .setComments(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
