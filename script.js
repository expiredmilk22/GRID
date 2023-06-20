// Variables to keep track of grid properties
let gridSize = 101; // Number of tiles per row and column
let tileWidth = 100; // Width of each tile in pixels
let gridContainer = document.getElementById("grid");
let gridHeight = Math.ceil(gridSize / Math.floor(window.innerWidth / tileWidth)) * tileWidth;

// Load images from localStorage on page initialization
window.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let image = document.getElementById(`image-${i}-${j}`);
      let imageUrl = localStorage.getItem(`image-${i}-${j}`);

      if (imageUrl) {
        image.src = imageUrl;
      }
    }
  }
});

// Set the dimensions of the grid container
gridContainer.style.width = `${gridSize * tileWidth}px`;
gridContainer.style.height = `${gridHeight}px`; // Set the height based on the number of tiles

// Create the grid
for (let i = 0; i < gridSize; i++) {
  for (let j = 0; j < gridSize; j++) {
    createTile(i, j);
  }
}

// Add event listener for image uploading
gridContainer.addEventListener("click", handleImageUpload);

// Function to handle image uploading
function handleImageUpload(event) {
  let target = event.target;

  // Check if the clicked element is an image or tile
  if (target.tagName === "IMG" && target.classList.contains("image")) {
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    // Handle file selection
    fileInput.addEventListener("change", function (event) {
      let file = event.target.files[0];

      // Read the selected file
      let reader = new FileReader();
      reader.onload = function (e) {
        target.src = e.target.result;
        // Save the image URL in localStorage
        localStorage.setItem(target.id, e.target.result);
      };
      reader.readAsDataURL(file);
    });

    // Trigger the file input dialog
    fileInput.click();
    // Prevent the default click behavior to open a new tab
    event.preventDefault();
  }
}





gridContainer.addEventListener("click", handleImageUpload, true);


gridContainer.addEventListener("click", handleImageUpload, true);


gridContainer.addEventListener("click", handleImageUpload);


gridContainer.addEventListener("click", handleImageUpload);




// Function to create a new tile
function createTile(x, y) {
  if (x === 100 && y >= 97) {
    return; // Skip creating tiles with IDs from 100-97 to 100-100
  }

  let tile = document.createElement("div");
  tile.className = "tile";
  tile.style.width = tileWidth + "px";
  tile.style.height = tileWidth + "px";
  tile.id = `tile-${x}-${y}`;

  // Create the image element
  let image = document.createElement("img");
  image.className = "image";
  image.src = localStorage.getItem(`image-${tile.id}`) || ""; // Retrieve the image URL from local storage
  image.id = `image-${tile.id}`;

  // Add event listeners for image uploading and click to view full size
  image.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the click event from bubbling up

    if (this.src !== "") {
      // Display the image in a modal or perform any other desired action
      // Instead of opening in a new tab
      console.log("Image clicked:", this.src);
    }
  });

  tile.appendChild(image);
  gridContainer.appendChild(tile);
}

// Clear all images button
let clearImagesButton = document.getElementById("clear-images-button");
clearImagesButton.addEventListener("click", function () {
  localStorage.clear(); // Clear all items in localStorage

  // Reset all image sources to empty strings
  let images = document.querySelectorAll(".image");
  images.forEach(function (image) {
    image.src = "";
  });
});

// Export as PNG button
let exportButton = document.getElementById("export-button");
exportButton.addEventListener("click", function () {
    exportGridAsPNG();
});

// Function to export the grid as a PNG image
function exportGridAsPNG() {
  const whiteBar = document.querySelector('.white-bar');
  if (whiteBar) {
    whiteBar.style.display = 'none'; // Hide the white bar
  }

  // Create a new CSS rule for transparent tiles
  const style = document.createElement('style');
  style.innerHTML = '.tile.empty { background-color: transparent; }';
  document.head.appendChild(style);

  // Add "empty" class to tiles without images
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(function (tile) {
    const image = tile.querySelector('.image');
    if (!image.src) {
      tile.classList.add('empty');
    }
  });

  // Capture the grid container using html2canvas
  html2canvas(gridContainer).then(function (canvas) {
    // Convert the canvas to a data URL representing a PNG image
    const dataURL = canvas.toDataURL('image/png');

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'grid.png';
    link.click();

    // Remove the CSS rule and "empty" class
    document.head.removeChild(style);
    tiles.forEach(function (tile) {
      tile.classList.remove('empty');
    });

    if (whiteBar) {
      whiteBar.style.display = ''; // Restore the display of the white bar
    }
  });
}
