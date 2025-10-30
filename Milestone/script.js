/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [X] Project 5 (REQUIRED FEATURE) 
  - [X] Project 5 (STRETCH FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
const themeButton = document.getElementById('theme-button');

// Step 2: Write the callback function
const toggleDarkMode = () => {
    // 1. Toggle the dark-mode class on the body
    document.body.classList.toggle('dark-mode');

    // 2. Check if the body now has the dark-mode class
    if (document.body.classList.contains('dark-mode')) {
        // If it's dark, change the button text to prompt switching back to light
        themeButton.textContent = 'Toggle Light Mode';
    } else {
        // If it's light, change the button text to prompt switching to dark
        themeButton.textContent = 'Toggle Dark Mode';
    }
}

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener('click', toggleDarkMode);


/*** Form Handling ***/

/* Purpose:
When the user submits the RSVP form, the name and state they entered should be added to the list of participants.
*/

// Step 1: Add your query for the submit RSVP button here
const rsvpButton = document.getElementById('rsvp-button');

// STRETCH: Initialize the RSVP count variable
let count = 3; 

// Step 2: Write the code to manipulate the DOM here (CLEANED UP FOR VALIDATION)
const addParticipant = () => {
    // 1. Get the values from the input fields
    const nameInput = document.getElementById('name').value;
    const stateInput = document.getElementById('state').value;
    const emailInput = document.getElementById('email').value; 

    // --- STRETCH: RSVP Counter Logic ---
    
    // a. Remove the old counter element 
    const oldCounter = document.getElementById('rsvp-count');
    if (oldCounter) {
        oldCounter.remove();
    }
    
    // b. Increment the count variable
    count = count + 1; 

    // 2. Create the new participant entry string
    const newParticipantText = `${nameInput} from ${stateInput} is joining the crew!`;

    // 3. Create a new <p> element using DOM methods
    const newParticipantElement = document.createElement('p');
    newParticipantElement.textContent = newParticipantText;

    // 4. Find the container where the participants are listed
    const participantsContainer = document.querySelector('.rsvp-participants');
    
    // 5. Add the new <p> element to the container (at the top)
    participantsContainer.prepend(newParticipantElement); 
    
    // c. Create the new counter <p> element (after adding the participant)
    const newCounterElement = document.createElement('p');
    newCounterElement.id = 'rsvp-count';
    // Style the new counter to match the original inline style
    newCounterElement.style.textAlign = 'center';
    newCounterElement.style.fontWeight = 'bold';
    newCounterElement.style.marginBottom = '20px';
    
    // d. Set the new count message
    newCounterElement.textContent = `⭐ ${count} people have RSVP'd to this event!`;

    // e. Append the new counter to the main RSVP section (#rsvp-section)
    const rsvpSection = document.getElementById('rsvp-section');
    rsvpSection.prepend(newCounterElement); 


    // 6. Clear the form inputs after successful submission
    document.getElementById('name').value = '';
    document.getElementById('state').value = '';
    document.getElementById('email').value = '';
}


/*** Form Validation ***/

/* Purpose:
- Prevents invalid form submissions from being added to the list of participants.
*/

// Step 1: Write the callback function for validation
const validateForm = (event) => {
    // REQUIRED: This prevents the form from automatically submitting and refreshing
    event.preventDefault(); 
    
    let containsErrors = false;
    // rvspInputs will contain all elements within the rsvp-form
    const rsvpInputs = document.getElementById("rsvp-form").elements; 
    
    // Loop through all form inputs (checking for min length of 2)
    for (let i = 0; i < rsvpInputs.length; i++) {
        const currentInput = rsvpInputs[i];
        
        // Skip the submit button
        if (currentInput.type === 'submit') continue;
        
        // REQUIRED FEATURE: Check if input length is less than 2 characters
        if (currentInput.value.length < 2) {
            containsErrors = true;
            // Add the 'error' class to highlight the field
            currentInput.classList.add('error');
        } else {
            // If valid, ensure the error class is removed
            currentInput.classList.remove('error');
        }
    }
    
    // --- STRETCH FEATURE: Enhanced Email Validation Check (for @ and .com) ---
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value.toLowerCase(); // Convert to lower case for reliable checking
    
    // Check if the email is invalid (missing @ OR missing .com)
    if (!emailValue.includes('@') || !emailValue.includes('.com')) {
        // If the email is invalid, set flag and apply error class
        containsErrors = true;
        emailInput.classList.add('error');
    } else {
        // If the email is valid, ensure error class is removed
        emailInput.classList.remove('error');
    }
    
    // REQUIRED FEATURE: If no errors, call addParticipant()
    if (!containsErrors) {
        addParticipant(); 
    }
}

// Step 3: Replace the form button's event listener with a new one that calls validateForm()
// IMPORTANT: We must remove the old listener first to avoid duplicate submissions!
rsvpButton.removeEventListener('click', addParticipant);
rsvpButton.addEventListener('click', validateForm);


/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/
/*** Success Modal [PLACEHOLDER] [ADDED IN UNIT 9] ***/
