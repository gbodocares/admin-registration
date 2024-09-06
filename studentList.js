

db.collection("students").where('userId', '!=', '')
    .onSnapshot((querySnapshot) => {
        var students = [];
        querySnapshot.forEach((doc) => {
          students.push(doc.data().formData[0]);
          console.log("All students: ", students.join(" "))
          var counter = 1;
          var allstudents = students.map((student) => {
            return `
                <tr>
                    <td>${counter++}</td>
                    <td><img src="${student.imageUrl}" style="width: 70px; height: 70px;" /></td>
                    <td>${student.registrationNo}</td>
                    <td>${student.surName}</td>
                    <td>${student.fisrtname}</td>
                    <td>${student.gender}</td>
                    <td>${student.firstcourse}</td>
                    <td>${student.secondcourse}</td>
              
                </tr>
             
            `
          }).join(' ')
          
            document.getElementById('geeks').innerHTML = allstudents;
        });
});

/*db.collection("students").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});*/
