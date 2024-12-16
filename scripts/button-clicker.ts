import {Streaming} from "./streaming/streaming";

export class ButtonClicker {
    static async observeAndClick(streaming: Streaming) {
        const enabled = (await browser.storage.local.get('enabled'))?.enabled ?? false

        if (!enabled) {
            console.log('Extensão está desabilitada. Saindo...')
            return;
        }

        const element = await this.waitForElm(streaming);

        streaming.skip(element);

        setTimeout(() => {
            console.log('Iniciando observer')
            this.observeAndClick(streaming)
        }, 2000)
    }

    static waitForElm(streaming: Streaming): Promise<HTMLElement> {
        console.log("Procurando pelo botão de pular");
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
            
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        });
    }
}
