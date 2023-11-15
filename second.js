window.addEventListener('load', fetchApi("india"));
async function fetchApi(get) {
    const api = await fetch(`
    https://newsapi.org/v2/everything?q=${get}&apiKey=b5a9bc6709b24d3da1feb837b18e4790`);
    const store = await api.json();
    console.log(store);
    GetData(store.articles);
}

function GetData(get) {
    const CardContainer = document.querySelector(".card-container");
    const Templates = document.querySelector("#template-news-card");

    CardContainer.innerHTML = "";
    get.forEach(element => {
        if (!element.urlToImage) return;
        const CloneTemplates = Templates.content.cloneNode(true);
        FillInfo(CloneTemplates, element);
        CardContainer.appendChild(CloneTemplates);
    });
};

function FillInfo(CloneTemplates, element) {
    CloneTemplates.querySelector("#news-img").src = element.urlToImage;
    CloneTemplates.querySelector("#news-title").innerHTML = element.title;
    CloneTemplates.querySelector(".news-desc").innerHTML = element.description;

    const date = new Date(element.publishedAt).toLocaleString('en-US', { timeZone: "Asia/Jakarta" })

    CloneTemplates.querySelector(".news-source").innerHTML = `${element.source.name} - ${date}`;

    CloneTemplates.firstElementChild.addEventListener('click', () => {
        window.open(element.url, "_blank")
    })
}

let currentOn = null;
function onNavItemClick(get) {
    fetchApi(get)
    const selected = document.getElementById(get)
    currentOn?.classList.remove("active")
    currentOn = selected
    currentOn.classList.add("active")
}

function reload() {
    window.location.reload()
}

document.querySelector("#search-bar-button").addEventListener('click', () => {
    const search = document.querySelector("#search-bar-input").value;
    if (!search) return;
    fetchApi(search);
    currentOn?.classList.remove("active");
    currentOn = null;

})