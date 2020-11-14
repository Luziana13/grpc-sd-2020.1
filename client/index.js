// definição do caminho do arquivo proto
const PROTO_PATH = "./pizzaria.proto";

const grpc = require('grpc');

const protoLoader = require('@grpc/proto-loader');

// carregamento do arquivo proto e geração das definições
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
});
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition).pizzaria;

const client = new protoDescriptor.PizzaService('localhost:50051', grpc.credentials.createInsecure());

/*
client.ConsultarPizzas({}, function(err,response){
   if(err!=null){
        console.log("erro");
        return;
    }
    console.log(response.pizzas);
});
client.ConsultarUmaPizzas({index: 2}, function(err,response){
    if(err!=null){
        console.log("erro");
        return;
    }
    const pizza = response;
    console.log(pizza);
});*/

client.CadastrarPizzas({nome: "Bacon", foto: "sfsafasf", preco: 31.50}, function(err,response){
    if(err!=null){
        console.log("erro");
        return;
    }
   
    console.log("deu certo amém");
    client.ConsultarPizzas({}, function(err,response){
        if(err!=null){
             console.log("erro");
             return;
         }
         console.log(response.pizzas);
     });
});