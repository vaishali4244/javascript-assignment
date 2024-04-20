document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Fetch data from the API using async/await
    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"
    );
    const data = await response.json();

    displayData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  function displayData(data) {
    const productContainer = document.getElementById("product-container");

    const product = data.product;
    document.getElementById("vendor").textContent = product.vendor;
    document.getElementById("title").textContent = product.title;

    const productDescription = document.getElementById("description");
    productDescription.textContent = product.description;

    const slicedDescription = product.description.slice(25, -4);

    // Setting the sliced description back to the element
    productDescription.textContent = slicedDescription;

    const productImage = document.getElementsByClassName("main-img");
    productImage.src = product.images;
    productImage.alt = product.name;

    let FPrice = parseInt(product.price.replace("$", ""));
    let CPrice = parseInt(product.compare_at_price.replace("$", ""));
    console.log("cprice", CPrice);
    let comparePrice = (document.getElementById("comparePrice").textContent =
      "$" + CPrice.toFixed(2));

    let productPrice = (document.getElementById("price").textContent =
      "$" + FPrice.toFixed(2));
    let discountPercentage = ((CPrice - FPrice) / CPrice) * 100;

    const discountPrice = document.getElementById("discount");
    discountPrice.textContent = discountPercentage.toFixed(0) + "% Off";
  }
});

//inputs for the final cart message
let selectedColor = "";
let selectedSize = "";

const colorButtons = document.querySelectorAll(".color-btn");

colorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Update the selectedColor variable with the alt value of the clicked button's image
    selectedColor = this.querySelector("img").alt;
    updateColorImages();
  });
});

// Function to update the display of images based on the selected color
function updateColorImages() {

  colorButtons.forEach((btn) => {
    btn.querySelector("img").style.display = "none";
  });
  
  const selectedButton = document.querySelector(
    `.color-btn img[alt="${selectedColor}"]`
  );
  selectedButton.style.display = "inline-block";
}


const sizeButtons = document.querySelectorAll('.size-btn input[type="radio"]');


sizeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    
    selectedSize = this.id;
  });
});


const cartButton = document.querySelector(".cart-btn");

cartButton.addEventListener("click", function () {
  updateFinalMessage();
});

// Function to update the final message
function updateFinalMessage() {
  const finalMsg = document.getElementById("final-msg");
  finalMsg.style.display = "inline-block";
  finalMsg.textContent = `Embrace Sideboard with Color ${selectedColor} and Size ${selectedSize} added to cart `;
}


let count = 1;

const reduceButton = document.querySelector(".reduce");

// Add event listener to the reduce button
reduceButton.addEventListener("click", function () {
  if (count > 1) {
    count--;
    updateCountDisplay();
  }
});


const addButton = document.querySelector(".add");

// Add event listener to the add button
addButton.addEventListener("click", function () {
  count++;
  updateCountDisplay();
});

// Function to update the count display
function updateCountDisplay() {
  const countDisplay = document.querySelector(".count");
  countDisplay.textContent = count;
}
