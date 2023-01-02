import { User, IdTokenResult } from "firebase/auth"

export const createMockUser = (user?: Partial<User>): User => {
    return {
        displayName: "",
        emailVerified: false,
        isAnonymous: false,
        metadata: undefined,
        providerData: [],
        refreshToken: "",
        tenantId: "",
        delete: function (): Promise<void> {
            throw new Error("Function not implemented.");
        },
        getIdToken: function (forceRefresh?: boolean): Promise<string> {
            throw new Error("Function not implemented.");
        },
        getIdTokenResult: function (forceRefresh?: boolean): Promise<IdTokenResult> {
            throw new Error("Function not implemented.");
        },
        reload: function (): Promise<void> {
            throw new Error("Function not implemented.");
        },
        toJSON: function (): object {
            throw new Error("Function not implemented.");
        },
        email: "",
        phoneNumber: "",
        photoURL: "",
        providerId: "",
        uid: "",
        ...user
    }
}