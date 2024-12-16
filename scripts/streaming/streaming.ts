export type Streaming = {
    tryGetElement: () => HTMLElement|null,
    trySkip: () => void
    skip: (el: HTMLElement) => void
}