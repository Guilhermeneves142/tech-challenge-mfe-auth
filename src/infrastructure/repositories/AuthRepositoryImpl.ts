import type { Session } from "@/domain/entities/Session";
import { AuthServiceError, EmailAlreadyInUseError, InvalidCredentialsError } from "@/domain/errors/AuthErrors";
import type { AuthRepository, LoginParams, RegisterParams } from "@/domain/repositories/AuthRepository";
import { BASE_URL, HttpError, httpRequest } from "../http/httpClient";

interface AuthResponseDto {
    user: Session["user"];
}

const toSession = (dto: AuthResponseDto): Session => ({
    user: dto.user,
});

export class AuthRepositoryImpl implements AuthRepository {
    async login(params: LoginParams): Promise<Session> {
        try {
            const dto = await httpRequest<AuthResponseDto>("/auth/login", {
                method: "POST",
                body: JSON.stringify(params),
            });

            return toSession(dto);
        } catch (e) {
            if (e instanceof HttpError && e.status === 401) throw new InvalidCredentialsError();
            throw new AuthServiceError(e instanceof HttpError ? e.status : undefined);
        }
    }

    async register(params: RegisterParams): Promise<Session> {
        try {
            const dto = await httpRequest<AuthResponseDto>("/auth/register", {
                method: "POST",
                body: JSON.stringify(params),
            });
            return toSession(dto);
        } catch (e) {
            if (e instanceof HttpError && e.status === 409) throw new EmailAlreadyInUseError();
            throw new AuthServiceError(e instanceof HttpError ? e.status : undefined);
        }
    }

    async logout(): Promise<void> {
        try {
            await fetch(`${BASE_URL}/auth/logout`, { method: "POST" });
        } catch {
            // sessão local é limpa mesmo se a chamada ao servidor falhar
        }
    }
}