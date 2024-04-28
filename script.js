document.querySelector('.seat-table').addEventListener('click', function(event) {
    // Check if the clicked element is a button
    event.target.style.backgroundColor= '#1DD100';
    event.target.style.color = 'white'
    if (event.target.tagName === 'BUTTON') {
        // Get the text of the sibling <td> element
        var seatNumber = event.target.parentElement.textContent.trim();
        // Log the seat number
        console.log(seatNumber);
        // Or do whatever you want with the seat number

    }
});
