export default {
  namespace: 'player',
  state: {
    currentIndex: 0,
    // 1 正序；-1反序
    playing: true,
    direction: 1,
    initialFrames: [],
    frames: [],

    initialPreviewFrames: [],
    previewFrames: [],

    duration: 0,
    // TODO 添加一个缩略图的版本
  },
  reducers: {
    updateDuration(state, { payload }) {
      return {
        ...state,
        duration: payload,
      };
    },
    setInitialFrames(state, { payload }) {
      return {
        ...state,
        initialPreviewFrames: payload.previewFrames,
        initialFrames: payload.frames,
      };
    },
    resetFrames(state) {
      return {
        ...state,
        frames: [...state.initialFrames],
        previewFrames: [...state.initialPreviewFrames],
      }
    },
    updateFrames(state, { payload }) {
      return {
        ...state,
        frames: payload.frames,
        previewFrames: payload.previewFrames,
      };
    },

    playNext(state) {
      if (state.playing) {
        let newIndex = state.currentIndex + state.direction;
        if (newIndex >= state.frames.length) {
          newIndex = 0;
        }
        if (newIndex < 0) {
          newIndex = state.frames.length - 1;
        }
        return {
          ...state,
          currentIndex: newIndex,
        }
      }
      return {
        ...state,
      };
    },

    setIndex(state, { payload }) {
      return {
        ...state,
        playing: false,
        currentIndex: payload,
      };
    },

    togglePlay(state) {
      return {
        ...state,
        playing: !state.playing,
      };
    }
  },
};
