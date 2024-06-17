import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {logout} from "../reducer/userReducer";
import {selectAuthToken} from "../reducer/userReducer";

console.log("URL==>", `${import.meta.env.VITE_SERVER}`);



const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = selectAuthToken(getState());
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async(args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        await api.dispatch(logout());
    }
    return result;
};



export const depApi = createApi({
    reducerPath: 'depApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ["departments"],
    endpoints: (builder) => ({
        createDep: builder.mutation({
            query: (depData) => ({
              url: "/create-dep",
              method: "POST",
              body: depData,
            }),
            invalidateTags: ["departments"],
        }),
        updateDep: builder.mutation({
            query: (depData, id) => ({
              url: `/update-dep/${id}`,
              method: "POST",
              body: depData,
            }),
            invalidateTags: ["departments"],
        }),
        getDepById: builder.query({
            query: (id) => ({
              url: `/get-one-dep/${id}`,
              method: "GET"
            }),
            invalidateTags: ["departments"],
        }),
        getAllDep: builder.query({
            query: () => ({
              url: `/get-all-dep`,
              method: "GET"
            }),
            invalidateTags: ["departments"],
        }),
        deleteDep: builder.mutation({
            query: (id) => ({
              url: `/delete-dep/${id}`,
              method: "DELETE",
            }),
            invalidateTags: ["departments"],
          }),
    })
});


export const {
    useCreateDepMutation,
    useUpdateDepMutation,
    useGetDepByIdQuery,
    useGetAllDepQuery,
    useDeleteDepMutation
 } = depApi