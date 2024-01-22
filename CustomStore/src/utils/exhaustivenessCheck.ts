// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function exhaustivenessCheck(_: never): never {
  throw new Error('Exhaustivness failure! This should never happen.')
}
