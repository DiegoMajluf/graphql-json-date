import assertErr = require('assert-err')
import { GraphQLScalarType, GraphQLError, Kind, StringValueNode } from "graphql";


export const GraphQLDate = new GraphQLScalarType({
  name: 'Date',
  serialize: function (value: Date): string {
    assertErr(value instanceof Date, TypeError, 'Field error: value is not an instance of Date')
    assertErr(!isNaN(value.getTime()), TypeError, 'Field error: value is an invalid Date')
    return value.toJSON()
  },

  
  parseValue: function (value: string): Date {
    var date = new Date(value)
    assertErr(!isNaN(date.getTime()), TypeError, 'Field error: value is an invalid Date')
    return date
  },

  
  parseLiteral: function (ast: StringValueNode): Date {
    assertErr(ast.kind === Kind.STRING,
      GraphQLError, 'Query error: Can only parse strings to dates but got a: ' + ast.kind, [ast])

    var result = new Date(ast.value)
    assertErr(!isNaN(result.getTime()),
      GraphQLError, 'Query error: Invalid date', [ast])
    assertErr(ast.value === result.toJSON(),
      GraphQLError, 'Query error: Invalid date format, only accepts: YYYY-MM-DDTHH:MM:SS.SSSZ', [ast])

    return result
  }
})