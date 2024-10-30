
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
// Load Content
// -------------------------------------------------------------------------------------------------------------------------------
const NAVBUTTONS = document.querySelectorAll('.navbar button');

NAVBUTTONS.forEach(navbutton => {

    navbutton.onclick = function() {
    let pagerequested;
    // Use fetch to load content.html into the div
    // Map of navbutton IDs to their corresponding page URLs
const pageMap = {
    'photo-gallery': './subpages/photo_gallery.html',
    'rsvp': './subpages/rsvp.html',
    'info': './subpages/information.html',
    'logistics': './subpages/logistics.html',
    'team': './subpages/team.html',
    'gifts': './subpages/gifts.html',
    'faq': './subpages/faq.html',
    'contact': './subpages/contact.html',
};

// Check if the navbutton.id exists in the pageMap
if (pageMap[navbutton.id]) {
    pagerequested = pageMap[navbutton.id]; // Assign the corresponding page URL
} else {
    return; // Exit if the condition is not met
}

    fetch(pagerequested)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('container').innerHTML = data; // Load the content
            updateImage('init')
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}});


// --------------------------------------------------------------------------------------------------------------------------------
// Image gallery
// --------------------------------------------------------------------------------------------------------------------------------

// This object is generated programatically by a python script in utils
const images = ["assets\\big squad first year.jpg","assets\\boat first year.jpg","assets\\cute boat first year.jpg","assets\\cutest boat first year.jpg","assets\\cutest fancy second year.jpg","assets\\lost 2 the lostening.jpg","assets\\Lost.jpg","assets\\more best boat first year.jpg","assets\\paint bop.jpg","assets\\The original cc-rew second year fancy.jpg",]; 
//

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
    if (direction === "next") {
        img_index=(img_index+1+images.length)%images.length

        imgElement.src = images[img_index];
        imgElementNext.src = images[(img_index+1+images.length)%images.length];
        imgElementPrev.src = images[(img_index-1+images.length)%images.length];

    } else if (direction === "prev") {
        img_index=(img_index-1+images.length)%images.length

        imgElement.src = images[img_index];
        imgElementNext.src = images[(img_index+1+images.length)%images.length];
        imgElementPrev.src = images[(img_index-1+images.length)%images.length];    
    }
    
    imgContainer.classList.remove("slide-left", "slide-right");
    imgContainerNext.classList.remove("slide-left", "slide-right");
    imgContainerPrev.classList.remove("slide-left", "slide-right");
    }, 1000); // Match with CSS transition duration

}
updateImage('init')