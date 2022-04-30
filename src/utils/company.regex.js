export default {
  addCompany: {
    phoneNumber: '^[\\d]+$',
    faxNumber: /(?:1[ -])?[(]?(\d{3})[)]?[ -](\d{3})[ -](\d{4})$/,
    postalcode: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
  },
}
