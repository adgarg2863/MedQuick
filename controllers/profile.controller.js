const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const Medicine  = require("../models/Medicine");
const User = require("../models/User");
/*
get profile of user
*/
const getProfile = catchAsync(async (req, res) => {
  const user = await User.getUserById(req.body.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
});

/*
@add an item
*/
const addItem = catchAsync(async (req, res) => {
  // console.log(req.body);
  const user = await User.getUserById(req.body.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const medArray = req.body.medicines;
  const n = medArray.length;
  for (let i = 0; i < n; i += 1) {
    // console.log(i);
    const { medName, genericName } = medArray[i];
    let index = -1;
    user.inventory.forEach((item, ind) => {
      if (item.medName === medName) {
        index = ind;
      }
    });
    if (index !== -1) {
      user.inventory[index].quantity += medArray[i].quantity;
    } else {
      const newItem = pick(medArray[i], [
        "medName",
        "genericName",
        "quantity",
        "price",
        "itemType",
      ]);
      newItem.generic = medName === genericName;
      user.inventory.push(newItem);

      const medicine = await Medicine.findOne({ name: medName });
      if (!medicine) {
        const newMedicine = new Medicine({ name: medName });
        await newMedicine.save();
      }

      const genMedicine = await Medicine.findOne({ name: genericName });
      if (!genMedicine) {
        const newMedicine = new Medicine({ name: genericName });
        await newMedicine.save();
      }
    }
  }
  await user.save();
  res.send(user);
});

/*
@delete item
*/
const deleteItem = catchAsync(async (req, res) => {
  const user = await User.getUserById(req.body.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const medArray = req.body.medicines;
  const n = medArray.length;
  for (let i = 0; i < n; i += 1) {
    const { medName, genericName } = medArray[i];
    let index = -1;
    user.inventory.forEach((item, ind) => {
      if (item.medName === medName) {
        index = ind;
      }
    });
    if (index !== -1) {
      if (user.inventory[index].quantity >= medArray[i].quantity)
        user.inventory[index].quantity -= medArray[i].quantity;
      else
        throw new ApiError(
          httpStatus.NOT_FOUND,
          `Item ${medName} not in stock`
        );
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, `Item ${medName} not found`);
    }
  }
  await user.save();
  res.send(user);
});

module.exports = {
  getProfile,
  addItem,
  deleteItem,
};
