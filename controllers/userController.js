import generateToken from "../utils/generateToken.js";
import {
  authenticateUser,
  createUser,
  getUser,
} from "../Service/userService.js";

// @desc Auth & get token
// @route POST /api/users/login
// @access Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await authenticateUser(email, password);
  console.log(user);

  try {
    if (user) {
      const token = generateToken(res, user._id);

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Invalid Parameters" });
  }
};

const logOut = async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  res.send("Logged out successfully");
};

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const user = await createUser(name, email, password, isAdmin);

    if (user) {
      const token = generateToken(res, user._id);

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
      });
    } else {
      throw new Error("User creation failed");
    }
  } catch (error) {
    console.error(error.message);
    res.status(401).json({
      message: "Invaild Parameters",
    });
  }
};

// @desc Get User by Id
// @route GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    console.log("hii");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Invaild User ID",
    });
  }
};

export { authUser, registerUser, getUserById, logOut };
