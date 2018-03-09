const isEither = val => {
  const result = val.isLeft || val.isRight;

  return result === undefined ? false : true;
};

export default isEither;
