const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const { allRoutes } = require('./src/routes/exportRoutes');
const swaggerDocs = require('./src/swagger/swaggerConfig');

dotenv.config()

const app = express();
const port = process.env.PORT || 4000

app.use(cors());
app.use(express.json());

swaggerDocs(app);

app.use(allRoutes)

app.get("/", (req, res) =>{
    return res.status(200).json("Hello world!")
})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
    console.log(`Documentação Swagger disponível em http://localhost:${port}/api-docs`);
})