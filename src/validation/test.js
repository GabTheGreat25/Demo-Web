import * as yup from "yup";

export default yup.object({
  test: yup.string("Enter your test").required("Test is required"),
});
