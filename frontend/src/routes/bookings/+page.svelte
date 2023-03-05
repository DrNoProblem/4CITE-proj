<script>
    import { onMount } from "svelte";
    var userData = [];
    var bookingData = [];
    const token = document.querySelector(".header a.title").id;
    onMount(async () => {
        const response = await fetch("http://localhost:3000/users/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        userData = await response.json();
    });

    onMount(async () => {
        const response = await fetch("http://localhost:3000/bookings/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        bookingData = await response.json();
        console.log(bookingData);
    });
</script>

<link href="src/routes/assets/css/booking-style.css" rel="stylesheet" />

<div class="booking-list">
    <h2>List of your reservations</h2>
    <div class="unit-booking legend">
        <p class="booking-hotel">hotel name</p>
        <p class="booking-place">hotel place</p>
        <p class="booking-start">started date</p>
        <p class="booking-end">ended date</p>
        <div class="booking-edit">edit</div>
        <div class="booking-delete">delete</div>
    </div>
    <div class="list">
        {#each bookingData as item}
            <div class="unit-booking">
                <p class="booking-hotel">{item.hotel.name}</p>
                <p class="booking-place">{item.hotel.location}</p>
                <p class="booking-start">{dateFormat(item.checkInDate, 'MM-dd-yyyy')}</p>
                <p class="booking-end">{dateFormat(item.checkOutDate, 'MM-dd-yyyy')}</p>
                <div class="booking-edit" onclick="openWindowReserve()">
                    <img
                        src="src\routes\assets\icons\edit.svg"
                        alt=""
                        width="25px"
                    />
                </div>
                <div class="booking-delete">
                    <img
                        src="src\routes\assets\icons\delete.svg"
                        alt=""
                        width="25px"
                    />
                </div>
            </div>
        {/each}
    </div>
</div>

<div class="reserve-bg">
    <div class="reserve-window">
        <p class="hotel-name">nom hotel</p>
        <p class="location-hotel">place</p>
        <p class="id-name" style="display: none" />
        <div class="reserve-info">
            <form class="reserve-selection">
                <div class="reserve-date">
                    <div class="start-date">
                        <p>Starting date</p>
                        <input type="date" required />
                    </div>
                    <div class="end-date">
                        <p>Starting date</p>
                        <input type="date" required />
                    </div>
                </div>

                <div class="reserve-type-room">
                    <label for="room-select">Room Type</label>

                    <select name="pets" id="room-select" required>
                        <option value="classic">Classic</option>
                        <option value="royal">Royal</option>
                        <option value="suit">Suit</option>
                    </select>
                </div>

                <div class="reserve-number-room">
                    <label for="room-select">Room Type</label>

                    <select name="pets" id="room-select" required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </div>
                <button
                    class="button"
                    type="submit"
                    onclick="openWindowReserve()">reserve</button
                >
            </form>
            <div class="reserve-pict">
                <img src="" alt="" />
            </div>
        </div>
        <div class="close" onclick="openWindowReserve()" />
    </div>
</div>
