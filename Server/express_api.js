const express = require('express')
const app = express()
const port = 3000
const { get_ids, get_id, remove, create, startostop, cpu, get_startostop, refresh} = require('./dockerode.js');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
  next();
});

app.get('/:num', async(req, res) => {
 var num = req.params.num;
 return res.send(await get_id(num));
})

app.get('/', async (req, res) => {
 return res.send(await refresh());
})

app.delete('/delete/:id', (req, res) =>{
     var id = req.params.id;

    remove(id)
    return res.send("deleted")
})


app.put('/create/:name/:image', async (req, res) => {
    var name = req.params.name;
    var image = req.params.image;

    return res.send(await create(name, image))
})

app.put("/startostop/:num", (req, res) => {
 var num = req.params.num;
    startostop(num)
    return res.send("completed")
})



app.get("/cpu/:num", async (req, res) => {
   var num = req.params.num;
   console.log(await cpu(num))
  return res.send(await cpu(num))
})

app.get("/isrunning/:num", async (req, res) =>{
  var num = req.params.num;
  return res.send(await get_startostop(num))
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})