function loadCategories(category) {
    // fetch data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        // convert promise to json
        .then(res => res.json())
        // send data to displayCategories
        .then(data => displayCategories(data.categories))
    .catch(error=>console.error("error fetching categories", error)
    )
}
const displayCategories = (categories) => {
    // get the container
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";
    // loop operation arr of obj
    for (let cat of categories) {
        console.log(cat);
        // create element
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;

        // append the element

        categoryContainer.append(categoryDiv)
    }

}


loadCategories()