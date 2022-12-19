const userStore = Pinia.defineStore('usuario', {
    state() {
        return {logged: false, data: {}}
    }
})

Vue.use(Pinia.PiniaVuePlugin)
const pinia = Pinia.createPinia()

Vue.component("register", {
    template: `
    <div >
            <div class="titol__modal__register">Register</div>
            <div>
                <div v-show="!creat" class="form_login">
                        <input class="register_user" placeholder="Nom" type="text" v-model="form.nickname" :class="{'input--error':error.nom}"> 
                        <input class="register_user" placeholder="Email" type="email" v-model="form.email" :class="{'input--error':error.correu}">
                        <input class="register_pass"  placeholder="Password" type="password" v-model="form.password" name="password" :class="{'input--error':error.contrasenya}">
                    <div class="p-2 w-full mt-4">
                        <input @click.prevent="saveForm" type="submit" class="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    </div>
                </div>
                <div v-show="creat">
                    <h2>User successfully created!</h2>
                </div>
            </div>
        </div>`,
    data() {
        return {
            creat: false,
            error: {
                nom: false,
                correu: false,
                contrasenya: false
            },
            form: {
                nickname: "",
                email: "",
                password: "",
                description: ""
            }
        };
    },
    methods: {
        saveForm() {
            if (this.form.nickname.length < 4 || this.form.nickname.length > 255) {
                this.error.nom = true;
            } else {
                this.error.nom = false;
            }
            if (this.form.email.length < 4 || this.form.email.length > 255 || !this.form.email.includes("@") || !this.form.email.includes(".")) {
                this.error.correu = true;
            } else {
                this.error.correu = false;
            }
            if (this.form.password.length < 7) {
                this.error.contrasenya = true;
            } else {
                this.error.contrasenya = false;
            }

            if (!this.error.nom && !this.error.correu && !this.error.contrasenya) {
                const enviar = new FormData();
                enviar.append('nickname', this.form.nickname);
                enviar.append('email', this.form.email);
                enviar.append('password', this.form.password);
                enviar.append('descripcio', this.form.descripcio);

                fetch("http://trivial1.alumnes.inspedralbes.cat/transversal-2-lot-tr1/transversal_g1/public/api/register-user", {
                    method: "POST",
                    body: enviar
                }).then(() => {
                    this.creat = true;
                });
            }
        }
    }
});


Vue.component("login", {
    template: `<div>
    <div class="titol__modal__login">Login</div>
    <form class="form_login">
    <b-form-input type="email" v-model="form.email" placeholder="Email" class="login_user" required ></b-form-input>
    <b-form-input v-model="form.password" placeholder="Password" type="password" name="pass" class="login_pass" required></b-form-input>
    <b-button @click="submitLogin(); $bvModal.hide('login');" variant="primary">Login</b-button>
    </form>
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

            fetch("http://trivial1.alumnes.inspedralbes.cat/transversal-2-lot-tr1/transversal_g1/public/api/login", {
                method: "POST",
                body: enviar
            }).then(response => response.json()).then((data) => {
                store = userStore()
                store.data = data;
                store.logged = true;
            }).catch(() => {
                console.error('Error');
            });
        }
    }
});
const ranking = Vue.component("ranking", {
    template: `<div>
    <navbar></navbar>
    
    <foot></foot>
    </div>`,
    mounted() {}
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
                        <a class="nav-link" ><router-link to="/partida/normal"><button type="button"
                                class="btn btn-outline-secondary">Play</button></router-link></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/ranking"><router-link to="/ranking"><button type="button"
                                class="btn btn-outline-secondary">Ranking</button></router-link></a></a>
                    </li>

                </ul>
                <div v-show="!isLogged">
                <button v-b-modal.login class="btn btn-secondary" style="border-radius: 10%"><b-icon icon="person-fill"></b-icon></button>
                <button v-b-modal.navbar class="btn btn-secondary" style="border-radius: 10%"><i class='bx bx-menu'></i></button>
                </div>
                <div v-show="isLogged">
                    <perfil></perfil>
                </div>
            </div>
        </div>
    </nav>

    <b-modal id="login" hide-footer hide-header>
    <div class="d-block text-center">
        <div v-show="!registrar">
            <login></login>
            <b-button @click="registrar = true" class="login_btn_register">Don't you have an account?</b-button>

        </div>
        <div v-show="registrar">
            <register></register>
            <b-button @click="registrar = false"class="login_btn_register">Already signed up?</b-button>
        </div>
    </div>
  </b-modal>
</div>`,
    data: function () {
        return {registrar: false, iniciat: false, dadesUsuari: {}};
    },
    computed: {
        isLogged() {
            return userStore().logged;
        }
    }
});

Vue.component("perfil", {
    template: `<div>
    <button v-b-modal.perfil block @click="$bvModal.show('perfil')" class="btn btn-secondary my-2 my-sm-0"><b-icon icon="person-fill"></b-icon></button>
    
    <b-modal id="perfil" hide-footer hide-header>
    <div class="d-block text-center">
        <div class="titol__modal__profile">{{ getDataUser.nickname }}'s Profile</div>
        <p>Username: {{ getDataUser.nickname }}</p>
        <p>Description: {{ getDataUser.description }}</p>
        <p>Email: {{ getDataUser.email }}</p>
        <p>Creation date: {{ getDataUser.created_at }}</p>
        <b-button @click="LogOut(); $bvModal.hide('perfil');">Log Out</b-button>
    </div>
  </b-modal>
  </div>`,
    computed: {
        getDataUser() {
            return userStore().data;
        }
    },
    methods: {
        LogOut() {
            userStore().logged = false;
        }
    }
});

Vue.component("foot", {template: `<div class="footer bg-primary">
    <footer >&copy; Copyright 2022 | Developed by &nbsp;</footer>

    <a href="https://www.linkedin.com/in/oscar-leal-garc%C3%ADa-6b366019b/" target="_blank"><button type="button" class="btn btn-secondary">Oscar Leal</button></a>
    <a href="https://www.linkedin.com/in/mart%C3%AD-p%C3%A9rez-ballester-236319256/" target="_blank"><button type="button" class="btn btn-secondary">Marti Sala</button> </a>
    <a href="https://www.linkedin.com/in/gurpreet-singh-0741021b2" target="_blank"><button type="button" class="btn btn-secondary">Gurpreet Singh</button></a>
    
  </div>`});

const home = Vue.component("home", {
    template: `<div>
    <navbar></navbar>
    <div class="cards__home" >
        <div v-show="!isLogged"></div>
        <div class="card card__ranking" v-show="isLogged">
            <p class="ranking__gameday__neonText">Ranking</p>
            <hr>
            <div class="table_ranking effect__neon__mix">
            <b-tabs content-class="mt-3 " justified>
                <b-tab title="First" class="titol__first__ranking" active><b-table striped hover :items="global"></b-table></b-tab>
                <b-tab title="Second"><p>I'm the second tab</p><b-table striped hover :items="facil"></b-table></b-tab>
                <b-tab title="very, very long title"><p>I'm the tab with the very, very long title</p><b-table striped hover :items="normal"></b-table></b-tab>
                <b-tab title="disabled"><p>I'm a disabled tab!</p><b-table striped hover :items="dificil"></b-table></b-tab>
            </b-tabs>
            </div>
        </div>
        <div class="card card__logo" >
            <div class="logo__trivial"><b>T<span>ri</span>vi<span>a</span>L</b></div>
            <div class="logo__omg"><b><span>O</span><span>M</span><span>G</span></b></div>
            <router-link to="/partida/normal" style="text-decoration: none">
                <a class="btn__play__home">Play</a>
            </router-link>
        </div>
        <div class="card card__gameday" v-show="isLogged">
            <p class="ranking__gameday__neonText">Game of the day</p>
            <div class="table_ranking effect__neon__mix">
                <b-table striped hover :items="global"></b-table>
            </div>
            <router-link to="/partida/daily"><a class="btn-game-day btn btn-outline-secondary">Game of the day</a></router-link>
        </div>
    </div>
    <foot></foot>
    </div>`,
    data: function () {
        return {};
    },
    computed: {
        isLogged() {
            return userStore().logged;
        }
    }
});

const partida = Vue.component("partida", {
    props: ['tipus'],
    data: function () {
        return {
            categoria: "",
            dificultat: "",
            preguntesRespostes: [],
            opcionsTriades: false,
            preguntaActual: 0,
            gameSaved: "Save Game",
            puntuacioTotal: 0,
            a: "primary",
            dadesPartida: {
                punts: 0,
                tempsPartida: 0,
                acabada: false
            }
        };
    },
    mounted() {
        if (this.tipus == "daily") {
            this.opcionsTriades = true;
            fetch("http://trivial1.alumnes.inspedralbes.cat/transversal-2-lot-tr1/transversal_g1/public/api/daily").then((response) => response.json()).then((data) => {
                this.preguntesRespostes = JSON.parse(data);
            });
        }

        // window.onbeforeunload = function() {
        //    return "Data will be lost if you leave the page, are you sure?";
        // };
    },
    template: `<div>
    <div v-show="!opcionsTriades || preguntaActual == 10">
        <navbar></navbar>
    </div>
    <div v-show="!opcionsTriades" class="card__options">
        <div class="card border-secondary card__options__difficult"> 
            <div class="card-header">Difficulty</div>
            <fieldset class="card-body" >
                <input type="radio" v-model="dificultat" id="easy" value="easy"/><b-button :variant="a" for="easy" class="btn card__options__difficult__btn">Easy</b-button> <br>
                <input type="radio" v-model="dificultat" id="medium" value="medium"/><b-button for="medium" class="btn card__options__difficult__btn">Medium</b-button> <br>
                <input type="radio" v-model="dificultat" id="hard" value="hard"/><b-button for="hard" class="btn card__options__difficult__btn">Hard</b-button>
            </fieldset>
        </div>
        <div class="card__options__img">
            <img src="./img/logo_omg.png" alt="">
                <div v-if="tipus == 'normal'">
                    <button @click="buscarQuiz" class="btn card__select card__select__btn" :class="{'.glass_btn_active': (this.dificultat != '')}"> Start </button>
                </div>
            </div>
        <div class="card border-secondary card__options__categoria"> 
            <div class="card-header">Category</div>
            <div class="card-body">
                <input type="radio" v-model="categoria" id="history" value="history">                       <b-button class="btn card__options__categoria__btn" for="history">History</b-button>
                <input type="radio" v-model="categoria" id="film_and_tv" value="film_and_tv">               <b-button class="btn card__options__categoria__btn" for="film_and_tv">Film & TV</b-button>
                <input type="radio" v-model="categoria" id="sport_and_leisure" value="sport_and_leisure"/>  <b-button class="btn card__options__categoria__btn" for="sport_and_leisure">Sport & Leisure</b-button>
                <input type="radio" v-model="categoria" id="general_knowledge" value="general_knowledge"/>  <b-button :variant="a" class="btn card__options__categoria__btn" for="general_knowledge">General Knowledge </b-button>
                <input type="radio" v-model="categoria" id="geography" value="geography"/>                  <b-button class="btn card__options__categoria__btn" for="geography">Geography</b-button>
                <input type="radio" v-model="categoria" id="music" value="music"/>                          <b-button class="btn card__options__categoria__btn" for="music">Music</b-button>
                <input type="radio" v-model="categoria" id="science" value="science">                       <b-button class="btn card__options__categoria__btn" for="science">Science</b-button>
                <input type="radio" v-model="categoria" id="arts_and_literature" value="arts_and_literature"/> <b-button class="btn card__options__categoria__btn" for="arts_and_literature">Arts & Literature</b-button>
                <input type="radio" v-model="categoria" id="food_and_drink" value="food_and_drink"/>        <b-button class="btn card__options__categoria__btn" for="food_and_drink">Food & Drink</b-button>
                <input type="radio" v-model="categoria" id="society_and_culture" value="society_and_culture"/><b-button  class="btn card__options__categoria__btn" for="society_and_culture">Society & Culture</b-button>
            </div>
        </div>
    
    <br><br>
        
    </div>
    <div v-show="!opcionsTriades">
        <foot></foot>
    </div>
    <div v-show="opcionsTriades">
    <b-col v-for="(preg, index) in preguntesRespostes"> 
        <pregunta @sumarTemps="(s) => dadesPartida.tempsPartida += s" @sumaPunts="(n) => sumarPuntuacio(index, n)" @next-question="preguntaActual++" v-if="preguntaActual==index" :estatP=dadesPartida :infoPreguntes=preg :index=index></pregunta>
    </b-col>

    <div>
        <b-button v-for="param in 10" class="check" disabled></b-button>
    </div>

    <div v-if="preguntaActual == 10">
        <section id="slider_final_quiz">
            <div class="titol__modal__gameover game_over">Game <b>Over</b></div>
            <div class="counter1 final_quiz_segons"> {{dadesPartida.punts}}/10</div> 
            <div class="counter2 final_quiz_segons"> {{dadesPartida.tempsPartida}}s</div>
            <div class="counter2 final_quiz_segons"> {{puntuacioTotal}}</div>
            
            <b-button v-if="isLogged" @click="addGame();" class="final_quiz_save_btn">{{ gameSaved }}</b-button>
            <b-button v-if="!isLogged" v-b-modal.login class="final_quiz_save_btn">{{ gameSaved }}</b-button>
                <router-link to="/"><b-button class="final_quiz_play_btn" v-if="tipus == 'normal'">Play Again</b-button></router-link to="/">
                <router-link to="/"><b-button class="final_quiz_play_btn" v-if="tipus == 'daily'">Play normal game</b-button></router-link to="/">
        </section>
        <foot></foot>
    </div>
    </div>
    </div>`,
    computed: {
        getDataUser() {
            return userStore().data;
        },
        isLogged() {
            return userStore().logged;
        }
    },
    methods: {
        onChange() {
            if (this.categoria != "" && this.dificultat != "") { // this.opcionsTriades = true; //cambiar variable
            };
        },
        sumarPuntuacio(index, num) {
            if (num == 1) {
                this.dadesPartida.punts += num;
                if (userStore().logged) {
                    document.querySelector(".check:nth-child(" + (
                        index + 1
                    ) + ")").style.backgroundColor = "green";
                }
            } else {
                if (userStore().logged) {
                    document.querySelector(".check:nth-child(" + (
                        index + 1
                    ) + ")").style.backgroundColor = "red";
                }
            }
            if (this.dadesPartida.punts > 4) {
                this.puntuacioTotal = (200 - this.dadesPartida.tempsPartida) * this.dadesPartida.punts;
            }
        },
        buscarQuiz: function () {
            console.log(this.categoria+' '+this.dificultat);
            if (this.categoria != "" && this.dificultat != "") {
                fetch("https://the-trivia-api.com/api/questions?categories=" + this.categoria + "&limit=10&difficulty=" + this.dificultat).then((response) => response.json()).then((data) => {
                    this.preguntesRespostes = data;
                });
                this.opcionsTriades = true;
            } else {
                Swal.fire({
                    position: 'center',
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
            this.gameSaved = "Game Saved";
            switch (this.preguntesRespostes[0].difficulty) {
                case "easy": numDificultat = 1;
                    break;
                case "medium": numDificultat = 2;
                    break;
                case "hard": numDificultat = 3;
                    break;
            }

            //enviar.append("puntuation", this.puntuacioTotal);
            enviar.append("iduser", userStore().data.id);
            enviar.append("type", this.tipus);
            enviar.append("difficulty", numDificultat);
            enviar.append("category", this.preguntesRespostes[0].category);
            enviar.append("json", JSON.stringify(this.preguntesRespostes));

            fetch("http://trivial1.alumnes.inspedralbes.cat/transversal-2-lot-tr1/transversal_g1/public/api/store-game", {
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
            b3: ""
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
        <section id="slide1">
            <h1 class="slide1_pregunta">{{ infoPreguntes.question }}</h1>
            <b-button :variant="b0" @click="respostaCorrecte(0)" class="slide1_btn" type="button">{{ respostesDesordenades[0] }}</b-button>
            <b-button :variant="b1" @click="respostaCorrecte(1)" class="slide1_btn" type="button">{{ respostesDesordenades[1] }}</b-button>
            <b-button :variant="b2" @click="respostaCorrecte(2)" class="slide1_btn" type="button">{{ respostesDesordenades[2] }}</b-button>
            <b-button :variant="b3" @click="respostaCorrecte(3)" class="slide1_btn" type="button">{{ respostesDesordenades[3] }}</b-button>
        </section>
    </section>
    <div>
        <h2 class="quiz_index_pregunta"> Pregunta {{ index+1 }} </h2>
        <div class="counter"> {{ segons }} </div>    
   </div>
   </div>`,
    computed: {
        isLogged() {
            return userStore().logged;
        }
    },
    methods: {
        respostaCorrecte: function (nRes) {
            this.respostaContestada = true;
            if (this.respostesDesordenades[nRes] == this.infoPreguntes.correctAnswer) {
                if (userStore().logged) {
                    this.buttonColors("success", nRes);
                }
                setTimeout(() => {
                    this.$emit("sumaPunts", 1);
                    this.$emit("next-question");
                }, 2000);
                if (userStore().logged) {
                    for (let i = 0; i < 4; i++) {
                        if (i != nRes) {
                            this.buttonColors("danger", i);
                        }
                    }
                }
            } else {
                if (userStore().logged) {
                    for (let i = 0; i < 4; i++) {
                        if (this.respostesDesordenades[i] != this.infoPreguntes.correctAnswer) {
                            this.buttonColors("danger", i);
                        } else {
                            this.buttonColors("success", i);
                        }
                    }
                }
                setTimeout(() => {
                    this.$emit("sumaPunts", 0);
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
                this.$emit("sumaPunts", 0);
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
        path: "/partida/:tipus",
        component: partida,
        props: true
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
        ...Pinia.mapState(userStore, ['data', 'logged'])
    }
});

