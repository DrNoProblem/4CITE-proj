<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
 -->

<link href="src/routes/assets/css/home-style.css" rel="stylesheet" />
<div class="body">
    <div class="choose-hotel">
        <div class="home-city">
            <p>Choose a city</p>
            <input type="text" />
        </div>

        <div class="home-date">
            <div class="start-date">
                <p>Starting date</p>
                <input type="date" />
            </div>
            <div class="end-date">
                <p>Starting date</p>
                <input type="date" />
            </div>
        </div>

        <a href="/hotels" class="button-hotel">See your selection</a>
    </div>
</div>
