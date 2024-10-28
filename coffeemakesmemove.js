
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
const images = ["assets\\adfc99df-c877-4a71-9c7e-9c7c9e469387.jpg","assets\\IMG_8383.JPEG","assets\\cute boat first year.jpg"];
let img_index =0;
let intervalId;
let timeoutId;

function updateImage(direction) {
    const imgElement =document.getElementById("gallery_image");
    if (direction === "next") {
        imgElement.classList.add("slide-left"); // add css property based on direction, which then dictates slide transformation
        img_index=(img_index+1+images.length)%images.length
    } else if (direction === "prev") {
        imgElement.classList.add("slide-right");
        img_index=(img_index-1+images.length)%images.length
    }
    // After animation, update the image and reset class
    setTimeout(() => {
        imgElement.src = images[img_index];
        imgElement.classList.remove("slide-left", "slide-right");
    }, 1000); // Match with CSS transition duration

}

function startAutoUpdate() {
    intervalId = setInterval(nextImg, 5000);
}

function gallery_pause() {
    clearInterval(intervalId); 
    if (timeoutId) clear(timeoutId);
    timeoutId = setTimeout(startAutoUpdate, 10000); 
}



startAutoUpdate();
