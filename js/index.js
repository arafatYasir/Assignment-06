// loading categories
const loadCategories = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    let data = await res.json();
    data = data.data;
    // for(category of data) {
    //     console.log(category.category);
    // }

    showCategoryBtn(data);
}
// calling the function
loadCategories();

function showCategoryBtn(data) {
    const categoryContainer = document.getElementById("categories-container");
    for (categories of data) {
        const btn = document.createElement("button");
        btn.innerText = `${categories.category}`;
        btn.classList = "text-lg px-5 py-1 text-black bg-[#2525252d] rounded mr-5";
        btn.setAttribute("id", `${categories.category}`);
        btn.setAttribute("onclick", `loadContent(${categories.category_id})`);
        categoryContainer.appendChild(btn);
    }
    loadContent();
}
// by default category will be "All"
const loadContent = async (Id = 1000) => {
    // getting the data using api
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${Id}`);
    let data = await res.json();

    // reseting webpage
    const videosContainer = document.getElementById("videos-container");
    videosContainer.innerHTML = "";
    videosContainer.classList = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center";

    // check if there is any data
    if (data.status == true) {
        data = data.data; // getting the data array
        let i = 1;

        for (content of data) {
            // calculating the upload time
            const time = content.others.posted_date;
            // if not verified
            if (content.authors[0].verified == false) {
                const div = document.createElement("div");
                div.innerHTML = `
                    <!-- thumbnail -->
                    <div class="relative">
                        <img class="rounded-lg h-52 w-80" src="${content.thumbnail}" alt="">
                        <p class="absolute right-1 bottom-3 bg-[#171717] text-white">${calculateTime(time)}</p>
                    </div>
                    <!-- informations -->
                    <div class="mt-5 flex gap-3">
                        <!-- profile picture -->
                        <div>
                            <img class="w-10 h-10 rounded-full" src="${content.authors[0].profile_picture}" alt="profile-picture">
                        </div>
                        <!-- personal information -->
                        <div>
                            <p class="font-bold mb-2">${content.title}</p>
                            <p class="text-sm mb-2">${content.authors[0].profile_name} <span><img src="" alt=""></span></p>
                            <p>${content.others.views}</p>
                        </div>
                    </div>
                `
                // div.classList = "w-80";
                videosContainer.appendChild(div);
                i++;
            }
            else {
                const div = document.createElement("div");
                div.innerHTML = `
                    <!-- thumbnail -->
                    <div class="relative">
                        <img class="rounded-lg h-52 w-80" src="${content.thumbnail}" alt="">
                        <p class="absolute right-1 bottom-3 bg-[#171717] text-white">${calculateTime(time)}</p>
                    </div>
                    <!-- informations -->
                    <div class="mt-5 flex gap-3">
                        <!-- profile picture -->
                        <div>
                            <img class="w-10 h-10 rounded-full" src="${content.authors[0].profile_picture}" alt="profile-picture">
                        </div>
                        <!-- personal information -->
                        <div>
                            <p class="font-bold mb-2">${content.title}</p>
                            <p class="text-sm mb-2 flex gap-2">${content.authors[0].profile_name} <span><img class="w-5 h-5" src="images/verify.png" alt=""></span></p>
                            <p>${content.others.views}</p>
                        </div>
                    </div>
                `
                // div.classList = "w-80";
                videosContainer.appendChild(div);
                i++;
            }
        }
    }
    else {
        const div = document.createElement("div");
        div.innerHTML = `
            <img class="w-36 h-36" src="images/Icon.png" alt="Not available">
            <h2 class="font-bold text-3xl text-center">Oops!! Sorry, There is no <br> content here</h2>
        `;
        div.classList = "flex flex-col items-center"
        videosContainer.classList = "flex justify-center items-center";
        videosContainer.appendChild(div);
    }
}
// calculating time
function calculateTime(time) {
    if (time == "") {
        return time;
    }

    let fullTime = time / 3600; // full time in decimal
    let seconds = fullTime - Math.floor(fullTime); // extra seconds
    let hours = Math.floor(fullTime); // hours
    let minutes = seconds * 60; // extra seconds converted to minutes
    minutes = minutes.toFixed(0);
    const Time = `${hours}hrs ${minutes}min Ago`; // combining them together
    return Time;
}