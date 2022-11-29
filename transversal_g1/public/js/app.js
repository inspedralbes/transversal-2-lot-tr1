Vue.component('login', {
    template: `<div>
    <div v-show="!logged">
    <b-form-input v-model="form.username" placeholder="Username" required></b-form-input>
    <b-form-input v-model="form.password" placeholder="Password" required></b-form-input>
    <b-button @click="submitLogin" variant="primary">Login</b-button>
    <div v-show="processing">
        <b-spinner></b-spinner>
    </div>
    </div>
    <div v-show="logged">
    Benvingut {{nameUser}} <img :src=imageUser> 
    <b-button @click="logOut" variant="primary">Logout</b-button>
    </div>
    </div>`,
    data: function () {
        return {
            nameUser: "",
            imageUser: "",
            form: {
                username: "",
                password: ""
            },
            logged: false,
            processing: false
        }
    },
    methods: {

        submitLogin() {
            this.processing = true;
            fetch(`http://alvaro.alumnes.inspedralbes.cat/loginGET.php?username=${
                this.form.username
            }&pwd=${
                this.form.password
            }`).then(response => response.json()).then(data => {
                if (data.exito) {
                    this.nameUser = data.nombre;
                    this.imageUser = data.imagen;
                    this.logged = true;

                    store = userStore()
                    store.setEstado(this.infoLogin);
                    store.logged = true;
                }
            })
        },
        logOut() {
            this.logged = false;
            this.processing = false;
        }
    }
})

const home = Vue.component('home', {
    template: `<div>
    <button ><router-link to="/"> 🏠</router-link></button>
    <login></login>
    <h1>TRIVIAL</h1>
    <button ><router-link to="/opcions">Jugar</router-link></button>
    </div>`,
    data: function () {
        return {}
    },
    methods: {}
})

const opcions = Vue.component('opcions', {
    data: function () {
        return {
            categoria: '',
            dificultat: '',
            preguntesRespostes: []
        }
    },
    template: `<div>
    <button ><router-link to="/"> 🏠 </router-link></button>
    <h1>Tria les opcions del joc:</h1>

    <select v-model="dificultat">
        <option disabled value="">Selecciona una dificultat</option>
        <option value="easy">Facil</option>
        <option value="medium">Mitja</option>
        <option value="hard">Dificil</option>
    </select>
    <select v-model="categoria">
        <option disabled value="">Selecciona una categoria</option>
        <option value="history">Historia</option>
        <option value="film_and_tv">Cinema</option>
        <option value="sport_and_leisure">Esports</option>
    </select>
    <br><br>
    <router-link to="/partida"><button @click="buscarQuiz"> Comença </button></router-link>
    
    </div>`,
    methods: {
        buscarQuiz: function () {
            fetch("https://the-trivia-api.com/api/questions?categories="+ this.categoria +"&limit=10&difficulty=" + this.dificultat).then(response => response.json()).then(data => {
                console.log(data);
            });
        }
    }
})

const partida = Vue.component('partida', {
    template: `<div>
    <button ><router-link to="/"> 🏠 </router-link></button>
    <preguntes></preguntes>
    </div>`,
    data: function () {
        return {}
    },
    methods: {}
})

Vue.component('preguntes', {
    template: `<div>
    <h1>Pregunta</h1>
    <button>Resposta 1</button>
    <button>Resposta 2</button> <br>
    <button>Resposta 3</button>
    <button>Resposta 4</button>
    </div>`,
    data: function () {
        return {}
    },
    methods: {}
})



const routes = [
    {
        path: '/',
        component: home
    }, {
        path: '/opcions',
        component: opcions
    }, {
        path: '/partida',
        component: partida
    }
]

const router = new VueRouter({routes})

Vue.use(BootstrapVue)
let app = new Vue({
    el: '#app', router,
    // pinia,
    data: {}
});
