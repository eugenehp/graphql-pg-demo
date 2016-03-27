import {GraphQLScalarType} from 'graphql';

export default new GraphQLScalarType({
  name: 'Time',
  serialize: (date) => date.toJSON(),
  parseValue: Date,
  parseLiteral: Date,
});

