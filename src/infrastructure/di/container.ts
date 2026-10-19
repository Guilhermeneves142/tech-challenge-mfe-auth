import { LoginUseCase } from "@/application/use-cases/LoginUseCase";
import { LogoutUseCase } from "@/application/use-cases/LogoutUseCase";
import { RegisterUseCase } from "@/application/use-cases/RegisterUseCase";
import { HttpAuthRepository } from "../repositories/HttpAuthRepository";
import { BrowserSessionStorage } from "../storage/BrowserSessionStorage";

const authRepository = new HttpAuthRepository();
const sessionStorage = new BrowserSessionStorage();

export const container = {
    loginUseCase: new LoginUseCase(authRepository, sessionStorage),
    registerUseCase: new RegisterUseCase(authRepository, sessionStorage),
    logoutUseCase: new LogoutUseCase(sessionStorage),
};