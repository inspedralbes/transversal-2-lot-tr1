<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trivial</title>
    
        <!-- Load required Bootstrap and BootstrapVue CSS -->
        <link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css" />
    <link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css" />

    <!-- Load polyfills to support older browsers -->
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es2015%2CIntersectionObserver" crossorigin="anonymous"></script>

    <!-- Load Vue followed by BootstrapVue -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script src="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js"></script>

    <!-- Load the following for BootstrapVueIcons support -->
    <script src="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue-icons.min.js"></script>

    <!-- ROUTER -->
    <script src="https://unpkg.com/vue-router@3/dist/vue-router.js"></script>

</head>

<body>
    <div id="app">
        <router-link to="/"></router-link>
        
        <router-view></router-view>
    </div>
    <script src="{{ URL::asset('js/app.js') }}"></script>
</body>

</html>