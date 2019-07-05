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
      `<div class="{{containerClothes}} product-item-wrapper">
    <a href="/viewone/${element._id}" class="product-item-wrapper">
        <div class="product-img">
        <img src="${element.image}" alt="cloth">
        <p class="product-name">${element.name}</p>
        <p class="product-name">${element.type}</p>
        <p class="product-name">${element.brand}</p>
        <p class="product-price">$${element.price}</p>
        </div>
        
        <div class="btn-container">
        <a href="/add/${element._id}" class="btn">Add to the day</a>
        <br>
        <a href="/edit/${element._id}'" class="btn">
            Edit
        </a>
        <br>
        <a href="/delete/${element._id}'" class="btn">
            Delete</a>
    </div>
    <style>
        .btn-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .btn {
            border: 1px solid black;
            padding: 5px;
            text-align: center;
        }

        .btn:hover {
            color: white;
            background-color: #5DBDC4
        }
    </style>

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
        createProductContent(myResult);
      })
      .catch(dbErr => console.log(dbErr));
  };
}
if (searchbar) {
  getClothes();
}
