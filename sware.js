// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Close dropdown after clicking a project
        document.querySelector(".dropdown").classList.remove("active");
    });
});

// Function to scroll to a project when clicking an image
function scrollToProject(projectId) {
    document.getElementById(projectId).scrollIntoView({ behavior: "smooth" });
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown");
    const dropdownButton = document.querySelector(".dropbtn"); // Fix: Added Projects button
    const arrow = document.querySelector(".arrow");

    // Toggle dropdown on clicking "Projects" OR the arrow
    dropdownButton.addEventListener("click", function (event) {
        event.preventDefault();
        dropdown.classList.toggle("active");
    });

    arrow.addEventListener("click", function (event) {
        event.preventDefault();
        dropdown.classList.toggle("active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target) && !dropdownButton.contains(event.target)) {
            dropdown.classList.remove("active");
        }
    });
});
