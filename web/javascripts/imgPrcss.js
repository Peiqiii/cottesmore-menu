// input image
const imgUpload = document.getElementsByClassName('recipeImg')[0];
const imgInput = document.getElementById('imgInput');
imgUpload.onclick = function(){
    imgInput.click()
}

// preview image
function changePic(obj){
    const newSrc = getObjectUrl(obj.files[0])
    document.getElementById('show').src = newSrc
}

function getObjectUrl(file){
    let url = null
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) 
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) 
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) 
    }
    return url 
}