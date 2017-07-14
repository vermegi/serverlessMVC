var { graphql, buildSchema } = require('graphql');
var Schema = require('./schema');

var mutation = 'mutation {  add(title: "Read a book") {id,title}}';

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    var query = context.req.body.query;// 'query { todos { id, title, completed } }';
   
    graphql(Schema, query)
        .then((response) => {
            context.log(response);
            context.res = { body:response};
            context.done(); 
        });
};
