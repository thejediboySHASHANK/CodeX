import {apiSlice} from "@/redux/features/api/apiSlice";
import {userRegistration} from "@/redux/features/auth/authSlice";

type RegistrationResponse = {
    message: string;
    activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Endpoints
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "registration",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken,
                        })
                    );

                    localStorage.setItem('activationToken', result.data.activationToken);

                    // Example of dispatching manually for testing
                    // dispatch(userRegistration({token: "hardcoded-token"}));

                } catch (error: any) {
                    console.log(error);
                }
            }

        }),
        activation: builder.mutation({
            query: ({activation_token, activation_code}) => ({
                url: "activate-user",
                method: "POST",
                body: {
                    activation_token,
                    activation_code,
                },
            }),
        }),
    }),
});

export const {useRegisterMutation, useActivationMutation} = authApi;