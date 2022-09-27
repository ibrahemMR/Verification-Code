/*  -copy code by click on it
    -show toolTip copied! and hide after 2s
*/
let gCode = document.getElementById("gCode")
let tooltip = document.getElementById("toolTip")

gCode.onclick = function () {
	//remove dash from code
	let cleanCode = gCode.innerText.toString().split("-").join("")
	console.log(cleanCode)
	/* copy span text to cliboard using clipboard API writeText
	    Referances:   -https://www.w3.org/TR/clipboard-apis/#clipboard-event-copy
	                  -https://dev.to/tqbit/how-to-use-javascript-to-copy-text-to-the-clipboard-2hi2 */
	navigator.clipboard.writeText(cleanCode).then(function () {
		//Display tooltip span
		tooltip.style.opacity = "1"
		setTimeout(function () {
			//hide tooltip span after 2s
			tooltip.style.opacity = "0"
		}, 2000)
	})
}
/* Generat Random Code of 6 digits | set span value to new code*/
function newCode() {
	let code = Math.floor(10000 + Math.random() * 89999)
	//check code number of digits if less than 6
	code.toString().length < 6 ? (code *= 10) : ""
	//console.log(code.toString().length)
	let leftCode = code.toString().slice(0, 3)
	let rightCode = code.toString().slice(3)
	gCode.innerText = `${leftCode}-${rightCode}`
}
//load new code when page reload
window.onload = newCode()
/* Type or Past Code in input fields */

const inputElements = [...document.querySelectorAll("input.inputText")]

inputElements.forEach((ele, index) => {
	ele.addEventListener("keydown", (e) => {
		/* if the keycode is backspace & the current field is empty
		focus the input before the current. Then the event happens
		which will clear the "before" input box. */
		if (e.keyCode === 8 && e.target.value === "")
			inputElements[Math.max(0, index - 1)].focus()
	})
	ele.addEventListener("input", (e) => {
		// store frist character of target
		const [first, ...rest] = e.target.value
		e.target.value = first ?? "" // first will be undefined when backspace was entered, so set the input to ""
		const lastInputBox = index === inputElements.length - 1
		const didInsertContent = first !== undefined
		if (didInsertContent && !lastInputBox) {
			// continue code input
			inputElements[index + 1].focus()
			inputElements[index + 1].value = rest.join("")
			inputElements[index + 1].dispatchEvent(new Event("input"))
		}
	})
})

/*Check if Verify Code  is true*/
// Shake input fiels if wrong code add outline color red
function verify(e) {
	inputElements.forEach((ele) => {
		//reset inputs style and remove shake class
		ele.style.outline = "none"
		ele.classList.remove("Shake")
	})
	//get entered code as one value and compare with cleanCode
	const enteredCode = inputElements.map(({value}) => value).join("")
	let cleanCode = gCode.innerText.toString().split("-").join("")
	if (enteredCode === cleanCode) {
		inputElements.forEach((ele, index) => {
			ele.style.outline = "2px solid  #a2ee33"
		})
	} else {
		inputElements.forEach((ele, index) => {
			ele.style.outline = "2px solid  #ee3633"
			ele.classList.add("Shake")
			setTimeout(function () {
				ele.style.outline = "none"
				ele.value = ""
			}, 2000)
		})
	}
}
