import {Streaming} from "./streaming";
import {ButtonClicker} from "../button-clicker";
import {CrunchyRoll} from "./crunchy-roll";

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
        console.log("Skip button clicked");
    };

}

console.log('[PULA-LOGO] Netflix')
ButtonClicker.observeAndClick(new Netflix());