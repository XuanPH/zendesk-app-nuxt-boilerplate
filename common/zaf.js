const init = function(store) {
  return new Promise((resolve, reject) => {
    let client = ZAFClient.init();
    if (!client) {
      resolve({ code: "cantInit" });
    } else {
      try {
        client.on("app.registered", function(appData) {
          //self.appData = appData;
          localStorage.removeItem("token");
          //store.dispatch("setZAFClient", client);
          //store.dispatch("setLocation", appData.context.location);
          resolve({ appData, client });
        });
      } catch (error) {
        console.log("cant init => ", error);
        reject(error);
      }
    }
  });
};
export default {
  init
};
