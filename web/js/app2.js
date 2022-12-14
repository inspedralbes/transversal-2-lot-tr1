const userStore = Pinia.defineStore('usuario', {
    state() {
        return {
            logged: false,
            loginInfo: {
                name: 'Nombre del almacen'
            }
        }
    },
    actions: {
        setEstado(i) {
            this.loginInfo = i
        }
    }
})

Vue.use(Pinia.PiniaVuePlugin)
const pinia = Pinia.createPinia()

Vue.component("register", {
    template: `<div class="flex flex-wrap w-full justify-center items-center pt-56">
    <div class="flex flex-wrap max-w-xl">
        <div class="p-2 text-2xl text-gray-800 font-semibold"><h1>Register an account</h1></div>
        <div class="p-2 w-full">
            <label class="w-full" for="nickname">Name</label>
            <span class="w-full text-red-500" v-if="errors.nickname">{{errors.nickname[0]}}</span>
            <input class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2" placeholder="Name" type="text" v-model="form.nickname" >
        </div>
        <div class="p-2 w-full">
            <label for="email">Your e-mail</label>
            <input class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2" placeholder="Email" type="email" v-model="form.email">
        </div>
        <div class="p-2 w-full">
            <label for="password">Password</label>
            <input class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2" placeholder="Password" type="password" v-model="form.password" name="password">
        </div>
        <div class="p-2 w-full mt-4">
            <button @click.prevent="saveForm" type="submit" class="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Register</button>
        </div>
    </div> 
</div>`,
    data() {
        return {
            form: {
                nickname: "",
                email: "",
                password: "",
                description: ""
            },
            errors: []
        };
    },
    methods: {
        saveForm() {
            const enviar = new FormData();
            enviar.append('nickname', this.form.nickname);
            enviar.append('email', this.form.email);
            enviar.append('password', this.form.password);
            enviar.append('descripcio', this.form.descripcio);

            fetch("../transversal_g1/public/api/register-user", {
                method: "POST",
                body: enviar
            }).then(() => {
                console.log("saved");
            });
        }
    }
});
Vue.component("login", {
    template: `<div>
    <div class="p-2 text-2xl text-gray-800 font-semibold"><h1>Inicia sessi??</h1></div>
    <b-form-input v-model="form.email" placeholder="Correu electr??nic" required></b-form-input>
    <b-form-input v-model="form.password" placeholder="Contrasenya" required></b-form-input>
    <b-button @click="submitLogin(); $bvModal.hide('login');" variant="primary">Login</b-button>
    </div>`,
    data: function () {
        return {
            form: {
                email: "",
                password: ""
            }
        };
    },
    methods: {
        submitLogin() {

            const enviar = new FormData();
            enviar.append('email', this.form.email);
            enviar.append('password', this.form.password);

            fetch("../transversal_g1/public/api/login", {
                method: "POST",
                body: enviar
            }).then(response => response.json()).then((data) => {
                this.$emit("dadesUsuari", data);
                console.log(data);
                store = userStore()
                store.setEstado(this.infoLogin);
                store.logged = true;
            }).catch(() => {
                this.$emit("evtDadesUsuari", "hola");
                console.error('Error:');

            });
        }
    }
});
const ranking = Vue.component("ranking", {
    template: `<div>

    <navbar></navbar>
    
    <foot></foot>
    </div>`,
    methods: {}
});
Vue.component("navbar", {
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
                        <a class="nav-link" > <router-link to="/"><button type="button"
                        class="btn btn-outline-secondary">Home</button></router-link>    </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" ><router-link to="/partida"><button type="button"
                                class="btn btn-outline-secondary">Jugar</button></router-link></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/ranking"><button type="button"
                                class="btn btn-outline-secondary">Ranking</button></a></a>

                    </li>

                </ul>
                <form class="d-flex">
                    <div v-show="!iniciat">
                        <button v-b-modal.login block @click="$bvModal.show('login')" class="btn btn-secondary my-2 my-sm-0">Login/Signup</button>
                    </div>
                    <div v-show="iniciat">
                        <h2>Benvingut usuari</h2>
                    </div>
                </form>
            </div>
        </div>
    </nav>

    <b-modal id="login" hide-footer hide-header>
    <template #modal-title>
       Inicia sessi??
    </template>
    <div class="d-block text-center">
        <div v-show="!registrar">
            <login @evtDadesUsuari="(d) => dadesUsuari = d"></login>
            <b-button @click="registrar = true">No tens compte?</b-button>

        </div>
        <div v-show="registrar">
            <register></register>
            <b-button @click="registrar = false">Ja tens compte?</b-button>
        </div>
    </div>
  </b-modal>
</div>`,
    data: function () {
        return {registrar: false, iniciat: false, dadesUsuari: {}};
    },
    methods: {}
});

Vue.component("foot", {
    template: `<div class="footer bg-primary">
    <footer >&copy; Copyright 2022 | Developed by &nbsp;</footer>

    <a href="https://www.linkedin.com/in/oscar-leal-garc%C3%ADa-6b366019b/" target="_blank"><button type="button" class="btn btn-secondary">Oscar Leal</button></a>
    <a href="https://www.linkedin.com/in/mart%C3%AD-p%C3%A9rez-ballester-236319256/" target="_blank"><button type="button" class="btn btn-secondary">Marti Sala</button> </a>
    <a href="https://www.linkedin.com/in/gurpreet-singh-0741021b2" target="_blank"><button type="button" class="btn btn-secondary">Gurpreet Singh</button></a>
    
  </div>`,
    methods: {}
});

const home = Vue.component("home", {
    template: `<div>
    <navbar></navbar>
    
    
    <div class="logo"><b>T<span>ri</span>vi<span>a</span>L</b></div>
    <div class="logo omg"><b><span>O</span><span>M</span><span>G</span></b></div>
    
    <router-link to="/partida"><a class="play_btn button">
        Jugar
      </a></router-link>
      <foot></foot>
    </div>`,
    data: function () {
        return {};
    },
    methods: {}
});

const partida = Vue.component("opcions", {
    data: function () {
        return {
            categoria: "",
            dificultat: "",
            preguntesRespostes: [],
            opcionsTriades: false,
            preguntaActual: 0,
            dadesPartida: {
                punts: 0,
                tempsPartida: 0,
                acabada: false
            }
        };
    },
    template: `<div>

    <navbar></navbar>
    <div v-show="!opcionsTriades" class="card_despligue">
    <img src="./img/logo_omg.png" alt="">
    <input class="deplegue deplegue_nombre" type="text" placeholder="Nick name" ></input>
    <select class="deplegue deplegue_difficult" v-model="dificultat">
        <option selected value="">Selecciona una dificultat</option>
        <option value="easy">Facil</option>
        <option value="medium">Mitja</option>
        <option value="hard">Dificil</option>
    </select>
    <select class="deplegue deplegue_category" v-model="categoria">
        <option selected  value="">Selecciona una categoria</option>
        <option value="history">Historia</option>
        <option value="film_and_tv">Cinema</option>
        <option value="sport_and_leisure">Esports</option>
    </select>
    <br><br>
    <button @click="buscarQuiz" class="btn glass_btn"> Comen??a </button>
    </div>

    <div v-show="opcionsTriades">
    <a></a>
    <div v-for="(preg, index) in preguntesRespostes"> 
        <pregunta @sumarTemps="(s) => dadesPartida.tempsPartida += s" @sumaPunts="dadesPartida.punts++" @next-question="preguntaActual++" v-if="preguntaActual==index" :estatP=dadesPartida :infoPreguntes=preg :index=index></pregunta>
    </div>
    <div v-if="preguntaActual == 10">
        <h1>Has encertat {{dadesPartida.punts}}/10</h1>
        <h1>Has trigat un total de {{dadesPartida.tempsPartida}} segons</h1>
        <b-button @click="addGame">Guardar partida</b-button>
    </div>
    </div>
    <foot></foot>
    </div>`,
    methods: {
        buscarQuiz: function () {
            if (this.categoria != "" && this.dificultat != "") {
                fetch("https://the-trivia-api.com/api/questions?categories=" + this.categoria + "&limit=10&difficulty=" + this.dificultat).then((response) => response.json()).then((data) => {
                    this.preguntesRespostes = data;
                });
                this.opcionsTriades = true;
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Escull la dificultat y la categoria ',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

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
            enviar.append("difficulty", numDificultat);
            enviar.append("category", this.preguntesRespostes[0].category);
            enviar.append("json", JSON.stringify(this.preguntesRespostes));

            fetch("../transversal_g1/public/api/store-game", {
                method: "POST",
                body: enviar
            });
        }
    }
});

Vue.component("pregunta", {
    props: [
        "infoPreguntes", "index", "estatP"
    ],
    data: function () {
        return {
            respostesOrdenades: [],
            respostesDesordenades: [],
            respostaContestada: false,
            segons: 20,
            b0: "",
            b1: "",
            b2: "",
            b3: "",
            
        };
    },
    mounted() {
        this.respostesOrdenades = [this.infoPreguntes.correctAnswer, this.infoPreguntes.incorrectAnswers[0], this.infoPreguntes.incorrectAnswers[1], this.infoPreguntes.incorrectAnswers[2],];
        this.respostesDesordenades = this.respostesOrdenades;
        for (let i = this.respostesDesordenades.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.respostesDesordenades[i];
            this.respostesDesordenades[i] = this.respostesDesordenades[j];
            this.respostesDesordenades[j] = temp;
        }
    },
    template: `<div>
    <section id="slider">
        <input type="radio" name="slider" id="item" v-for="item in 10" disabled >
        <section id="slide2">
            <h1 class="slide1_pregunta">{{ infoPreguntes.question }}</h1>
            <b-button :variant="b0" @click="respostaCorrecte(0)" class="slide1_btn" type="button">{{ respostesDesordenades[0] }}</b-button>
            <b-button :variant="b1" @click="respostaCorrecte(1)" class="slide1_btn" type="button">{{ respostesDesordenades[1] }}</b-button>
            <b-button :variant="b2" @click="respostaCorrecte(2)" class="slide1_btn" type="button">{{ respostesDesordenades[2] }}</b-button>
            <b-button :variant="b3" @click="respostaCorrecte(3)" class="slide1_btn" type="button">{{ respostesDesordenades[3] }}</b-button>
        </section>
        <section id="slide5">
            <h1 class="slide1_pregunta">{{ infoPreguntes.question }}</h1>
            <b-button :variant="b0" @click="respostaCorrecte(0)" class="slide1_btn" type="button">{{ respostesDesordenades[0] }}</b-button>
            <b-button :variant="b1" @click="respostaCorrecte(1)" class="slide1_btn" type="button">{{ respostesDesordenades[1] }}</b-button>
            <b-button :variant="b2" @click="respostaCorrecte(2)" class="slide1_btn" type="button">{{ respostesDesordenades[2] }}</b-button>
            <b-button :variant="b3" @click="respostaCorrecte(3)" class="slide1_btn" type="button">{{ respostesDesordenades[3] }}</b-button>
        </section>
        <section id="slide1">
            <h1 class="slide1_pregunta">{{ infoPreguntes.question }}</h1>
            <b-button :variant="b0" @click="respostaCorrecte(0)" class="slide1_btn" type="button">{{ respostesDesordenades[0] }}</b-button>
            <b-button :variant="b1" @click="respostaCorrecte(1)" class="slide1_btn" type="button">{{ respostesDesordenades[1] }}</b-button>
            <b-button :variant="b2" @click="respostaCorrecte(2)" class="slide1_btn" type="button">{{ respostesDesordenades[2] }}</b-button>
            <b-button :variant="b3" @click="respostaCorrecte(3)" class="slide1_btn" type="button">{{ respostesDesordenades[3] }}</b-button>
        </section>
    </section>
    <div class="counter"> {{ segons }} </div>
    
   </div>`,
    methods: {
        respostaCorrecte: function (nRes) {
            this.respostaContestada = true;
            if (this.respostesDesordenades[nRes] == this.infoPreguntes.correctAnswer) {
                this.buttonColors("success", nRes);
                setTimeout(() => {
                    this.$emit("sumaPunts");
                    this.$emit("next-question");
                }, 2000);
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
                    this.$emit("next-question");
                }, 2000);
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
        },
        countDownTimer() {
            if (this.segons > 0 && this.respostaContestada == false) {
                setTimeout(() => {
                    this.segons -= 1;
                    if (this.respostaContestada == true) {
                        this.segons += 1;
                        this.$emit("sumarTemps", (this.segons - 20) * -1);
                    }
                    this.countDownTimer();
                }, 1000);
            }
            if (this.segons == 0) {
                this.$emit("sumarTemps", (this.segons - 20) * -1);
                this.$emit("next-question");
            }
        }
    },
    created() {
        this.countDownTimer();
    }
});

const routes = [
    {
        path: "/",
        component: home
    }, {
        path: "/partida",
        component: partida
    }, {
        path: "/ranking",
        component: ranking
    },
];

const router = new VueRouter({routes});

Vue.use(BootstrapVue);
let app = new Vue({
    el: "#app",
    router,
    pinia,
    data: {},
    computed: {
        ...Pinia.mapState(userStore, ['loginInfo', 'logged'])
    }
});
