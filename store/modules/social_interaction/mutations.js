import _ from "lodash";

const setInteractionSocial = (state, { data, loading }) => {
  if (!data.success) {
  } else {
    state.socialInteractions = data;
  }
};
const TRIGGER_LOADING = (state, payload) => {
  state.loading = payload;
};
export default {
  setInteractionSocial
};
