const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require("cors")

app.use(cors())
app.use(express.json())

//database connection
const db = mysql.createConnection({
    user: 'mirayna',
    host: ' http://localhost:3306',
    password: 'Myql7700**',
    database: 'mirayna',
    // 'http://coding-challenge.csxeniesqyv1.us-east-2.rds.amazonaws.com/'
})


//gets clusters
app.get("/clusters", (req, res) =>{
    const search = req.params.search
    db.query('SELECT * FROM feedback_clusters WHERE title LIKE ?', '%'+search+'%', (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      })
    return
});

//gets unaccepted or accepted clusters
app.get("/clusters/accepted", (req, res) =>{
    const accepted = req.params.accepted
    const search = req.params.search
    db.query('SELECT * FROM feedback_clusters WHERE feedback_clusters.accepted = ? AND title LIKE ?',[accepted, '%'+search+'%'], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      })
    return
});

//gets only unclustered sentences
app.get("/unclustered", (req, res) => {
    const search = req.params.search
    db.query('SELECT * FROM feedback_sentences LEFT JOIN sentence_cluster_mapping ON feedback_sentences.id = sentence_cluster_mapping.sentence_id WHERE sentence_cluster_mapping.sentence_id IS NULL AND sentence_text LIKE ?', '%'+search+'%', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
    return
});

//gets and orders sentences from feedback entry
app.get("/entry", (req, res) => {
    const entryid = req.params.entry
    db.query('SELECT * FROM Customers WHERE feedback_entry_id = ? ORDER BY order_within_feedback_entry', entryid, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      })
})

//changes accepted status
app.put("/acceptance", (req, res) =>{
    const id = req.body.id;
    const accept = req.body.accept
    db.query('UPDATE feedback_clusters SET accepted = ? WHERE id = ?', [accept, id], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      })
});

//deletes sentence from cluster
app.delete("/deletemapping", (req, res) =>{
    const sentence = req.params.sentence_id;
    const cluster = req.params.cluster_id;
    db.query("DELETE FROM sentence_cluster_mapping WHERE sentence_id = ? AND cluster_id = ?", [sentence, cluster], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
});

//creates mapping between cluster and sentence
app.post("/map", (req, res) => {
    const sentence = req.params.sentence_id;
    const cluster = req.params.cluster_id;
    db.query(
        "INSERT INTO sentence_cluster_mapping (sentence_id, cluster_id) VALUES (?,?)",
        [sentence, cluster],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Values Inserted");
          }
        }
      );
});

app.listen(3306, () => {
    console.log('listening')
})