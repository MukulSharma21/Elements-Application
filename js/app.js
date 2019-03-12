const form = document.querySelector('.form');
const input = document.querySelector('#text');
const btn = document.querySelector('#btn');
const info_div = document.querySelector('.info');
const element = document.querySelector('#element');


btn.addEventListener("click", function(event) {
    // Prevent page reloading on click
    event.preventDefault();

    if (input.value == "") {
        showDiv('Invalid Value is not allowed', info_div);
    } else {
        const regx = /^[0-9]{1,3}$/g;
        const inputValue = input.value;

        if (regx.test(inputValue)) {
            //fetch the data
            fetch('elements.json')
                .then(data => data.json())
                .then(function(res) {
                    const response = res[inputValue - 1];

                    if (inputValue > res.length) {
                        showDiv('Element not Discovered yet', info_div);
                    } else {
                        element.innerHTML = `
													<div class="container">
            <div class="basic-detail">
                <div class="row">
                    <div class="col-lg-8 col-md-6 col-sm-12">
                        <div class="basic-details">
                            <p class="lead text-capitalize font-weight-bold">Atomic Number : <span class="text-info">${response.atomicNumber}</span></p>
                            <p class="lead text-capitalize font-weight-bold">Name : <span class="text-info">${response.name}</span></p>
                            <p class="lead text-capitalize font-weight-bold">Atomic Mass : <span class="text-info">${response.atomicMass}</span></p>
                            <p class="lead text-capitalize font-weight-bold">Group : <span class="text-info">${response.groupBlock}</span></p>
                            <p class="lead text-capitalize font-weight-bold">State : <span class="text-info">${response.standardState}</span></p>
                            <p class="lead text-capitalize font-weight-bold">Oxidation State : <span class="text-info">${response.oxidationStates}</span></p>
                            <p class="lead text-capitalize font-weight-bold">Boding Type: <span class="text-info">${response.bondingType}</span></p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="symbol">
                            <h2 class="special text-success">${response.symbol}</h2>
                            <span class="lead text text-center text-danger">Year Discovered: ${response.yearDiscovered}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
                    }
                });
        } else {
            showDiv("Only numbers are allowed", info_div);
        }

    }
});

//show the error div on the page
function showDiv(text, div) {
    div.style.display = 'block';
    div.innerHTML = `<p>${text}</p>`;

    setTimeout(function() {
        div.style.display = 'none';
    }, 2000);
}