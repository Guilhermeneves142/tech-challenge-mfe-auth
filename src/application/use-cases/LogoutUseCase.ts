import type { SessionStorage } from "@/domain/repositories/SessionStorage";

export class LogoutUseCase {
    constructor(private readonly storage: SessionStorage) {}

    execute(): void {
        this.storage.clear();
    }
}