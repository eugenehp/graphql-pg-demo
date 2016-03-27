import Viewer from '../types/Viewer';
import {VIEWER_OBJECT_ID} from '../types/Viewer';
import {setNodeType} from '../objectType';

export const VIEWER_OBJECT = setNodeType(Viewer, {id: VIEWER_OBJECT_ID});

import {
  GraphQLNonNull,
} from 'graphql';

export default {
  type: new GraphQLNonNull(Viewer),
  resolve: () => VIEWER_OBJECT
};

