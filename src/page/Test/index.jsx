import React from "react";
import { useGetTestsQuery, useDeleteTestMutation } from "@api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { addDeletedItemId, getDeletedItemIds } from "../.././utils/DeleteItem";
import DataTable from "react-data-table-component";

export default function TestsList() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetTestsQuery();

  const [deleteTest, { isLoading: isDeleting }] = useDeleteTestMutation();

  const deletedTestIds = getDeletedItemIds("test");

  const userTests = data?.details.filter(
    (item) => !deletedTestIds.includes(item?._id)
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      const response = await deleteTest(id);

      const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      };

      if (response?.data?.success === true) {
        toast.success(`${response?.data?.message}`, toastProps);
        addDeletedItemId("test", id);
      } else {
        toast.error(`${response?.error?.data?.error?.message}`, toastProps);
      }
    }
  };

  const columns = [
    { name: "ID", selector: "_id", sortable: true },
    { name: "Test", selector: "test", sortable: true },
    {
      name: "Images",
      cell: (row) => (
        <div className="flex items-center space-x-4">
          {row.image.map((image) => (
            <img
              key={image.public_id}
              src={image.url}
              alt={image.originalname}
              className="object-cover w-10 h-10 rounded-full"
            />
          ))}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="mx-[1px] flex items-center space-x-4">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => navigate(`/test/edit/${row._id}`)}
          >
            Edit
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container h-screen max-w-screen-xl p-8 mx-auto my-8 rounded-lg shadow-2xl">
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded"
        onClick={() => {
          navigate(`/test/create`);
        }}
      >
        Create
      </button>
      {isLoading || isDeleting ? (
        <div className="mt-8 loader">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <div className="mt-8">
          {userTests?.length ? (
            <DataTable
              title="Tests"
              columns={columns}
              data={userTests}
              pagination
              highlightOnHover
              pointerOnHover
              onRowClicked={(row) => navigate(`${row._id}`)}
            />
          ) : (
            <p>No data available.</p>
          )}
        </div>
      )}
    </div>
  );
}
