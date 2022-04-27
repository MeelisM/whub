<template>
    <aside>
        <nav class="container">
            <ul class="navbar">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">
                        <span class="material-icons">home</span>
                        <span class="link-text">Home</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/leaderboard" class="nav-link">
                        <span class="material-icons">leaderboard</span>
                        <span class="link-text">Leaderboard</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/mastery" class="nav-link">
                        <span class="material-icons">signal_cellular_alt</span>
                        <span class="link-text">Mastery</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/moe" class="nav-link">
                        <span class="material-icons">home</span>
                        <span class="link-text">MoE</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/expected" class="nav-link">
                        <span class="material-icons">help</span>
                        <span class="link-text">Expected</span>
                    </router-link>
                </li>
            </ul>
        </nav>
    </aside>
</template>


<script>

export default {
    name: 'SideBar',
    data() {
        return {
            //
        }
    },
    methods: {
        //
    }
}


</script>

<style lang="scss" scoped>
.container {
    background-color: #010312;
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
        font-size: 1.4rem;
        color: #FFFFFF
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
            width: 14rem;

            .link-text {
                display: block;
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