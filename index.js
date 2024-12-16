/// <reference types="chrome"/>
/// <reference types="web-ext-types"/>

const checkbox = document.querySelector("#switch");

// eslint-disable-next-line no-undef
browser.storage.local.get("enabled").then((r) => {
        checkbox.checked = r.enabled;
    }
);

checkbox.addEventListener("change", function (event) {
    console.log("changed to ", event.target.checked);
    chrome.storage.local.set({enabled: event.target.checked});
});