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

function showCategoryBtn(data)
{
    const categoryContainer = document.getElementById("categories-container");
    for(categories of data) {
        const btn = document.createElement("button");
        btn.innerText = `${categories.category}`;
        btn.classList = "text-lg px-5 py-1 text-black bg-[#2525252d] rounded mr-5";
        btn.setAttribute("id", `${categories.category}`);
        btn.setAttribute("onclick", `loadContent(${categories.category_id})`);
        categoryContainer.appendChild(btn);
    }
}
// by default category will be "All"
const loadContent = async (Id=1000) => {
    // getting the data using api
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${Id}`);
    let data = await res.json();

    // reseting webpage
    const videosContainer = document.getElementById("videos-container");
    videosContainer.innerHTML = "";
    
    // check if there is any data
    if(data.status == true) {
        data = data.data; // getting the data array

        for(content of data) {
            const div = document.createElement("div");
            div.innerHTML = `
                <!-- thumbnail -->
                <div><img class="rounded-lg" src="${content.thumbnail}" alt=""></div>
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
            div.classList = "w-80 h-80";
            videosContainer.appendChild(div);
        }
    }
    else {

    }
}