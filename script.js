
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
        characterName: document.querySelector('#character-name-input').value,
        playerName: document.querySelector('#player-name-input').value,
        magicCrest: document.querySelector('#crestSelect').value,
        background: document.querySelector('#backgroundSelect').value,
        maxHealth: max_health,
        savedHealth: health,
        maxMana: max_mana,
        savedMana: mana,
        maxSanity: max_sanity,
        savedSanity: sanity
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

function calculateModifier(item) {
    let newValue = Math.floor((parseInt(item.value) - 10) / 2)
    item.parentNode.querySelector('p').innerHTML = `(${newValue})`
    updateSkills(item.parentNode.parentNode.querySelector('h4').innerHTML)
}

function healthSavingThrows(val) {
    var items = document.querySelectorAll('.heart')
    for (var i = 0; i < items.length; i++) {
        if (i < val) {
            items[i].style.backgroundColor = '#62923a'
            items[i].querySelector('img').style.opacity = 1
        }
        else {
            items[i].style.backgroundColor = 'transparent'
            items[i].querySelector('img').style.opacity = 0
        }
    }
}

function deathSavingThrows(val) {
    var items = document.querySelectorAll('.death')
    for (var i = 0; i < items.length; i++) {
        if (i < val) {
            items[i].style.backgroundColor = '#923a3a'
            items[i].querySelector('img').style.opacity = 1
        }
        else {
            items[i].style.backgroundColor = 'transparent'
            items[i].querySelector('img').style.opacity = 0
        }
    }
}

function updateBackgroundSkill(valueBox) {
    var num = valueBox.value
    if (document.querySelector('#backgroundSelect').value == "student") {
        document.querySelector('.historySkill').innerHTML = num
    }
}

function changeProfSkill(obj) {
    if (obj.hasAttribute('data-proficient')) {
        obj.removeAttribute('data-proficient')
        obj.querySelector('h4').style.removeProperty('color')
        updateSkills()
    }
    else {
        obj.setAttribute('data-proficient', 'true')
        obj.querySelector('h4').style.color = '#fa70ff'
        updateSkills()
    }
}

function updateSkills(type) {
    const profBonus = document.querySelector('.prof-bonus').value
    
    // STRENGTH SKILLS
    let modifeir = parseInt(document.querySelector('.str-stat').querySelector("p").innerHTML.slice(1, -1))
    let ath = document.querySelector('.athletics-stat')
    ath.querySelector('p').innerHTML = ath.hasAttribute('data-proficient') ? modifeir + parseInt(profBonus) : modifeir

    // DEXTERITY SKILLS
    modifeir = parseInt(document.querySelector('.dex-stat').querySelector("p").innerHTML.slice(1, -1))
    let acro = document.querySelector('.acrobatics-stat')
    acro.querySelector('p').innerHTML = acro.hasAttribute('data-proficient') ? modifeir + parseInt(profBonus) : modifeir
    let soh = document.querySelector('.slight-of-hand-stat')
    soh.querySelector('p').innerHTML = soh.hasAttribute('data-proficient') ? modifeir + parseInt(profBonus) : modifeir
    let stea = document.querySelector('.stealth-stat')
    stea.querySelector('p').innerHTML = stea.hasAttribute('data-proficient') ? modifeir + parseInt(profBonus) : modifeir

    // WISDOM SKILLS
    modifeir = parseInt(document.querySelector('.wis-stat').querySelector("p").innerHTML.slice(1, -1))
    let ins = document.querySelector('.insight-stat')
    ins.querySelector('p').innerHTML = ins.hasAttribute('data-proficient') ? modifeir + parseInt(profBonus) : modifeir
    let med = document.querySelector('.medicine-stat')
    med.querySelector('p').innerHTML = med.hasAttribute('data-proficient') ? modifeir + parseInt(profBonus) : modifeir
    let per = document.querySelector('.perception-stat')
    per.querySelector('p').innerHTML = per.hasAttribute('data-proficient') ? modifeir + parseInt(profBonus) : modifeir
    let sur = document.querySelector('.survival-stat')
    sur.querySelector('p').innerHTML = sur.hasAttribute('data-proficient') ? modifeir + parseInt(profBonus) : modifeir

    // CHARISMA SKILLS
    modifeir = parseInt(document.querySelector('.cha-stat').querySelector("p").innerHTML.slice(1, -1))
    let dec = document.querySelector('.deception-stat')
    dec.querySelector('p').innerHTML = dec.hasAttribute('data-proficient') ? modifeir + parseInt(profBonus) : modifeir
    let inti = document.querySelector('.intimidation-stat')
    inti.querySelector('p').innerHTML = inti.hasAttribute('data-proficient') ? modifeir + parseInt(profBonus) : modifeir
    let perf = document.querySelector('.performance-stat')
    perf.querySelector('p').innerHTML = perf.hasAttribute('data-proficient') ? modifeir + parseInt(profBonus) : modifeir
    let pers = document.querySelector('.persuasion-stat')
    pers.querySelector('p').innerHTML = pers.hasAttribute('data-proficient') ? modifeir + parseInt(profBonus) : modifeir
}

window.onclick = function(event) {
    if (event.target == document.querySelector('.modal')) {
        document.querySelector('.modal').style.removeProperty('display')
    }
}

function showCrestHelp() {
    let modal = document.querySelector('.modal')
    if (modal.children.length > 0) {
        modal.firstElementChild.remove()
    }
    let crestSelected = document.querySelector('#crestSelect').value
    let newMod = document.querySelector(`.${crestSelected.toLowerCase()}-modal`).firstElementChild.cloneNode(true)
    modal.appendChild(newMod)
    modal.style.display = "block"
}

function dimissNotice(item) {
    item.style.opacity = 0
    setTimeout(() => {
        item.remove()
    }, 1000)
}