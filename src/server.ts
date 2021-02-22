import * as express from 'express';

const app = express();

app.get("/", (request, response) => {
    return response.send('Hello World')
})

app.post("/", (request, response) => {

    return response.json({message: "dados recebidos"})

})

app.listen(3333, () => console.log("Servidor iniciado!"))