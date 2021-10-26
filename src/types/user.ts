export interface User {
    ref?: {
        id: string;
    }
    data: {
        email: string;
        name: string;
        idStripe?: string;
    }
}
