<template>
  <div class="nav">
      <h1>CLIMBER CROWD</h1>
      <div class="menu">
          <router-link to="/" class="link">Announcements</router-link>
          <router-link to="/routes" class="link">Routes</router-link>
          <router-link to="/" class="link">Community</router-link>
          <router-link to="/" class="link">Feedback</router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {

    }
  },
}
</script>

<style>
.nav {
    height: 135px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: linear-gradient(90deg, 
    rgba(230,0,118,1) 0%, 
    rgba(204,6,131,1) 29%,
    rgba(233,122,55,1) 67%, 
    rgba(255,173,0,1) 100%);
    color: white;
}

.menu {
    height: 50px;
    width: 100%;
    border-top: 2px solid white;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.link {
    height: 100%;
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: white;
}

.link:hover {
    background-color: rgba(0,0,0, 0.1);
}
</style>
