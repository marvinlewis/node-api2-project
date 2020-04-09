const express = require("express");

const router = express.Router();

const db = require("./data/db");

router.get("/", (req, res) => {
  db.find()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(200).json({
        error: "error finding query",
      });
    });
});

router.post("/", (req, res) => {
    console.log("dfasfasdfsdaf",req.body)
  db.insert(req.body)
    .then((postId) => {
      res.status(201).json(postId);
    })
    .catch((err) => {
      res.status(404).json({
        error: "working on some things on our end....",
      });
    });
});

router.post("/:id/comments", (req, res) => {
    db.insertComment(req.body)
    .then(commentId => {
        res.status(200).json(commentId)
    })
    .catch(err => {
        res.status(202).json({
            error : "comment not added succesfully"
        })
    })
})

router.get("/:id", (req, res) => {
    db.findById(req.params.id)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        res.status(404).json({
            message : "something went wrong"
        })
    })
})

router.get("/:id/comments", (req, res) => {
    db.findCommentById(req.params.id)
    .then(comment => {
        res.status(200).json(comment)
    })
    .catch(err => {
        res.status(404).json({
            error : "error"
        })
    })
})

router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
    .then(item => {
        console.log(item)
        res.status(200).json({
            message: "deleted"  
        })
    })
})

router.put("/:id", (req, res) => {
    const changes = req.body;
    console.log(changes);
    db.update(req.params.id, changes)
    .then(count => {
        if (count) {
        res.status(200).json(count)
    } else {
        res.status(404).json({
            error : "no luck"
        })
    }
        })
    .catch(err => {
        res.status(404).json({
            error : "error"
        })
    }) 
})


module.exports = router;
