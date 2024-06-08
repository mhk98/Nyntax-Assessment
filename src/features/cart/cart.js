import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productCartApi = createApi({
  reducerPath: "productCartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://exam-server-7c41747804bf.herokuapp.com/",
  }),

  endpoints: (build) => ({
    getAllCart: build.query({
      query: () => ({
        url: "/carsList",
      }),
    }),
  }),
});

export const { useGetAllCartQuery } = productCartApi;
