const HEADINGS = document.querySelectorAll('.toggle');

HEADINGS.forEach(heading => {
    heading.onclick = function() {
        const content =heading.querySelector('.toggles')
        console.log(content)
        if (content.style.display === 'none') {
            content.style.display = 'block'; 
        } else if (content.style.display === 'block'){
            content.style.display = 'none';
        } else{content.style.display = 'block'}
    };
});


