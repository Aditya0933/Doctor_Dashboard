document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll('.sidebar ul li');
    const contentBoxes = document.querySelectorAll('.content-box');

    items.forEach(item => {
        item.addEventListener('click', () => {
            // Hide all content boxes
            contentBoxes.forEach(box => {
                box.classList.remove('active');
            });
            
            // Show the corresponding content box based on item class
            console.log(item);
            const className = item.classList[0]; // Get the class name of the clicked item
            const contentBox = document.querySelector(`.content-box.${className}`); // Select the corresponding content box
            contentBox.classList.add('active');
        });
    });
});
