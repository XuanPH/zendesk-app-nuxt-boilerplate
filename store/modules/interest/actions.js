async function getRefData(context, typeCode) {
  context.state.loading = true;
  typeCode = typeCode === "address" ? "livingPlace" : typeCode;
  context.state.query.query.bool.must[0].match.code.query = typeCode;
  var res = await this.$axios.post(
    `/ReferenceData/GetByQuery`,
    context.state.query
  );
  context.state.loading = false;
  return res.data;
}

export default {
  getRefData
};
