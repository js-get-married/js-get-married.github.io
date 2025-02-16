// --------------------------------------------------------------------------------------------------------------------------------
// Collapse Functionality
// --------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('click', (event) => {
    if (!event.target.classList.contains('heading')) return;

    const section = event.target.closest('.section');
    const clickedToggles = section.querySelector('.toggles');
    const allToggles = document.querySelectorAll('.toggles');

    const prevScrollY = window.scrollY; // Save current scroll position

    allToggles.forEach(content => {
        if (content !== clickedToggles) {
            content.style.display = 'none';
            content.style.maxHeight = null;
        }
    });

    // Toggle only the clicked section
    if (clickedToggles.style.display === 'none' || !clickedToggles.style.display) {
        clickedToggles.style.display = 'block';
        clickedToggles.style.maxHeight = clickedToggles.scrollHeight + "px";
    } else {
        clickedToggles.style.display = 'none';
        clickedToggles.style.maxHeight = null;
    }

    window.scrollTo({ top: prevScrollY, behavior: 'slow' }); // Restore scroll position
});




// --------------------------------------------------------------------------------------------------------------------------------
// Load Content
// -------------------------------------------------------------------------------------------------------------------------------
const NAVBUTTONS = document.querySelectorAll('.navbar button');
const pageMap = {
    'rsvp': './subpages/rsvp.html',
    'photo-gallery': './subpages/photo_gallery.html',
    'info': './subpages/information.html',
};

let pagerequested = 'info';

NAVBUTTONS.forEach(navbutton => {
    navbutton.onclick = function() {
        // Check if the navbutton.id exists in the pageMap
        if (pageMap[navbutton.id]) {
            pagerequested = pageMap[navbutton.id]; // Assign the corresponding page URL
        } else {
            pagerequested = pageMap['home']; // Default to 'home'
        }

        fetch(pagerequested)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // Replace the content inside #container
                const container = document.getElementById('container');
                container.innerHTML = data;

                const firstHeading = document.querySelector('.section .heading');
                if (firstHeading) {
                 // Trigger click event on the first heading to show its toggle content
                    firstHeading.click();
                    firstHeading.click();
                }
                // Reapply any necessary JS or CSS
                container.style.display = 'none'; // Temporarily hide
                container.offsetHeight; // Trigger a reflow
                container.style.display = ''; // Show it again
                // Example: Reapply styles or animations (if needed)
                updateImage('init'); // Ensure image gallery functionality is reset
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };
});

// Load info.html on page load
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('info').click();
});


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

// Swipe functionality
function enableSwipe() {



    const gallery = document.querySelector(".gallery");
    const hammer = new Hammer(element);

    hammer.on("swipeleft", () =>  updateImage("next"));
    hammer.on("swiperight", () =>  updateImage("prev"));

}

enableSwipe();