import { LOG_PREFIX } from "./common";
import { Streaming } from "./streaming/streaming";

export class ButtonClicker {
    static async observeAndClick(streaming: Streaming) {
        const element = await this.waitForElm(streaming);

        streaming.skip(element);

        setTimeout(() => {
            console.log('Iniciando observer')
            this.observeAndClick(streaming)
        }, 2000)
    }

    static async waitForElm(streaming: Streaming): Promise<HTMLElement> {
        console.log(LOG_PREFIX + " Procurando pelo botão de pular");
        return new Promise(async (resolve) => {
            let el = await streaming.tryGetElement();
            if (el) {
                return resolve(el);
            }

            const observer = new MutationObserver(async () => {
                el = await streaming.tryGetElement();
                if (el) {
                    observer.disconnect();
                    resolve(el);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        });
    }
}
