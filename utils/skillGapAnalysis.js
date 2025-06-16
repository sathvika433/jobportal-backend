export function getSkillGapAndCourses(userSkills, requiredSkills, courseMap) {
  const userSkillSet = new Set((userSkills || []).map(s => s.toLowerCase().trim()));
  const missingSkills = requiredSkills.filter(
    skill => !userSkillSet.has(skill.toLowerCase().trim())
  );
  const courseSuggestions = missingSkills.map(skill => ({
    skill,
    courses: courseMap[skill] || []
  }));
  return { missingSkills, courseSuggestions };
}