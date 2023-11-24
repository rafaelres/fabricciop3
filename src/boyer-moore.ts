export function buildCharMap(pattern: string): Record<string, number> {
  const charMap: Record<string, number> = {}

  for (let index: number = 0; index < pattern.length; ++index) {
    charMap[pattern.charAt(index)] = index
  }

  return charMap
}

export function boyerMoore(pattern: string, text: string): number[] {
  const charMap = buildCharMap(pattern)
  const diff = text.length - pattern.length
  const shifts: number[] = []
  let shift: number = 0 // Pattern displacement

  while (shift <= diff) {
    let matched = true
    let index = pattern.length - 1

    while (index >= 0) {
      if (pattern.charAt(index) != text.charAt(index + shift)) {
        matched = false // Char mismatch
        break
      }
      --index
    }

    if (matched) {
      shifts.push(shift)
      ++shift
    } else {
      if (charMap[text.charAt(index + shift)]) {
        index - charMap[text.charAt(index + shift)] > 1
          ? (shift = shift + (index - charMap[text.charAt(index + shift)]))
          : ++shift
      } else {
        shift += index + 1
      }
    }
  }
  return shifts
}
