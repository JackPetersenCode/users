const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(express.static("public"));
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
//app.get('/', (request, response) => {
//    response.json({ info: 'Node.js, Express, and Postgres API' })
//})
app.get('/', (req, res, next) =>{
    res.sendFile(__dirname + "/public/htmlpage.html");
})
app.get('/script.js', function(req, res) {
    res.sendFile(__dirname + "/public/script.js");
});

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
module.exports = app;