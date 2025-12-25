const isCloseToNewYear = () => {
  const month = new Date().getMonth();
  const date = new Date().getDate();
  if (month === 11) {
    if (date >= 25) return true;
  } else if (month === 0) {
    if (date <= 14) return true;
  }
  return false;
};

export default isCloseToNewYear;
