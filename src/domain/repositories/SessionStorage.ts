import type { Session } from "../entities/Session";

export interface SessionStorage {
    save(session: Session): void;
    get(): Session | null;
    clear(): void;
}