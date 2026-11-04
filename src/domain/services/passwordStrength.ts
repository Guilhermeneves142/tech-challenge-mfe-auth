export type PasswordStrength = 0 | 1 | 2 | 3;

export function getPasswordStrength(password: string): 0 | 1 | 2 | 3 {
    if (password.length === 0) return 0

    let score = 0

    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    return Math.min(score, 3) as 0 | 1 | 2 | 3
}