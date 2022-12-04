import { RequestHandler } from 'express';
import User, { UserModel } from '../model/UserModel';

//add a user
export const createUser: RequestHandler = async (req, res) => {
  const user: UserModel = req.body;
  var users = await User.create(user);

  return res.status(200).json({ message: 'User added!', data: users });
};

//get all users
export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await User.find();
  if (users.length > 0) return res.json({ status: true, users });
  return res.status(404).json({ status: false, msg: 'No Users found' });
};

//get user by id
export const getUserById: RequestHandler = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) return res.json({ status: true, user });
  return res.status(404).json({ status: false, msg: 'No such User found' });
};

//update an existing user
export const updateUser: RequestHandler = async (req, res) => {
  try {
    const userData = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json({
      status: true,
      msg: 'User updated successfully',
      userData,
    });
  } catch (error) {
    res.status(400).json({ status: false, msg: error });
  }
};

//delete a user
export const deleteUser: RequestHandler = async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res.status(400).json({ status: false, msg: 'No such User found' });
  return res.json({ status: true, msg: 'User deleted successfully' });
};
