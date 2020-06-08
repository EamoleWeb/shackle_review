// TODO: Make this function better
export default (user = {}) => {
  const { given_name, family_name } = user;

  return `${given_name} ${family_name}`;
};
