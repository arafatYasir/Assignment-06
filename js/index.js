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
        categoryContainer.appendChild(btn);
    }
}
