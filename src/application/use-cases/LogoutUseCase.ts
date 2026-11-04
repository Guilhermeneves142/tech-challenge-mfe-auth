import type { AuthRepository } from "@/domain/repositories/AuthRepository";
import type { SessionStorage } from "@/domain/repositories/SessionStorage";

export class LogoutUseCase {
    constructor(
        private readonly auth: AuthRepository,
        private readonly storage: SessionStorage,
    ) {}

    async execute(): Promise<void> {
        try {
            await this.auth.logout();
        } finally {
            this.storage.clear();
        }
    }
}