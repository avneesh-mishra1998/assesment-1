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
            invalidateTags: ["users"],
        }),
        login: builder.mutation({
            query: (loginInput) => ({
                url: "/login",
                method: "POST",
                body: loginInput,
            }),
            invalidateTags: ["users"],
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
            query: ({data, id}) => ({
              url: `/update-emp/${id}`,
              method: "PUT",
              body: {...data},
            }),
            invalidateTags: ["users"],
        }),
        getProfile: builder.query({
            query: (id) => ({
              url: `/get-profile`,
              method: "GET"
            }),
            providesTags: ["users"],
        }),
        getEmpById: builder.query({
            query: (id) => ({
              url: `/get-emp/${id}`,
              method: "GET"
            }),
            providesTags: ["users"],
        }),
        getAllEmp: builder.query({
            query: () => ({
              url: `/get-emp`,
              method: "GET"
            }),
            providesTags: ["users"],
        }),
        deleteEmp: builder.mutation({
            query: (id) => ({
              url: `/delete-emp/${id}`,
              method: "DELETE",
            }),
            invalidateTags: ["users"],
        }),
        getEmpByLocation: builder.mutation({
            query: ({asc,location}) => ({
              url: `/filter-emp-location/${asc}/${location}`,
              method: "GET"
            }),
            providesTags: ["users"],
        }),
        getAllEmpByName: builder.mutation({
            query: ({asc, name}) => ({
              url: `/filter-emp-name/${asc}/${name}`,
              method: "GET"
            }),
            providesTags: ["users"],
        }),

    })
});


export const {
    useRegisterMutation,
    useLoginMutation,
    useApproveEmpMutation,
    useUpdateEmpMutation,
    useGetProfileQuery,
    useGetEmpByIdQuery,
    useGetAllEmpQuery,
    useDeleteEmpMutation,
    useGetEmpByLocationMutation,
    useGetAllEmpByNameMutation
    } = userApi;