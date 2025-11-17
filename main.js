
/* from for create new Worker */
const addNewWorkerBtn = document.getElementById('addNewWorkerBtn');
const addWorkerModal = document.getElementById('addWorkerModal');
const cancelBtn = document.getElementById('btnCancel');

addNewWorkerBtn.addEventListener('click', () => {
    addWorkerModal.classList.remove('hidden');
});

cancelBtn.addEventListener('click', () => {
    addWorkerModal.classList.add('hidden');
});

addWorkerModal.addEventListener('click', (event) => {
    if (event.target === addWorkerModal) {
        addWorkerModal.classList.add('hidden');
    }
});

const addExperienceBtn = document.getElementById('addExperienceBtn');
const experiencesContainer = document.getElementById('experiencesContainer');

addExperienceBtn.addEventListener('click', () => {
    
    const newRow = document.createElement('div');
    newRow.classList.add('experience-row');

    newRow.innerHTML = `
        <input type="text" placeholder="Experience Title" class="exp-title">
        <input type="text" placeholder="Duration (e.g., 2 years)" class="exp-duration">
        <button type="button" class="remove-exp-btn">X</button>
    `;

    experiencesContainer.appendChild(newRow);
});


experiencesContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-exp-btn')) {
        const rowToRemove = event.target.parentElement;
        rowToRemove.remove();
    }
});


/* imge url input */

const imageInput = document.getElementById('Input-image');
const imagePreviewBox = document.querySelector('.imageWorker');

imageInput.addEventListener('input', () => {
    
    const imageUrl = imageInput.value;

    if (imageUrl) {
        imagePreviewBox.style.backgroundImage = `url(${imageUrl})`;
    } else {
        imagePreviewBox.style.backgroundImage = '';
    }
});

/* end imge url input */
/* end of from for create new Worker */