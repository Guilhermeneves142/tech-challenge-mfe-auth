import type { Session } from "@/domain/entities/Session";
import type { SessionStorage } from "@/domain/repositories/SessionStorage";

const TOKEN_KEY = "finance-app-token";
const USER_KEY = "finance-app-user";

const isBrowser = () => typeof window !== "undefined";

export class BrowserSessionStorage implements SessionStorage {
    save({ token, user }: Session): void {
        if (!isBrowser()) return;
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));

        document.cookie = `${TOKEN_KEY}=${token}; path=/; SameSite=Lax`;
    }

    get(): Session | null {
        if (!isBrowser()) return null;

        const token = localStorage.getItem(TOKEN_KEY);
        const user = localStorage.getItem(USER_KEY);

        if (!token || !user) return null;

        try {
            return { token, user: JSON.parse(user) };
        }catch {
            return null;
        }
    }

    clear(): void {
        if (!isBrowser()) return;

        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);

        document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
}