import Vue from "vue";

Vue.mixin({
  methods: {
    setLocalStorage(key, data) {
      if (data) {
        var dataS = JSON.stringify(data);
        localStorage.setItem(key, dataS);
      }
    },
    getLocalStorage(key, getAndRemove = false) {
      var data = localStorage.getItem(key);
      if (data) {
        var jdata = JSON.parse(data);
        getAndRemove && localStorage.removeItem(key);
        return jdata;
      }
      return null;
    }
  }
});
