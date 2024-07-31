const app = require("./app");
const port = process.env.API_PORT;
const host = process.env.API_HOST;

app.listen(port, function () {
    console.log(`                                                                                
    Servidor de aplicação rodando no endereço: http://${host}:${port} \n\n`);
});
