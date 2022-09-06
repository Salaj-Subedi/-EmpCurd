const empModel = require("../models/emp.model");

// create
const create = async (req, res) => {
  const { name, phone, position } = req.body;
  const newEmp = new empModel({
    name: name,
    phone: phone,
    position: position,
    userID: req.userID,
  });
  try {
    await newEmp.save();
    res.json(newEmp);
  } catch (error) {
    console.log(error);
    res.json({ message: "UNFORTUNATE ERROR OCCURED" });
  }
};

// find user employee by id
const returnOne = async (req, res) => {
  try {
    const emp = await empModel.findById(req.params.id);
    res.json(emp);
  } catch (error) {
    console.log(error);
    res.json({ message: "UNFORTUNATE ERROR OCCURED" });
  }
};

// find all notes of all users can be accessed by any authorized user needs debug
const returnAll = async (req, res) => {
  try {
    const emp = await empModel.find();
    res.json(emp);
  } catch (error) {
    console.log(error);
    res.json({ message: "UNFORTUNATE ERROR OCCURED" });
  }
};

// Delete
const deleted = async (req, res) => {
  const id = req.params.id;
  try {
    const emp = await empModel.findByIdAndRemove(id);
    res.json(emp);
  } catch (error) {
    console.log(error);
    res.json({ message: "UNFORTUNATE ERROR OCCURED" });
  }
};

// Update
const updates = async (req, res) => {
  const id = req.params.id;
  const { name, phone, position } = req.body;
  const newEmp = {
    name: name,
    phone: phone,
    position: position,
    userID: req.userID,
  };
  try {
    await empModel.findByIdAndUpdate(id, newEmp, { new: true,useFindAndModify: false });
    res.json(newEmp);
  } catch (error) {
    console.log(error);
    res.json({ message: "UNFORTUNATE ERROR OCCURED" });
  }
};



module.exports = {
  create,
  returnOne,
  returnAll,
  deleted,
  updates,
};
