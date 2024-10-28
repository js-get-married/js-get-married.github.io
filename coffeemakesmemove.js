
// --------------------------------------------------------------------------------------------------------------------------------
// Collapse Functionality
// --------------------------------------------------------------------------------------------------------------------------------
const HEADINGS = document.querySelectorAll('.header');

HEADINGS.forEach(heading => {
    heading.onclick = function() {
        const section =heading.closest('.section')
        section.querySelectorAll('.toggles').forEach(content=>{
        if (content.style.display === 'none') {
            content.style.display = 'block'; 
        } else if (content.style.display === 'block'){
            content.style.display = 'none';
        } else{content.style.display = 'block'}
    });
    }
});


// --------------------------------------------------------------------------------------------------------------------------------
// Image gallery
// --------------------------------------------------------------------------------------------------------------------------------
const images = ["assets\\adfc99df-c877-4a71-9c7e-9c7c9e469387.jpg","assets\\IMG_8383.JPEG"];
let img_index =0;
let intervalId;
let timeoutId;

function updateImage() {
    const imgElement =document.getElementById("gallery_image");
    imgElement.src =images[img_index];
}

function startAutoUpdate() {
    intervalId = setInterval(nextImg, 2000);
}

function gallery_pause() {
    clearInterval(intervalId); 
    if (timeoutId) clear(timeoutId);
    timeoutId = setTimeout(startAutoUpdate, 10000); 
}


function prevImg() {
    img_index=(img_index-1+images.length)%images.length
    updateImage();  
}

function nextImg() {
    img_index=(img_index+1+images.length)%images.length
    updateImage();  
}

startAutoUpdate();
