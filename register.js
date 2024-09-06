


function onboardStudent() {

    var today = new Date();
    var randomId = Math.floor(Math.random() * 1000);
    var surname = document.getElementById('surname').value;
    var firstname = document.getElementById('firstname').value;
    var dob = document.getElementById('dob').value;
    var lcda = document.getElementById('lcda').value;
    var gender = document.getElementById('gender').value;
    var address = document.getElementById('address').value;
    var course = document.getElementById('course').value;
    var phone = document.getElementById('mobile').value;

    

    const ref = firebase.storage().ref();
    const file = document.getElementById('photo').files[0];
    const kname = +new Date() + "-" + file.name;
    const metadata = {
        contentType: file.type
    };

    const task = ref.child(kname).put(file, metadata);task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        console.log(url);

        db.collection("newstudents").add({
        id: randomId,
        surName: surname,
        firstName: firstname,
        dob: dob,
        lcda: lcda,
        gender: gender,
        address: address,
        course: course,
        phone: phone,
        imageUrl: url,
        created_at: today.getFullYear() + "-" + (today.getMonth() +1) + "-" + today.getDate()
    })

    swal({
        title: "Student Onboarding",
        text: "Onboarding Successful",
        icon: "success",
        button: "Proceed to Admin"
    }).then(function () {
        window.location.reload();
    }).catch(error => {
        swal({
            title: "Student Onboarding",
            text: error.message,
            icon: "error",
            button: "Try Again"
        }).then(function () {
            window.location.reload();
            return false
        })
    })
     
   }).catch(console.error);
}




