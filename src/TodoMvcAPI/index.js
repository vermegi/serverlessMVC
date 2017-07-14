var { graphql, buildSchema } = require('graphql');
var Schema = require('./schema');

var query = 'query { todos { id, title, completed } }';

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    graphql(Schema, query)
        .then((response) => {
            context.log(response);
            context.res = { body:response};
            context.done(); 
        });
};
