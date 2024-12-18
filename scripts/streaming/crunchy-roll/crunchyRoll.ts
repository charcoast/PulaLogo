import {ButtonClicker} from "../../button-clicker";
import {Streaming} from "../streaming";
import {CrunchyRollOptions} from "./crunchyRollOptions";

const SKIP_INTO_SELECTOR = '[data-testid="skipButton"] div';

export class CrunchyRoll implements Streaming {

    async getSelector(): Promise<string | undefined> {
        const crunchyroll = (await browser.storage.local.get('crunchyroll'))?.crunchyroll as CrunchyRollOptions | undefined

        if (!crunchyroll || !crunchyroll.enabled) {
            return undefined;
        }
        return SKIP_INTO_SELECTOR;

    }

    async tryGetElement(): Promise<HTMLElement | null> {
        const selector = await this.getSelector();
        if (!selector) return null;

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
