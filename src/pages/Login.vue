<template>
  <v-card width="80%" class="mx-auto mt-5">
    <v-card-title class="pb-0">
      <h1>Login</h1>
    </v-card-title>
    <v-card-text class="mt-5">
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="username"
                :error-messages="usernameErrors"
                :counter="15"
                outlined
                clearable
                color="red"
                label="Username"
                type="text"
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
              >
                <template v-slot:prepend>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                    </template>
                    {{ $t('username') }}
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                :counter="15"
                outlined
                clearable
                color="red"
                label="Password"
                type="Password"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              >
                <template v-slot:prepend>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                    </template>
                    {{ $t('password') }}
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        @click="submit(username, password)"
        x-large
        color="red"
        :disabled="$v.$invalid"
      >
        {{ $t('login') }}
      </v-btn>
      <v-btn :href="links.qd" x-large color="red">{{ $t('42') }}</v-btn>
      <v-btn :href="links.github" x-large color="red">
        {{ $t('git') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      username: '',
      password: '',
      token: '',
      links: {
        github:
          'https://github.com/login/oauth/authorize?client_id=d2c25f95cfaddbb9f2a7&redirect_uri=http://localhost:5555/oauth/gh',
        qd:
          'https://api.intra.42.fr/oauth/authorize?client_id=a403255ef57b13e9a31155d4aa015ced40fab62d5617749dbf9f36f518fbee06&redirect_uri=http%3A%2F%2Flocalhost%3A5555%2Foauth%2F42&response_type=code',
      },
    }
  },
  methods: {
    ...mapActions('App', ['login']),
    submit(username, password) {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.login({ username, password })
      }
    },
  },
  computed: {
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.minLength && errors.push(this.$t('usernameRuleMin'))
      !this.$v.username.maxLength && errors.push(this.$t('usernameRuleMax'))
      !this.$v.username.required && errors.push(this.$t('usernameRuleRequired'))
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength &&
        errors.push('Password must be at least 6 characters long')
      !this.$v.password.maxLength &&
        errors.push('Password must be at most 15 characters long')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
  },
  validations: {
    username: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(15),
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(15),
    },
  },
}
</script>

<style scoped></style>
<i18n>
{
  "en": {
    "username": "Username",
    "password": "Password",
    "login":"Log in",
    "42": "Log in with 42",
    "git": "Log in with Github",
    "usernameRuleMin": "Username must be at least 3 characters long",
    "usernameRuleMax": "Username must be at most 15 characters long",
    "usernameRuleRequired": "Username is required"
  },
  "fr": {
    "username": "Nom d'utilisateur",
    "password": "Mot de passe",
    "login":"Connexion",
    "42": "Connexion avec 42",
    "git": "Connexion avec Github",
    "usernameRuleMin": "Le nom d'utilisateur doit avoir 3 caractères minimum",
    "usernameRuleMax": "Le nom d'utilisateur doit avoir 15 caractères maximum",
    "usernameRuleRequired": "Le nom d'utilisateur est requis"
  }
}
</i18n>
