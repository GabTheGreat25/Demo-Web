import React from "react";
import { useUpdateUserMutation } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { editUserValidation } from "@/validation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: auth?.user?.name || "",
      email: auth?.user?.email || "",
      image: auth?.user?.image || [],
    },
    validationSchema: editUserValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values?.name);
      formData.append("email", values?.email);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });

      updateUser({ id: auth?.user?._id, payload: formData }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          };
          if (response?.data?.success === true) {
            const userRoles = response?.data?.details?.roles;
            if (userRoles.includes("Admin")) {
              navigate("/admin");
            } else if (userRoles.includes("Employee")) {
              navigate("/employee");
            } else if (userRoles.includes("Customer")) {
              navigate("/customer");
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
        <div className="flex items-center justify-center">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <div className="w-full max-w-md p-8 rounded-md shadow-lg">
          <h2 className="mb-6 text-3xl font-extrabold">Update Profile</h2>
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold " htmlFor="name">
                Name:
              </label>
              <input
                className={`w-full px-3 py-2 border ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring focus:border-blue-300`}
                type="name"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="Enter your name"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.name}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold " htmlFor="email">
                Email:
              </label>
              <input
                className={`w-full px-3 py-2 border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring focus:border-blue-300`}
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold " htmlFor="image">
                Upload Image:
              </label>
              <input
                className={`w-full px-3 py-2 border ${
                  formik.touched.image && formik.errors.image
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring focus:border-blue-300`}
                type="file"
                id="image"
                name="image"
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files);
                }}
                onBlur={formik.handleBlur}
                multiple
              />
              <div className="grid items-center justify-center grid-flow-col mt-2 gap-x-2">
                {auth?.user?.image?.map((image) => (
                  <span key={image?.public_id}>
                    <img
                      height={60}
                      width={75}
                      src={image?.url}
                      alt={image?.originalname}
                    />
                  </span>
                ))}
              </div>
            </div>
            <span className="grid grid-flow-col mt-4 gap-x-4">
              <button
                className={`w-full bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none ${
                  !formik.isValid && "opacity-50 cursor-not-allowed"
                }`}
                type="submit"
                disabled={!formik.isValid}
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
          </form>
        </div>
      )}
    </div>
  );
}
