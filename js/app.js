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

					if (response > res.length) {
						showDiv('Element not Discovered yet', info_div);
					} else {
						element.innerHTML = `
					<div class="container">
						<div class="basic-detail">
							<div class="row">
								<div class="col-lg-8 col-md-6">
									<div class="basic-details">
										<p class="lead text-capitalize font-weight-normal">Atomic Number : ${response.atomicNumber}</p>
										<p class="lead text-capitalize font-weight-normal">Name : ${response.name}</p>
										<p class="lead text-capitalize font-weight-normal">Atomic Mass : ${response.atomicMass}</p>
										<p class="lead text-capitalize font-weight-normal">Group : ${response.groupBlock}</p>
										<p class="lead text-capitalize font-weight-normal">State : ${response.standardState}</p>
										<p class="lead text-capitalize font-weight-normal">Oxidation State : ${response.oxidationStates}</p>
										<p class="lead text-capitalize font-weight-normal">Boding Type: ${response.bondingType}</p>
										<p class="lead text-capitalize font-weight-normal>Electronic Configuration: ${response.electronicConfiguration}</p>
									</div>
								</div>
								<div class="col-lg-4 col-md-6">
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