import express from 'express';
import routes  from './routes';
const cors = require("cors");
const app = express()
const PORT = process.env.PORT || 3000;

const fs = require("fs");


app.get('/', (req, res) => {
  
  fs.readFile('./api/index.html', function (err: any, html: any) {
    if (err) {
        throw err; 
    }       
     
    res.write(html) 
    res.end() 
});
})

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})


//parar poder receber arquivos json
app.use(express.json());

//habilitando cors
app.use(cors());

//centralizando todas as rotas
app.use("/api", routes)




