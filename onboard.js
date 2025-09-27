const COLLECTION = "new-pre-batch9-students";
const tbody = document.getElementById('onboard');
const storage = firebase.storage();
const studentsById = {}; // memory map

// Show toast
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.classList.add("toast", type);
  toast.innerText = message;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Escape helper
function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// ====== Live snapshot listener ======
db.collection(COLLECTION).onSnapshot((snapshot) => {
  const students = [];
  snapshot.forEach((doc) => {
    const data = doc.data() || {};
    const student = { docId: doc.id, ...data };
    students.push(student);
    studentsById[doc.id] = student;
  });

  if (students.length === 0) {
    tbody.innerHTML = `<tr><td colspan="12" style="text-align:center; padding:20px;">No students</td></tr>`;
    return;
  }

  let counter = 1;
  tbody.innerHTML = students.map(s => `
    <tr>
      <td>${counter++}</td>
      <td><img src="${escapeHtml(s.imageUrl || '')}" style="width:70px; height:70px; object-fit:cover;"
        onerror="this.src='https://via.placeholder.com/70'"></td>
      <td>${escapeHtml(s.id || '')}</td>
      <td>${escapeHtml(s.surName || '')}</td>
      <td>${escapeHtml(s.firstName || '')}</td>
      <td>${escapeHtml(s.gender || '')}</td>
      <td>${escapeHtml(s.lcda || '')}</td>
      <td>${escapeHtml(s.phone || '')}</td>
      <td>${escapeHtml(s.course || '')}</td>
      <td>${escapeHtml(s.dob || '')}</td>
      <td>${escapeHtml(s.created_at || '')}</td>
      <td>
        <button class="edit-btn" data-docid="${s.docId}" style="background: none; color: teal;"><i class="bi bi-pencil-square"></i></button>
        <button class="delete-btn" data-docid="${s.docId}" data-imageurl="${escapeHtml(s.imageUrl || '')}" style="background: none; color: red;"><i class="bi bi-trash3"></i></button>
      </td>
    </tr>
  `).join('');
});

// ===== Event delegation =====
tbody.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit-btn");
  if (editBtn) return openEditModal(editBtn.dataset.docid);

  const delBtn = e.target.closest(".delete-btn");
  if (delBtn) return deleteStudent(delBtn.dataset.docid, delBtn.dataset.imageurl);
});

// ===== Modal logic =====
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const editImageInput = document.getElementById("editImage");
const previewImage = document.getElementById("previewImage");
let oldImageUrl = null;

function openEditModal(docId) {
  const s = studentsById[docId];
  if (!s) return;

  document.getElementById("editDocId").value = docId;
  document.getElementById("editRegNo").value = s.id || "";
  document.getElementById("editSurname").value = s.surName || "";
  document.getElementById("editFirstname").value = s.firstName || "";
  document.getElementById("editDob").value = s.dob || "";
  document.getElementById("editPhone").value = s.phone || "";
  document.getElementById("editLga").value = s.lcda || "";
  document.getElementById("editGender").value = s.gender || "";
  document.getElementById("editCourse").value = s.course || "";
  oldImageUrl = s.imageUrl || null;

  if (s.imageUrl) {
    previewImage.src = s.imageUrl;
    previewImage.style.display = "block";
  } else {
    previewImage.style.display = "none";
  }

  editImageInput.value = "";
  editModal.style.display = "flex";
}

function closeEditModal() {
  editModal.style.display = "none";
}

// live preview new image
editImageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

// ===== Save changes =====
editForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  const saveBtn = document.getElementById("saveBtn");
  const spinnerOverlay = document.getElementById("spinnerOverlay");

  spinnerOverlay.style.display = "flex";
  saveBtn.disabled = true;
  saveBtn.innerText = "Saving...";

  const docId = document.getElementById('editDocId').value;

  let updatedStudent = {
    surName: document.getElementById('editSurname').value,
    id: document.getElementById('editRegNo').value,
    firstName: document.getElementById('editFirstname').value,
    dob: document.getElementById('editDob').value,
    phone: document.getElementById('editPhone').value,
    lcda: document.getElementById('editLga').value,
    gender: document.getElementById('editGender').value,
    course: document.getElementById('editCourse').value,
    imageUrl: oldImageUrl
  };

  const file = editImageInput.files[0];

  try {
    if (file) {
      const storageRef = storage.ref().child('student_photos/' + Date.now() + '_' + file.name);
      await storageRef.put(file);
      const newImageUrl = await storageRef.getDownloadURL();
      updatedStudent.imageUrl = newImageUrl;

      if (oldImageUrl) {
        try {
          const oldRef = storage.refFromURL(oldImageUrl);
          await oldRef.delete();
        } catch (err) {
          console.warn("Could not delete old image:", err);
        }
      }
    }

    await db.collection(COLLECTION).doc(docId).update(updatedStudent);

    showToast("Student updated successfully!", "success");
    closeEditModal();

  } catch (error) {
    console.error("Error updating student: ", error);
    showToast("Error updating student!", "error");
  } finally {
    spinnerOverlay.style.display = "none";
    saveBtn.disabled = false;
    saveBtn.innerText = "Save Changes";
  }
});

// ===== Delete =====
async function deleteStudent(docId, imageUrl) {
  if (!confirm("Are you sure you want to delete this student?")) return;

  try {
    await db.collection(COLLECTION).doc(docId).delete();
    console.log("Document deleted:", docId);

    if (imageUrl) {
      try {
        const oldRef = firebase.storage().refFromURL(imageUrl);
        await oldRef.delete();
        console.log("Image deleted:", imageUrl);
      } catch (err) {
        console.warn("Could not delete image:", err);
      }
    }

    showToast("Student deleted successfully!", "success");
  } catch (error) {
    console.error("Error deleting student: ", error);
    showToast("Failed to delete student!", "error");
  }
}



