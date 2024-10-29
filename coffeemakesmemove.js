
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
    const imgElementNext =document.getElementById("gallery_image_next");
    const imgElementPrev =document.getElementById("gallery_image_prev");

    const imgContainer =document.getElementById("gallery_image_container");
    const imgContainerNext =document.getElementById("gallery_image_container_next");
    const imgContainerPrev =document.getElementById("gallery_image_container_prev");

    if (direction === "init"){
        imgElement.src = images[img_index];
        imgElementNext.src = images[(img_index+1+images.length)%images.length];
        imgElementPrev.src = images[(img_index-1+images.length)%images.length];
    } else if (direction === "next") {
        imgContainer.classList.add("slide-left"); // add css property based on direction, which then dictates slide transformation
        imgContainerNext.classList.add("slide-left");
        imgContainerPrev.classList.add("slide-left");
    } else if (direction === "prev") {
        imgContainer.classList.add("slide-right"); // add css property based on direction, which then dictates slide transformation
        imgContainerNext.classList.add("slide-right");
        imgContainerPrev.classList.add("slide-right");
    }


    // After animation, update the image and reset class
    setTimeout(() => {
        img_index=(img_index+1+images.length)%images.length

        imgElement.src = images[img_index];
        imgElementNext.src = images[(img_index+1+images.length)%images.length];
        imgElementPrev.src = images[(img_index-1+images.length)%images.length];

        imgContainer.classList.remove("slide-left", "slide-right");
        imgContainerNext.classList.remove("slide-left", "slide-right");
        imgContainerPrev.classList.remove("slide-left", "slide-right");
    }, 1000); // Match with CSS transition duration

}
updateImage('init')