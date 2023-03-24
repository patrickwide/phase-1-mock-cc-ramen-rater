// write your code here
document.addEventListener("DOMContentLoaded", () => {
  const ramenMenu = document.querySelector("#ramen-menu");
  const ramenDetail = document.querySelector("#ramen-detail");
  const newRamenForm = document.querySelector("#new-ramen");

  // Function to display all the ramen images in the #ramen-menu div
  const displayRamen = (ramenData) => {
    ramenMenu.innerHTML = "";
    ramenData.forEach((ramen) => {
      const ramenImage = document.createElement("img");
      ramenImage.src = ramen.image;
      ramenImage.alt = ramen.name;
      ramenImage.addEventListener("click", () => {
        displayRamenDetail(ramen);
      });
      ramenMenu.appendChild(ramenImage);
    });
  };

  // Function to display the details of a specific ramen in the #ramen-detail div
  const displayRamenDetail = (ramen) => {
    ramenDetail.querySelector("#ramen-name").textContent = ramen.name;
    ramenDetail.querySelector("#ramen-image").src = ramen.image;

    ramenDetail.querySelector(
      "#ramen-restaurant"
    ).textContent = `Restaurant: ${ramen.restaurant}`;

    document.querySelector("#rating-display").textContent = `${ramen.rating}`;
    document.querySelector("#comment-display").textContent = `${ramen.comment}`;
  };

  // Event listener to submit the new-ramen form and add the new ramen to the #ramen-menu div
  newRamenForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newRamen = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: event.target.rating.value,
    };
    const newRamenImage = document.createElement("img");
    newRamenImage.src = newRamen.image;
    newRamenImage.alt = newRamen.name;
    newRamenImage.addEventListener("click", () => {
      displayRamenDetail(newRamen);
    });
    ramenMenu.appendChild(newRamenImage);
    newRamenForm.reset();
  });

  // Fetch the ramen data from the server and display all the ramen images in the #ramen-menu div
  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramenData) => {
      displayRamen(ramenData);
    })
    .catch((error) => {
      console.log("Error fetching ramen data:", error);
    });
});
