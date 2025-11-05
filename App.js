const express = require('express')
const mysql = require('mysql2')
const cors = require('cors');



const port = 3000;
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'993450@Awi',
    database:'myDatabase'
})

db.connect((err)=>{
    err == null?console.log("connected"):console.error(err.message)
})

///////////////SQL Commands///////////

const getAll = "Select * from worker";
const getById = "select * from worker where id = ?"
const insertById = "insert into worker (w_name,age,address) values(?,?,?)"
const updateById = "update worker set w_name = ?, age=? ,address=? where id = ?"
const delRec = "delete from worker where id = ?"


////////////End Points/////////////////
app.get("/workers",(req,res)=>{
    db.query(getAll,(err,results)=>{
     if(err) return res.status(500).json({error:err.message})
        else res.json(results)
    })
})

app.get("/workers/:id",(req,res)=>{
  const {id} = req.params
  db.query(getById,id,(err,results)=>{
    if(err) return res.status(500).json({error:err.message})
        else res.json(results)
  })

})

app.post("/workers", (req, res) => {
  const { w_name, age, address } = req.body;
  db.query(insertById, [w_name, age, address], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // ✅ Return full record with auto-generated ID
    res.json({
      id: results.insertId
    });
  });
});


app.put("/workers/:id",(req,res)=>{
    const id = req.params.id
    const {w_name,age,address} = req.body
    db.query(updateById,[w_name,age,address,id],(err,results)=>{
        if(err){
            return res.status(500).json({error:err.message})
        } 
            res.json({"message":"Worker Data Updated Successfully"})
    })
})

app.delete("/workers/:id",(req,res)=>{
    const id = req.params.id
    db.query(delRec,id,(err,results)=>{
        if(err){
            console.error("cannot delete", err)
            res.json({error : "internal error"})
            return;
        }

        res.json({message : "deleted"})
    })
})

app.listen(port,()=>{
    console.log("Server is running")
})
