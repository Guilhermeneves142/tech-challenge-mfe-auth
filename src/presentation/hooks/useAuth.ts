"use client";

import { useMutation } from "@tanstack/react-query";
import { container } from "@/infrastructure/di/container";

export function useLogin() {
    return useMutation({
        mutationFn: container.loginUseCase.execute.bind(container.loginUseCase),
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: container.registerUseCase.execute.bind(container.registerUseCase),
    });
}