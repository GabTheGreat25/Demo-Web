import React from "react";
import demoImage from "@assets/demo.jpeg";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();

  const Login = () => navigate("/login");

  return (
    <div className="flex flex-col items-center justify-center h-full pt-24">
      <img
        src={demoImage}
        alt="Plant Welcome Image"
        className="object-cover w-32 h-32 mb-8 rounded-full"
      />
      <h1 className="mb-4 text-4xl font-bold">Welcome to My Demo App</h1>
      <p className="mb-8 text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, itaque.
      </p>
      <button
        onClick={Login}
        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
      >
        Get Started
      </button>
    </div>
  );
}
