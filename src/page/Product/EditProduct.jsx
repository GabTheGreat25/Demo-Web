import React from "react";
import { useUpdateProductMutation, useGetProductByIdQuery } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { editProductValidation } from "@/validation";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  const auth = useSelector((state) => state.auth);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      product_name: data?.details?.product_name || "",
      description: data?.details?.description || "",
      price: data?.details?.price || "",
      image: data?.details?.image || [],
      user: data?.details?.user?._id || "",
    },
    validationSchema: editProductValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("product_name", values?.product_name);
      formData.append("description", values?.description);
      formData.append("price", values?.price);
      formData.append("user", values?.user);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });
      updateProduct({ id: data?.details?._id, payload: formData }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          };
          if (response?.data?.success === true) {
            const userRoles = auth?.user?.roles;
            if (userRoles.includes("Admin")) {
              navigate("/admin/product");
            } else if (userRoles.includes("Employee")) {
              navigate("/employee/product");
            }
            toast.success(`${response?.data?.message}`, toastProps);
          } else {
            toast.error(`${response?.error?.data?.error?.message}`, toastProps);
          }
        }
      );
    },
  });

  return (
    <div className="flex items-center justify-center h-full">
      {isLoading ? (
        <div className="loader">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="w-full max-w-md p-8 rounded shadow-xl bg-dark-default dark:bg-light-default">
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <section className="grid items-center justify-center text-center">
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-light-default dark:text-dark-default"
                    htmlFor="product_name"
                  >
                    Product Name:
                  </label>
                  <input
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.product_name && formik.errors.product_name
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="text"
                    id="product_name"
                    name="product_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.product_name}
                  />
                  {formik.touched.product_name &&
                    formik.errors.product_name && (
                      <div className="text-red-600">
                        {formik.errors.product_name}
                      </div>
                    )}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-light-default dark:text-dark-default"
                    htmlFor="description"
                  >
                    Description:
                  </label>
                  <input
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.description && formik.errors.description
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="text"
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-red-600">
                      {formik.errors.description}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-light-default dark:text-dark-default"
                    htmlFor="price"
                  >
                    Price:
                  </label>
                  <input
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.price && formik.errors.price
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="number"
                    id="price"
                    name="price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                    min="1"
                    max="10000"
                  />
                  {formik.touched.price && formik.errors.price && (
                    <div className="text-red-600">{formik.errors.price}</div>
                  )}
                </div>

                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-light-default dark:text-dark-default"
                    htmlFor="image"
                  >
                    Upload Image:
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={(event) => {
                      formik.setFieldValue("image", event.currentTarget.files);
                    }}
                    onBlur={formik.handleBlur}
                    multiple
                    className={`w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default  bg-light-default text-dark-default`}
                  />
                  <span className="grid items-center justify-center grid-flow-col gap-x-2">
                    {data?.details?.image?.map((image) => (
                      <span key={image?.public_id}>
                        <img
                          height={60}
                          width={75}
                          src={image?.url}
                          alt={image?.originalname}
                        />
                      </span>
                    ))}
                  </span>
                </div>

                <span className="grid grid-flow-col mt-4 gap-x-4">
                  <button
                    type="submit"
                    disabled={!formik.isValid}
                    className={`w-full bg-green-500 text-white font-bold py-2 px-4 rounded ${
                      formik.isValid
                        ? "hover:bg-green-700"
                        : "cursor-not-allowed opacity-50"
                    }`}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded cursor-pointer"
                  >
                    Go Back
                  </button>
                </span>
              </section>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
