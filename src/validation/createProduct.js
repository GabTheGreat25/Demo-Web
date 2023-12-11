import * as yup from "yup";

export default yup.object({
  product_name: yup
    .string("Enter your product_name")
    .required("Product_name is required"),
  price: yup
    .number("Enter a number")
    .required("Price is required")
    .min(1, "Price must be at least 1")
    .max(10000, "Price must not exceed at 10000"),
});
