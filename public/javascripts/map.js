function startMap() {
  const ironhackBCN = {
    lat: 48.852426,
    lng: 2.389029
  };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: ironhackBCN
  });
}

startMap();
