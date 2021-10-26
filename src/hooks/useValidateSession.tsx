import { signIn, useSession } from "next-auth/client";

export function useValidateSession() {
    const [session] = useSession();
    const validateSession = () => {
        if (!session) {
            signIn("github");
            return false;
        }
        return true;
    }

    return validateSession;
}