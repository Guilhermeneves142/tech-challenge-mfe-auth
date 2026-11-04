export class InvalidCredentialsError extends Error {
    constructor() {
        super("E-mail ou senha inválidos");
        this.name = "InvalidCredentialsError";
    }
}

export class EmailAlreadyInUseError extends Error {
    constructor() {
        super("Este e-mail já está em uso");
        this.name = "EmailAlreadyInUseError";
    }
}

export class AuthServiceError extends Error {
    constructor(public readonly status?: number) {
        super("Não foi possível concluir a operação. Tente novamente.");
        this.name = "AuthServiceError";
    }
}