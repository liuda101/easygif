export default {
  namespace: 'parser',
  state: {
    file: null,
  },
  reducers: {
    resetFile(state, { payload }) {
      return {
        ...state,
        file: payload,
      };
    },
  },
};
