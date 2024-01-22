function pasteFromClipboard() {
    navigator.clipboard.readText()
        .then((text) => {
            document.getElementById('videoLink').value = text;
            updateCompanyLink(text);
        })
        .catch((err) => {
            console.error('Error reading from clipboard', err);
        });
}

function updateCompanyLink(link) {
    document.getElementById('companyLink').innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
}
