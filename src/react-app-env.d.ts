declare module '*.less' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.po' {
  export const messages: {
    [key: string]: string | string[]
  }
}

