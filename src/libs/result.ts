export function getResultMessage(message: string, diff: string) {
  return () => {
    if (!diff) {
      return message
    }

    return `${message}

${diff}`
  }
}
