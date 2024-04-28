const selectedSeatCountElement = document.getElementById('selected-seat-count');
const selectedSeatList = document.getElementById('selected-seat-list');

document.querySelectorAll('.seat-table tbody tr td button').forEach(function (button) {
    button.addEventListener('click', function (event) {
        // Get the text of the parent <td> element (seat number)
        var seatNumber = event.target.parentElement.textContent.trim();
        // Log the seat number
        console.log(seatNumber);
        // Or do whatever you want with the seat number
        const newSeattr = document.createElement('tr');
        newSeattr.innerHTML = `
                <td>${seatNumber}</td>
                <td>Economy</td>
                <td>550</td>
                `
        // Check if the seat is already selected
        if (event.target.classList.contains('selected')) {
            // If the seat is already selected, remove the selected class
            event.target.classList.remove('selected');
            // Update the seat color
            event.target.style.backgroundColor = '';
            event.target.style.color = '';
            // Increase the total seat count by 1
            increaseTotalSeatCount();
        } else {
            // Check if the maximum number of seats has been reached
            if (document.querySelectorAll('.seat-table tbody tr td button.selected').length < 4) {
                // If the maximum number of seats has not been reached, mark the seat as selected
                event.target.classList.add('selected');
                // Update the seat color
                event.target.style.backgroundColor = '#1DD100';
                event.target.style.color = 'white';
                // Decrease the total seat count by 1
                decreaseTotalSeatCount();
                let selectedSeatCount = parseInt(selectedSeatCountElement.innerText);
                selectedSeatCount += 1;
                selectedSeatCountElement.innerText = selectedSeatCount;
                const firstROw = selectedSeatList.firstChild;
                selectedSeatList.insertBefore(newSeattr, firstROw)

            } else {
                // If the maximum number of seats has been reached, alert the user
                alert('You can only select up to 4 seats.');
            }
        }


    });
});

function decreaseTotalSeatCount() {
    let totalSeatLeftElement = document.getElementById('total-seat-left');
    let totalSeatLeftValue = parseInt(totalSeatLeftElement.innerText);
    totalSeatLeftValue -= 1;
    totalSeatLeftElement.innerText = totalSeatLeftValue;
}

function increaseTotalSeatCount() {
    let totalSeatLeftElement = document.getElementById('total-seat-left');
    let totalSeatLeftValue = parseInt(totalSeatLeftElement.innerText);
    totalSeatLeftValue += 1;
    totalSeatLeftElement.innerText = totalSeatLeftValue;
}
