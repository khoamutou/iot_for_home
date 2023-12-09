// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzmd-h7msunZNe-mcv0vGtiMf8tnKNu7c",
  authDomain: "esp32-51b05.firebaseapp.com",
  databaseURL: "https://esp32-51b05-default-rtdb.firebaseio.com",
  projectId: "esp32-51b05",
  storageBucket: "esp32-51b05.appspot.com",
  messagingSenderId: "965637474056",
  appId: "1:965637474056:web:77e83434356b732685cebd",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function writeUserData(UserID, a) {
  firebase
    .database()
    .ref("/Do_An_1/" + UserID)
    .update({
      // BULB_01: a
      STATUS: a,
    });
}

var checkBox = document.getElementById("checkmode");

function CheckMODE() {
  // Get the checkbox
  checkBox = document.getElementById("checkmode");

  if (checkBox.checked == true) {
    checkBoxFan.disabled = true;
    checkboxLamp.disabled = true;
  } else {
    checkBoxFan.disabled = false;
    checkboxLamp.disabled = false;
  }

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true) {
    document.getElementById("mode").innerHTML = "ON";
    writeUserData("AUTO_MODE", 1);
  } else if (checkBox.checked == false) {
    document.getElementById("mode").innerHTML = "OFF";
    writeUserData("AUTO_MODE", 0);
  }
}

var checkBoxFan = document.getElementById("checkfan");

function CheckFan() {
  // Disable the checkbox if checkBox is checked

  // Get the checkbox
  checkBoxFan = document.getElementById("checkfan");
  // If the checkbox is checked, display the output text

  if (checkBoxFan.checked == true) {
    document.getElementById("fan_img").src = "./img/fan.png";
    fan_img.style.opacity = 1.0;
    writeUserData("QUAT", 1);
  } else if (checkBoxFan.checked == false) {
    document.getElementById("fan_img").src = "./img/fan.png";
    fan_img.style.opacity = 0.4;
    writeUserData("QUAT", 0);
  }
}

var checkboxLamp = document.getElementById("checkLamp");

function CheckLAMP() {
  // Get the checkbox
  checkboxLamp = document.getElementById("checkLamp");

  // If the checkbox is checked, display the output text


  if (checkboxLamp.checked == true) {
    document.getElementById("lamp_img").src = "./img/lamp.png";
    lamp_img.style.opacity = 1.0;
    writeUserData("DEN", 1);
  } else if (checkboxLamp.checked == false) {
    document.getElementById("lamp_img").src = "./img/lamp.png";
    lamp_img.style.opacity = 0.2;
    writeUserData("DEN", 0);
  }
}

// Lấy dữ liệu từ Firebase Realtime Database và cập nhật checkbox tương ứng
var database = firebase.database();
var ref = database.ref("/Do_An_1/DEN/STATUS");
var refFAN = database.ref("/Do_An_1/QUAT/STATUS");
var refMODE = database.ref("/Do_An_1/AUTO_MODE/STATUS");

ref.on(
  "value",
  function (snapshot) {
    var status = snapshot.val();
    var checkbox = document.getElementById("checkLamp");
    if (status === 1) {
      checkbox.checked = true;
      CheckLAMP();
    } else {
      checkbox.checked = false;
      CheckLAMP();
    }
  },
  function (error) {
    console.error(error);
  }
);

//

refFAN.on(
  "value",
  function (snapshot) {
    var statusFAN = snapshot.val();
    var checkboxFAN = document.getElementById("checkfan");
    if (statusFAN === 1) {
      checkboxFAN.checked = true;
      CheckFan();
    } else {
      checkboxFAN.checked = false;
      CheckFan();
    }
  },
  function (error) {
    console.error(error);
  }
);

// Update MODE from Firebase


refMODE.on(
  "value",
  function (snapshot) {
    var statusMODE = snapshot.val();
    var checkboxMODE = document.getElementById("checkmode");
    if (statusMODE === 1) {
      checkboxMODE.checked = true;
      CheckMODE();
    } else {
      checkboxMODE.checked = false;
      CheckMODE();
    }
  },
  function (error) {
    console.error(error);
  }
);
