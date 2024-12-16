import {Streaming} from "./streaming";
import {ButtonClicker} from "../button-clicker";

const selector = '[data-uia="player-skip-recap"]';

export class Netflix implements Streaming {
    tryGetElement(): HTMLElement | null {
        return document.querySelector(selector);
    };

    trySkip(): void {
        const el = this.tryGetElement();
        if (el) {
            this.skip(el)
        }
    };

    skip(el: HTMLElement): void {
        el.click()
        console.log("Botão de pular foi pressionado");
    };

}

console.log('[PULA-LOGO] Netflix')
ButtonClicker.observeAndClick(new Netflix());