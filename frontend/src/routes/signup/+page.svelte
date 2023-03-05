<!-- src/routes/signup/+page.svelte -->

<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
  
    let email = '';
    let pseudo = '';
    let password = '';
    let passwordConfirm = '';
    let role = 'user'
    let error = '';
  
    async function handleSubmit(event) {
      event.preventDefault();
  
      // Check that the passwords match
      if (password !== passwordConfirm) {
        error = 'Passwords do not match';
        return;
      }
  
      const response = await fetch('http://localhost:3000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        // Signup failed, show error message
        const { message } = await response.json();
        error = message;
      }
    }
  </script>
  
  <div class="signup-container">
    <h1>Sign up for an account</h1>
  
    <form on:submit={handleSubmit}>
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} required>
  
      <label for="username">Username:</label>
      <input type="text" id="username" bind:value={pseudo} required>
  
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} required>
  
      <label for="password-confirm">Confirm Password:</label>
      <input type="password" id="password-confirm" bind:value={passwordConfirm} required>
  
      <p class="error">{error}</p>
  
      <button type="submit">Sign up</button>
    </form>
  </div>
  
  <style>
    .signup-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2rem;
    }
  
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2rem;
      width: 300px;
    }
  
    label {
      margin-bottom: 0.5rem;
    }
  
    input[type="text"],
    input[type="email"],
    input[type="password"] {
      margin-bottom: 1rem;
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid #ccc;
      width: 100%;
    }
  
    .error {
      color: red;
      margin-top: 0.5rem;
    }
  
    button[type="submit"] {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    button[type="submit"]:hover {
      background-color: #0069d9;
    }
  </style>
  