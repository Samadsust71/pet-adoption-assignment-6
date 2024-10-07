const loadAllCategory = async () => {
  const reponse = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await reponse.json();
  displayAllCategory(data.categories);
};

const loadAllPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();

  document.getElementById("loading-container").style.display = "block";
  document.getElementById("card-container").classList.add("hidden");
  setTimeout(() => {
    displayAllPost(data.pets);
  }, 2000);
};

const displayAllCategory = (categories) => {
  const categoryBtnContainer = document.getElementById(
    "catagory-btn-container"
  );
  categories.forEach((category) => {
    const categoryBtn = document.createElement("div");
    categoryBtn.innerHTML = `
        <button id="btn-${category?.category}" onclick="categoryHandler('${category?.category}')" class="category-btn border w-40 flex items-center justify-center gap-4 p-3 rounded-2xl hover:bg-activeBtn">
                  <div><img src=${category?.category_icon} alt="" class=" h-10 w-10 object-cover"></div>
                  <p class="font-bold text-primary text-xl">${category?.category}</p>
                </button>
        `;
    categoryBtnContainer.append(categoryBtn);
  });
};

const displayAllPost = (posts) => {
  document.getElementById("loading-container").style.display = "none";
  document.getElementById("card-container").classList.remove("hidden");
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  if (posts.length === 0) {
    cardContainer.innerHTML = `
        <div class="text-center space-y-7 col-span-3 flex flex-col justify-center items-center bg-slate-100 py-10 rounded-lg">
            <div><img src="assests/error.webp" alt=""></div>
            <h1 class="text-2xl text-black font-extrabold">No Information Available</h1>
            <p class="w-[70%]">Currently, we don't have any birds available for adoption. Please check back soon for updates on our feathered friends!</p>
       </div>
        `;
  }
  posts.forEach((post) => {
    const card = document.createElement("div");
    card.classList = "p-5 border rounded-lg space-y-3 h-[420px]";
    card.innerHTML = `
            <div><img src=${
              post?.image
            } class="h-40 object-cover rounded-lg w-full" alt='picture of ${
      post?.category
    }'></div>
            <div class="space-y-3">
                <h1 class="text-xl font-bold text-black ">${
                  post?.pet_name ? post.pet_name : "Not available"
                }</h1>
                <div class="text-secondary text-sm">
                    <p>
                       <i class="fa-solid fa-dna"></i> Breed: ${post?.breed ? post.breed : "Not available"}
                    </p>
                    <p>
                       <i class="fa-solid fa-cake-candles"></i> Birth: ${
                          post?.date_of_birth
                            ? post.date_of_birth
                            : "Not available"
                        }
                    </p>
                    <p>
                       <i class="fa-solid fa-venus"></i> Gender: ${post?.gender ? post.gender : "Not available"}
                    </p>
                    <p>
                      <i class="fa-solid fa-dollar-sign"></i> Price : ${
                          post?.price ? post.price + "$" : "Not available"
                        }
                    </p>
                </div>
                <div class="flex items-center gap-3">
                    <button onclick="addToCart('${
                      post?.image
                    }')" class="btn bg-white border border-button text-button"><i class="fa-regular fa-thumbs-up"></i></button>
                    <button id="btn-${post.petId}" onclick="adoptionHandler('${
      post.petId
    }')" class="btn bg-white border border-button text-button">Adopt</button>
                    <button onclick="modalHandler('${
                      post?.petId
                    }')" class="btn bg-white border-button border text-button">Details</button>
                </div>
            </div>                
   `;
    cardContainer.append(card);
  });

  posts.sort((a, b) => b.price - a.price);
  document.getElementById("sort-by-price").addEventListener("click", () => {
    displayAllPost(posts);
  });
};

const categoryHandler = async (categoryName) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await response.json();
  document.getElementById("loading-container").style.display = "block";
  document.getElementById("card-container").classList.add("hidden");

  removeActive();
  document.getElementById(`btn-${categoryName}`).classList.add("bg-activeBtn");
  document
    .getElementById(`btn-${categoryName}`)
    .classList.add("rounded-[32px]");

  setTimeout(() => {
    displayAllPost(data.data);
  }, 2000);
};

const adoptionHandler = (id) => {
  const countdownText = document.getElementById("countdownText");
  let countdown = 2;
  const adoptButton = document.getElementById(`btn-${id}`);
  document.getElementById("adoptModal").showModal();
  const interval = setInterval(() => {
    if (countdown > 0) {
      countdownText.textContent = `${countdown}`;
      countdown--;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        document.getElementById("hideModal").click();
        adoptButton.innerText = "Adopted";
        adoptButton.disabled = true;
      }, 0);
    }
  }, 1000);
  countdownText.innerText = 3;
};

const removeActive = () => {
  const activeBtns = document.getElementsByClassName("category-btn");
  for (const btn of activeBtns) {
    btn.classList.remove("bg-activeBtn");
    btn.classList.remove("rounded-[32px]");
  }
};

const addToCart = (imageLink) => {
  const petImgContainer = document.getElementById("pet-image-conatiner");
  petImgContainer.classList.add("border");
  const petImage = document.createElement("div");
  petImage.innerHTML = `
        <img src="${imageLink}" class="h-32 object-cover rounded-lg w-full" alt="">
     `;
  petImgContainer.append(petImage);
};

const modalHandler = async (petId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await response.json();
  document.getElementById("modal-btn").click();
  displayDetails(data.petData);
};

const displayDetails = (petsdetails) => {
  const {
    breed,
    category,
    date_of_birth,
    price,
    image,
    gender,
    pet_details,
    vaccinated_status,
    pet_name,
  } = petsdetails;
  const card = document.getElementById("modal-details-container");
  card.classList = "p-5 border rounded-lg space-y-3";
  card.innerHTML = `
            <div><img src=${image} class="h-full object-cover rounded-lg w-full" alt='picture of ${category}'></div>
            <div class="space-y-3">
                <h1 class="text-xl font-bold text-black">${
                  pet_name ? pet_name : "Not available"
                }</h1>
                <div class ="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-secondary">
                    <p>
                       <i class="fa-solid fa-dna"></i> Breed: ${breed ? breed : "Not available"}
                    </p>
                    <p>
                       <i class="fa-solid fa-cake-candles"></i> Birth: ${
                          date_of_birth ? date_of_birth : "Not available"
                        }
                    </p>
                    <p>
                       <i class="fa-solid fa-venus"></i> Gender: ${gender ? gender : "Not available"}
                    </p>
                    <p>
                       <i class="fa-solid fa-dollar-sign"></i> Price : ${price ? price + "$" : "Not available"}
                    </p>
                    <p>
                       <i class="fa-solid fa-syringe"></i> Vaccinated status: ${
                          vaccinated_status
                            ? vaccinated_status
                            : "Not available"
                        }
                    </p>
                </div>
                <hr>
                <div class="">
                     <h1 class="text-xl font-bold text-black">Details Information</h1>
                    <p>
                    ${pet_details}
                    </p>
                </div>
            </div>                
   `;
};

loadAllPost();
loadAllCategory();
