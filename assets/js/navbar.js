function toggleNavbar() {
    var navbarCenter = document.getElementById("navbar-center");
    if (navbarCenter.style.display === "flex") {
        navbarCenter.style.display = "none";
    } else {
        navbarCenter.style.display = "flex";
    }
}
