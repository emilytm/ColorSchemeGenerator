
const colorControls = document.getElementById('controls')
let currentMode = 'monochrome'

document.addEventListener('click', (e) => {
    console.log(e.target)
    if (e.target.dataset.btn){
        document.getElementById('mode-dropdown').classList.toggle('show')
    } else if (e.target.classList.contains('mode-option')){
        document.getElementById(currentMode).classList.remove('current-mode')
        currentMode = e.target.id
        document.getElementById('mode-dropdown').classList.toggle('show')
        document.getElementById(e.target.id).classList.add('current-mode')
        document.getElementById('dropdown-btn').textContent = document.getElementById(e.target.id).textContent
    } else if (e.target.dataset.copy){
        let hexCode = e.target.textContent
        navigator.clipboard.writeText(hexCode)
        e.target.textContent = 'Copied!'
        setTimeout(() => {
            e.target.textContent = hexCode
        }, 750)
    }
})

colorControls.addEventListener('submit',(e) => {
    console.log(e)
    e.preventDefault()
    let seedColor = document.getElementById('color-picker').value
    let colorCount = document.getElementById('count-picker').value
    getColorScheme(seedColor, currentMode, colorCount)
})

function getColorScheme(seedColor, schemeMode, colorCount){
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor.slice(1)}&mode=${schemeMode}&count=${colorCount}`)
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
            <div class="labels">
                <p class="color-label white-text" id='white-label' data-copy='label'>${hex}</p>
                <p class="color-label black-text" id='black-label' data-copy='label'>${hex}</p>
            </div>
        </div>
    `
}

//Potential future extension: including accessbility checking using:
    //https://webaim.org/resources/contrastchecker/?fcolor=0000FF&bcolor=FFFFFF&api