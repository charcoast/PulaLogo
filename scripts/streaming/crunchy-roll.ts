import {ButtonClicker} from "../button-clicker";
import {Streaming} from "./streaming";

const selector = '[data-testid="skipButton"] div';

export class CrunchyRoll implements Streaming {

    tryGetElement(): HTMLElement | null {
        const wrapper = document.querySelector(selector);
        if (!wrapper) return null;

        const button = wrapper.children[0];

        return button as HTMLElement;
    }

    trySkip() {
        const el = this.tryGetElement();
        if (el) {
            this.skip(el)
        }
    }

    skip(el: HTMLElement) {
        el.click()
        console.log("Jump button clicked");
    };

}

console.log('[PULA-LOGO] Crunchy Roll')
ButtonClicker.observeAndClick(new CrunchyRoll());
