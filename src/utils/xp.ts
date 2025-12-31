export const XP_PER_LEVEL = 100

export function getLevelFromXP(xp: number) {
  return Math.floor(xp / XP_PER_LEVEL)
}

export function addXP(xp: number, amount: number) {
  return xp + amount
}