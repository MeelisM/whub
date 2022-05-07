<template>
  <aside>
    <nav class="container">
      <ul class="navbar">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            <span class="material-icons">home</span>
            <span class="link-text">HOME</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/mastery" class="nav-link">
            <span class="material-icons">star</span>
            <span class="link-text">MASTERY</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/moe" class="nav-link">
            <span class="material-icons">workspaces</span>
            <span class="link-text">MOE</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/expected" class="nav-link">
            <span class="material-icons">monitor_heart</span>
            <span class="link-text">EXPECTED</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'SideBar',
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #1472ff;
  position: fixed;
  transition: width 200ms ease;
  z-index: 99;

  .navbar {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .nav-item {
    width: 100%;
  }

  .nav-link {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5rem;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffffff;
  }

  .link-text {
    display: none;
  }

  .material-icons {
    font-size: 1.5rem;
  }
}

@media only screen and (max-width: 600px) {
  .container {
    bottom: 0;
    width: 100vw;
    height: 5rem;

    .navbar {
      flex-direction: row;
    }
  }
}

@media only screen and (min-width: 600px) {
  .container {
    top: 0;
    width: 5rem;
    height: 100vh;

    &:hover {
      width: 12rem;

      .link-text {
        display: block;
        font-size: 1rem;
      }

      .nav-link {
        justify-content: left;
      }
    }

    .material-icons {
      margin: 0 1.75rem;
    }
  }
}
</style>
