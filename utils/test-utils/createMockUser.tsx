import { User } from "firebase/auth"

export const createMockUser = (user?: Partial<User>): User => {
    return {
        emailVerified: false,
        isAnonymous: false,
        metadata: {},
        providerData: [{
            displayName: null,
            email: null,
            phoneNumber: null,
            photoURL: null,
            providerId: "",
            uid: ""
        }],
        refreshToken: "",
        tenantId: null,
        delete: async () => { },
        getIdToken: async () => { "a" },
        getIdTokenResult: async () => { },
        reload: async () => { },
        toJSON: () => { },
        ...user
    }
}