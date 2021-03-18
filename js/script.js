const container = document.querySelector(".container");
const url = "http://data.foli.fi/citybike";
const ul = document.querySelector("ul");

fetch(url)
  .then(res => res.json())
  .then(data => {
    const racks = data.racks;
    Object.keys(racks).forEach(n => addStation(racks[n]));
  })
  .catch(console.log);

const getStatus = numOfAvailable => {
  if (numOfAvailable === 0) {
    return `<strong style='color: red'>0</strong>`;
  } else if (numOfAvailable <= 2) {
    return `<strong style='color: rgb(255, 187, 60);'>${numOfAvailable}</strong>`;
  }
  return `<strong style='color: rgb(136, 224, 85);'>${numOfAvailable}</strong>`;
};

const addStation = station => {
  const bikesAvailable = station.bikes_avail;
  const name = station.name;
  const slotsAvailable = station.slots_avail;
  const slotsTotal = station.slots_total;
  const li = document.createElement("li");

  li.innerHTML = ` <p><strong>${name} </strong></p>
                    <p>Pyöriä käytettävissä: ${getStatus(bikesAvailable)}
                    </p>
                    <p> Paikkoja vapaana: <strong>${getStatus(
                      slotsAvailable
                    )} / ${slotsTotal}
                      </strong></p>
                    `;

  ul.appendChild(li);
};
