export class HttpError extends Error {
    constructor(public readonly status: number) {
        super(`HTTP ${status}`);
    }
}

// "/api" (relativo): no multizone o navegador está na origem do host,
// que serve as Route Handlers. Override via NEXT_PUBLIC_API_URL se preciso.
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export async function httpRequest<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });

    if (!res.ok) throw new HttpError(res.status);

    return res.json() as Promise<T>;
}