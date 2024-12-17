export type Streaming = {
    tryGetElement: () => Promise<HTMLElement | null>,
    trySkip: () => Promise<void>
    skip: (el: HTMLElement) => void
}