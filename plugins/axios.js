export default function({ $axios, app, store }) {
  $axios.onRequest(config => {
    if (store.getters.token) {
      config.headers.common["token"] = store.getters.token;
    }
  });
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      redirect("/400");
    }
  });
}
