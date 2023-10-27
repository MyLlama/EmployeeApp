export function helper() {
  const isMobile = function (): boolean {
    return window.innerWidth <= 600
  }

  return { isMobile }
}
