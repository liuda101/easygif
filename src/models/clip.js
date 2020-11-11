export default {
  namespace: 'clip',
  state: {
    isClipping: false,
    resize: null,
  },
  reducers: {
    startClip(state) {
      return {
        ...state,
        isClipping: true,
      }
    },
    stopClip(state) {
      return {
        ...state,
        isClipping: false,
      }
    },
    updateResize(state, { payload }) {
      return {
        ...state,
        resize: payload
      }
    }
  }
}