Vue.component('register', {
    template: `<div class="flex flex-wrap w-full justify-center items-center pt-56">
    <div class="flex flex-wrap max-w-xl">
        <div class="p-2 text-2xl text-gray-800 font-semibold"><h1>Register an account</h1></div>
        <div class="p-2 w-full">
            <label class="w-full" for="name">Name</label>
            <span class="w-full text-red-500" v-if="errors.name">{{errors.name[0]}}</span>
            <input class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2" placeholder="Name" type="text" v-model="form.name" >
        </div>
        <div class="p-2 w-full">
            <label for="email">Your e-mail</label>
            <input class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2" placeholder="Email" type="email" v-model="form.email">
        </div>
        <div class="p-2 w-full">
            <label for="password">Password</label>
            <input class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2" placeholder="Password" type="password" v-model="form.password" name="password">
        </div>
        <div class="p-2 w-full">
            <label for="description">Confirm Password</label>
            <input class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2" placeholder="Confirm Password" type="password" v-model="form.password_confirmation" name="password_confirmation">
        </div>
        <div class="p-2 w-full mt-4">
            <button @click.prevent="saveForm" type="submit" class="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Register</button>
        </div>
    </div> 
</div>`,
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                descripcio:''
            },
            errors: []
        }
    },
    methods: {
        saveForm() {
            fetch('../transversal_g1/public/api/register-user', {
                method: 'POST',
                body: this.form
            }).then(() => {
                console.log('saved');
            });

        }
    }
})
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

Vue.component('navbar', {
    template: `<div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <a class="navbar-brand" href="./index.html"><img src="img/logo_omg_navbar.png" alt="Logo" style="width: 5vw;"></a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
                aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="index.html">
                            <button type="button" class="btn btn-outline-secondary">Home</button></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="jugar.html"><button type="button"
                                class="btn btn-outline-secondary">Jugar</button></a></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="ranking.html"><button type="button"
                                class="btn btn-outline-secondary">Ranking</button></a></a>

                    </li>

                </ul>
                <form class="d-flex"><a href="#">
                    <button class="btn btn-secondary my-2 my-sm-0" type="submit">Login</button></a>
                    <button class="btn btn-secondary my-2 my-sm-0" type="submit">Signup</button></a>
                </form>
            </div>
        </div>
    </nav>
</div>`,
    data: function () {
        return {}
    },
    methods: {}
})

const home = Vue.component('home', {
    template: `<div>
    <navbar></navbar>
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
            preguntaActual: 0,
            dadesPartida: {
                punts: 0,
                tempsPartida: 0,
                acabada: false
            }
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
    <b-col v-for="(preg, index) in preguntesRespostes"> 
        <pregunta @sumaPunts="dadesPartida.punts++" @next-question="preguntaActual++" v-if="preguntaActual==index" :estatP=dadesPartida :infoPreguntes=preg :index=index></pregunta>
    </b-col>
    <div v-if="preguntaActual == 10">
        <h1>Has encertat {{dadesPartida.punts}}/10</h1>
        <b-button @click="addGame">Guardar partida</b-button>
    </div>
    </div>
    </div>`,
    methods: {
        buscarQuiz: async function () {
            await fetch("https://the-trivia-api.com/api/questions?categories=" + this.categoria + "&limit=10&difficulty=" + this.dificultat).then(response => response.json()).then(data => {
                this.preguntesRespostes = data;
            });
            this.opcionsTriades = true;
        },
        addGame: function () {
            const enviar = new FormData();
            var numDificultat = 0;
            switch (this.preguntesRespostes[0].difficulty) {
                case "easy": numDificultat = 1;
                    break;
                case "medium": numDificultat = 2;
                    break;
                case "hard": numDificultat = 3;
                    break;
            }
            enviar.append('difficulty', numDificultat);
            enviar.append('category', this.preguntesRespostes[0].category);
            enviar.append('json', JSON.stringify(this.preguntesRespostes));
            const punts = new FormData();
            punts.append('idUser',)
            fetch('../transversal_g1/public/api/store-game', {
                method: 'POST',
                body: enviar
            });
            fetch('../transversal_g1/public/api/store-points', {
                method: 'POST',
                body: punts
            })
        }
    }
})

Vue.component('pregunta', {
    props: [
        'infoPreguntes', 'index', 'estatP'
    ],
    data: function () {
        return {
            respostesOrdenades: [],
            respostesDesordenades: [],
            b0: "",
            b1: "",
            b2: "",
            b3: ""
        }
    },
    mounted() {
        this.respostesOrdenades = [
            this.infoPreguntes.correctAnswer, this.infoPreguntes.incorrectAnswers[0], this.infoPreguntes.incorrectAnswers[1], this.infoPreguntes.incorrectAnswers[2]
        ];
        this.respostesDesordenades = this.respostesOrdenades;

        for (let i = this.respostesDesordenades.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.respostesDesordenades[i];
            this.respostesDesordenades[i] = this.respostesDesordenades[j];
            this.respostesDesordenades[j] = temp;
        }
    },
    template: `<div>
  
    <h1>{{ infoPreguntes.question }}</h1>
    <b-button :variant="b0" @click="respostaCorrecte(0)">{{ respostesDesordenades[0] }}</b-button>
    <b-button :variant="b1" @click="respostaCorrecte(1)">{{ respostesDesordenades[1] }}</b-button> <br>
    <b-button :variant="b2" @click="respostaCorrecte(2)">{{ respostesDesordenades[2] }}</b-button>
    <b-button :variant="b3" @click="respostaCorrecte(3)">{{ respostesDesordenades[3] }}</b-button>
   </div>`,
    methods: {
        respostaCorrecte: function (nRes) {
            if (this.respostesDesordenades[nRes] == this.infoPreguntes.correctAnswer) {
                this.buttonColors("success", nRes);
                setTimeout(() => {
                    this.$emit('sumaPunts')
                    this.$emit('next-question')
                }, 2000)
                for (let i = 0; i < 4; i++) {
                    if (i != nRes) {
                        this.buttonColors("danger", i);
                    }
                }
            } else {
                for (let i = 0; i < 4; i++) {
                    if (this.respostesDesordenades[i] != this.infoPreguntes.correctAnswer) {
                        this.buttonColors("danger", i);
                    } else {
                        this.buttonColors("success", i);

                    }
                }
                setTimeout(() => {
                    this.$emit('next-question')
                }, 2000)
            }


        },
        buttonColors: function (color, nRes) {
            switch (nRes) {
                case 0:
                    this.b0 = color;
                    break;
                case 1:
                    this.b1 = color;
                    break;
                case 2:
                    this.b2 = color;
                    break;
                case 3:
                    this.b3 = color;
                    break;
            }
        }
    }
})


const routes = [
    {
        path: '/',
        component: home
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
