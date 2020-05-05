<template>
  <v-container>
    <v-card width="1000">
      <v-form ref="signUpForm">
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          :label="$t('email')"
          @blur="$v.email.$touch()"
          class="pa-5"
          outlined
          clearable
          color="primary"
          type="text"
        ></v-text-field>
        <v-text-field
          v-model="username"
          :error-messages="usernameErrors"
          :label="$t('username')"
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
          class="pa-5"
          outlined
          clearable
          color="primary"
          type="text"
        ></v-text-field>
        <v-text-field
          v-model="firstName"
          :label="$t('firstName')"
          class="ma-5"
          outlined
          clearable
          color="primary"
          type="text"
          required
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          :label="$t('lastName')"
          class="ma-5"
          outlined
          clearable
          color="primary"
          type="text"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          :label="$t('password')"
          :counter="15"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          class="ma-5"
          outlined
          clearable
          color="primary"
          type="Password"
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
        <v-checkbox class="ma-5" :label="$t('agree')" v-model="agreeToTerms">
        </v-checkbox>
        <v-btn
          class="ma-5"
          @click="
            register({
              email,
              username,
              lastName,
              firstName,
              password,
            })
          "
          :disabled="$v.$invalid && agreeToTerms"
          x-large
          color="primary"
        >
          {{ $t('register') }}
        </v-btn>
        <v-btn class="ma-5" @click="autofill" x-large color="primary">
          {{ $t('autofill') }}
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      agreeToTerms: false,
      // username: '',
      password: '',
      lastName: '',
      firstName: '',
    }
  },
  props: {
    email: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      default: '',
    },
  },
  methods: {
    ...mapActions('Registration', ['register']),
    autofill() {
      ;(this.agreeToTerms = true),
        (this.email = 'chroniclesofselene@gmail.com'),
        (this.username = 'test'),
        (this.password = 'qwerty'),
        (this.lastName = 'Duoquadra'),
        (this.firstName = 'SeriousStudent')
    },
  },
  computed: {
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.minLength &&
        errors.push('Name must be at least 3 characters long')
      !this.$v.username.maxLength &&
        errors.push('Name must be at most 15 characters long')
      !this.$v.username.required && errors.push('Name is required.')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength &&
        errors.push('Password must be at least 3 characters long')
      !this.$v.password.maxLength &&
        errors.push('Password must be at most 15 characters long')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push(this.$t('emailRule'))
      !this.$v.email.email && errors.push(this.$t('emailRule'))
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
    email: {
      email,
      required,
    },
  },
}
</script>

<style scoped></style>
<i18n>
{
  "en": {
    "email": "Email address",
    "firstName": "First name",
    "lastName": "Last name",
    "register": "Register !",
    "username": "Username",
    "password": "Password",
    "attachPicture": "Attach a profile picture",
    "agree": "Agree to terms and conditions",
    "agreeRule": "You must agree to create an account",
    "emailRule": "Email is required",
    "autofill": "Test_42_AUTOFILL"
  },
  "fr": {
    "email": "Adresse email",
    "firstName": "Prénom",
    "lastName": "Nom de famille",
    "register": "Enregistrer !",
    "username": "Nom d'utilisateur",
    "password": "Mot de passe",
    "attachPicture": "Joindre une photo de profil",
    "agree": "Accepter les termes et conditions",
    "agreeRule": "Vous devez accepter les termes et conditions pour créer un compte",
    "emailRule": "Un email est requis",
    "autofill": "Test_42_AUTOFILL"
  }
}
</i18n>
