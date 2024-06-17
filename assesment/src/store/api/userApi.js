import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {logout} from "../reducer/userReducer";
import {selectAuthToken} from "../reducer/userReducer";




const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/`,
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



export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ["users"],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (registerInput) => ({
              url: "/register",
              method: "POST",
              body: registerInput,
            }),
        }),
        login: builder.mutation({
            query: (loginInput) => ({
                url: "/login",
                method: "POST",
                body: loginInput,
            }),
        }),
        approveEmp: builder.mutation({
            query: (empData) => ({
              url: "/approve-emp",
              method: "POST",
              body: empData,
            }),
            invalidateTags: ["users"],
        }),
        updateEmp: builder.mutation({
            query: (empData, id) => ({
              url: `/update-emp/${id}`,
              method: "PUT",
              body: empData,
            }),
            invalidateTags: ["users"],
        }),
        getEmpById: builder.query({
            query: (id) => ({
              url: `/get-emp/${id}`,
              method: "GET"
            }),
            invalidateTags: ["users"],
        }),
        getAllEmp: builder.query({
            query: () => ({
              url: `/get-dep`,
              method: "GET"
            }),
            invalidateTags: ["users"],
        }),
        deleteEmp: builder.mutation({
            query: (id) => ({
              url: `/delete-emp/${id}`,
              method: "DELETE",
            }),
            invalidateTags: ["users"],
        }),
        getEmpByLocation: builder.query({
            query: (asc, location) => ({
              url: `/get-emp/${asc}/${location}`,
              method: "GET"
            }),
            invalidateTags: ["users"],
        }),
        getAllEmpByName: builder.query({
            query: (asc, name) => ({
              url: `/get-dep/${asc}/${name}`,
              method: "GET"
            }),
            invalidateTags: ["users"],
        }),
    })
});


export const {
    useRegisterMutation,
    useLoginMutation,
    useApproveEmpMutation,
    useUpdateEmpMutation,
    useGetEmpByIdQuery,
    useGetAllEmpQuery,
    useDeleteEmpMutation,
    useGetEmpByLocationQuery,
    useGetAllEmpByNameQuery
    } = userApi;