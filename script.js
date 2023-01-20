
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

function dropText(messageText, textColour) {
    var textItem = document.querySelector('.dropdown-text').cloneNode(true)
    textItem.style.animationName = "drop-text, fade-text"
    textItem.innerHTML = messageText
    if (textColour != null) {
        textItem.style.color = textColour
    }
    var appendedObject = document.body.appendChild(textItem)
    setTimeout(() => {
        appendedObject.remove()
    }, 2500)
}

function saveImport(importItem) {
    var importedFile = importItem.files[0];

    var reader = new FileReader();
    reader.onload = function () {
        var fileContent = JSON.parse(reader.result);

        console.log(dropText)
        dropText('Data Imported!', '#4889d4')
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

    dropText('Successfully Exported Data!')
}