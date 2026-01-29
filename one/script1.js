// // --- 1. INITIALIZATION & DATE ---
// document.addEventListener('DOMContentLoaded', () => {
//     // Set Current Date
//     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//     document.getElementById('currentDate').innerText = new Date().toLocaleDateString('en-US', options);

//     // Initialize Dashboard Chart
//     const ctx = document.getElementById('dashboardChart');
//     if (ctx) {
//         new Chart(ctx, {
//             type: 'line',
//             data: {
//                 labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//                 datasets: [{
//                     label: 'Fee Collection ($)',
//                     data: [12000, 19000, 3000, 5000, 20000, 24000],
//                     borderColor: '#4F46E5',
//                     tension: 0.4,
//                     fill: true,
//                     backgroundColor: 'rgba(79, 70, 229, 0.1)'
//                 }]
//             },
//             options: { responsive: true, maintainAspectRatio: false }
//         });
//     }
// });

// // --- 2. NAVIGATION LOGIC ---
// function switchView(viewId, linkElement) {
//     // Hide all view sections
//     const sections = document.querySelectorAll('.view-section');
//     sections.forEach(section => section.classList.remove('active'));

//     // Show selected view
//     const target = document.getElementById(viewId);
//     if (target) target.classList.add('active');

//     // Update Sidebar Active State
//     if (linkElement) {
//         const navLinks = document.querySelectorAll('.nav-link');
//         navLinks.forEach(link => link.classList.remove('active'));
//         linkElement.classList.add('active');
//     }
// }

// // --- 3. MODAL LOGIC ---
// function openModal(modalId) {
//     document.getElementById(modalId).style.display = 'flex';
// }

// function closeModal(modalId) {
//     document.getElementById(modalId).style.display = 'none';
// }

// // Close modal if clicking outside
// window.onclick = function(event) {
//     if (event.target.classList.contains('modal-overlay')) {
//         event.target.style.display = "none";
//     }
// }

// // --- 4. STUDENT & TEACHER LOGIC ---
// function handleAddStudent(event) {
//     event.preventDefault();
//     const name = document.getElementById('sName').value;
//     const cls = document.getElementById('sClass').value;
//     const phone = document.getElementById('sPhone').value;
//     const randomId = '#ST-' + Math.floor(Math.random() * 1000);

//     const tbody = document.getElementById('studentTableBody');
//     const newRow = `
//         <tr>
//             <td>${randomId}</td>
//             <td>${name}</td>
//             <td>${cls}</td>
//             <td>${phone}</td>
//             <td><span class="badge badge-success">Active</span></td>
//             <td><button class="icon-small"><i class="ph ph-trash"></i></button></td>
//         </tr>
//     `;
    
//     tbody.insertAdjacentHTML('afterbegin', newRow);
//     closeModal('studentModal');
    
//     // Update Dashboard Count
//     let countEl = document.getElementById('dashStudentCount');
//     let count = parseInt(countEl.innerText.replace(/,/g, ''));
//     countEl.innerText = (count + 1).toLocaleString();
    
//     alert('Student Added Successfully!');
// }

// function handleAddTeacher(event) {
//     event.preventDefault();
//     const name = document.getElementById('tName').value;
//     const sub = document.getElementById('tSubject').value;
//     const phone = document.getElementById('tPhone').value;
//     const randomId = '#TC-' + Math.floor(Math.random() * 1000);

//     const tbody = document.getElementById('teacherTableBody');
//     const newRow = `
//         <tr>
//             <td>${randomId}</td>
//             <td>${name}</td>
//             <td>${sub}</td>
//             <td>${phone}</td>
//             <td><button class="icon-small"><i class="ph ph-trash"></i></button></td>
//         </tr>
//     `;
    
//     tbody.insertAdjacentHTML('afterbegin', newRow);
//     closeModal('teacherModal');
    
//     // Update Dashboard Count
//     let countEl = document.getElementById('dashTeacherCount');
//     let count = parseInt(countEl.innerText);
//     countEl.innerText = count + 1;
    
//     alert('Teacher Added Successfully!');
// }

// // --- 5. INVENTORY LOGIC (NEW) ---
// function addNewInventory() {
//     const type = document.getElementById('invItemType').value;
//     const qty = document.getElementById('invQty').value;
//     const date = new Date().toLocaleDateString();

//     if(qty <= 0 || qty == "") {
//         alert("Please enter a valid quantity");
//         return;
//     }

//     const tbody = document.getElementById('inventoryTableBody');
    
//     // Determine category based on item selection
//     let category = "Equipment";
//     if(type === "Desk" || type === "Chair") category = "Furniture";
//     if(type === "Computer") category = "IT Asset";

//     // Create Row HTML
//     const newRow = `
//         <tr>
//             <td>${type}</td>
//             <td>${category}</td>
//             <td>${qty}</td>
//             <td>${date}</td>
//             <td><span class="badge badge-success">In Stock</span></td>
//         </tr>
//     `;
    
//     // Insert at top of table
//     tbody.insertAdjacentHTML('afterbegin', newRow);
    
//     // Reset Input
//     document.getElementById('invQty').value = "";
//     alert(`${qty} ${type}(s) added to inventory successfully!`);
// }

// // --- 6. PASSWORD RESET LOGIC (NEW) ---
// function resetUserPassword() {
//     const role = document.getElementById('resetRole').value;
//     const username = document.getElementById('resetUsername').value;

//     if(!username) {
//         alert("Please enter a Username or ID to reset.");
//         return;
//     }

//     // Simulate Password Reset
//     const newPass = Math.random().toString(36).slice(-8).toUpperCase();
    
//     alert(`PASSWORD RESET SUCCESSFUL!\n\nUser: ${username} (${role})\nTemporary Password: ${newPass}\n\nPlease share this with the user securely.`);
// }


document.addEventListener('DOMContentLoaded', () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').innerText =
        new Date().toLocaleDateString('en-US', options);

    loadStudents();
});

// ---------- STUDENT BACKEND CONNECT ----------

async function handleAddStudent(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById('sName').value,
        rollNo: "ST-" + Math.floor(Math.random() * 1000),
        className: document.getElementById('sClass').value,
        phone: document.getElementById('sPhone').value
    };

    const res = await fetch("http://localhost:3000/students/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const student = await res.json();
    addStudentRow(student);
    closeModal('studentModal');
}

async function loadStudents() {
    const res = await fetch("http://localhost:3000/students");
    const students = await res.json();

    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = "";
    students.forEach(addStudentRow);

    document.getElementById('dashStudentCount').innerText = students.length;
}

function addStudentRow(s) {
    document.getElementById('studentTableBody').insertAdjacentHTML('afterbegin', `
        <tr>
            <td>${s.rollNo}</td>
            <td>${s.name}</td>
            <td>${s.className}</td>
            <td>${s.phone}</td>
            <td><span class="badge badge-success">Active</span></td>
            <td>
              <button onclick="deleteStudent('${s._id}')">
                🗑️
              </button>
            </td>
        </tr>
    `);
}

async function deleteStudent(id) {
    await fetch(`http://localhost:3000/students/${id}`, { method: "DELETE" });
    loadStudents();
}

// ---------- UI HELPERS (UNCHANGED) ----------

function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}
