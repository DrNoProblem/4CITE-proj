<script>
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";

    var data = [];
    async function fetchData() {
        const response = await fetch("http://localhost:3000/hotels/", {
            method: "GET",
        });
        data = await response.json();
        console.log(data);
    }
    fetchData();

    var userData = [];
    const token = document.querySelector(".header a.title").id;
    onMount(async () => {
        const response = await fetch("http://localhost:3000/users/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        userData = await response.json();
        console.log(userData.id);
    });

    let hotel = "";
    let checkInDate = "";
    let checkOutDate = "";
    let roomType = "";
    let numberOfRooms = "";
    let user = userData.id;

    async function reserveSubmit(event) {
        event.preventDefault();
        user = userData.id;
        console.log("user = "+user);

        // Check that the passwords match
        if (checkInDate > checkOutDate) {
            error = "dates does not match";
            return;
        }

        const response = await fetch("http://localhost:3000/bookings/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                user,
                hotel,
                checkInDate,
                checkOutDate,
                numberOfRooms,
                roomType,
            }),
        });

        if (response.ok) {
            // Signup was successful, log the user in and redirect to dashboard
            const { token } = await response.json();
            localStorage.setItem("token", token);
            navigate("/");
        } else {
            // Signup failed, show error message
            const { message } = await response.json();
            error = message;
        }
    }
</script>

<link href="src/routes/assets/css/hotels-style.css" rel="stylesheet" />

<div class="body">
    {#each data as item}
        <div class="hotel-card">
            <img
                src="src\routes\assets\icons\293110304.jpg"
                alt=""
                width="100%"
            />
            <div class="hotel-description">
                <p class="name-hotel">{item.name}</p>
                <p class="location-hotel">{item.location}</p>
            </div>
            <button
                class="button"
                onclick="openWindowReserve('{item._id}','{item.name}', '{item.location}'); hotel = item.id"
                >reserve</button
            >
        </div>
    {/each}
</div>
<div class="reserve-bg">
    <div class="reserve-window">
        <p class="hotel-name">nom hotel</p>
        <p class="location-hotel">place</p>
        <p class="id-name" style="display: none" />
        <div class="reserve-info">
            <form class="reserve-selection" on:submit={reserveSubmit}>
                <input
                    type="text"
                    class="d-none id-hotel"
                    bind:value={hotel}
                    required
                />
                <div class="reserve-date">
                    <div class="start-date">
                        <p>Starting date</p>
                        <input type="date" bind:value={checkInDate} required />
                    </div>
                    <div class="end-date">
                        <p>Starting date</p>
                        <input type="date" bind:value={checkOutDate} required />
                    </div>
                </div>

                <div class="reserve-type-room">
                    <label for="room-select">Room Type</label>

                    <select
                        name="pets"
                        id="room-select"
                        bind:value={roomType}
                        required
                    >
                        <option value="classic">Classic</option>
                        <option value="royal">Royal</option>
                        <option value="suit">Suit</option>
                    </select>
                </div>

                <div class="reserve-number-room">
                    <label for="room-select">Room Type</label>

                    <select
                        name="pets"
                        id="room-select"
                        bind:value={numberOfRooms}
                        required
                    >
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
                <img src="" alt="" width="80%"/>
            </div>
        </div>
        <div class="close" onclick="openWindowReserve()" />
    </div>
</div>
