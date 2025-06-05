window.onload = function () {
    const svg = document.getElementById("world");
    if (!svg) return;

    let selectedPath = null;
    let correctPath = null;

    svg.querySelectorAll('path').forEach(path => {
        const origColor =  window.getComputedStyle(path).fill;
        path.dataset.origColor = origColor;
    });

    // Displays a random country (path id) at the top of the page on load.
    const paths = Array.from(svg.querySelectorAll("path"));
    let display = document.getElementById("given-county");
    if (!display) {
        // Create the display div if it doesnt already exist
        display = document.createElement('div');
        display.id = 'given-country';
        display.style.fontWeight = 'bold';
        display.style.fontSize = '25px';
        display.style.marginBottom = '10px';
        svg.parentNode.insertBefore(display, svg);
    }

    if (paths.length) {
        const randomIndex = Math.floor(Math.random() * paths.length);
        const randomPath = paths[randomIndex];
        correctPath = randomPath;
        display.textContent = paths[randomIndex].getAttribute('title');
    }

    let correctGuesses = 0;
    let totalGuesses = 0;

    svg.addEventListener('click', function(event) {
        console.log("SVG clicked", event.target);

        if (event.target.tagName.toLowerCase() === 'path') {
            const path = event.target;
            const currentColor = window.getComputedStyle(path).fill;
            const origColor = path.dataset.origColor || "none";
            
            if (path.getAttribute('title') === display.textContent) {
                display.innerHTML +=  "<br>Correct!";
                path.style.fill = 'green';
                correctGuesses++;
                totalGuesses++;
            } else {
                display.innerHTML += "<br>Incorrect.";
            } 
            
            totalGuesses++;

            path.style.fill = 'blue';
        }
    });
}