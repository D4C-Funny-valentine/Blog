import bcrypt from "bcrypt";

const hashData = async (data, round = 10) => {
  try {
    const hashedData = await bcrypt.hash(data, round);
    return hashedData;
  } catch (error) {
    console.error(error);
  }
};

const compareData = async (data, inputData) => {
  try {
    const isCorrectData = await bcrypt.compare(data, inputData);
    return isCorrectData;
  } catch (error) {
    console.error(error);
  }
};

export { hashData, compareData };
