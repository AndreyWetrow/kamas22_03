export const updateObjectInArray = (
  items,
  userId,
  objPropName,
  newObjProps
) => {
  return items.map((user) => {
    if (user[objPropName] === userId) {
      return { ...user, ...newObjProps };
    }
    return user;
  });
};
