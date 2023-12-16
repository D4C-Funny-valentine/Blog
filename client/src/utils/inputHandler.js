export const inputHandler = (e, value, setFunction) => {
  return setFunction({
    ...value,
    [e.target.name]: e.target.value,
  });
};
