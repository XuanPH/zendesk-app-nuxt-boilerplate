const setLocalStorage = function(key, data) {
  if (data) {
    let dataS = JSON.stringify(data);
    localStorage.setItem(key, dataS);
  }
};
const getLocalStorage = function(key, getAndRemove = false) {
  let data = localStorage.getItem(key);
  if (data) {
    let jdata = JSON.parse(data);
    getAndRemove && localStorage.removeItem(key);
    return jdata;
  }
  return null;
};

export default {
  setLocalStorage,
  getLocalStorage
};
