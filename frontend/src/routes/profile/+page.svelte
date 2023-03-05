<script>
    import { onMount } from "svelte";
    var userData = []
    const token = document.querySelector(".header a.title").id
    onMount(async () => {
        const response = await fetch("http://localhost:3000/users/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        userData = await response.json();
    });
</script>

<link href="src/routes/assets/css/profile-style.css" rel="stylesheet" />


<div class="body">
    <p class="title-profile">address mail</p>
    <p>{userData.email}</p>
    <p class="title-profile">pseudo</p>
    <p>{userData.pseudo}</p>
</div>
