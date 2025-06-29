export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return regex.test(email)
}

// Arya Stark blablabla
export const getInitials = (name) => {
  if (!name) return ""

  const words = name.split(" ")

  let initials = ""

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0]
  }

  return initials.toUpperCase()
}

export const getEmptyCardMessage = (filterType) => {
  switch (filterType) {
    case "search":
      return `Oops! No notes found!`

    case "date":
      return `No notes found in the given date range`

    default:
      return `Begin your journey by sharing unforgettable travel stories! Click 'Add' to capture your thoughts, experiences and adventures. Start Now!`
  }
}