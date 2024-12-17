import {ButtonClicker} from "../../button-clicker";
import {Streaming} from "../streaming";

const selector = '[data-testid="skipButton"] div';

export class CrunchyRoll implements Streaming {

    async tryGetElement(): Promise<HTMLElement | null> {
        return document.querySelector(selector) as HTMLElement | null;
    }

    async trySkip() {
        const el = await this.tryGetElement();
        if (el) {
            this.skip(el)
        }
    }

    skip(el: HTMLElement) {
        el.click()
        console.log("Botão de pular foi pressionado");
    };

}

console.log('[PULA-LOGO] Crunchy Roll')
ButtonClicker.observeAndClick(new CrunchyRoll());
