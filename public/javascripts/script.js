const searchbar = document.getElementById("myinput");
const productGrid = document.querySelector(".products-grid");
const meta = document.getElementById("site-url");
const url = meta.getAttribute("data-url");
console.log(url);

function createProductContent(arr) {
  while (productGrid.firstChild) {
    productGrid.removeChild(productGrid.firstChild);
  }
  arr.forEach(element => {
    productGrid.insertAdjacentHTML(
      "beforeend",
      `<div class="containerClothes product-item-wrapper">
    <a href="/viewone/${element._id}" class="product-item-wrapper">
        <div class="product-img"><img src="${element.image}" alt="cloth"></div>
        <p class="product-name">${element.name}</p>
        <p class="product-name">${element.type}</p>
        <p class="product-name">${element.brand}</p>
        <p class="product-price">$${element.price}</p>
    </a>

    <button onclick="location.href='/delete/${element._id}'" type="button">
        Delete Cloth</button>

    <button onclick="location.href='/add/${element._id}'" type="button">
        Add to the day</button>
</div>`
    );
  });
}
function getClothes() {
  searchbar.oninput = () => {
    axios
      .get(`${url}/clothes/api`)
      .then(dbRes => {
        const myResult = dbRes.data.filter(oneElement => {
          const dataToFilter = oneElement.name;
          return dataToFilter
            .toLowerCase()
            .substring(0, searchbar.value.length)
            .includes(searchbar.value.toLowerCase());
        });
        console.log(myResult);
        createProductContent(myResult);
      })
      .catch(dbErr => console.log(dbErr));
  };
}
if (searchbar) {
  getClothes();
}
