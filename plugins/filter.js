import Vue from "vue";
import moment from "moment";
Vue.filter("fromNow", function(value) {
  if (!value) return "";
  if (value === "") return "";
  let time = moment(value);
  if (time.isValid) return time.fromNow();
  return "";
});

Vue.filter("zFormat", function(value) {
  if (!value) return "";
  if (value === "") return "";
  let time = moment(value);
  if (time.isValid) return time.format("hh:mm A DD MMMM YYYY");
  return "";
});

Vue.filter("cut40Chars", function(value) {
  var number = 40;
  var defaultLastPrefix = "...";
  if (!value) return "";
  if (value === "") return "";
  if (value.length > number) {
    return `${value.substr(0, number)}${defaultLastPrefix}`;
  }
  return value;
});
