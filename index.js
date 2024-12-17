/// <reference types="chrome"/>
/// <reference types="web-ext-types"/>

const netflixForm = document.querySelector("#netflix_form");


browser.storage.local.get("netflix").then(st => {
    const netflixInputs = netflixForm.querySelectorAll("input");
    const netflixOptions = st.netflix ?? {};
    const disable = !(netflixOptions.enabled ?? false);

    netflixInputs.forEach(input => {
        input.checked = netflixOptions[input.name] ?? false;
        if (input.name !== "enabled") {
            input.disabled = disable;
        }
    });

});


netflixForm.addEventListener("change", async function (event) {
    event.stopPropagation();
    const netflix = {
        ...(await browser.storage.local.get("netflix")).netflix,
        [event.target.name]: event.target.checked
    };
    console.log("current netflix ", netflix);
    await browser.storage.local.set({
        netflix: netflix
    });

    if (event.target.name === "enabled") {
        const netflixInputs = netflixForm.querySelectorAll("input");

        const disable = !netflix.enabled;

        netflixInputs.forEach(input => {
            if (input.name !== "enabled") {
                input.disabled = disable;
            }
        });
    }
});