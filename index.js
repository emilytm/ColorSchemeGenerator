
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
    console.log(seedColor)
    console.log(schemeMode)
    console.log(colorCount)
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor.slice(1)}&mode=${schemeMode}&count=${colorCount}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let colors = data.colors
        let colorPanelHtml = ""
        console.log(colors)
        colors.forEach(color => {
            colorPanelHtml += getColorHtml(color)
            checkContrast('FFFFFF',color.hex.value)
            checkContrast('000000',color.hex.value)
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
            <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 0c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224zM64 160c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64H64V224h64V160H64z"/></svg>
        </div>
    `
}

//get ratio
//get passfail

function checkContrast(background, foreground) {
    console.log(background)
    console.log(foreground)
    fetch(`https://webaim.org/resources/contrastchecker/?fcolor=${foreground.slice(1)}&bcolor=${background}&api`)
    .then(res => res.json())
    .then(pass => console.log(pass))
}

