import React from "react";
import demoImage from "@assets/demo.jpeg";

export default function () {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="mb-4 text-4xl font-bold">
          Welcome To My Demo App User!
        </h1>
        <p className="mb-8 text-lg">
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </p>
        <div className="flex items-center justify-center mb-8">
          <img
            src={demoImage}
            alt="Plant Image"
            className={"rounded-lg shadow-lg h-1/2 w-1/2"}
          />
        </div>
        <p className="mb-4 text-lg">
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </p>
        <p className="mb-8 text-lg">Lorem Ipsum</p>
      </div>
    </>
  );
}
