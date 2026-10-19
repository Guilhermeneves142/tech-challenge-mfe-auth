import type { Session } from "@/domain/entities/Session";
import { AuthServiceError, EmailAlreadyInUseError, InvalidCredentialsError } from "@/domain/errors/AuthErrors";
import type { AuthRepository, LoginParams, RegisterParams } from "@/domain/repositories/AuthRepository";
import { HttpError, httpRequest } from "../http/httpClient";

interface AuthResponseDto {
    user: Session["user"];
    token: string;
}

const toSession = (dto: AuthResponseDto): Session => ({
    user: dto.user,
    token: dto.token,
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
}