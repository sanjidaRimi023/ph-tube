function loadCategories() {
  // fetch data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // convert promise to json
    .then(res => res.json())
    // send data to displayCategories
    .then(data => displayCategories(data.categories))
    .catch(error => console.error("error fetching categories", error)
    )
}

function displayCategories(categories) {
  // get the container
  const categoryContainer = document.getElementById("category-container");
  // loop operation arr of obj
  for (let cat of categories) {
    // console.log(cat);
    // create element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
    // append the element
    categoryContainer.append(categoryDiv)
  }
}

/*{
    "status": true,
    "message": "successfully fetched all the videos",
    "videos": [
      {
        "category_id": "1001",
        "video_id": "aaaa",
        "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
        "title": "Shape of You",
        "authors": [
          {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
          }
        ],
        "others": {
          "views": "100K",
          "posted_date": "16278"
        },
        "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
      },*/

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(response => response.json())
    .then((data) => displayVideos(data.videos));
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  if (videos.length === 0) {
    videoContainer.innerHTML = `
    <div class="col-span-full flex flex-col py-20 text-center items-center">
          <img src="assets/Icon.png" alt="">
          <h1 class="text-3xl font-bold ">Oops!!Sorry, There is no content here</h1>
        </div>`;
    return;
  }
  videos.forEach(video => {
    console.log(video);
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
          <figure class="relative">
              <img class="w-full h-[200px] object-cover"
              src="${video.thumbnail}"
              alt="images" />
              <span class="text-white text-sm rounded-lg bg-black p-1 absolute bottom-2 right-2">3hrs 56 min ago</span>
          </figure>
          <div class="flex gap-3 px-2 py-5">
              <div class="profile">
                <div class="avatar">
                  <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                    <img src="${video.authors[0].profile_picture}" />
                  </div>
                </div>
              </div>
              <div class="intro">
                <h2 class="text-sm font-semibold">Midnight Serenade</h2>
                <p class="text-sm text-gray-400 flex gap-2">${video.authors[0].profile_name} <img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></p>
                <p class="text-sm text-gray-400">${video.others.views} Views</p>
              </div>
          </div>
      </div>
        `;
    videoContainer.append(videoCard);

  });
}

const loadCategoryVideos = (id) => {
  const url = `
     https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  // console.log(url);
  fetch(url)
    .then(res => res.json())
    .then((data) => {
      const clickBtn = document.getElementById(`btn-${id}`);
      clickBtn.classList.add("active")
      console.log(clickBtn);

      displayVideos(data.category)
    });

};
loadCategories()
