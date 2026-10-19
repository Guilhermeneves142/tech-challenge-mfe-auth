import type { Session } from "../entities/Session";

export interface LoginParams {
    email: string;
    password: string;
}

export interface RegisterParams {
    name: string;
    email: string;
    password: string;
}

export interface AuthRepository {
    login(params: LoginParams): Promise<Session>;
    register(params: RegisterParams): Promise<Session>;
}