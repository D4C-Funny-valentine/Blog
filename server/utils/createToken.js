import jwt from "jsonwebtoken";

const createToken = async (
  data,
  secretToken = process.env.ACCESS_TOKEN_SECRET,
  expireDate = "5d"
) => {
  try {
    const token = jwt.sign(data, secretToken, { expiresIn: expireDate });
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default createToken;
