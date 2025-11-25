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
// Refactored to accept the person object
const addParticipant = (person) => {
    // 1. Destructure the person object
    const { name, hometown } = person;

    // --- STRETCH: RSVP Counter Logic ---
    
    // a. Remove the old counter element 
    const oldCounter = document.getElementById('rsvp-count');
    if (oldCounter) {
        oldCounter.remove();
    }
    
    // b. Increment the count variable
    count = count + 1; 

    // 2. Create the new participant entry string
    const newParticipantText = `${name} from ${hometown} is joining the crew!`;

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
    // rsvpInputs will contain all elements within the rsvp-form
    const rsvpInputs = document.getElementById("rsvp-form").elements; 
    
    // Create person object (Step 1-A)
    // FIX: Accessing input elements by their name attribute is crucial here.
    const person = {
        name: rsvpInputs.name.value,
        hometown: rsvpInputs.state.value,
        email: rsvpInputs.email.value.toLowerCase()
    };


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
    
    // Check if the email is invalid (missing @ OR missing .com)
    if (!person.email.includes('@') || !person.email.includes('.com')) {
        containsErrors = true;
        emailInput.classList.add('error');
    } else {
        emailInput.classList.remove('error');
    }
    
    // REQUIRED FEATURE: If no errors, call addParticipant() and toggle modal (Step 3)
    if (!containsErrors) {
        addParticipant(person); 
        toggleModal(person); // Call the modal function with the personalized data
    }
}

// Step 3: Replace the form button's event listener with a new one that calls validateForm()
// IMPORTANT: We must remove the old listener first to avoid duplicate submissions!
rsvpButton.removeEventListener('click', addParticipant);
rsvpButton.addEventListener('click', validateForm);


/*** Scroll Animations ***/
  
/* Purpose:
- Use this starter code to add scroll animations to your website.

When To Modify:
- [X] Project 8 (REQUIRED FEATURE)
- [ ] Any time after
*/

// Step 1: Select all elements with the class 'revealable'.
let revealableContainers = document.querySelectorAll('.revealable');

// Step 2: Write function to reveal elements when they are in view.
const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {
        let current = revealableContainers[i];

        // Get current height of container and window
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = current.getBoundingClientRect().top;
        
        // Get the reveal distance from the CSS variable
        let revealDistance = parseInt(getComputedStyle(current).getPropertyValue('--reveal-distance'), 10);

        // If the container is within range, add the 'active' class to reveal
        if (topOfRevealableContainer < windowHeight - revealDistance) {
            current.classList.add('active');
        }
        // If the container is not within range, hide it by removing the 'active' class
        else { 
            current.classList.remove('active');
        }
    }
}

// Step 3: Whenever the user scrolls, check if any containers should be revealed
window.addEventListener('scroll', reveal);


// STRETCH FEATURE: Reduce Motion Toggle (Controls scroll and modal animations)
const motionButton = document.getElementById('motion-button');

const reduceMotion = () => {
    // Toggle the 'no-motion' class on the body. 
    // The CSS handles disabling transitions/transforms when this class is present.
    document.body.classList.toggle('no-motion');

    // Update button text for user feedback
    if (document.body.classList.contains('no-motion')) {
        motionButton.textContent = 'Enable Motion';
    } else {
        motionButton.textContent = 'Reduce Motion';
    }
    // Call reveal once to ensure elements currently in view are visible when motion is disabled
    reveal(); 
}

motionButton.addEventListener('click', reduceMotion);

// Call reveal once on load to show elements already in view
reveal(); 


/*** Success Modal ***
  
  Purpose:
  - Adds a pop-up modal to the website upon successful RSVP.
  - Controls personalized message, image animation, and timed disappearance.
***/

// Animation variables and function (Step 5)
let rotateFactor = 0;
const modalImage = document.getElementById('modal-image');
let intervalId; // Variable to hold the ID for the interval timer

const animateImage = () => {
    // Check if the body has the 'no-motion' class (Stretch Feature)
    if (document.body.classList.contains('no-motion')) {
        // If motion is reduced, stop the animation and set default state
        clearInterval(intervalId);
        modalImage.style.transform = 'rotate(0deg)';
        return;
    }
    
    // Toggle rotation between 0 and -10 degrees
    if (rotateFactor === 0) {
        rotateFactor = -10;
    } else {
        rotateFactor = 0;
    }

    // Apply the rotation factor to the image
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
}

// Step 3 & 4: Toggle Modal function (show/hide and set timeout)
const toggleModal = (person) => {
    const modal = document.getElementById('success-modal');
    const modalText = document.getElementById('modal-text');
    
    // Show the modal
    modal.style.display = 'flex';

    // Update modal text to two-sentence personalized message
    modalText.textContent = `Thank you for joining the Global Action Crew, ${person.name} from ${person.hometown}! Your commitment is a crucial step toward a sustainable future.`;

    // Start image animation (Step 5)
    // Check if motion is enabled before starting the animation
    if (!document.body.classList.contains('no-motion')) {
        intervalId = setInterval(animateImage, 500); // Calls animateImage every 500ms
    }

    // Set modal timeout to 8 seconds
    setTimeout(() => {
        // Hide the modal after the timeout
        modal.style.display = 'none';
        
        // Stop the animation interval (Step 5)
        clearInterval(intervalId); 
        
        // Reset image rotation for next time
        modalImage.style.transform = 'rotate(0deg)'; 
        
    }, 8000); // 8000 milliseconds = 8 seconds
}

// STRETCH FEATURE: Close button functionality (Step 6)
const modalCloseButton = document.getElementById('modal-close-button');

const closeModal = () => {
    const modal = document.getElementById('success-modal');
    
    // Hide the modal
    modal.style.display = 'none';
    
    // Stop the animation interval if it's running
    if (intervalId) {
        clearInterval(intervalId); 
    }
    
    // Reset image rotation
    modalImage.style.transform = 'rotate(0deg)';
}

modalCloseButton.addEventListener('click', closeModal);