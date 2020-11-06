export default {
  namespace: 'parser',
  state: {
    file: null,
    fileType: null
  },
  reducers: {
    resetFile(state, { payload }) {
      return {
        ...state,
        file: payload.file,
        fileType: payload.fileType,
      };
    },
  },
};
