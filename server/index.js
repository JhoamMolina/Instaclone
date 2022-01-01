const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolver");

require("dotenv").config({ path: ".env"});


mongoose.connect(process.env.BBDD, {
}, (err, _) => {
    if(err) {
        console.log("Error de conexion")
    } else {
        server();
    }
})

function server() {
    const serverApollo = new ApolloServer({
        typeDefs,
        resolvers
    });

    serverApollo.listen().then(({url}) => {
        console.log("#################");
        console.log(`Servidor listo en la URL ${url}`);
        console.log("#################");
    });
}