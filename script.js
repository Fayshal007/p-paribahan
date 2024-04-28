const selectedSeatCountElement = document.getElementById('selected-seat-count');
const selectedSeatList = document.getElementById('selected-seat-list');
const totalpriceElement = document.getElementById('total-price');
const grandtotalElement = document.getElementById('grand-total');
const couponRowElement = document.getElementById('coupon-row')
const phoneNumber = document.getElementById('phone-number')



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

                //inset selected seats to table
                selectedSeatCountElement.innerText = selectedSeatCount;
                const firstROw = selectedSeatList.firstChild;
                selectedSeatList.insertBefore(newSeattr, firstROw);

                //inset total price and grand total
                let totalpriceValue = parseInt(totalpriceElement.innerText);
                let grandtotalvalue = parseInt(grandtotalElement.innerText);
                totalpriceValue += 550;
                grandtotalvalue += 550;
                totalpriceElement.innerText = totalpriceValue;
                grandtotalElement.innerText = grandtotalvalue;



                //removing disable next btn
                phoneNumber.addEventListener('keyup', function (e) {
                    const inputNumber = e.target.value;
                    const inputNumberString = inputNumber.toString();
                    const nextBtn = document.getElementById('next-btn')
                    console.log(inputNumberString);
                    if (event.target.classList.contains('selected') && inputNumberString.length === 11) {
                        nextBtn.removeAttribute('disabled')
                    } else {
                        nextBtn.setAttribute('disabled', true)
                    }
                })


                //hiding main content and showing modal
                document.getElementById('next-btn').addEventListener('click', function () {
                    const modal = document.getElementById('modal');
                    modal.classList.remove('hidden');
                    const main = document.getElementById('main');
                    main.classList.add('hidden')
                })


            } else {
                // If the maximum number of seats has been reached, alert the user
                alert('You can only select up to 4 seats.');
            }
        }


    });
});

//coupon applying
document.getElementById('coupon-input-field').addEventListener('keyup', function (e) {
    const inputedText = e.target.value;
    const couponBtn = document.getElementById('coupon-btn');
    if (inputedText.toLowerCase() === "new15") {
        couponBtn.removeAttribute('disabled');


        //coupon discount
        document.getElementById('coupon-btn').addEventListener('click', function () {
            let grandtotalvalue = parseInt(grandtotalElement.innerText);
            let discount = grandtotalvalue * 0.15
            grandtotalvalue = (grandtotalvalue - (discount));
            grandtotalElement.innerText = grandtotalvalue;

            couponRowElement.classList.add('hidden');

            // Given discount show
            const newSeattr = document.createElement('tr');
            newSeattr.innerHTML = `
                                        <td colspan="2">Discount</td>
                                        <td> - BDT ${discount}</td>
            `;
            const lastRow = selectedSeatList.lastElementChild;
            selectedSeatList.insertBefore(newSeattr, lastRow);
        })



    } else if (inputedText.toLowerCase() === 'couple20') {
        couponBtn.removeAttribute('disabled');
        document.getElementById('coupon-btn').addEventListener('click', function () {
            let grandtotalvalue = parseInt(grandtotalElement.innerText);
            let discount = grandtotalvalue * 0.20
            grandtotalvalue = (grandtotalvalue - (discount));
            grandtotalElement.innerText = grandtotalvalue;

            couponRowElement.classList.add('hidden');

            // Given discount show
            const newSeattr = document.createElement('tr');
            newSeattr.innerHTML = `
                                        <td colspan="2">Discount</td>
                                        <td> - BDT ${discount}</td>
            `;
            const lastRow = selectedSeatList.lastElementChild;
            selectedSeatList.insertBefore(newSeattr, lastRow);
        })
    } else {
        couponBtn.setAttribute('disabled', true)
    }





})



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
