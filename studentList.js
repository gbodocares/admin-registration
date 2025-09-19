

// db.collection("pre-batch9-students").where('userId', '!=', ' ')
//     .onSnapshot((querySnapshot) => {
//         var students = [];
//         querySnapshot.forEach((doc) => {
//                 if(doc.data().formData){
//                     students.push(doc.data().formData[0]);
//                     //console.log("All students: ", students.join(" "))
//                     var counter = 1;
                    
//                     var allstudents = students.map((student) => {
//                       return `
//                           <tr>
//                               <td>${counter++}</td>
//                               <td><img src="${student.imageUrl}" style="width: 70px; height: 70px;" /></td>
//                               <td>${student.registrationNo}</td>
//                               <td>${student.surName}</td>
//                               <td>${student.fisrtname}</td>
//                               <td>${student.gender}</td>
//                               <td>${student.lga}</td>
//                               <td>${student.firstcourse}</td>
//                               <td>${student.secondcourse}</td>
//                               <td>${student.phone}</td>
//                               <td>${student.dob}</td>
//                               <td>${student.email}</td>
//                           </tr>
                       
//                       `
//                     }).join(' ')
                    
                  
//                 } else {
//                     console.log('document does not exist');
//                 }

//                 document.getElementById('geeks').innerHTML = allstudents;
//             });
        
// });

// /*db.collection("students").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//     });
// });*/
db.collection("pre-batch9-students")
  .where('userId', '!=', ' ')
  .onSnapshot((querySnapshot) => {
    let students = [];

    querySnapshot.forEach((doc) => {
      if (doc.data().formData) {
        // If formData is an array, collect all entries
        students.push(...doc.data().formData);
      } else {
        console.log('document does not exist');
      }
    });

    let allstudents = "";

    if (students.length > 0) {
      let counter = 1;
      allstudents = students.map((student) => {
        return `
          <tr>
            <td>${counter++}</td>
            <td><img src="${student.imageUrl}" style="width: 70px; height: 70px;" /></td>
            <td>${student.registrationNo}</td>
            <td>${student.surName}</td>
            <td>${student.fisrtname}</td>
            <td>${student.gender}</td>
            <td>${student.lga}</td>
            <td>${student.firstcourse}</td>
            <td>${student.secondcourse}</td>
            <td>${student.phone}</td>
            <td>${student.dob}</td>
            <td>${student.email}</td>
           
          </tr>
        `;
      }).join(' ');
    } else {
      // Fallback row
      allstudents = `
        <tr>
          <td colspan="12" style="text-align:center; color: gray; padding: 20px;">
            No students found
          </td>
        </tr>
      `;
    }

    document.getElementById('geeks').innerHTML = allstudents;
  });

   
