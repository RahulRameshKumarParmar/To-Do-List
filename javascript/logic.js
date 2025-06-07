import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// import { showTask, renderTask, deleteTaskById, submitSaveDetails, showSetting, deleteProject } from "./LocalStorage";

async function navbar() {
    const response = await fetch("navbar.html");
    const data = await response.text();
    document.getElementById("navbar-container").innerHTML = data;

    const menu_btn = document.querySelector(".menu-btn");
    const offCanvas = document.querySelector(".off-canvas");

    menu_btn.addEventListener("click", () => {
        offCanvas.classList.toggle("showCanvas");
    });

    const firebaseConfig = {
        apiKey: "AIzaSyA7TEpABRCBYkLChDY2Hr2Np9QrhMIYS7g",
        authDomain: "todoso-736e4.firebaseapp.com",
        projectId: "todoso-736e4",
        storageBucket: "todoso-736e4.appspot.com",
        messagingSenderId: "454335264141",
        appId: "1:454335264141:web:25d6b459198b7a5bc739c4",
        measurementId: "G-L21K8HWX15"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const signInBtn = document.querySelector("#googleBtn");
    const logIn = document.querySelector(".log-in");
    const logOut = document.querySelector(".logOut");
    const signOutBtn = document.querySelectorAll("#signOutBtn, #offSignOutBtn");
    const offSignOut = document.querySelector(".off-signOut");
    const offLogin = document.querySelector("#offLoginLink");

    if (signInBtn) {
        signInBtn.onclick = () => {
            signInWithPopup(auth, provider)
                .then(() => window.location.href = "home.html")
                .catch((error) => alert("Error: " + error.message));
        };
    }

    if (signOutBtn) {
        signOutBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                signOut(auth)
                    .then(() => window.location.href = "log_in.html"
                    )
            })
        })
    }

    onAuthStateChanged(auth, (user) => {
        if (logIn && logOut) {
            if (user) {
                logIn.classList.remove("show-desktop");
                logOut.classList.add("show-desktop");
                offLogin.classList.add("hideLogIn");
                offSignOut.classList.remove("hideLogOut");

            }
            else {
                logIn.classList.add("show-desktop");
                logOut.classList.remove("show-desktop");
                offLogin.classList.remove("hideLogIn");
                offSignOut.classList.add("hideLogOut");

            }
        }
    });
}

navbar();

async function footer() {
    const response = await fetch("footer.html");
    const data = await response.text();
    const footerContainer = document.getElementById("footer-container");

    if (footerContainer) {
        footerContainer.innerHTML = data;
    }
    else {
        console.warn("No #footer-container found, skipping footer injection.");
    }
};

footer();