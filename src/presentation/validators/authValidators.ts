export const passwordsMismatch = (password: string, confirm: string) =>
    confirm.length > 0 && confirm !== password;

export function validateLogin(input: { email: string; password: string }): string | null {
    if (!input.email || !input.password) return "Preencha e-mail e senha.";
    return null;
}

export function validateRegister(input: {
        name: string;
        email: string;
        password: string;
        confirm: string;
    }): string | null {

    if (!input.name || !input.email || !input.password || !input.confirm) {
        return "Preencha todos os campos.";
    }
    
    if (input.password !== input.confirm) return "As senhas não coincidem.";
    return null;
}