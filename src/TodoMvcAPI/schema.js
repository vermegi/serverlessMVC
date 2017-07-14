var graphql = require ('graphql');  
var mongoose = require('mongoose');

mongoose.connect(GetEnvironmentVariable('cosmosconnection'), function (error) {
  if (error) console.error(error)
  else console.log('mongo connected')
});

var TODO;
if (mongoose.models.Todo) {
    TODO = mongoose.model('Todo');
} else {
    TODO = mongoose.model('Todo', {  
        id: mongoose.Schema.Types.ObjectId,
        title: String,
        completed: Boolean
    });
}

var TodoType = new graphql.GraphQLObjectType({  
  name: 'todo',
  fields: function () {
    return {
      id: {
        type: graphql.GraphQLID
      },
      title: {
        type: graphql.GraphQLString
      },
      completed: {
        type: graphql.GraphQLBoolean
      }
    }
  }
});

var queryType = new graphql.GraphQLObjectType({  
  name: 'Query',
  fields: () => ({
    todos: {
      type: new graphql.GraphQLList(TodoType),
      resolve: () => {
        return new Promise((resolve, reject) => {
          TODO.find((err, todos) => {
            if (err) reject(err)
            else resolve(todos)
          })
        })
      }
    }
  })
})

var MutationAdd = {  
  type: TodoType,
  description: 'Add a Todo',
  args: {
    title: {
      name: 'Todo title',
      type: new graphql.GraphQLNonNull(graphql.GraphQLString)
    }
  },
  resolve: (root, args) => {
    var newTodo = new TODO({
      title: args.title,
      completed: false
    })
    newTodo.id = newTodo._id
    return new Promise((resolve, reject) => {
      newTodo.save(function (err) {
        if (err) reject(err)
        else resolve(newTodo)
      })
    })
  }
}

var MutationType = new graphql.GraphQLObjectType({  
  name: 'Mutation',
  fields: {
    add: MutationAdd
  }
});

module.exports = new graphql.GraphQLSchema({  
  query: queryType,
  mutation: MutationType
});

