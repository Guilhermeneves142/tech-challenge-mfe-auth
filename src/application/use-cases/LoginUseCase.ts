import type { Session } from "@/domain/entities/Session";
import type { AuthRepository, LoginParams } from "@/domain/repositories/AuthRepository";
import type { SessionStorage } from "@/domain/repositories/SessionStorage";

export class LoginUseCase {
    constructor(
        private readonly auth: AuthRepository,
        private readonly storage: SessionStorage,
    ) {}

    async execute(params: LoginParams): Promise<Session> {
        const session = await this.auth.login(params);
        this.storage.save(session);
        return session;
    }
}