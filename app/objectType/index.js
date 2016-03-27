import snakeCase from 'snake-case';

import {
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import {
  toGlobalId,
} from 'graphql-relay';

const objectType = {
  id(typeName, fieldConfig = {}) {
    fieldConfig.type = new GraphQLNonNull(GraphQLID);
    fieldConfig.resolve = (obj) => toGlobalId(typeName, obj.id);
    if (!fieldConfig.description) {
      fieldConfig.description = `The id of the ${typeName}`;
    }
    return fieldConfig;
  },
  attr(fieldConfig) {
    fieldConfig.resolve = (obj, args, resolveInfo) => {
      const {fieldName} = resolveInfo;
      return obj[snakeCase(fieldName)];
    };
    return fieldConfig;
  }
};

export default (config) => {
  const {fields} = config;
  config.fields = () => fields.call(null, objectType);
  config.isTypeOf = (obj) => obj._graphQLType === config.name;
  return config;
};

export const setNodeType = ({name}, record) => {
  const node = {
    ...record,
    _graphQLType: name,
  };

  return record.id
    ? { ...node, _globalId: toGlobalId(name, record.id) }
    : node;
};

