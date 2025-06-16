export function getProfileCompleteness(user) {
  const fields = [
    { key: "fullname", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "resume", label: "Resume", path: "profile.resume" },
    { key: "skills", label: "Skills", path: "profile.skills" },
    { key: "bio", label: "Bio", path: "profile.bio" },
  ];

  let filled = 0;
  let missing = [];

  fields.forEach(field => {
    let value;
    if (field.path) {
      value = field.path.split('.').reduce((o, i) => o?.[i], user);
    } else {
      value = user[field.key];
    }
    if (field.key === "skills") {
      if (Array.isArray(value) && value.length > 0) filled++;
      else missing.push(field.label);
    } else if (value) {
      filled++;
    } else {
      missing.push(field.label);
    }
  });

  return {
    completeness: Math.round((filled / fields.length) * 100),
    missingFields: missing,
  };
}