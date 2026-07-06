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

type StrengthLevel = {
  label: string
  progress: string
  barColor: string
  textColor: string
}

const STRENGTH_LEVELS: Record<0 | 1 | 2 | 3, StrengthLevel> = {
  0: { label: "Muito fraca", progress: "0%", barColor: "bg-destructive", textColor: "text-destructive" },
  1: { label: "Fraca", progress: "33%", barColor: "bg-destructive", textColor: "text-destructive" },
  2: { label: "Moderada", progress: "66%", barColor: "bg-[var(--color-feedback-warning)]", textColor: "text-[var(--color-feedback-warning)]" },
  3: { label: "Alta", progress: "100%", barColor: "bg-[var(--color-feedback-success)]", textColor: "text-[var(--color-feedback-success)]" },
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  if (password.length === 0) return null

  const { label, progress, barColor, textColor } =
    STRENGTH_LEVELS[getPasswordStrength(password)]

  return (
    <div className="space-y-2 pt-1">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: progress }}
        />
      </div>

      <p className="text-xs text-muted-foreground" aria-live="polite">
        Segurança: <span className={`font-medium ${textColor}`}>{label}</span>
      </p>
    </div>
  )
}