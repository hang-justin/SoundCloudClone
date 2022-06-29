module.exports = {
  "isLat": function(value) {
    const latRegex = /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/;
    return latRegex.test(value);
  },
  "isLng": function(value) {
    const lngRegex = /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/;
    return lngRegex.test(value)
  }
}