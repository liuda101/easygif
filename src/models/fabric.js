export default {
  namespace: 'fabric',
  state: {
    fabricCanvas: null,
    objectList: [],
    willRemove: null,
    currentObject: null,
    renderTrigger: 0,
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
    reRender(state) {
      return {
        ...state,
        renderTrigger: state.renderTrigger + 1
      }
    },
    willRemoveObject(state) {
      return {
        ...state,
        willRemove: state.currentObject,
      }
    },
    removeObject(state) {
      const newObjectList = [...state.objectList];
      let i = 0;
      for (; i < newObjectList.length; i++) {
        if (newObjectList[i] === state.currentObject) {
          break;
        }
      }
      newObjectList.splice(i, 1);
      return {
        ...state,
        willRemove: null,
        currentObject: null,
        renderTrigger: state.renderTrigger + 1,
        objectList: newObjectList,
      }
    }
  },
};
