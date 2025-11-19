let list_employee = [
  {
    id: 1001,
    nom: 'Hassan Tawni',
    role: 'Manager',
    email: 'hassan.tawni@example.com',
    tel: '0612345678',
    photo: 'https://randomuser.me/api/portraits/men/44.jpg',
    isactive: null,
    experiences: [
      {
        exp_id: 1,
        company: 'Aziz Adel',
        role_exp: 'Chef de projet',
        date_start: '2020-01-15',
        date_end: '2024-05-30',
      },
    ],
  },
  {
    id: 1002,
    nom: 'Abdo Gouglou',
    role: 'Réceptionniste',
    email: 'abdo.gouglou@hotel.fr',
    tel: '0798765432',
    photo: 'https://randomuser.me/api/portraits/men/8.jpg',
    isactive: null,
    experiences: [
      {
        exp_id: 2,
        company: 'Grand Hotel Paris',
        role_exp: 'Assistante administrative',
        date_start: '2022-08-01',
        date_end: '2023-07-31',
      },
    ],
  },
  {
    id: 1003,
    nom: 'Samir Tawrdi',
    role: 'Technicien IT',
    email: 'samir.tawrdi@techcorp.com',
    tel: '0665544332',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    isactive: null,
    experiences: [
      {
        exp_id: 3,
        company: 'Digital Connect',
        role_exp: 'Support technique',
        date_start: '2023-03-10',
        date_end: '2025-11-18',
      },
    ],
  },
  {
    id: 1004,
    nom: 'Ahmed Somali',
    role: 'Agent de sécurité',
    email: 'ahmed.somali@securite.org',
    tel: '0620304050',
    photo: 'https://randomuser.me/api/portraits/men/50.jpg',
    isactive: null,
    experiences: [],
  },
  {
    id: 1005,
    nom: 'Khadim Omar',
    role: 'Autre',
    email: 'omar.khadim@service.ma',
    tel: '0651627384',
    photo: 'https://randomuser.me/api/portraits/men/9.jpg',
    isactive: null,
    experiences: [
      {
        exp_id: 4,
        company: 'City Maintenance',
        role_exp: 'Plombier certifié',
        date_start: '2018-05-01',
        date_end: '2020-12-31',
      },
      {
        exp_id: 5,
        company: 'Global Services',
        role_exp: "Chef d'équipe",
        date_start: '2021-01-01',
        date_end: '2023-01-31',
      },
    ],
  },
  {
    id: 1006,
    nom: 'Dubois Caroline',
    role: 'Nettoyage',
    email: 'caro.dubois@clean.fr',
    tel: '0711223344',
    photo: 'https://randomuser.me/api/portraits/women/66.jpg',
    isactive: null,
    experiences: [],
  },
];
const ZONE_RULES = [
  {
    id: 'zone-conference',
    name: 'Salle de Conférence',
    nombre_max: 8,
    allowedRoles: ['Manager', 'Autre', 'Réceptionniste', 'Technicien IT', 'Agent de sécurité', 'Nettoyage'],
  },
  {
    id: 'zone-reception',
    name: 'Réception',
    nombre_max: 7,
    allowedRoles: ['Réceptionniste', 'Manager'],
  },
  {
    id: 'zone-serveurs',
    name: 'Salle des Serveurs',
    nombre_max: 3,
    allowedRoles: ['Technicien IT', 'Manager'],
  },
  {
    id: 'zone-securite',
    name: 'Salle de Sécurité',
    nombre_max: 3,
    allowedRoles: ['Agent de sécurité', 'Manager'],
  },
  {
    id: 'zone-personnel',
    name: 'Salle du Personnel',
    nombre_max: 2,
    allowedRoles: ['Manager', 'Autre', 'Réceptionniste', 'Technicien IT', 'Agent de sécurité', 'Nettoyage'],
  },
  {
    id: 'zone-archives',
    name: "Salle d'Archives",
    nombre_max: 4,
    allowedRoles: ['Manager', 'Autre', 'Réceptionniste', 'Technicien IT', 'Agent de sécurité'],
  },
];


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


        if (URLinput.value.length == 0)
        {
            errorDiv.textContent = 'url input is impty!';
            URLinput.classList.add('input-error');
            return false;
        }
        else if (!URLRegex.test(URLinput.value))
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
        
        if (isNameValid && isRoleValid && isEmailValid && isPhoneValid && areExperiencesValid && isURLValid) {
            
            // console.log('Form is valid');
            const newName = document.getElementById('Input-name').value;
            const newRole = document.getElementById('Input-role').value;
            const newImage = document.getElementById('Input-image').value;
            const newEmail = document.getElementById('Input-email').value;
            const newPhone = document.getElementById('Input-telephone').value;
            const newWorkerId = Date.now().toString();

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
            console.log(workersList);
            
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
    showWorkersInPanel();

});