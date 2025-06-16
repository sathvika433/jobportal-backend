import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const parseResume = async (req, res) => {
  try {
    // Check if file is provided
    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required.",
        success: false,
      });
    }

    // Convert file to Data URI
    const fileUri = getDataUri(req.file);

    // Upload to Cloudinary as raw (PDF)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "raw",
      access_mode: "public",
    });

    // Respond with Cloudinary URL
    return res.status(200).json({
      message: "Resume uploaded successfully.",
      resumeUrl: cloudResponse.secure_url,
      resumeOriginalName: req.file.originalname,
      success: true,
    });
  } catch (error) {
    console.error("Resume parse error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};