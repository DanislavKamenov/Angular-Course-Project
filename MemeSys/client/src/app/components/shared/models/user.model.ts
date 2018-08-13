export interface User {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    isAdmin: boolean;
    roles: string[];
    roleNames: string[];
}