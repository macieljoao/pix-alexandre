function goBack() {
    window.history.back();
}

function copyText() {
    const currentPage = window.location.pathname;
    fetch('codigospix.json')
        .then(response => response.json())
        .then(data => {
            const pixCode = data[currentPage];

            if (pixCode) { // Check if pixCode was found for current page
                navigator.clipboard.writeText(pixCode)
                    .then(() => {
                        const messageDiv = document.getElementById('message');
                        messageDiv.textContent = 'Código Copiado ✓';
                        messageDiv.style.display = 'inline-block';
                    })
                    .catch(err => {
                        console.error('Failed to copy: ', err);
                    });
            } else {
                console.error('Pix code not found for:', currentPage); // Display error if no code found
            }
        })
        .catch(err => console.error('Error fetching pixcodes.json', err));
}

function updatePixCode() {
    const currentPage = window.location.pathname;
    const pixCodeElement = document.querySelector('.pix-code'); // Get pix-code element

    fetch('codigospix.json')
        .then(response => response.json())
        .then(data => {
            const pixCode = data[currentPage];
            if (pixCode && pixCodeElement) {
                pixCodeElement.textContent = pixCode; // Update the text content
            } else {
                console.error('Pix code not found for:', currentPage);
            }
        })
        .catch(err => console.error('Error fetching codigospix.json', err));
}

document.addEventListener('DOMContentLoaded', updatePixCode); // Call when page is loaded

document.getElementById('myButton').addEventListener('click', copyText);
