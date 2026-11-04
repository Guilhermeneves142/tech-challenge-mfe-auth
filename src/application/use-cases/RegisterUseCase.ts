import type { Session } from "@/domain/entities/Session";
import type { AuthRepository, RegisterParams } from "@/domain/repositories/AuthRepository";
import type { SessionStorage } from "@/domain/repositories/SessionStorage";

export class RegisterUseCase {
    constructor(
        private readonly auth: AuthRepository,
        private readonly storage: SessionStorage,
    ) {}

    async execute(params: RegisterParams): Promise<Session> {
        const session = await this.auth.register(params);
        this.storage.save(session);
        return session;
    }
}