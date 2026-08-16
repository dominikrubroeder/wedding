export function getTargetDate() {
  const target = new Date()
  target.setDate(target.getDate() + 3)
  target.setHours(target.getHours() + 4)
  return target
}