import {Streaming} from "../streaming";
import {ButtonClicker} from "../../button-clicker";
import {NetflixOptions} from "./netflixOptions";

const SKIP_RECAP_SELECTOR = '[data-uia="player-skip-recap"]';
const SKIP_INTRO_SELECTOR = '[data-uia="player-skip-intro"]'

export class Netflix implements Streaming {

    async getSelector(): Promise<string | undefined> {
        const netflix = (await browser.storage.local.get('netflix'))?.netflix as NetflixOptions | undefined

        if (!netflix || !netflix.enabled) {
            return undefined;
        }
        const skipArray = [];
        if (netflix.skipIntros) {
            skipArray.push(SKIP_INTRO_SELECTOR)
        }
        if (netflix.skipRecaps) {
            skipArray.push(SKIP_RECAP_SELECTOR)
        }

        return `${skipArray.join(", ")}`

    }

    async tryGetElement(): Promise<HTMLElement | null> {
        const selector = await this.getSelector();
        if (!selector) return null;
        // console.log(selector)
        return document.querySelector(selector) as HTMLElement | null;
    };

    async trySkip(): Promise<void> {
        const el = await this.tryGetElement();
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