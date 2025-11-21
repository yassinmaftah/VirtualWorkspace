
document.addEventListener('DOMContentLoaded', () => {

    const FormOf_ADD_worker = document.getElementById('FormOf_ADD_worker');
    const addNew_WorkerButton = document.getElementById('addNew_WorkerButton');
    const btnCancel = document.getElementById('btnCancel');
    const workerForm = document.getElementById('workerForm');

    const imageInput = document.getElementById('Input-image');
    const imagePreviewBox = document.querySelector('.imageWorker');

    const experiencesContainer = document.getElementById('experiencesContainer');
    const addExperienceBtn = document.getElementById('addExperienceBtn');
    
    // display form or NOT display
    let experienceCounter = 1;
    addNew_WorkerButton.addEventListener('click', () => {
        FormOf_ADD_worker.classList.remove('hidden');
    });

    btnCancel.addEventListener('click', () => {
        FormOf_ADD_worker.classList.add('hidden');
    });

    FormOf_ADD_worker.addEventListener('click', (event) => {
        if (event.target === FormOf_ADD_worker) {
            FormOf_ADD_worker.classList.add('hidden');
        }
    });


    imageInput.addEventListener('input', () => {
        const imageUrl = imageInput.value;
        if (imageUrl) {
            imagePreviewBox.style.backgroundImage = `url(${imageUrl})`;
        } else {
            imagePreviewBox.style.backgroundImage = '';
        }
    });

    function checkName() {
        const nameInput = document.getElementById('Input-name');
        const errorDiv = document.getElementById('errorNameMessage');
        
        if (nameInput.value.trim().length < 3) {
            errorDiv.textContent = 'Full name must be at least 3 characters.';
            nameInput.classList.add('input-error');
            return false;
        } else {
            errorDiv.textContent = '';
            nameInput.classList.remove('input-error');
            return true;
        }
    }

    function checkRole() {
        const roleInput = document.getElementById('Input-role');
        const errorDiv = document.getElementById('errorRoleMessage');
        
        if (roleInput.value === "") {
            errorDiv.textContent = 'Please select a role.';
            roleInput.classList.add('input-error');
            return false;
        } else {
            errorDiv.textContent = '';
            roleInput.classList.remove('input-error');
            return true;
        }
    }

    function checkURL()
    {
        const URLinput = document.getElementById('Input-image');
        const errorDiv = document.getElementById('errorURLMessage');
        const URLRegex = /^(http|https):\/\/[^ "]+$/;


        // if (URLinput.value.length == 0)
        // {
        //     errorDiv.textContent = 'url input is impty!';
        //     URLinput.classList.add('input-error');
        //     return false;
        // }
        if (!URLRegex.test(URLinput.value) && URLinput.value.length > 0)
        {
            errorDiv.textContent = 'Invalid URL format (must start with http:// or https://).';
            URLinput.classList.add('input-error');
            return false;
        }
        else
        {
            errorDiv.textContent = '';
            URLinput.classList.remove('input-error');
            return true;
        }
    }

    function checkEmail() {
        const emailInput = document.getElementById('Input-email');
        const errorDiv = document.getElementById('errorEmailMessage');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (emailInput.value.length == 0)
        {
            errorDiv.textContent = 'Email input is empty';
            emailInput.classList.add('input-error');
            return false;
        }
        else if (!emailRegex.test(emailInput.value))
        {
            errorDiv.textContent = 'Invalid email format.';
            emailInput.classList.add('input-error');
            return false;
        }
        else {
            errorDiv.textContent = '';
            emailInput.classList.remove('input-error');
            return true;
        }
    }

    function checkPhone() {
        const telInput = document.getElementById('Input-telephone');
        const errorDiv = document.getElementById('errorTeleMessage');
        const phoneRegex = /^[0-9]{8,15}$/; 
        if (telInput.value.length == 0) {
            errorDiv.textContent = 'phone Input is empty';
            telInput.classList.add('input-error');
            return false;
        }
        else if (!phoneRegex.test(telInput.value))
        {
            errorDiv.textContent = 'Phone must be 8-15 digits.';
            telInput.classList.add('input-error');
            return false;
        } 
        else {
            errorDiv.textContent = '';
            telInput.classList.remove('input-error');
            return true;
        }
    }

    function checkExperiences() {
        let allExperiencesAreValid = true;
        const allBlocks = document.querySelectorAll('.experience-block');
        
        allBlocks.forEach((block) => {
            // inputs 
            const titleInput = block.querySelector('.exp-title');
            const startDateInput = block.querySelector('.exp-start-date');
            const endDateInput = block.querySelector('.exp-end-date');
            
            // display error msg
            const titleErrorDiv = block.querySelector('.error-message');
            const dateErrorDiv = block.querySelector('.date-pair-error');
            
            if (titleInput.value.trim() === "") {
                titleErrorDiv.textContent = 'Experience name is required.';
                titleInput.classList.add('input-error');
                allExperiencesAreValid = false;
            } else {
                titleErrorDiv.textContent = '';
                titleInput.classList.remove('input-error');
            }
            
            if (startDateInput.value === "" || endDateInput.value === "") {
                dateErrorDiv.textContent = 'Start and End dates are required.';
                if (startDateInput.value === "") 
                    startDateInput.classList.add('input-error');
                if (endDateInput.value === "") 
                    endDateInput.classList.add('input-error');
                allExperiencesAreValid = false;
            } 
            else if (new Date(endDateInput.value) < new Date(startDateInput.value)) {
                dateErrorDiv.textContent = 'End day cannot be before Start day.';
                startDateInput.classList.add('input-error');
                endDateInput.classList.add('input-error');
                allExperiencesAreValid = false;
            } 
            else {
                dateErrorDiv.textContent = '';
                startDateInput.classList.remove('input-error');
                endDateInput.classList.remove('input-error');
            }
        });
        
        return allExperiencesAreValid;
    }

    document.getElementById('Input-name').addEventListener('input', checkName);
    document.getElementById('Input-role').addEventListener('change', checkRole);
    document.getElementById("Input-image").addEventListener('input', checkURL);
    document.getElementById('Input-email').addEventListener('input', checkEmail);
    document.getElementById('Input-telephone').addEventListener('input', checkPhone);

    document.querySelectorAll('.experience-block').forEach(block => {
        block.addEventListener('input', checkExperiences);
    });

    addExperienceBtn.addEventListener('click', () => {
        experienceCounter++; 

        const newBlock = document.createElement('div');
        newBlock.classList.add('experience-block');
        
        newBlock.innerHTML = `
            <div class="input-block">
                <label for="exp-title-${experienceCounter}">Experience Name</label>
                <input id="exp-title-${experienceCounter}" type="text" class="exp-title">
                <div id="errorExpTitle${experienceCounter}" class="error-message"></div>
            </div>
            
            <div class="date-pair">
                <div class="input-block date-input-group">
                    <label for="exp-start-${experienceCounter}">Start day</label>
                    <input id="exp-start-${experienceCounter}" type="date" class="exp-start-date">
                </div>
                <div class="input-block date-input-group">
                    <label for="exp-end-${experienceCounter}">End day</label>
                    <input id="exp-end-${experienceCounter}" type="date" class="exp-end-date">
                </div>
            </div>
            <div id="errorExpDate${experienceCounter}" class="error-message date-pair-error"></div>
            
            <button type="button" class="remove-exp-btn">X Remove</button>
        `;
        
        experiencesContainer.appendChild(newBlock);

        newBlock.addEventListener('input', checkExperiences);
    });

    experiencesContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-exp-btn')) {
            event.target.closest('.experience-block').remove();
            checkExperiences();
        }
    });

    function closeandreset()
    {
        FormOf_ADD_worker.classList.add('hidden');
        workerForm.reset();

        const errorInputs = document.querySelectorAll('.input-error');
        for (let i = 0; i < errorInputs.length; i++) {
            errorInputs[i].classList.remove('input-error');
        }
        const errorMessages = document.querySelectorAll('.error-message');
        for (let i = 0; i < errorMessages.length; i++) {
            errorMessages[i].textContent = '';
        }
        imagePreviewBox.style.backgroundImage = '';
    }

    // display cart at pannel workers 
    function showWorkersInPanel() {
        const workersListPanel = document.querySelector('.panel-workers-list');
        workersListPanel.innerHTML = '';
        const workersFromStorage = localStorage.getItem('allWorkers');
        const assignmentsFromStorage = localStorage.getItem('roomAssignments');

        let workersList = [];
        if (workersFromStorage) {
            workersList = JSON.parse(workersFromStorage);
        }
        let assignedWorkerIds = [];
        if (assignmentsFromStorage) {
            const assignments = JSON.parse(assignmentsFromStorage);
            for (let roomName in assignments) {
                const workersInThisRoom = assignments[roomName];
                for (let i = 0; i < workersInThisRoom.length; i++) {
                    assignedWorkerIds.push(workersInThisRoom[i]);
                }
            }
        }

        //console.log(assignedWorkerIds);

        workersList.forEach((worker) => {
            if (assignedWorkerIds.includes(worker.id))
                return;

            const card = document.createElement('div');
            card.classList.add('worker-card');
            const imageSrc = worker.image ? worker.image : 'user-image.png';
            card.innerHTML = `
                <img src="${imageSrc}" alt="Worker Image" class="worker-img">
                <div class="worker-info">
                    <p class="worker-name">${worker.name}</p>
                    <p class="worker-role">${worker.role}</p>
                    <span class="worker-email" style="display:none">${worker.email}</span>
                </div>
                <button class="DelateWorkerCard" data-id="${worker.id}">X</button>
            `;
            workersListPanel.appendChild(card);
        });
    }

    workerForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        const isNameValid = checkName();
        const isRoleValid = checkRole();
        const isURLValid = checkURL();
        const isEmailValid = checkEmail();
        const isPhoneValid = checkPhone();
        const areExperiencesValid = checkExperiences();
        
        if (isNameValid && isRoleValid && isEmailValid && isPhoneValid && areExperiencesValid) {
            
            // console.log('Form is valid');
            const newName = document.getElementById('Input-name').value;
            const newRole = document.getElementById('Input-role').value;
            let newImage = document.getElementById('Input-image').value;
            const newEmail = document.getElementById('Input-email').value;
            const newPhone = document.getElementById('Input-telephone').value;
            const newWorkerId = Date.now().toString();

            if (!newImage)
                newImage = 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';


            // get all worker experiences

            const experiencesList = [];
            const allExperienceBlocks = document.querySelectorAll('.experience-block');
            allExperienceBlocks.forEach(block => {
                const title = block.querySelector('.exp-title').value;
                const startDate = block.querySelector('.exp-start-date').value;
                const endDate = block.querySelector('.exp-end-date').value;

                const oneExperience = {
                    title: title,
                    startDate: startDate,
                    endDate: endDate
                };
                experiencesList.push(oneExperience);
            });


            const newWorker = {
                id: newWorkerId,
                name: newName,
                role: newRole,
                image: newImage,
                email: newEmail,
                phone: newPhone,
                experiences: experiencesList
            };

            // console.log(newWorker);
            
            // save all data at local storige 
            const workersFromStorage = localStorage.getItem('allWorkers');
            let workersList = [];
            if (workersFromStorage)
            {
                workersList = JSON.parse(workersFromStorage);
            }
            workersList.push(newWorker);
            const workersListString = JSON.stringify(workersList);
            localStorage.setItem('allWorkers', workersListString);
            // console.log(workersList);
            
            showWorkersInPanel();
            closeandreset();
        } else {
            console.log('Form is invalid. Please check the errors.');
        }
    });


    // dalate at list worker 
    const workersListPanel = document.querySelector('.panel-workers-list');
    workersListPanel.addEventListener('click', (event) => {
        if (event.target.classList.contains('DelateWorkerCard')) {
            const workerIdToDelete = event.target.getAttribute('data-id');
            const workersFromStorage = localStorage.getItem('allWorkers');
            if (workersFromStorage) {
                let workersList = JSON.parse(workersFromStorage);
                const updatedList = workersList.filter(worker => worker.id !== workerIdToDelete);
                localStorage.setItem('allWorkers', JSON.stringify(updatedList));
                showWorkersInPanel();
            }
        }
    });

    const roomRules = {
        "conference": ["Receptionnistes", "Manager", "Nettoyage"], // Réception
        "Archive": ["Techniciens_IT", "Manager", "Nettoyage"],  // Serveurs
        "securite": ["sécurité", "Manager"],                     // Sécurité
        "reception": ["Manager"],                                 // Bureau Manager
        "personnel": ["Nettoyage", "Manager", "Techniciens_IT"],  // Archives
        "serveurs": ["Receptionnistes", "Techniciens_IT", "sécurité", "Manager", "Nettoyage"] // Open Space
    };

    let currentRoomId = null;
    const assignModal = document.getElementById('assignWorkerModal');
    const assignListContainer = document.getElementById('availableWorkersList');
    const btnCloseAssign = document.getElementById('btnCloseAssignModal');

    function openAssignModal(roomId) {
        currentRoomId = roomId;
        assignModal.classList.remove('hidden');
        document.getElementById('assignModalTitle').textContent = `Add to ${roomId}`;
        Available_worker(roomId);
    }

    function Available_worker(roomId) {
        assignListContainer.innerHTML = '';
        const allWorkers = JSON.parse(localStorage.getItem('allWorkers') || '[]');
        const assignments = JSON.parse(localStorage.getItem('roomAssignments') || '{}');
        let busyWorkerIds = []; // take all ids wokers in rooms
        for (let roomKey in assignments) {
            const workersInRoom = assignments[roomKey];
            for (let i = 0; i < workersInRoom.length; i++) {
                busyWorkerIds.push(workersInRoom[i]);
            }
        }
        const allowedRoles = roomRules[roomId] || [];
        const eligibleWorkers = allWorkers.filter(worker => {
            const isNotBusy = !busyWorkerIds.includes(worker.id);
            const isRoleAllowed = allowedRoles.includes(worker.role);
            return isNotBusy && isRoleAllowed;
        });
        

        if (eligibleWorkers.length === 0) {
            assignListContainer.innerHTML = '<p style="text-align:center; padding:20px;">No available workers for this room.</p>';
            return;
        }

        // console.log(eligibleWorkers);
        
        eligibleWorkers.forEach(worker => {
            const item = document.createElement('div');
            item.classList.add('worker-card');
            item.style.cursor = 'pointer';
            item.style.border = '2px solid #ddd';

            const img = worker.image ? worker.image : 'user-image.png';

            item.innerHTML = `
                <img src="${img}" class="worker-img">
                <div class="worker-info">
                    <p class="worker-name">${worker.name}</p>
                    <p class="worker-role">${worker.role}</p>
                </div>
            `;

            item.addEventListener('click', () => {
                assignWorkerToRoom(worker.id, currentRoomId);
            });
            assignListContainer.appendChild(item);
        });
    }

    // if click in card of woker take the work id and room id
    function assignWorkerToRoom(workerId, roomId) 
    {
        let assignments = JSON.parse(localStorage.getItem('roomAssignments') || '{}');
        
        if (!assignments[roomId]) {
            assignments[roomId] = [];
        }

        if (assignments[roomId].length >= 5) {
            alert("Room is full! (Max 5)");
            return;
        }

        assignments[roomId].push(workerId);
        
        localStorage.setItem('roomAssignments', JSON.stringify(assignments));

        assignModal.classList.add('hidden');

        showWorkersInPanel();
        renderRoomWorkers();
    }
    


    const detailsModal = document.getElementById('workerDetailsModal');
    const btnCloseDetails = document.getElementById('btnCloseDetailModal');
    const btnRemoveFromRoom = document.getElementById('btnRemoveFromRoom');
    
    const detailImage = document.getElementById('detailImage');
    const detailName = document.getElementById('detailName');
    const detailRole = document.getElementById('detailRole');
    const detailEmail = document.getElementById('detailEmail');
    const detailPhone = document.getElementById('detailPhone');
    const detailExperiences = document.getElementById('detailExperiences');

    let selectedWorkerIdForRemove = null;
    let selectedRoomIdForRemove = null;

        // if user click in 

    function openWorkerDetails(worker, roomId) {
            const img = worker.image ? worker.image : 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';
            detailImage.src = img;
            detailName.textContent = worker.name;
            detailRole.textContent = worker.role;
            detailEmail.textContent = worker.email ? `${worker.email}` : '';
            detailPhone.textContent = worker.phone ? `${worker.phone}` : '';

            detailExperiences.innerHTML = '<strong>Experiences:</strong>';
            if (worker.experiences && worker.experiences.length > 0) {
                worker.experiences.forEach(exp => {
                    detailExperiences.innerHTML += `
                        <div class="detail-exp-item">
                            - ${exp.title} (${exp.startDate} to ${exp.endDate})
                        </div>
                    `;
                });
            } else {
                detailExperiences.innerHTML += '<p>No experiences recorded.</p>';
            }

            selectedWorkerIdForRemove = worker.id;
            selectedRoomIdForRemove = roomId;

            detailsModal.classList.remove('hidden');
    }

    btnCloseDetails.addEventListener('click', () => {
        detailsModal.classList.add('hidden');
    });

    btnRemoveFromRoom.addEventListener('click', () => {
        if (selectedWorkerIdForRemove && selectedRoomIdForRemove)
        {
            let assignments = JSON.parse(localStorage.getItem('roomAssignments') || '{}');
            if (assignments[selectedRoomIdForRemove])
            {
                assignments[selectedRoomIdForRemove] = assignments[selectedRoomIdForRemove].filter(id => id !== selectedWorkerIdForRemove);
            }
            localStorage.setItem('roomAssignments', JSON.stringify(assignments));

            detailsModal.classList.add('hidden');
            renderRoomWorkers();
            showWorkersInPanel();
        }
    });

    function renderRoomWorkers() {
            const assignments = JSON.parse(localStorage.getItem('roomAssignments') || '{}');
            const allWorkers = JSON.parse(localStorage.getItem('allWorkers') || '[]');

            document.querySelectorAll('.room-workers-container').forEach(container => {
                container.innerHTML = ''; 
                const roomId = container.parentElement.id;
                const workerIdsInRoom = assignments[roomId] || [];

                workerIdsInRoom.forEach(id => {
                    const workerData = allWorkers.find(w => w.id === id);
                    
                    if (workerData) {
                        const img = workerData.image ? workerData.image : 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';
                        
                        const miniWorkerDiv = document.createElement('div');
                        miniWorkerDiv.classList.add('mini-worker');
                        miniWorkerDiv.innerHTML = `
                            <img src="${img}" class="mini-worker-img">
                            `;
                        
                        miniWorkerDiv.addEventListener('click', (e) => {
                            // e.stopPropagation();
                            openWorkerDetails(workerData, roomId);
                        });

                        container.appendChild(miniWorkerDiv);
                    }
                });
            });
        }


    document.querySelectorAll('.add-to-room-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const roomId = e.currentTarget.getAttribute('data-room-id');
            openAssignModal(roomId);
        });
    });

    btnCloseAssign.addEventListener('click', () => {
        assignModal.classList.add('hidden');
    });


    renderRoomWorkers();
    showWorkersInPanel();

});