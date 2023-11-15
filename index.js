const API_Key = "b5a9bc6709b24d3da1feb837b18e4790"
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => NewsFetch("India"));

function reload() {
    window.location.reload();
}

async function NewsFetch(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_Key}`);
    const data = await res.json();
    console.log(data);
    BindData(data.articles)
}

function BindData(articles) {
    const cardcontainer = document.querySelector(".card-container");
    const newsCardTemplate = document.querySelector("#template-news-card");

    cardcontainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        FillData(cardClone, article)
        cardcontainer.appendChild(cardClone);
    });
}

function FillData(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector(".news-source");
    const newsDesc = cardClone.querySelector(".news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });

    newsSource.innerHTML = `${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank")
    })
}

let CurrSelectedNav = null;
function onNavItemClick(id) {
    NewsFetch(id);
    const NavItem = document.getElementById(id);
    CurrSelectedNav?.classList.remove('active');
    CurrSelectedNav = NavItem;
    CurrSelectedNav.classList.add('active');
}

const SearchInput = document.querySelector("#search-bar-input");
const SearchButton = document.querySelector("#search-bar-button");

SearchButton.addEventListener('click', () => {
    const query = SearchInput.value;
    if (!query) return;
    NewsFetch(query);
    CurrSelectedNav?.classList.remove("active");
    CurrSelectedNav = null;
})