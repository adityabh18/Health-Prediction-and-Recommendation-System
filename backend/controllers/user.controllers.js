import userModel from "../models/user.models.js"

/**
 *@description currentUser
 */
export const currentUser=async (req,res)=>{
    try {
        const user=await userModel.findById(req.user.id)
        .select("-password")

        if(!user){
            return res.status(404).json({
                message:"user is not found"
            })
        }

        return res.status(200).json(user)
    } catch (error) {
        console.log("error");
        return res.status(500).json({
            message:`current user error ${error}`
        })
    }
}

/**
 *@description updateProfile
 */
export const updateProfile = async (req, res) => {
  try {

    const { age, gender, contact } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.id,
      {
        age,
        gender,
        contact,
      },
      {
        new: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(updatedUser);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Profile update failed",
    });

  }
};