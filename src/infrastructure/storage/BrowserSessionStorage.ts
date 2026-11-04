import type { Session } from "@/domain/entities/Session";
import type { SessionStorage } from "@/domain/repositories/SessionStorage";

// Chave legada: o backend passou a usar cookie httpOnly para o token,
// mas sessões antigas podem ainda ter esse valor salvo no localStorage.
const LEGACY_TOKEN_KEY = "finance-app-token";
const USER_KEY = "finance-app-user";

const isBrowser = () => typeof window !== "undefined";

export class BrowserSessionStorage implements SessionStorage {
    save({ user }: Session): void {
        if (!isBrowser()) return;
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    get(): Session | null {
        if (!isBrowser()) return null;

        const user = localStorage.getItem(USER_KEY);

        if (!user) return null;

        try {
            return { user: JSON.parse(user) };
        } catch {
            return null;
        }
    }

    clear(): void {
        if (!isBrowser()) return;

        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(LEGACY_TOKEN_KEY);
    }
}