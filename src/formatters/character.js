export const characterFormatter = (resource) => {
  return {
    quotes: ["awesome business logic on the front-end"],
    initials: getInitials(resource.name),
    ...resource,
  };
};

const getInitials = (fullName) => {
  const allNames = fullName.trim().split(" ");
  const initials = allNames.reduce((acc, curr, index) => {
    if (index === 0 || index === allNames.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, "");
  return initials;
};
