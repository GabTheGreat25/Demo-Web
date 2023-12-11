import React from "react";
import { useGetUserByIdQuery } from "@api";
import { RingLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(id);
  const navigate = useNavigate();

  const { _id, name, email, roles, image } = data?.details || {};

  const goBack = () => {
    navigate("/admin");
  };

  return (
    <>
      {isLoading ? (
        <div className="loader">
          <RingLoader color="#4F6C42" loading={true} size={50} />
        </div>
      ) : (
        <main className="grid items-center justify-center h-full grid-flow-col pt-24 gap-x-10">
          <div
            key={_id}
            className="p-6 rounded-md shadow-md bg-dark-default text-light-default dark:bg-light-default dark:text-dark-default w-96"
          >
            <h1 className="mb-4 text-3xl font-bold">{name}</h1>
            <p className="mb-2 text-sm">User ID: {_id}</p>
            <p className="mb-2 text-sm">Email: {email}</p>
            <p className="mb-2 text-sm">Roles: {roles}</p>
            {image?.map((image) => (
              <img
                key={image?.public_id}
                src={image?.url}
                alt={image?.originalname}
                className="object-cover w-16 h-12 mr-2 rounded-md"
              />
            ))}
            <button
              onClick={goBack}
              className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-700"
            >
              Go Back
            </button>
          </div>
        </main>
      )}
    </>
  );
}
