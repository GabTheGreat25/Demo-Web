import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  RootLayout,
  NotFound,
  Welcome,
  HomeLayout,
  AdminLayout,
  EmployeeLayout,
  CustomerLayout,
} from "@/layouts";
import {
  CustomerWelcome,
  LoginUser,
  CustomerRegister,
  EmployeeRegister,
  User,
  UserGetById,
  EditUser,
  UpdateUserInfo,
  UpdateUserPassword,
  Product,
  ProductGetById,
  EditProduct,
  CreateProduct,
  Transaction,
  EditTransaction,
  TransactionAll,
  TransactionGetById,
  TransactionHistory,
  CreateTransaction,
  CartPreview,
  Test,
  CreateTest,
  TestGetById,
  EditTest,
} from "@/page";

import { ProtectedRoute, UnprotectedRoute } from "@/components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* Public Routes */}
      <Route element={<HomeLayout />}>
        <Route
          index
          element={
            <UnprotectedRoute>
              <Welcome />
            </UnprotectedRoute>
          }
        />
        <Route
          path="test"
          element={
            <UnprotectedRoute>
              <Test />
            </UnprotectedRoute>
          }
        />
        <Route
          path="test/create"
          element={
            <UnprotectedRoute>
              <CreateTest />
            </UnprotectedRoute>
          }
        />
        <Route
          path="test/:id"
          element={
            <UnprotectedRoute>
              <TestGetById />
            </UnprotectedRoute>
          }
        />
        <Route
          path="test/edit/:id"
          element={
            <UnprotectedRoute>
              <EditTest />
            </UnprotectedRoute>
          }
        />
        <Route
          path="login"
          element={
            <UnprotectedRoute>
              <LoginUser />
            </UnprotectedRoute>
          }
        />
        <Route
          path="customerRegister"
          element={
            <UnprotectedRoute>
              <CustomerRegister />
            </UnprotectedRoute>
          }
        />
        <Route
          path="employeeRegister"
          element={
            <UnprotectedRoute>
              <EmployeeRegister />
            </UnprotectedRoute>
          }
        />
      </Route>

      {/* Admin Routes */}
      <Route path="admin" element={<AdminLayout />}>
        <Route
          index
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="updateUserInfo"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <UpdateUserInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="user/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <UserGetById />
            </ProtectedRoute>
          }
        />
        <Route
          path="user/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="updateUserPassword"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <UpdateUserPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="product"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path="product/create"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="product/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <ProductGetById />
            </ProtectedRoute>
          }
        />
        <Route
          path="product/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction/edit/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <EditTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="transactionAll"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <TransactionAll />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction/:id"
          element={
            <ProtectedRoute userRoles={["Admin"]}>
              <TransactionGetById />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* Employee Routes */}
      <Route path="employee" element={<EmployeeLayout />}>
        <Route
          index
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <TransactionAll />
            </ProtectedRoute>
          }
        />
        <Route
          path="updateUserInfo"
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <UpdateUserInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="updateUserPassword"
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <UpdateUserPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="product"
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path="product/create"
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="product/:id"
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <ProductGetById />
            </ProtectedRoute>
          }
        />
        <Route
          path="product/edit/:id"
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction/edit/:id"
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <EditTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction/:id"
          element={
            <ProtectedRoute userRoles={["Employee"]}>
              <TransactionGetById />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* Customer Routes */}
      <Route path="customer" element={<CustomerLayout />}>
        <Route
          index
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <CustomerWelcome />
            </ProtectedRoute>
          }
        />
        <Route
          path="updateUserInfo"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <UpdateUserInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="updateUserPassword"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <UpdateUserPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <Transaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="transaction/create"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <CreateTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <CartPreview />
            </ProtectedRoute>
          }
        />
        <Route
          path="transactionHistory"
          element={
            <ProtectedRoute userRoles={["Customer"]}>
              <TransactionHistory />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
