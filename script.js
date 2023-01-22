
//VARIABLES
max_health = 100
health = max_health
max_mana = 100
mana = max_mana
max_sanity = 100
sanity = max_sanity
selected_bar = "health"

// Function to download content
// To download as a json file, pass the following
//      [stringified object], [name].json, 'text/plain'
function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href)
}

function saveImport(importItem) {
    var importedFile = importItem.files[0];

    var reader = new FileReader();
    reader.onload = function () {
        var fileContent = JSON.parse(reader.result);

        addLog('Data Imported!', '#4889d4')
        // Do something with fileContent
        // document.getElementById('json-file').innerHTML = fileContent;  
    };
    reader.readAsText(importedFile);
}

function exportData() {
    var obj = {
        "test": "this is a test object"
    }

    download(JSON.stringify(obj), 'test.json', 'text/plain')

    addLog('Successfully Exported Data!', '#f09226')
}

function addLog(text, textColour) {
    var textItem = document.createElement('p')
    textItem.classList.add('log-item')
    textItem.innerHTML = text
    if (textColour != null) {
        textItem.style.color = textColour
    }
    document.querySelector('.log-holder').appendChild(textItem)
    
    if (document.querySelector('.log-holder').children.length > 5) {
        document.querySelector('.log-holder').children[0].remove()
    }
}

function calculateBars() {
    var healthPer = (health / max_health) * 100
    if (healthPer > 100) { healthPer = 100 }
    var cellsPer = (mana / max_mana) * 100
    if (cellsPer > 100) { cellsPer = 100 }
    var sanityPer = (sanity / max_sanity) * 100
    if (sanityPer > 100) { sanityPer = 100 }
    
    document.querySelector('#health-bar').style.width = healthPer.toString() + "%"
    document.querySelector('#health-display').innerHTML = `${health}/${max_health}`
    document.querySelector('#mana-bar').style.width = cellsPer.toString() + "%"
    document.querySelector('#mana-display').innerHTML = `${mana}/${max_mana}`
    document.querySelector('#sanity-bar').style.width = sanityPer.toString() + "%"
    document.querySelector('#sanity-display').innerHTML = `${sanity}/${max_sanity}`
}

function barsAdd() {
    const value = parseInt(document.querySelector('.bars-unit').value)
    if (value < 0) { value = 0 }
    const overmax = document.querySelector('#overstat').checked
    if (selected_bar == "health") {
        const original = health
        if (overmax) {health += value}
        else {
            if (health + value >= max_health) {
                if (!(health > max_health)) {
                    health = max_health
                }
            }
            else {health += value}
        }
        addLog(`<span style="color: #50ce65; font-weight: bold;">Health</span> added: ${original} → ${health}`, '#75f08a')
    }
    else if (selected_bar == 'mana') {
        const original = mana
        if (overmax) {mana += value}
        else {
            if (mana + value >= max_mana) {
                if (!(mana > max_mana)) {
                    mana = max_mana
                }
            }
            else {mana += value}
        }
        addLog(`<span style="color: #59b6c7; font-weight: bold;">Mana</span> added: ${original} → ${mana}`, '#75f08a')
    }
    else {
        const original = sanity
        if (overmax) {sanity += value}
        else {
            if (sanity + value >= max_sanity) {
                if (!(sanity > max_sanity)) {
                    sanity = max_sanity
                }
            }
            else {sanity += value}
        }
        addLog(`<span style="color: #c15eda; font-weight: bold;">Sanity</span> added: ${original} → ${sanity}`, '#75f08a')
    }
    document.querySelector('.bars-unit').value = 0
    calculateBars()
}

function barsSubract() {
    const value = parseInt(document.querySelector('.bars-unit').value)
    if (value < 0) { value = 0}
    if (selected_bar == "health") {
        const original = health
        if (health - value < 0) {health = 0}
        else {health -= value}
        addLog(`<span style="color: #50ce65; font-weight: bold;">Health</span> subtracted: ${original} → ${health}`, '#f07575')
    }
    else if (selected_bar == 'mana') {
        const original = mana
        if (mana - value < 0) {mana = 0}
        else {mana -= value}
        addLog(`<span style="color: #59b6c7; font-weight: bold;">Mana</span> lost: ${original} → ${mana}`, '#f07575')
    }
    else {
        const original = sanity
        if (sanity - value < 0) {sanity = 0}
        else {sanity -= value}
        addLog(`<span style="color: #c15eda; font-weight: bold;">Sanity</span> lost: ${original} → ${sanity}`, '#f07575')
    }
    document.querySelector('.bars-unit').value = 0
    calculateBars()
}

function selectedBarChange(button) {
    var hBut = document.querySelector('#healthButton')
    var cBut = document.querySelector('#manaButton')
    var sBut = document.querySelector('#sanityButton')
    
    if (button.id == "healthButton") {
        if (selected_bar == "health") return
        selected_bar = "health"
        hBut.style.backgroundColor = "#50ce65"
        cBut.style.backgroundColor = "transparent"
        sBut.style.backgroundColor = "transparent"
    }
    else if (button.id == "manaButton") {
        if (selected_bar == "mana") return
        selected_bar = "mana"
        hBut.style.backgroundColor = "transparent"
        cBut.style.backgroundColor = "#59b6c7"
        sBut.style.backgroundColor = "transparent"
    }
    else {
        if (selected_bar == "sanity") return
        selected_bar = "sanity"
        hBut.style.backgroundColor = "transparent"
        cBut.style.backgroundColor = "transparent"
        sBut.style.backgroundColor = "#c15eda"
    }
}