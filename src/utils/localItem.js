export const setItem = (keyName, keyValue, expirationSec) => {
  var objectStore = {
      value: keyValue
  };
  if (expirationSec) {
      var date = new Date();
      var schedule = Math.round((date.setSeconds(date.getSeconds() + expirationSec))/1000);
      objectStore.timestamp = schedule;
  }
  localStorage.setItem(keyName, JSON.stringify(objectStore));
};

export const getItem = (keyName) => {
  var value = localStorage[keyName];
  if (value) {
    var objectValue = JSON.parse(value);
    var timestamp = objectValue["timestamp"];
    if (timestamp) {
      timestamp = parseInt(timestamp, 10);
      var date = new Date();
      var current = Math.round(+date/1000);
      if (timestamp < current) {
        // Remove
        this.removeItem(keyName);
        return null;
      }
    }
    return objectValue["value"];
  }
  return null;
};

export const removeItem = (keyName) => {
  localStorage.removeItem(keyName);
};