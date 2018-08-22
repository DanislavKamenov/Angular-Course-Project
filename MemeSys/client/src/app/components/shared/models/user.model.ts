export interface User {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    isAdmin: boolean;
    roleNames: string[];
}