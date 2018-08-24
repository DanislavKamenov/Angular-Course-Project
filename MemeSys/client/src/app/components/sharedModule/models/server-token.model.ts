import { User } from "./user.model";

export interface ServerToken {
    exp: number;
    iat: number;
    sub: string;
    user: User;
}