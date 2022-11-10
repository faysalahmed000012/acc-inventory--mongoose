const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
};

exports.getBrandService = async (data) => {
  // be using .select we are not loading all details of brand , loading just few of them
  const brands = await Brand.find({}).select("-products -suppliers");
  return brands;
};

exports.getBrandByIdService = async (id) => {
  const brand = await Brand.findOne({ _id: id });
  return brand;
};

exports.updateBrand = async (id, data) => {
  const result = await Brand.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
