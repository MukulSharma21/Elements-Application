const input = document.querySelector('#search');
const btn = document.querySelector('#btn');
const div = document.querySelector('.div');
const form = document.querySelector('#form');

form.addEventListener('submit', showData);

function showData(e) {
	this.preventDefault();
	let number = input.value;

	if (input.length < 0 || input.value == '') {
		alert('Error');
	} else {
		fetch('data.json')
			.then(data => data.json())
			.then(res => {
				const elements = res;
				showElement(number, elements);
			})
	}

}

function showElement(atomicNumber, arr) {
	if (atomicNumber < arr.length) {
		const color = '#' + arr[atomicNumber].cpkHexColor;
		div.style.background = color;
	} else {
		console.log("Element Is not Discovered Yet");
	}
}