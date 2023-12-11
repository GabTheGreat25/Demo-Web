import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/env";
import UserAPI from "./routes/users";
import AuthAPI from "./routes/auth";
import ProductAPI from "./routes/products";
import TransactionAPI from "./routes/transactions";
import TestAPI from "./routes/test";
import { API, TAGS } from "@/constants";

const prepareHeaders = (headers, { getState }) => {
  if (getState()?.auth?.authenticated)
    headers.set("authorization", `Bearer ${getState()?.auth?.token || ""}`);
  headers.set("accept", `application/json`);
  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders,
});

export const api = createApi({
  reducerPath: TAGS.API,
  baseQuery,
  tagTypes: API.TAGS,
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getUsers: UserAPI.get(builder),
    getUserById: UserAPI.getById(builder),
    addUser: UserAPI.add(builder),
    updateUser: UserAPI.updateById(builder),
    deleteUser: UserAPI.deleteById(builder),
    updatePassword: UserAPI.updatePasswordById(builder),
    getProducts: ProductAPI.get(builder),
    getProductById: ProductAPI.getById(builder),
    addProduct: ProductAPI.add(builder),
    updateProduct: ProductAPI.updateById(builder),
    deleteProduct: ProductAPI.deleteById(builder),
    login: AuthAPI.login(builder),
    logout: AuthAPI.logout(builder),
    getTransactions: TransactionAPI.get(builder),
    getTransactionById: TransactionAPI.getById(builder),
    addTransaction: TransactionAPI.add(builder),
    updateTransaction: TransactionAPI.updateById(builder),
    deleteTransaction: TransactionAPI.deleteById(builder),
    getTests: TestAPI.get(builder),
    getTestById: TestAPI.getById(builder),
    addTest: TestAPI.add(builder),
    updateTest: TestAPI.updateById(builder),
    deleteTest: TestAPI.deleteById(builder),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useLoginMutation,
  useUpdatePasswordMutation,
  useLogoutMutation,
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useGetTestsQuery,
  useGetTestByIdQuery,
  useAddTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
} = api;
