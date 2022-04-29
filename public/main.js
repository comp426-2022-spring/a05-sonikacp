// Flip one coin and show coin image to match result when button clicked

// Add event listener in div#single (for coin button)
const coin = document.getElementById("coin")
coin.addEventListener("click", flipCoin)
// Function that will await a response
async function flipCoin() {
    // Build URL for endpoint
    const endpoint = "app/flip/"
    // URI so that it is not hardcoded
    const url = document.baseURI+endpoint
    //  Sends GET request to API endpoint and wats for response
    await fetch(url)
    //  Responds as json
                    .then(function(response) {
                        return response.json();
                    })
                    // Replaces existing corresponsing elements in index.html
                        .then(function(result) {
                            console.log(result);
                            document.getElementById("result").innerHTML = result.flip;
                            document.getElementById("quarter").setAttribute("src", "assets/img/"+result.flip+".png");
                        });
};
// Flip multiple coins and show images and summary results in table
// Enter number and press button to activate coin flip series
// The flip many coins form in div#multi
const coins = document.getElementById("coins")
// event listener for coins
coins.addEventListener("submit", flipCoins)
// create submit handler that will run when submit button is pressed
async function flipCoins(event) {
    // remove default browser event
    event.preventDefault();
    // endpoint URL
    const endpoint = "app/flip/coins"
    const url = document.baseURI+endpoint
    // extracts data object from form so it can be run through FormData API
    const formEvent = event.currentTarget
    // give data to FormData and wait for a response or log an error to console
    try {
        const formData = new FormData(formEvent);
        // hand the form to function that interacts with API
        const flips = await sendFlips({ url, formData});
        console.log(flips);
        // summary info
        document.getElementById("heads").innerHTML = "Heads: "+flips.summary.heads;
        document.getElementById("tails").innerHTML = "Tails: "+flips.summary.tails;
    // calls a fn what will make list of coin images based on array of coin flip results
    } catch (error) {
        console.log(error);
    }
}
// guess a coin flip by making a selection and pressing the button
const call = document.getElementById("call")
// add event listener
call.addEventListener("submit", flipCall)
// create submit hanfler
async function flipCall(event) {
    // prevent default reload
    event.preventDefault();
    // build URL string
    const endpoint = "app/flip/call/"
    const url = document.baseURI+endpoint
    // extract data from form
    const formEvent = event.currentTarget
    // give data to FormData and wait for response or log an error to console
    try {
        const formData = new FormData(formEvent);
        // hand form data off to fn that is actually going to interact with the API
        const results = await sendFlips({url, formData});
        // process results
        console.log(results);
        // text results
        document.getElementById("choice").innerHTML = "Guess: "+results.call;
		document.getElementById("actual").innerHTML = "Actual: "+results.flip;
		document.getElementById("results").innerHTML = "Result: "+results.result;
    document.getElementById("coingame").innerHTML = '<li><img src="assets/img/'+results.call+'.png" class="bigcoin" id="callcoin"></li><li><img src="assets/img/'+results.flip+'.png" class="bigcoin"></li><li><img src="assets/img/'+results.result+'.png" class="bigcoin"></li>';
	} catch (error) {
		console.log(error);
	}
}
// Create a data sender to sent POST request objects from FormData to send to the API using fetch()
async function sendFlips({ url, formData }) {
    // Extract the form data from the FormData object
        const plainFormData = Object.fromEntries(formData.entries());
    // Turn the FormData into JSON
        const formDataJson = JSON.stringify(plainFormData);
    // Show the console what is going to be sent in the API message body
        console.log(formDataJson);
    // Set up the request object for fetch()
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: formDataJson
        };
    // Send the request and wait for the response
        const response = await fetch(url, options);
    // Pass the response back to the event handler
        return response.json()
    }
    
    // Navigation Buttons
    function homeNav() {
      document.getElementById("homenav").className = "active";
      document.getElementById("home").className = "active";
      document.getElementById("singlenav").className = "";
      document.getElementById("single").className = "inactive";
      document.getElementById("multinav").className = "";
      document.getElementById("multi").className = "inactive";
      document.getElementById("guessnav").className = "";
      document.getElementById("guesscoin").className = "inactive";
    }
    function singleNav() {
      document.getElementById("homenav").className = "";
      document.getElementById("home").className = "inactive";
      document.getElementById("singlenav").className = "active";
      document.getElementById("single").className = "active";
      document.getElementById("multinav").className = "";
      document.getElementById("multi").className = "inactive";
      document.getElementById("guessnav").className = "";
      document.getElementById("guesscoin").className = "inactive";
    }
    function multiNav() {
      document.getElementById("homenav").className = "";
      document.getElementById("home").className = "inactive";
      document.getElementById("singlenav").className = "";
      document.getElementById("single").className = "inactive";
      document.getElementById("multinav").className = "active";
      document.getElementById("multi").className = "active";
      document.getElementById("guessnav").className = "";
      document.getElementById("guesscoin").className = "inactive";
    }
    function guessNav() {
      document.getElementById("homenav").className = "";
      document.getElementById("home").className = "inactive";
      document.getElementById("singlenav").className = "";
      document.getElementById("single").className = "inactive";
      document.getElementById("multinav").className = "";
      document.getElementById("multi").className = "inactive";
      document.getElementById("guessnav").className = "active";
      document.getElementById("guesscoin").className = "active";
    } 
    // Make a list of coin images
    function coinList(array) {
      let text = "";
      let arrayLength = array.length
      for (let i = 0; i < arrayLength; i++) {
        text += '<li><img src="assets/img/'+array[i]+'.png" class="bigcoin"></li>';
      }
      return text
    }