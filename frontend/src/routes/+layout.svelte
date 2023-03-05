<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  let email = "";
  let password = "";

  let pseudo = "";
  let passwordConfirm = "";
  let role = "user";
  let error = "";
  var userData = []
  export let isLoggedIn = false;

  async function handleSubmit(event) {
    event.preventDefault();

    // Check that the passwords match
    if (password !== passwordConfirm) {
      error = "Passwords do not match";
      return;
    }

    const response = await fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        pseudo,
        password,
        role,
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

  async function handleLogin() {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    checkUserConnection(response.status);

    const status = response.status;
    const { token } = await response.json();
    const success = status === 200;
    console.log(success);
    console.log(token);
    addTokenonID(token);
    if (success) {
      localStorage.setItem("token", token);
      isLoggedIn = true;
      navigate("/");
    } else {
      console.error("Login failed");
    }
    console.log(response);
  }

  onMount(() => {
    const token = localStorage.getItem("token");
    if (token) {
      isLoggedIn = true;
    }
  });
  onMount(async () => {
    const response = await fetch("http://localhost:3000/users/me", {
      headers: {
        Authorization: `Bearer {token}`,
      },
    });
    userData = await response.json();
  });
</script>

<nav style="display: none;">
  <a href="/">Home</a>
  {#if !isLoggedIn}
    <a href="/login">Login</a>
    <a href="/signup">Signup</a>
  {:else}
    <button
      on:click={() => {
        localStorage.removeItem("token");
        isLoggedIn = false;
      }}>Log out</button
    >
  {/if}
</nav>

<link href="src/routes/assets/css/header-style.css" rel="stylesheet" />

<nav class="header flex-row">
  <a href="/" id="" class="title"><b style="color: #ff2768">SUP</b>HOTEL</a>

  <a href="/hotels" class="hotel">hotels</a>

  {#if !isLoggedIn}
    <a class="reservation grey">Bookings</a>
  {:else}
    <a href="/bookings" class="reservation">Bookings</a>
  {/if}

  <div class="userOption">
    {#if !isLoggedIn}
      <div class="connexion">
        <a class="name" onclick="displayUserWindow(false)">Sign In / Up</a
        ><!-- 
        <img
          src="src/routes/assets/icons/off-button-white.svg"
          height="30px"
          onmouseenter="this.src = 'src/routes/assets/icons/off-button-blue.svg'"
          onmouseout="this.src = 'src/routes/assets/icons/off-button-white.svg'"
        /> -->
      </div>
    {:else}
      <div
        class="user flex-row"
        onclick="document.querySelector('.information').classList.toggle('active')"
      >
        <a class="name">pseudo</a>
      </div>
    {/if}

    <div class="information flex-row">
      <a
        href="/profile/"
        class="view-profile"
        onclick="document.querySelector('.information').classList.toggle('active')"
        >view profile</a
      >
      <img
        on:click={() => {
          localStorage.removeItem("token");
          isLoggedIn = false;
        }}
        src="src/routes/assets/icons/off-button-white.svg"
        alt=""
        height="30"
        onclick="displayUserInfo()"
        onmouseenter="this.src = 'src/routes/assets/icons/off-button-red.svg'"
        onmouseout="this.src = 'src/routes/assets/icons/off-button-white.svg'"
      />
    </div>
  </div>

  <div class="user-window">
    <div class="information flex-row">
      <a class="view-profile">view profile</a>
      <img
        src="src/routes/assets/icons/off-button-white.svg"
        alt=""
        height="30"
        onclick="displayUserInfo()"
        onmouseenter="this.src = 'src/routes/assets/icons/off-button-red.svg'"
        onmouseout="this.src = 'src/routes/assets/icons/off-button-white.svg'"
      />
    </div>

    <div class="onglet in">
      <div onclick="displaySign('in')">Sign In</div>
      <div onclick="displaySign('up')">Sign Up</div>
    </div>

    <form class="sign-in" on:submit|preventDefault={handleLogin}>
      <p class="username">Email</p>
      <input type="text" bind:value={email} required />
      <p class="userpsw">Password</p>
      <input type="password" bind:value={password} required />
      <button type="submit" class="button-sign">Sign In</button>
    </form>

    <form class="sign-up" on:submit={handleSubmit}>
      <p class="username">Pseudo</p>
      <input type="text" bind:value={pseudo} required />
      <p class="username">Email</p>
      <input type="text" bind:value={email} required />
      <p class="userpsw">Password</p>
      <input type="password" bind:value={password} required />
      <p class="userpsw">Confirm Password</p>
      <input type="password" bind:value={passwordConfirm} required />
      <button type="submit" class="button-sign">Sign Up</button>
      <p class="error">{error}</p>
    </form>
  </div>
</nav>
<div class="fantom-header" />

<slot />
