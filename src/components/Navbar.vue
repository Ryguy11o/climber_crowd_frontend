<template>
  <div class="nav">
      <div class="title">
        <span class="title-span">
          <h1>Climber Crowd</h1>
        </span >
        <i
            v-if="mobile"
            @click="toggleMenu"
            class="menu-icon gg-menu">
        </i>
      </div>
      <div 
        class="menu"
        v-if="!mobile || menuExpanded"
      >
          <router-link to="/" class="link">
            <span>Announcements</span>
            <i class="gg-feed"></i>
          </router-link>
          <router-link to="/routes" class="link">
            <span>Routes</span>
            <i class="gg-git-fork"></i>
          </router-link>
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
            window: {
                width: 0,
                height: 0
            },
            menuExpanded: false,
        }
    },
    computed: {
        mobile() {
            return this.window.width <= 768
        }
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        },
        toggleMenu() {
            const bool = this.menuExpanded;
            this.menuExpanded = !bool;
        }
    }
}
</script>

<style scoped>
.title {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
}

.title-span {
    justify-self: center;
    margin-left: auto;
}
.gg-menu {
    --ggs: 1.5;
    transition: transform .2s linear;
}

.gg-menu:hover {
    --ggs: 1.6;
    cursor: pointer;
}

.menu-icon {
    display: block;
    margin-left: auto;
    margin-right: 5%;
    margin-top: 5px;
}
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

.link span, .link a {
    margin: 0 10px;
}

.gg-feed, .gg-git-fork {
    --ggs: .75;
}

.link:hover {
    background-color: rgba(0,0,0, 0.1);
}

@media all and (min-width: 736px) {
    .title-span {
        margin: auto;
    }
}

@media all and (max-width: 734px) {
    .nav {
        height: auto;
    }

    .menu {
        height: auto;
        width: 100%;
        border-bottom: 2px solid black;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        background-color: white;
        color: black;
        border-top: 0;
    }

    .link {
        padding: 10px 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: black;
        border-bottom: 2px solid rgba(0,0,0, 0.1);
    }
}
 
</style>
