
const colorControls = document.getElementById('controls')
let currentMode = 'monochrome'

document.addEventListener('click', (e) => {
    console.log(e.target)
    if (e.target.id === 'dropdown-btn'){
        document.getElementById('mode-dropdown').classList.toggle('show')
    } else if (e.target.classList.contains('mode-option')){
        document.getElementById(currentMode).classList.remove('current-mode')
        currentMode = e.target.id
        document.getElementById('mode-dropdown').classList.toggle('show')
        document.getElementById(e.target.id).classList.add('current-mode')
        document.getElementById('dropdown-btn').textContent = document.getElementById(e.target.id).textContent
    }
})

colorControls.addEventListener('submit',(e) => {
    console.log(e)
    e.preventDefault()
    let seedColor = document.getElementById('color-picker').value
    //GET COLOR SCHEME MODE FROM DROPDOWN MENU
    getColorScheme(seedColor, schemeMode)
})

function getColorScheme(seedColor, schemeMode){
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${schemeMode}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let colors = data.colors
        let colorPanelHtml = ""
        console.log(colors)
        colors.forEach(color => {
            colorPanelHtml += getColorHtml(color)
        });
        document.getElementById('colors').innerHTML = colorPanelHtml
    })
}




function getColorHtml(color) {

    const hex = color.hex.value
    
    return `
        <div class="color" style="background-color: ${hex};">
            <p class="color-label white-text">${hex}</p>
            <p class="color-label black-text">${hex}</p>
        </div>
    `
}


    //https://webaim.org/resources/contrastchecker/?fcolor=0000FF&bcolor=FFFFFF&api