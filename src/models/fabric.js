export default {
  namespace: 'fabric',
  state: {
    objectList: [],
    currentObject: null,
  },
  reducers: {
    addObject(state, { payload }) {
      return {
        ...state,
        objectList: [...state.objectList, payload],
        currentObject: payload,
      };
    },
    updateCurrentObject(state, { payload }) {
      return {
        ...state,
        currentObject: payload,
      };
    },
  },
};
