//handle errors
const handleErrors = (err) => {
  console.log(err);
  let error = { email: "", password: "" };
  //validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  if (err.code == "11000") {
    // error = err;
    const msg = err.message;
    const field = err.keyValue;
    error = { msg, field };
  }
  return error;
};
