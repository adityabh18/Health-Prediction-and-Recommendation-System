import userModel from "../models/user.models.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @description Registration controllers
 */
export const registration = async (req, res) => {
  try {
    console.log(req.body);
    /**
     * @description body se user username,password,email role bhejega
     */
    const { username, email, password, role } = req.body;
    /**
     * @description to check khi koi field chhut to nhi gya na
     */
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide username, email and password",
      });
    }
    /**
     * @description Admin bloack
     */
    if (role == "admin") {
      return res.status(403).json({
        message: "You can't register as admin",
      });
    }

    /**
     * @description to check khi user phle se to nhi na hai
     */
    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    /**
     * @description agar user phle se exist kr rha ho
     */
    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "Account already exists with this email address or username",
      });
    }
    /**
     * @description Email validation
     */
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Enter valid email",
      });
    }
    /**
     * @description Password validation
     */
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be atleast 6 charecter",
      });
    }
    /**
     * @description Hashing password
     */
    const hashedPassword = await bcrypt.hash(password, 10);
    /**
     * @description Now creating users
     */
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    /**
     * @description Token creation
     */
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    /**
     * @description To save token in cookie storage
     */
 res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
});

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Resister error:", error);
    return res.status(500).json({
      message: `registration error ${error.message}`,
    });
  }
};

/**
 * @description Login controllers
 */
export const login = async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User is not found",
      });
    }

    /**
     * @param Google user password login block
     */
    if (user.authType === "google") {
      return res.status(400).json({
        message: "Please login with Google",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        message: "incorrect password",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });
    res.status(200).json({
      message: "User loggedIn successfully.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("login error");
    return res.status(500).json({
      message: `login error ${error}`,
    });
  }
};

/**
 * @description Logout controller
 */
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "logout successfully",
    });
  } catch (error) {
    console.log("logout error");
    return res.status(500).json({
      message: `logout error ${error}`,
    });
  }
};

/**
 * @description Google Login controller
 */
export const googleLogin = async (req, res) => {
  try {
    const { name, email, photo } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        username: name,
        email,
        authType: "google",
        photo,
        role: null,
      });

      return res.status(200).json({
        success: true,
        needRole: true,
        user,
      });
    }

    if (!user.role) {
      return res.status(200).json({
        success: true,
        needRole: true,
        user,
      });
    }


    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      needRole: false,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Google login error ${error}`,
    });
  }
};

/**
 * @description Set new role
 */
export const setRole = async (req, res) => {
  try {
    const { email, role } = req.body;

    if (role === "admin") {
      return res.status(403).json({
        message: "Can't assign admin role",
      });
    }

    const user = await userModel.findOneAndUpdate(
      { email },
      { role },
      { new: true },
    );

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Role set successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
