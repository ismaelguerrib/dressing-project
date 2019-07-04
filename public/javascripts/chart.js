axios
  .get("http://localhost:3000/api/dashboard")
  .then(res => {
    console.log(res);
    const price = {};
    const count = {};
    const priceArray = [];
    const countArray = [];

    for (let i = 0; i < res.data.length; i++) {
      let month = new Date(res.data[i].addeddate);
      let numMonth = month.getMonth();

      if (!price[numMonth]) price[numMonth] = [];
      price[numMonth].push(res.data[i].price);
    }

    for (let monthNum in price) {
      priceArray.push(price[monthNum].reduce((a, v) => a + v), 0);
    }

    for (let i = 0; i < res.data.length; i++) {
      let month = new Date(res.data[i].addeddate);
      let numMonth = month.getMonth();

      if (!count[numMonth]) count[numMonth] = [];
      count[numMonth].push(1);
    }

    for (let monthNum in count) {
      countArray.push(count[monthNum].reduce((a, v) => a + v), 0);
    }

    ///////////
    var top = 0;
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].typeCat === "5d1df9b519a437231515188c") {
        top = top + 1;
      }
    }

    var Bottom = 0;
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].typeCat === "5d1df9b519a437231515188d") {
        Bottom = Bottom + 1;
      }
    }

    var Shoes = 0;
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].typeCat === "5d1df9b519a437231515188e") {
        Shoes = Shoes + 1;
      }
    }

    var Accessoires = 0;
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].typeCat === "5d1df9b519a437231515188f") {
        Accessoires = Accessoires + 1;
      }
    }

    ///////////

    new Chart(document.getElementById("myChart").getContext("2d"), {
      type: "line",
      data: {
        labels: Object.keys(priceArray),
        datasets: [
          {
            data: priceArray,
            label: "amount of clothes bought over month",
            borderColor: "#c45850",
            fill: false
          }
        ]
      }
    });

    new Chart(document.getElementById("myChart2").getContext("2d"), {
      type: "line",
      data: {
        labels: Object.keys(countArray),
        datasets: [
          {
            data: countArray,
            label: "number of clothes bought over month",
            borderColor: "#3e95cd",
            fill: false
          }
        ]
      }
    });

    new Chart(document.getElementById("myChart3").getContext("2d"), {
      type: "pie",
      data: {
        labels: ["Top", "Bottom", "Shoes", "Accessoires"],
        datasets: [
          {
            data: [top, Bottom, Shoes, Accessoires],
            backgroundColor: ["#3e95cd", "#8e5ea2"]
          }
        ]
      }
    });

    new Chart(document.getElementById("myChart4").getContext("2d"), {
      type: "bar",
      data: {
        labels: Object.keys(priceArray),
        datasets: [
          {
            label: "top",
            data: [top],
            backgroundColor: "#3e95cd"
          },
          {
            label: "Bottom",
            data: [Bottom],
            backgroundColor: "8e5ea2"
          },
          {
            label: "Shoes",
            data: [Shoes],
            backgroundColor: "8e5ea5"
          },
          {
            label: "Accessoires",
            data: [Accessoires],
            backgroundColor: "8e5eq2"
          }
        ]
      }
    });
  })
  .catch(err => console.log(err));
