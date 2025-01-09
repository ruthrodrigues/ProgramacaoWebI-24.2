const express = require('express')
const app = express()

app.listen(3000,()=>{
  console.log("Servidor executando na porta 3000")
})

app.get('/',(req,res)=>{
    res.send("Olá")
})
app.get('/v2/:name',(req,res)=>{
    res.send("Hello " +     req.params.name)
})
app.get('/v3/us/:name',(req,res)=>{
    res.json({msg: "Hello " +     req.params.name,
        return:"valid"})
})

app.get('/v3/pt-br/:name',(req,res)=>{
    res.json({msg: "Olá " +     req.params.name,
        return:"valid"})
})

app.get('/v3/es/:name',(req,res)=>{
    res.json({msg: "Hola " +     req.params.name,
        return:"valid"})
})
app.get('/*',(req,res)=>{
    res.json({return:"invalid"})
})