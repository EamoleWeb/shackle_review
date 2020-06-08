export default (interests) => {
  return interests.reduce((acc, interest, index) => {
    const row = Math.floor(index / 3);
    if (!acc[row]) {
      acc[row] = [];
    }

    acc[row].push(interest);

    return acc;
  }, []);
};
