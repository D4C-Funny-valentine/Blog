import validator from "email-validator";

const emailValidation = async (email) => {
  try {
    const validEmail = validator.validate(email);
    return validEmail;
  } catch (error) {
    console.log(error);
  }
};

export default emailValidation;
