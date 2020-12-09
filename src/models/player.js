export default {
  namespace: 'player',
  state: {
    currentIndex: 0,
    playing: true,
    initialFrames: [],
    frames: [],

    initialPreviewFrames: [],
    previewFrames: [],

    duration: 0,
    repeat: true,

    size: {
      width: 0,
      height: 0,
    },
  },
  reducers: {
    updateDuration(state, { payload }) {
      return {
        ...state,
        duration: payload,
      };
    },
    toggleRepeat(state) {
      return {
        ...state,
        repeat: !state.repeat,
      };
    },
    setInitialFrames(state, { payload }) {
      return {
        ...state,
        initialPreviewFrames: [...payload.previewFrames],
        initialFrames: [...payload.frames],
      };
    },
    resetFrames(state) {
      return {
        ...state,
        frames: [...state.initialFrames],
        previewFrames: [...state.initialPreviewFrames],
      };
    },
    updateFrames(state, { payload }) {
      return {
        ...state,
        frames: payload.frames,
        previewFrames: payload.previewFrames,
      };
    },

    playNext(state, { payload }) {
      if (state.playing || payload.force) {
        if (!state.repeat) {
          if (state.currentIndex === state.frames.length - 1) {
            return {
              ...state,
              currentIndex: 0,
              playing: false,
            };
          }
        }
        let newIndex = state.currentIndex + payload.direction;
        if (newIndex >= state.frames.length) {
          newIndex = 0;
        }
        if (newIndex < 0) {
          newIndex = state.frames.length - 1;
        }
        return {
          ...state,
          currentIndex: newIndex,
        };
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
    },

    updateSize(state, { payload }) {
      return {
        ...state,
        size: payload,
      };
    },
    rotateFrame(state) {
      return {
        ...state,
        size: {
          width: state.size.height,
          height: state.size.width,
        },
      };
    },
    reverseFrame(state) {
      return {
        ...state,
        initialFrames: [...state.initialFrames.reverse()],
        frames: [...state.frames.reverse()],
        initialPreviewFrames: [...state.initialPreviewFrames.reverse()],
        previewFrames: [...state.previewFrames.reverse()],
      };
    },
    removeFrameAtIndex(state, { payload }) {
      const currentIndex = state.currentIndex;

      const initialFrames = state.initialFrames;
      initialFrames.splice(payload, 1);

      const frames = state.frames;
      frames.splice(payload, 1);

      const initialPreviewFrames = state.initialPreviewFrames;
      initialPreviewFrames.splice(payload, 1);

      const previewFrames = state.previewFrames;
      previewFrames.splice(payload, 1);
      const result = {
        ...state,
        initialFrames: [...initialFrames],
        frames: [...frames],
        initialPreviewFrames: [...initialPreviewFrames],
        previewFrames: [...previewFrames],
        // 如果删掉的是最后一个，且当前展示的是最后一个，则需要调整
        currentIndex: currentIndex === initialFrames.length ? currentIndex - 1 : currentIndex,
      };
      return result;
    },
    addNewFrame(state, { payload }) {
      const { currentIndex, pos, data } = payload;
      let insertIndex = currentIndex;
      if (pos > 0) {
        insertIndex += 1;
      }
      const largeFrames = data.map(item => {
        return {
          data: item.largeData,
        }
      });
      const smallFrames = data.map(item => {
        return {
          data: item.previewData,
        }
      });

      const initialFrames = state.initialFrames;
      initialFrames.splice(insertIndex, 0, ...largeFrames);

      const frames = state.frames;
      frames.splice(insertIndex, 0, ...largeFrames);

      const initialPreviewFrames = state.initialPreviewFrames;
      initialPreviewFrames.splice(insertIndex, 0, ...smallFrames);

      const previewFrames = state.previewFrames;
      previewFrames.splice(insertIndex, 0, ...smallFrames);

      console.log(largeFrames, smallFrames, previewFrames.length);
      return {
        ...state,
        initialFrames: [...initialFrames],
        frames: [...frames],
        initialPreviewFrames: [...initialPreviewFrames],
        previewFrames: [...previewFrames],
      };
    },
  },
};
