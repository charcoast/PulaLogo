/// <reference types="chrome"/>
/// <reference types="web-ext-types"/>

const netflixForm = document.querySelector("#netflix_form");
const crunchyrollForm = document.querySelector("#crunchyroll_form");

for (let streaming of [netflixForm, crunchyrollForm]) {
    const name = streaming.name;
    browser.storage.local.get(name).then(st => {
        const inputs = streaming.querySelectorAll("input");
        const streamingOptions = st[name] ?? {};

        const disable = !(streamingOptions.enabled ?? false);
        inputs.forEach(input => {
            input.checked = streamingOptions[input.name] ?? false;
            if (input.name !== "enabled") {
                input.disabled = disable;
            }
        });
    });


    streaming.addEventListener("change", (event) => {
        void handleChangeEvent(event, streaming.name);
    });

}

async function handleChangeEvent(event, streaming) {
    event.stopPropagation();
    const newStreamingConfig = {
        ...(await browser.storage.local.get(streaming))[streaming],
        [event.target.name]: event.target.checked
    };

    await browser.storage.local.set({
        [streaming]: newStreamingConfig
    });
    if (event.target.name === "enabled") {
        const formElement = event.composedPath().find(x => x.tagName.toLowerCase() === "form");
        if (formElement) {

            const netflixInputs = formElement.querySelectorAll("input");

            const disable = !newStreamingConfig.enabled;
            netflixInputs.forEach(input => {
                if (input.name !== "enabled") {
                    input.disabled = disable;
                }
            });
        }
    }

}