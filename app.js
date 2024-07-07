document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const movieList = document.getElementById('movieList');
    const seatMap = document.getElementById('seatMap');
    const confirmationDetails = document.getElementById('confirmationDetails');

    let currentUser = null;

    const movies = [
        { title: 'Kalki', genre: 'Action', showtimes: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'] },
        { title: 'Jigar', genre: 'Action', showtimes: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'] },
        { title: 'Jatt And Juilet', genre: 'Comedy', showtimes: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'] },
        { title: 'Builder Boys', genre: 'Comedy', showtimes: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'] }

    ];

    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        localStorage.setItem(email, JSON.stringify({ name, password }));
        alert('Registration successful');
        registrationForm.reset();
    });

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const user = JSON.parse(localStorage.getItem(email));
        if (user && user.password === password) {
            currentUser = user;
            alert('Login successful');
            loginForm.reset();
            showMovies();
        } else {
            alert('Invalid email or password');
        }
    });

    function showMovies() {
        document.getElementById('registration').style.display = 'none';
        document.getElementById('login').style.display = 'none';
        document.getElementById('movies').style.display = 'block';

        movieList.innerHTML = '';
        movies.forEach((movie, index) => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
            movieDiv.innerHTML = `
                <h3>${movie.title}</h3>
                <p>Genre: ${movie.genre}</p>
                <p>Showtimes: ${movie.showtimes.join(', ')}</p>
                <button onclick="selectMovie(${index})">Select</button>
            `;
            movieList.appendChild(movieDiv);
        });
    }

    window.selectMovie = function (index) {
        const selectedMovie = movies[index];
        showSeats(selectedMovie);
    };

    function showSeats(movie) {
        document.getElementById('movies').style.display = 'none';
        document.getElementById('seats').style.display = 'block';

        seatMap.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const row = document.createElement('div');
            row.classList.add('seat-row');
            for (let j = 0; j < 10; j++) {
                const seat = document.createElement('button');
                seat.classList.add('seat');
                seat.innerText = `${String.fromCharCode(65 + i)}${j + 1}`;
                seat.addEventListener('click', function () {
                    seat.classList.toggle('selected');
                });
                row.appendChild(seat);
            }
            seatMap.appendChild(row);
        }

        document.getElementById('reserveSeats').addEventListener('click', function () {
            const selectedSeats = Array.from(document.querySelectorAll('.seat.selected')).map(seat => seat.innerText);
            if (selectedSeats.length === 0) {
                alert('Please select at least one seat');
                return;
            }

            const confirmation = {
                movie: movie.title,
                seats: selectedSeats,
                showtime: movie.showtimes[0]
            };

            showConfirmation(confirmation);
        });
    }

    function showConfirmation(details) {
        document.getElementById('seats').style.display = 'none';
        document.getElementById('confirmation').style.display = 'block';

        confirmationDetails.innerHTML = `
            <p>Movie: ${details.movie}</p>
            <p>Seats: ${details.seats.join(', ')}</p>
            <p>Showtime: ${details.showtime}</p>
            <p>Total Price: $${details.seats.length * 10}</p>
        `;
    }
});