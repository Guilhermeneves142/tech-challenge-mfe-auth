"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/auth-api";

export function useLogin() {
  return useMutation({
    mutationFn: authApi.login,
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: authApi.register,
  });
}
