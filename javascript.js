const salle = document.getElementById("salle");
const films = document.querySelectorAll(".film");
const count = document.getElementById("count");
const total = document.getElementById("total");

let currentFilm = "Avengers";
let price = 40;
let seats = [];

function loadSalle() {
    salle.innerHTML = "";
    const key = "salle_" + currentFilm;

    if (localStorage.getItem(key)) {
        seats = JSON.parse(localStorage.getItem(key));
    } else {
        seats = Array(40).fill("available");
        localStorage.setItem(key, JSON.stringify(seats));
    }

    seats.forEach((state, index) => {
        const seat = document.createElement("div");
        seat.classList.add("seat");

        if (state === "reserved") seat.classList.add("reserved");

        seat.addEventListener("click", () => {
            if (!seat.classList.contains("reserved")) {
                seat.classList.toggle("selected");
                update();
            }
        });

        salle.appendChild(seat);
    });

    update();
}

films.forEach(film => {
    film.addEventListener("click", () => {
        films.forEach(f => f.classList.remove("active"));
        film.classList.add("active");

        currentFilm = film.querySelector("h3").innerText;
        price = film.dataset.price;

        loadSalle();
    });
});

function update() {
    const selected = document.querySelectorAll(".seat.selected");
    count.innerText = selected.length;
    total.innerText = selected.length * price;
}

function confirmer() {
    const selectedSeats = document.querySelectorAll(".seat.selected");
    if (selectedSeats.length === 0) {
        alert("Veuillez sélectionner au moins une place !");
        return;
    }

    selectedSeats.forEach((seat, index) => {
        seat.classList.remove("selected");
        seat.classList.add("reserved");
        seats[index] = "reserved";
    });

    localStorage.setItem("salle_" + currentFilm, JSON.stringify(seats));
    alert("Réservation confirmée 🎉");
    loadSalle();
}

loadSalle();
