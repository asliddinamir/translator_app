let main_url = 'https://api.mymemory.translated.net/get?q='

const btn = document.querySelector('.btn')
const inputValue = document.getElementById('translateFromTXTArea')
const translation = document.getElementById('translateToTXTArea')
const languagesFrom = document.getElementById('languagesFrom')
const languagesTo = document.getElementById('languagesTo')
const icon = document.getElementById('icon')
const closeBtn = document.getElementById('close')
const p = document.querySelector('p')
inputValue.addEventListener('keypress', func)
btn.addEventListener('click', funcBtn)

function func(e) {
    var key = e.which || e.keyCode || 0;
    if (key == 13) {
        console.log(e.keyCode);
        funcBtn()
    }
}

function funcBtn() {
    let translateFrom = languagesFrom.options[languagesFrom.selectedIndex].value
    let translateTo = languagesTo.options[languagesTo.selectedIndex].value
    let text = inputValue.value
    if (!text) return;
    translation.setAttribute("placeholder", "Please Wait.....");
    fetch(`${main_url}${text}&langpair=${translateFrom}|${translateTo}`)
        .then(a => a.json())
        .then(b => {
            console.log(b)
            translation.value = b.responseData.translatedText
            console.log(translation.value)
            b.matches.forEach(b => {
                if (b.id === 0) {
                    translation.value = b.translation;
                }
            })
            inputValue.addEventListener("keyup", () => {
                if (!inputValue.value) {
                    translation.value = "";
                    translation.setAttribute("placeholder", "Translation");
                }
            });
        })
}

closeBtn.addEventListener('click', closeFunc)

function closeFunc() {
    inputValue.value = ''
    translation.value = ""
    closeBtn.classList.add('hidden')
    translation.setAttribute("placeholder", "Translation");
}

inputValue.addEventListener("keyup", () => {
    if (inputValue.value) {
        closeBtn.classList.remove('hidden')
    }
    else {
        closeBtn.classList.add('hidden')
    }
});
icon.addEventListener("click", () => {
    let tempText = inputValue.value
    inputValue.value = translation.value;
    translation.value = tempText;
    let tempLang = languagesTo.value;
    languagesTo.value = languagesFrom.value;
    languagesFrom.value = tempLang;
});

languagesFrom.addEventListener('change', () => {
    let translateFrom = languagesFrom.options[languagesFrom.selectedIndex].value
    console.log(translateFrom);
})
languagesTo.addEventListener('change', () => {
    let translateTo = languagesTo.options[languagesTo.selectedIndex].value
    console.log(translateTo);
})

