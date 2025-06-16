import { getSkillGapAndCourses } from "../utils/skillGapAnalysis.js";
import { courseMap } from "../utils/courseMap.js";
import { User } from "../models/user.model.js";

// Example: required skills for a "Frontend Developer" role
const requiredSkills = ["React", "Node.js", "MongoDB", "CSS"];

export const skillGapAnalysis = async (req, res) => {
  try {
    const userId = req.id; // from auth middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const userSkills = user.profile?.skills || [];
    const { missingSkills, courseSuggestions } = getSkillGapAndCourses(userSkills, requiredSkills, courseMap);

    return res.status(200).json({
      missingSkills,
      courseSuggestions,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};