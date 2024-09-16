

db.collection("newstudents").get()
   .then((querySnapshot) => {
        var students = [];
        querySnapshot.forEach((doc) => {
                if(doc.data()){
                    students.push(doc.data());
                    //console.log("All students: ", students.join(" "))
                    var counter = 1;
                    
                    var allstudents = students.map((student) => {
                      return `
                          <tr>
                              <td>${counter++}</td>
                              <td><img src="${student.imageUrl}" style="width: 70px; height: 70px;" /></td>
                              <td>${student.id}</td>
                              <td>${student.surName}</td>
                              <td>${student.firstName}</td>
                              <td>${student.gender}</td>
                              <td>${student.lcda}</td>
                              <td>${student.phone}</td>
                              <td>${student.course}</td>
                        
                          </tr>
                       
                      `
                    }).join(' ')
                    
                  
                } else {
                    console.log('document does not exist');
                }

                document.getElementById('onboard').innerHTML = allstudents;
            });
        
});

/*db.collection("newstudents").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});*/
