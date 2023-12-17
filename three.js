window.addEventListener('load',fetchApi("india"));

async function fetchApi(query){
    const res = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=56c54ee9ab2d422a915bac4da3e83ea5`);
    const store =await res.json();
    BindData(store.articles);
}

function BindData(getArticles) {
    document.querySelector(".card-container").innerHTML = "";
    getArticles.forEach(article => {
        if (!article.urlToImage) return
        const cardClone = document.querySelector("#template-news-card").content.cloneNode(true);
        fillInfo(cardClone, article);
        document.querySelector(".card-container").appendChild(cardClone);
    });
}

function fillInfo(cardClone, article) {
    cardClone.querySelector("#news-img").src = article.urlToImage;
    cardClone.querySelector("#news-title").innerHTML = article.title;
    cardClone.querySelector('.news-desc').innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US', {
        timeZone: "asia/jakarta"
    })

    cardClone.querySelector("#news-source").innerHTML = `${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank")
    });
}

let onElement = null;

function onNavItemClick(query) {
    fetchApi(query)
    const select = document.getElementById(query)
    onElement?.classList.remove("active");
    onElement = select
    onElement.classList.add("active")
}

document.querySelector("#search-bar-button").addEventListener('click', () => {
    const value = document.querySelector("#search-bar-input").value;
    if (!value) return;
    fetchApi(value)
    onElement?.classList.remove("active")
    onElement = null;
})

function reload() {
    window.location.reload()
}
