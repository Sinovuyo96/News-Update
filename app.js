const apiKey = '0f4f90d8a5f8442d8ea3b7ec90e69e9c';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'the-washington-post';

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;
    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);

    });

    if('serviceWorker' in navigator){
        try {
            navigator.serviceWorker.register('sw.js');
            console.log(`SW registered`);
        } catch (error) {
            console.log(`SW registration failed`);
        }
    }
});

async function updateSources(){
    const res =  await fetch(`https://newsapi.org/v2/sources`); 
    const json = await res.json();
    sourceSelector.innerHTML = json.sources.map(src => `<option value = "${src.id}">${src.name}</option>`).join('\n');
}

async function updateNews(source = defaultSource){
    const res = await fetch(`https://newsapi.org/v1/articles?source=${source}&apiKey=${apiKey}`);
    const json = await res.json();
    main.innerHTML = json.articles.map(createArticle).join('\n');
}
function createArticle(article){
    return `
        <div class = "article">
            <a href = "${article.url}">
                <h2>${article.title}</h2>
                <img src =${article.urlToImage}">
                <p>${article.description}</p>
            </a>
        </div>
    `;
}

mobiscroll.settings = {
    theme: 'ios',
    themeVariant: 'light'
};

mobiscroll.select('#demo-mobile', {
    display: 'bubble'
});

mobiscroll.select('#demo-desktop', {
    display: 'bubble',
    touchUi: false
});