function getPasswordStrength(password: string): 0 | 1 | 2 | 3 {
  if (password.length === 0) return 0

  let score = 0

  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  return Math.min(score, 3) as 0 | 1 | 2 | 3
}

interface PasswordStrengthIndicatorProps {
  password: string
}

const strengthConfig: Record<0 | 1 | 2 | 3, { label: string }> = {
  0: { label: "Muito fraca" },
  1: { label: "Fraca" },
  2: { label: "Moderada" },
  3: { label: "Alta" },
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  if (password.length === 0) return null

  const strength = getPasswordStrength(password)
  const { label } = strengthConfig[strength]

  const progress: Record<0 | 1 | 2 | 3, string> = {
    0: "0%",
    1: "33%",
    2: "66%",
    3: "100%",
  }

  const color =
    strength === 3
      ? "bg-[var(--color-feedback-success)]"
      : strength === 2
        ? "bg-[var(--color-feedback-warning)]"
        : "bg-destructive"

  const labelColor =
    strength === 3
      ? "text-[var(--color-feedback-success)]"
      : strength === 2
        ? "text-[var(--color-feedback-warning)]"
        : "text-destructive"

  return (
    <div className="space-y-2 pt-1">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width: progress[strength] }}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Segurança:{" "}
        <span className={`font-medium ${labelColor}`}>
          {label}
        </span>
      </p>
    </div>
  )
}