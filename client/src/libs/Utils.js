const Utils = {

  createUUID() {
    // Retrieved from https://stackoverflow.com/a/2117523
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = (c === 'x' ? r : ((r & 0x3) | 0x8));
      return v.toString(16);
    });
  },

  isValidString(value) {
    if (value === null ||
      value === undefined ||
      typeof (value) !== "string" ||
      value.length <= 0) {
      return false;
    }
    return true;
  },

  isValidNumber(value) {
    if (value === null ||
      value === undefined ||
      typeof (value) !== "number" ||
      isNaN(value)) {
      return false;
    }
    return true;
  },

  capitalize(value) {
    if (value === null || value === undefined) {
      return value;
    }
    if (typeof (value) !== "string" || value.length < 1) {
      return value;
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
};
export default Utils;
