import {Streaming} from "./streaming/streaming";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export class ButtonClicker {
    static async observeAndClick(streaming: Streaming) {
        const enabled = (await browser.storage.local.get('enabled'))?.enabled ?? false

        if (!enabled) {
            console.log('Extension is not enabled. Exiting...')
            return;
        }

        const element = await this.waitForElm(streaming);

        streaming.skip(element);

        setTimeout(() => {
            console.log('Starting observer')
            this.observeAndClick(streaming)
        }, 2000)
    }

    static waitForElm(streaming: Streaming): Promise<HTMLElement> {
        console.log("Waiting for element with streaming: ", streaming);
        return new Promise((resolve) => {
            let el = streaming.tryGetElement();
            if (el) {
                return resolve(el);
            }

            const observer = new MutationObserver(() => {
                el = streaming.tryGetElement();
                if (el) {
                    observer.disconnect();
                    resolve(el);
                }
            });

            // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        });
    }
}
