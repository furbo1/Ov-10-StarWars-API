let input = document.getElementById("inp");
let btn = document.getElementById("btn");
let txt = document.getElementById("txt");

function getData() {
  fetch("https://www.swapi.tech/api/people")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)

      data.results
        .forEach((character) => {
          if (input.value === "") {
            txt.innerHTML = "Please enter a name.";
          } else if (
            character.name.toUpperCase().includes(input.value.toUpperCase())
          ) {
            let url = character.url;

            fetch(url)
              .then((res) => res.json())
              .then((data) => {
                let entries = Object.entries(data.result.properties);
                let s = "";

                for ([key, value] of entries) {
                  if (
                    key === "height" ||
                    key === "mass" ||
                    key === "gender" ||
                    key === "hair_color"
                  ) {
                    s += ` ${key}: ${value} | `;
                  }
                }

                txt.innerHTML = `${character.name} : ${s}`;
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            txt.innerHTML = "There is no character with that name";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
}

// getData()

btn.addEventListener("click", getData);
