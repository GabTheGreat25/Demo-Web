import React from "react";
import { useUpdateTransactionMutation, useGetTransactionByIdQuery } from "@api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { editTransactionValidation } from "@/validation";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment-timezone";

export default function () {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetTransactionByIdQuery(id);
  const [updateTransaction] = useUpdateTransactionMutation();
  const auth = useSelector((state) => state.auth);

  moment.tz.setDefault("Asia/Manila");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      date: moment(data?.details?.date).format("YYYY-MM-DD") || "",
      status: data?.details?.status || "",
    },
    validationSchema: editTransactionValidation,
    onSubmit: async (values) => {
      values.date = moment(values.date).format("YYYY-MM-DD");

      updateTransaction({ id: data?.details?._id, payload: values }).then(
        (response) => {
          const toastProps = {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          };
          if (response?.data?.success === true) {
            const userRoles = auth?.user?.roles;
            if (userRoles.includes("Admin")) {
              navigate("/admin/transactionAll");
            } else if (userRoles.includes("Employee")) {
              navigate("/employee");
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
    <div className={"h-full pt-24 flex items-center justify-center"}>
      {isLoading ? (
        <div className="loader">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="w-full max-w-md p-8 rounded shadow-xl bg-dark-default dark:bg-light-default">
            <form onSubmit={formik.handleSubmit}>
              <section className="grid items-center justify-center">
                <div>
                  <label
                    className={`block text-light-default dark:text-dark-default text-sm font-bold mb-2`}
                    htmlFor="date"
                  >
                    Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.date && formik.errors.date
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  />
                  {formik.touched.date && formik.errors.date && (
                    <div className="text-red-600">{formik.errors.date}</div>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-light-default dark:text-dark-default text-sm font-bold mb-2`}
                    htmlFor="status"
                  >
                    Status:
                  </label>
                  <select
                    id="status"
                    name="status"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.status}
                    className={`w-full mb-4 px-3 py-2 border ${
                      formik.touched.status && formik.errors.status
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none focus:shadow-outline dark:bg-dark-default dark:text-light-default`}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  {formik.touched.status && formik.errors.status && (
                    <div className="text-red-600">{formik.errors.status}</div>
                  )}
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
