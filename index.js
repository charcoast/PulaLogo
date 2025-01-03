/// <reference types="chrome"/>
/// <reference types="web-ext-types"/>

const netflixForm = document.querySelector("#netflix_form");
const crunchyrollForm = document.querySelector("#crunchyroll_form");

for (let streaming of [netflixForm, crunchyrollForm]) {
  const name = streaming.name;

  browser.storage.local.get(name).then((st) => {
    const inputs = streaming.querySelectorAll("input");
    const streamingOptions = st[name] ?? {};

    const disable = !(streamingOptions.enabled ?? false);
    inputs.forEach((input) => {
      input.checked = streamingOptions[input.name] ?? false;
      if (input.name !== "enabled") {
        input.disabled = disable;
      }
    });
  });

  streaming.addEventListener("change", (event) => {
    void handleChangeEvent(event, streaming);
  });
}

async function handleChangeEvent(event, streaming) {

  const name = streaming.name;
  event.stopPropagation();
  const newStreamingConfig = {
    ...(await browser.storage.local.get(name))[name],
    [event.target.name]: event.target.checked,
  };

  await browser.storage.local.set({
    [name]: newStreamingConfig,
  });


  if (event.target.name === "enabled") {

    const inputs = streaming.querySelectorAll("input");

    const disable = !newStreamingConfig.enabled;
    inputs.forEach((input) => {
      if (input.name !== "enabled") {
        input.disabled = disable;
      }
    });
  }
}
