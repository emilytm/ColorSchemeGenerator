
fetch('https://www.thecolorapi.com/scheme?hex=24B1E0&mode=triad&count=6')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let colors = data.colors
        console.log(colors)
        colors.forEach(color => {
            renderColor(color)
        });
    })


    function renderColor(color) {
        const hex = color.hex.value
        console.log(hex)
        document.getElementById('color-1').style.backgroundColor = hex
    }