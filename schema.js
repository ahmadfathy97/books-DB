const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

// book model
const Books = require('./bookModel');

// Book Type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: ()=>({
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    author: {type: GraphQLString},
    pages: {type: GraphQLInt},
    date: {type: GraphQLString}
  })
})

// root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({

    // fetching all books
    Books: {
      type: GraphQLList(BookType),
       resolve(parentValue, args ){
         return Books.find({}, (err, books)=> {
           console.log(books);
           return books;
         })
       }
    },

    // fetching by title
    BookTitle:{
      type: BookType,
      args:{
        title: {type: GraphQLString}
      },
      resolve(parentValue, args){
        return Books.findOne({title: args.title}, (err, book)=>{
          console.log(book);
          return book
        })
      }
    },

    // fetching by author
    BookAuthor: {
      type: GraphQLList(BookType),
      args: {
        author: {type: GraphQLString}
      },
      resolve(parentValue, args){
        return Books.find({author: args.author}, (err, books)=>{
          console.log(books);
          return books
        })
      }
    }
  })
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {

    // add new book
    AddBook: {
      type: BookType,
      args: {
        title: {type: new GraphQLNonNull(GraphQLString)},
        author: {type: new GraphQLNonNull(GraphQLString)},
        date: {type: new GraphQLNonNull(GraphQLString)},
        pages: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, args){
        return Books(args)
        .save((err, book)=>{
          console.log(book);
          return book;
        })
      }
    },

    // delete book
    DeleteBook: {
      type: BookType,
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, args){
        return Books.deleteOne({_id: args._id}, (err, book)=>{
          console.log(book);
          return book
        })
      }
    },

    // update book
    updateBook: {
      type: BookType,
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        author: {type: new GraphQLNonNull(GraphQLString)},
        date: {type: new GraphQLNonNull(GraphQLString)},
        pages: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, args){
        Books.findOneAndUpdate({_id: args._id}, {$set: {...args}}, (err, book)=>{
          console.log(book);
          return book
        })
      }
    }

  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
