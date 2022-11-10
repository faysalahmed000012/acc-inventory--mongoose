const {
  createBrandService,
  getBrandService,
  getBrandByIdService,
  updateBrand,
} = require("../services/brand.service");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the brand",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the brand",
    });
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const brands = await getBrandService(req.body);

    res.status(200).json({
      status: "success",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get brands",
    });
  }
};

exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await getBrandByIdService(id);

    if (!brand) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find a brand with this id",
      });
    }

    res.status(200).json({
      status: "success",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get brands",
    });
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateBrand(id, req.body);

    if (!result.nModified) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't update brand with this id",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully update the brand",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't update the brand",
    });
  }
};
