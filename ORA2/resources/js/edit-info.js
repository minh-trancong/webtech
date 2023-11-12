function setDefaultValues() {
    let data = JSON.parse(localStorage.getItem('profileInfo'));
    TTSV = data;

    if (data) {
        let elements = document.querySelectorAll('#ProfileForm [profileAttr]');

        for (let element of elements) {
            if (data[element.getAttribute('profileAttr')]) {
                if (element.tagName === 'SELECT') {
                    element.options[0].text = data[element.getAttribute('profileAttr')];
                } else if (element.type === 'radio') {
                    if (element.value === data[element.getAttribute('profileAttr')]) {
                        element.checked = true;
                    }
                } else {
                    element.placeholder = data[element.getAttribute('profileAttr')];
                    element.value = data[element.getAttribute('profileAttr')];
                }
            }
        }
    }

    var genderRadios = document.getElementsByName('gender');
    for (var i = 0, length = genderRadios.length; i < length; i++) {
        if (genderRadios[i].value == data.gender) {
            genderRadios[i].checked = true;
            break;
        }
    }

    var studyStatusRadios = document.getElementsByName('studyStatus');
    for (var i = 0, length = studyStatusRadios.length; i < length; i++) {
        if (studyStatusRadios[i].value == data.studyStatus) {
            studyStatusRadios[i].checked = true;
            break;
        }
    }

    document.getElementById('ctl00_ctl00_contentPane_MainPanel_MainContent_UserImageCPanel_imgUserImage').src = TTSV.imageUrl;
    console.log("TTSV", TTSV);
}   

window.onload = function() {
    console.log("TTSV", TTSV);
    setDefaultValues();
}
    

function saveData() {
    let elements = document.querySelectorAll('#ProfileForm [profileAttr]');

    for (let e of elements) {
        if (e.getAttribute('profileAttr') === 'imageUrl') {
            TTSV[e.getAttribute('profileAttr')] = e.src;
        } else if (e.type === 'radio') {
            if (e.checked) {
                TTSV[e.getAttribute('profileAttr')] = e.value;
            }
        } else if (e.value !== '') {
            TTSV[e.getAttribute('profileAttr')] = e.value;
        }
    }

    localStorage.setItem('profileInfo', JSON.stringify(TTSV));
    console.log("TTSV", TTSV);
    alert('Thay đổi thông tin thành công!');
}

document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('https://minhtc.id.vn/api/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const imageUrl = data.fileUrl;
            document.getElementById('ctl00_ctl00_contentPane_MainPanel_MainContent_UserImageCPanel_imgUserImage').src = imageUrl;
            TTSV.imageUrl = imageUrl;
        } else {
            console.log('File upload failed: ' + data.message);
        }
    })
    .catch(error => {
        console.log('Network error: ' + error);
    });
});


function resetValues() {
    let data = {
        studentId: "20200413",
        fullName: "Trần Công Minh",
        yearOfAdmission: 2020,
        educationLevel: "KSCLC-TN-TT-VN-ICT",
        program: "Công nghệ thông tin Việt-Pháp 2020",
        managingDepartment: "Trường Công nghệ Thông tin và Truyền thông",
        studyStatus: "Học",
        gender: "Nam",
        class: "Việt Pháp 01-K65",
        course: "65",
        email: "minh.tc200413@sis.hust.edu.vn",
        imageUrl: "resources/img/profile.jpg"
    };

    if (data) {
        let elements = document.querySelectorAll('#ProfileForm [profileAttr]');

        for (let element of elements) {
            if (data[element.getAttribute('profileAttr')]) {
                if (element.tagName === 'SELECT') {
                    element.options[0].text = data[element.getAttribute('profileAttr')];
                } else if (element.type === 'radio') {
                    if (element.value === data[element.getAttribute('profileAttr')]) {
                        element.checked = true;
                    }
                } else {
                    element.placeholder = data[element.getAttribute('profileAttr')];
                    element.value = data[element.getAttribute('profileAttr')];
                }
            }
        }
    }

    var genderRadios = document.getElementsByName('gender');
    for (var i = 0, length = genderRadios.length; i < length; i++) {
        if (genderRadios[i].value == data.gender) {
            genderRadios[i].checked = true;
            break;
        }
    }

    var studyStatusRadios = document.getElementsByName('studyStatus');
    for (var i = 0, length = studyStatusRadios.length; i < length; i++) {
        if (studyStatusRadios[i].value == data.studyStatus) {
            studyStatusRadios[i].checked = true;
            break;
        }
    }

    document.getElementById('ctl00_ctl00_contentPane_MainPanel_MainContent_UserImageCPanel_imgUserImage').src = TTSV.imageUrl;
    console.log("TTSV", data);
}   