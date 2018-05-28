<template>
    <div>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/">Plug-<strong>e</strong></a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a href="/">Home</a></li>
                    <li><a href="/subscribe">Subscribe</a></li>
                    <li><a href="/device">Device</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a v-bind:href="url">{{login_action}}</a></li>  
                </ul>
                </div>
            </div>
        </nav>
  </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'NavBar',
    data () {
        return {
            login_action: "Sign In",
            url: "/login"
        }
    },
    methods: {

    },
    beforeCreate(){
        axios.get("/api/current_user").then((res) => {
            this.login_action = res.data ? "Sign out" : "Sign In"; 
            this.url = res.data ? "/api/logout" : "/login";
        }).catch((e) => {
            console.log(e);
        });
    }
}
</script>

<style scoped>


</style>
