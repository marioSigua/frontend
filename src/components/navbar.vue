<template>
    <nav
        class="navbar navbar-expand-lg navbar-light textH "
        style="background-color: #8F8475;"
    >
        <div class="container-fluid">
            <a
                ><img
                    src="https://i.imgur.com/qO1REGc.png"
                    height="50px"
                    width="50px"
            /></a>
            <b-navbar-toggle
                class="navbar-toggler"
                type="button"
                target="nav-collapse"
                data-bs-toggle="nav-collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </b-navbar-toggle>
            <b-collapse class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item" href="#">
                        <a
                            aria-disabled="true"
                            class="nav-link"
                            aria-current="page"
                            style="color: white;"
                            >Lyceum</a
                        >
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            style="color: white;"
                            to="/auth/professor"
                            >Home</router-link
                        >
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            href="#"
                            style="color: white;"
                            to="/auth/professor/exam"
                            >Exam</router-link
                        >
                    </li>
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            href="#"
                            style="color: white;"
                            to="/auth/professor/calculator"
                            >Calculator</router-link
                        >
                    </li>
                </ul>
            </b-collapse>
        </div>

        <div>
            <b-dropdown
                id="dropdown-account"
                text="Account"
                right
                variant="none"
                class="m-2"
            >
                <b-dropdown-text style="width: 240px;">
                    Name:
                    {{ profileState.firstname + ' ' + profileState.lastname }}
                    <br />
                    Account type: {{ profileState.account_type }}
                </b-dropdown-text>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="logoutUser">Logout</b-dropdown-item>
            </b-dropdown>
        </div>
    </nav>
</template>

<script>
    export default {
        computed: {
            profileState() {
                return this.$store.state.userProfile
            },
        },

        data() {
            return {
                openNavEnd: false,
            }
        },

        methods: {
            logoutUser() {
                this.$store.commit('resetState')
            },
        },

        mounted() {
            console.log(this.profileState)
        },
    }
</script>
