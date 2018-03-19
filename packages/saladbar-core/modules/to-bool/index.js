const toBool = str => {
  if (str === 'true') {
    return true;
  } else if (str === 'false') {
    return false;
  }

  return null;
};

export default toBool;
