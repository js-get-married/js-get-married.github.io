
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
        imgElement.src = images[0];
        imgElementNext.src = images[(img_index+1+images.length)%images.length];
        imgElementPrev.src = images[(img_index-1+images.length)%images.length];

    } else if (direction === "next") {
        imgContainer.classList.add("slide-left"); // add css property based on direction, which then dictates slide transformation
        imgContainerNext.classList.add("slide-left");
        imgContainerPrev.classList.add("slide-left");


        img_index=(img_index+1+images.length)%images.length
        newImgElement.src = images[img_index];

    } else if (direction === "prev") {
        imgElement.classList.add("slide-right");
        img_index=(img_index-1+images.length)%images.length
    }


    // After animation, update the image and reset class
    setTimeout(() => {
        imgElement.classList.remove("slide-left", "slide-right");
        imgElement.parentElement.removeChild(newImgElement); // Remove the new image element from the DOM
        imgElement.src = images[img_index]; // Now change the main image to the new address

    }, 1000); // Match with CSS transition duration

}
updateImage('init')