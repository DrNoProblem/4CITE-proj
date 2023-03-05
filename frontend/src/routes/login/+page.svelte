<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  let email = "";
  let password = "";
  export let isLoggedIn = false;

  async function handleLogin() {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const status = response.status;
    const { token } = await response.json();
    const success = status === 200;
    console.log(success);
    console.log(token);
    if (success) {
      localStorage.setItem("token", token);
      isLoggedIn = true;
      navigate("/");
    } else {
      console.error("Login failed");
    }
  }

  onMount(() => {
    const token = localStorage.getItem("token");
    if (token) {
      isLoggedIn = true;
    }
  });
</script>

{#if !isLoggedIn}
  <form on:submit|preventDefault={handleLogin}>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required />

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required />

    <button type="submit">Log in</button>
  </form>
{:else}
  <p>You are logged in!</p>
{/if}

{#if isLoggedIn}
  <button
    on:click={() => {
      localStorage.removeItem("token");
      isLoggedIn = false;
    }}>Log out</button
  >
{/if}

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  label {
    margin-bottom: 5px;
  }

  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid gray;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
  }

  button {
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #0077ff;
    color: white;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
  }

  button:hover {
    background-color: #0059b3;
  }
</style>
