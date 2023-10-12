const validateFields = ({ address, email, skype, phone }) => {
  const errors = {};

  if (!address) {
    errors.address = { status: false, message: "Invalid address" };
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    errors.email = { status: false, message: "Invalid email" };
  }

  if (!skype) {
    errors.skype = { status: false, message: "Invalid skype" };
  }

  const phoneRegex = /^\+?[0-9]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    errors.phone = { status: false, message: "Invalid phone number" };
  }
  const error = Object.keys(errors).length ? errors : false;
  return error;
};

export default validateFields;
