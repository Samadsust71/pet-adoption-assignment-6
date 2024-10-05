const loadAllCategory = async () => {
  const reponse = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await reponse.json();
  displayAllCategory(data.categories);
};
const loadAllPost = async()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    displayAllPost(data.pets);
}

const displayAllCategory = (categories)=>{
    const categoryBtnContainer = document.getElementById('catagory-btn-container');
    categories.forEach(category => {
        const categoryBtn = document.createElement('div');
        categoryBtn.innerHTML = `
        <button onclick="categoryHandler('${category?.category}')" class="bg-white border flex items-center justify-center gap-4 p-3 rounded-2xl hover:bg-activeBtn">
                  <div><img src=${category?.category_icon} alt="" class=" h-10 w-10 object-cover"></div>
                  <p class="font-bold text-primary text-xl">${category?.category}</p>
                </button>
        `;
        categoryBtnContainer.append(categoryBtn)
    });
};
/*
{
    "petId": 1,
    "breed": "Golden Retriever",
    "category": "Dog",
    "date_of_birth": "2023-01-15",
    "price": 1200,
    "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
    "gender": "Male",
    "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
    "vaccinated_status": "Fully",
    "pet_name": "Sunny"
  }
    */
const displayAllPost =(posts)=>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML='';
    if (posts.length===0) {
        cardContainer.innerHTML = `
        <div class="text-center space-y-7 col-span-3 flex flex-col justify-center items-center bg-slate-100 py-10 rounded-lg">
            <div><img src="assests/error.webp" alt=""></div>
            <h1 class="text-2xl text-black font-extrabold">No Information Available</h1>
            <p class="w-[70%]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
              its layout. The point of using Lorem Ipsum is that it has a.</p>
       </div>
        
        
        `
    }
  posts.forEach(post => {
   const card = document.createElement('div');
   card.classList="p-5 border rounded-lg space-y-3";
   card.innerHTML=`
            <div><img src=${post?.image} class="h-40 object-cover rounded-lg" alt='picture of ${post?.category}'></div>
            <div class="space-y-3">
                <h1 class="text-xl font-bold text-black ">${post?.pet_name?post.pet_name:"not available"}</h1>
                <div>
                    <p>
                        Breed: ${post?.breed?post.breed:"not available"}
                    </p>
                    <p>
                        Birth: ${post?.date_of_birth?post.date_of_birth:"not available"}
                    </p>
                    <p>
                        Gender: ${post?.gender?post.gender:"not available"}
                    </p>
                    <p>
                        Price : ${post?.price?post.price:"not available"}$
                    </p>
                </div>
                <div class="flex items-center gap-3">
                    <button onclick="addToCart()" class="btn bg-white border text-button">like</button>
                    <button onclick="adoptionHandler()" class="btn bg-white border text-button">Adopt</button>
                    <button onclick="modalHandler()" class="btn bg-white border text-button">Details</button>
                </div>
            </div>                
   `;
   cardContainer.append(card)

  });
}
const categoryHandler = async(categoryName)=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
    const data = await response.json()
    displayAllPost(data.data)
}



loadAllPost()
loadAllCategory()