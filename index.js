
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
        let colors = data.colors
        let colorPanelHtml = ""
        colors.forEach(color => {
            let hexCode = color.hex.value.slice(1)
            let whiteRatio = checkContrast(hexCode,'FFFFFF')
            let blackRatio = checkContrast(hexCode,'000000')

            console.log(whiteRatio,"   ",blackRatio)
            console.log(parseInt(whiteRatio),"   ",parseInt(blackRatio))
            
            colorPanelHtml += getColorHtml(hexCode, whiteRatio >= 4.5 ? true : false, blackRatio >= 4.5 ? true : false,  whiteRatio >=  blackRatio ? 'white' : 'black')
        });
        document.getElementById('colors').innerHTML = colorPanelHtml
    })
}




function getColorHtml(colorHex, whiteResult, blackResult, bestColor) {

    const pass = `<i class="fa-solid fa-check"></i>`
    const fail = `<i class="fa-solid fa-x"></i>`

    console.log(`
        color is ${colorHex}
        wResult is ${whiteResult}
        bResult is ${blackResult}
        bestColor is ${bestColor}
    `)

    return `
        <div class="color" style="background-color: #${colorHex};">
            <p class="color-label white-text">#${colorHex} ${whiteResult ? pass : fail}</p>
            <p class="color-label black-text">#${colorHex} ${blackResult ? pass : fail}</p>
            <svg class="copy-icon ${bestColor}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 0c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224zM64 160c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64H64V224h64V160H64z"/></svg>
        </div>
    `
}

function checkContrast(color,background) {

    let bloop = fetch(`https://webaim.org/resources/contrastchecker/?fcolor=${color.slice(1)}&bcolor=${background}&api`)
    .then(res => res.json())
    .then(data => {
        console.log(data.ratio)
        return data.ratio
    })
    console.log(bloop)
    return bloop
}

//if i didn't get pass fail and i just got the ratio, i could say if it is less than 4.5 do this
/*
function checkCon(callback) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        callback(data);
      });
  }
  
  function reutrnRatio(data) {
    console.log(data);
  }
  
checkCon(returnRatio);
  */