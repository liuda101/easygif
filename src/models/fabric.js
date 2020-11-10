export default {
  namespace: 'fabric',
  state: {
    fabricCanvas: null,
    objectList: [],
    currentObject: null,
  },
  reducers: {
    setCanvas(state, { payload }) {
      return {
        ...state,
        fabricCanvas: payload,
      }
    },
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
