// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
//
// export const apiSlice = createApi({
//     reducerPath: "api",
//     baseQuery: fetchBaseQuery({
//         baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
//     }),
//     endpoints: (builder) => ({}),
// })
//
// export const {} = apiSlice;

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";  // Ensure you import from `query/react`

// Define the types for the requests and responses
type RegistrationData = {
    username: string;
    password: string;
    email: string;
};

type RegistrationResponse = {
    message: string;
    activationToken: string;
};

type ActivationData = {
    activationToken: string;
    activationCode: string;
};

type ActivationResponse = {
    message: string;
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    }),
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: 'registration',
                method: 'POST',
                body: data,
            }),
        }),
        activate: builder.mutation<ActivationResponse, ActivationData>({
            query: (data) => ({
                url: 'activate-user',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

// Export the auto-generated hooks
export const { useRegisterMutation, useActivateMutation } = apiSlice;
