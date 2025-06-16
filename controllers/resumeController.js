const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");

const SKILL_KEYWORDS = ["html", "css", "javascript", "react", "node", "sql", "python", "java", "mongodb", "express"];

exports.parseResume = async (req, res) => {
  try {
    const resumePath = req.file.path;
    const dataBuffer = fs.readFileSync(resumePath);

    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text.toLowerCase();

    const matchedSkills = SKILL_KEYWORDS.filter(skill => text.includes(skill));

    res.json({
      success: true,
      skills: matchedSkills,
    });
  } catch (err) {
    console.error("Parsing error:", err);
    res.status(500).json({ success: false, message: "Resume parsing failed" });
  }
};
