import React, { useState } from "react";
import { useAddUserMutation } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { createUserValidation } from "@/validation";
import { ImagePreview } from "@/components";

export default function () {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [addUser, { isLoading }] = useAddUserMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      roles: "Employee",
      password: "",
      image: [],
    },
    validationSchema: createUserValidation,
    onSubmit: (values) => {
      const formData = new FormData();

      formData.append("name", values?.name);
      formData.append("email", values?.email);
      formData.append("roles", values?.roles);
      formData.append("password", values?.password);
      Array.from(values?.image).forEach((file) => {
        formData.append("image", file);
      });
      addUser(formData).then((response) => {
        const toastProps = {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        };
        if (response?.data?.success === true) {
          navigate("/login");
          toast.success(`${response?.data?.message}`, toastProps);
        } else
          toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      });
    },
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {isLoading ? (
        <div className="loader">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="w-full max-w-md p-8 rounded shadow-xl bg-dark-default dark:bg-light-default">
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <section className="grid items-center justify-center">
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-light-default dark:text-dark-default"
                    htmlFor="name"
                  >
                    Name:
                  </label>
                  <input
                    className={`w-full px-3 py-2 border ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="name"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-600">{formik.errors.name}</div>
                  )}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-light-default dark:text-dark-default"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    className={`w-full px-3 py-2 border ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type="email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-600">{formik.errors.email}</div>
                  )}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-light-default dark:text-dark-default"
                    htmlFor="password"
                  >
                    Password:
                  </label>
                  <input
                    className={`w-full px-3 py-2 border ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <input
                    type="checkbox"
                    id="showPassword"
                    onChange={handleClickShowPassword}
                    className="mt-2"
                  />
                  <label
                    htmlFor="showPassword"
                    className="relative ml-2 text-sm cursor-pointer text-light-default dark:text-dark-default top-1"
                  >
                    Show Password
                  </label>
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-600">{formik.errors.password}</div>
                  )}
                </div>
                <div>
                  <label
                    className="block mt-4 mb-2 text-sm font-bold text-light-default dark:text-dark-default"
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
                  <span className="grid items-center justify-center grid-flow-col mt-4 gap-x-2">
                    {formik.values.image && (
                      <ImagePreview images={Array.from(formik.values.image)} />
                    )}
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
