import { LoginUseCase } from "@/application/use-cases/LoginUseCase";
import { LogoutUseCase } from "@/application/use-cases/LogoutUseCase";
import { RegisterUseCase } from "@/application/use-cases/RegisterUseCase";
import { AuthRepositoryImpl } from "../repositories/AuthRepositoryImpl";
import { BrowserSessionStorage } from "../storage/BrowserSessionStorage";

const authRepository = new AuthRepositoryImpl();
const sessionStorage = new BrowserSessionStorage();

export const container = {
    loginUseCase: new LoginUseCase(authRepository, sessionStorage),
    registerUseCase: new RegisterUseCase(authRepository, sessionStorage),
    logoutUseCase: new LogoutUseCase(sessionStorage),
};