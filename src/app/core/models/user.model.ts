import { Role } from "./role.model";

export interface User {
    id: number;
    email?: string | null;
    password?: string;
    username: string;
    phone: string;
    roles: Role[]
}