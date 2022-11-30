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
    <button ><router-link to="/partida">Jugar</router-link></button>
    </div>`,
    data: function () {
        return {}
    },
    methods: {}
})

const partida = Vue.component('opcions', {
    data: function () {
        return {
        categoria: '', 
        dificultat: '', 
        preguntesRespostes: [],
        opcionsTriades: false,
    }
    },
    template: `<div>
    <button ><router-link to="/"> 🏠 </router-link></button>
    
    <div v-show="!opcionsTriades">
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
    <button @click="buscarQuiz"> Comença </button>
    </div>

    <div v-show="opcionsTriades">
    <a></a>
    <b-col md="3" v-for="preg in preguntesRespostes"> 
        <pregunta :infoPreguntas=preg></pregunta>
    </b-col>
    </div>
    </div>`,
    methods: {
        buscarQuiz: async function () {
            await fetch("https://the-trivia-api.com/api/questions?categories=" + this.categoria + "&limit=10&difficulty=" + this.dificultat).then(response => response.json()).then(data => {
                this.preguntesRespostes = data;
            });
            this.opcionsTriades = true;
        }
    }
})

Vue.component('pregunta', {
    props: ['infoPreguntas'],
    data: function () {
        return {
            preguntasOrdenadas: [],
            preguntasDesordenadas: [],
        }
    },
    mounted() {
        this.preguntasOrdenadas = [this.infoPreguntas.correctAnswer, this.infoPreguntas.incorrectAnswers[0], this.infoPreguntas.incorrectAnswers[1], this.infoPreguntas.incorrectAnswers[2]];
        this.preguntasDesordenadas = preguntasOrdenadas.sort((a, b) => 0.5 - Math.random());
    },
    template: `<div>
    <h1>{{ infoPreguntas.question }}</h1>
    <button id="0" @click="respostaCorrecte">{{ preguntasDesordenadas[0] }}</button>
    <button id="1" @click="respostaCorrecte">{{ preguntasDesordenadas[1] }}</button> <br>
    <button id="2" @click="respostaCorrecte">{{ preguntasDesordenadas[2] }}</button>
    <button id="3" @click="respostaCorrecte">{{ preguntasDesordenadas[3] }}</button>
    </div>`,
    methods: {
        
    }
})


const routes = [
    {
        path: '/',
        component: home
    }, {
        path: '/partida',
        component: partida,
    }
]

const router = new VueRouter({routes})

Vue.use(BootstrapVue)
let app = new Vue({
    el: '#app', router,
    // pinia,
    data: {}
});
