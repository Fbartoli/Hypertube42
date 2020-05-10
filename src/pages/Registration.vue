<template>
  <v-container>
    <v-card width="1000">
      <br />
      <v-form ref="signUpForm">
        <v-text-field
          v-model="$v.email.$model"
          :error-messages="emailErrors"
          :label="$t('email')"
          @blur="$v.email.$touch()"
          class="ma-5"
          outlined
          clearable
          color="primary"
          type="text"
        />

        <v-text-field
          v-model="$v.username.$model"
          :error-messages="usernameErrors"
          :label="$t('username')"
          @blur="$v.username.$touch()"
          class="ma-5"
          outlined
          clearable
          color="primary"
          type="text"
        />

        <v-text-field
          v-model="$v.firstName.$model"
          :error-messages="firstNameErrors"
          :label="$t('firstName')"
          @blur="$v.firstName.$touch()"
          class="ma-5"
          outlined
          clearable
          color="primary"
          type="text"
        />

        <v-text-field
          v-model="$v.lastName.$model"
          :error-messages="lastNameErrors"
          :label="$t('lastName')"
          @blur="$v.lastName.$touch()"
          class="ma-5"
          outlined
          clearable
          color="primary"
          type="text"
        />

        <v-text-field
          v-model="$v.password.$model"
          :error-messages="passwordErrors"
          :label="$t('password')"
          :counter="15"
          @blur="$v.password.$touch()"
          class="ma-5"
          outlined
          clearable
          color="primary"
          type="Password"
        />

        <v-text-field
          v-model="$v.repeatpassword.$model"
          :error-messages="repeatpasswordErrors"
          :label="$t('repeatpassword')"
          :counter="15"
          @blur="$v.repeatpassword.$touch()"
          class="ma-5"
          outlined
          clearable
          color="primary"
          type="Password"
        />

        <v-checkbox v-model="agreeToTerms" :label="$t('agree')" class="ma-5" />

        <v-btn
          class="ma-5"
          @click="validRegister()"
          :disabled="$v.$invalid"
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
import {
  required,
  alpha,
  alphaNum,
  minLength,
  maxLength,
  email,
  helpers,
  sameAs,
} from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
const oneLower = helpers.regex('oneLower', /[a-z]+/)
const oneUpper = helpers.regex('oneUpper', /[A-Z]+/)
const oneDigit = helpers.regex('oneDigit', /[0-9]+/)

export default {
  data() {
    return {
      agreeToTerms: false,
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      repeatpassword: '',
    }
  },
  methods: {
    ...mapActions('Registration', ['register']),
    autofill() {
      ;(this.agreeToTerms = true),
        (this.$v.email.$model = 'chroniclesofselene@gmail.com'),
        (this.$v.username.$model = 'test'),
        (this.$v.firstName.$model = 'student')(
          (this.$v.lastName.$model = 'Duoquadra')
        ),
        (this.$v.password.$model = 'qwerty')
    },
    validRegister() {
      const object = {
        email: this.$v.email.$model,
        username: this.$v.username.$model,
        firstName: this.$v.firstName.$model,
        lastName: this.$v.lastName.$model,
        password: this.$v.password.$model,
      }
      this.register(object)
    },
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push(this.$t('emailRule'))
      !this.$v.email.email && errors.push(this.$t('emailRule'))
      return errors
    },
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push(this.$t('usernameRule'))
      !this.$v.username.alphaNum &&
        errors.push('Must be alphanumeric characters [Abc123...]')
      !this.$v.username.minLength &&
        errors.push('Name must be at least 4 characters long')
      !this.$v.username.maxLength &&
        errors.push('Name must be at most 15 characters long')
      return errors
    },
    firstNameErrors() {
      const errors = []
      if (!this.$v.firstName.$dirty) return errors
      !this.$v.firstName.required && errors.push(this.$t('firstNameRule'))
      !this.$v.firstName.alpha && errors.push('Only letters please')
      !this.$v.firstName.minLength &&
        errors.push('Name must be at least 2 characters long')
      !this.$v.firstName.maxLength &&
        errors.push('Name must be at most 15 characters long')
      return errors
    },
    lastNameErrors() {
      const errors = []
      if (!this.$v.lastName.$dirty) return errors
      !this.$v.lastName.required && errors.push(this.$t('lastNameRule'))
      !this.$v.lastName.alpha && errors.push('Only letters please')
      !this.$v.lastName.minLength &&
        errors.push('Name must be at least 2 characters long')
      !this.$v.lastName.maxLength &&
        errors.push('Name must be at most 15 characters long')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push(this.$t('passwordRule'))
      !this.$v.password.alphaNum &&
        errors.push('Must be alphanumeric characters [Abc123...]')
      !this.$v.password.oneLower &&
        errors.push('1 lowercase letter [abc...] required.')
      !this.$v.password.oneUpper &&
        errors.push('1 uppercase letter [ABC...] required.')
      !this.$v.password.oneDigit && errors.push('1 number [0123...] required.')
      !this.$v.password.minLength &&
        errors.push('Password must be at least 8 characters long')
      !this.$v.password.maxLength &&
        errors.push('Password must be at most 42 characters long')
      return errors
    },
    repeatpasswordErrors() {
      const errors = []
      if (!this.$v.repeatpassword.$dirty) return errors
      !this.$v.repeatpassword.sameAsPassword &&
        errors.push('Both passwords should be identical')
      return errors
    },
  },
  validations: {
    email: {
      email,
      required,
    },
    username: {
      required,
      alphaNum,
      minLength: minLength(4),
      maxLength: maxLength(15),
    },
    firstName: {
      required,
      alpha,
      minLength: minLength(2),
      maxLength: maxLength(15),
    },
    lastName: {
      required,
      alpha,
      minLength: minLength(2),
      maxLength: maxLength(15),
    },
    password: {
      required,
      alphaNum,
      minLength: minLength(8),
      maxLength: maxLength(42),
      oneLower,
      oneUpper,
      oneDigit,
    },
    repeatpassword: {
      sameAsPassword: sameAs('password'),
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
    "repeatpassword": "Confirm Password",
    "attachPicture": "Attach a profile picture",
    "agree": "Agree to terms and conditions",
    "agreeRule": "You must agree to create an account",
    "emailRule": "Email is required",
    "usernameRule": "Username is required",
    "firstNameRule": "First Name is required",
    "lastNameRule": "Last Name is required",
    "passwordRule": "Password is required",
    "autofill": "Test_42_AUTOFILL"
  },
  "fr": {
    "email": "Adresse email",
    "firstName": "Prénom",
    "lastName": "Nom de famille",
    "register": "Enregistrer !",
    "username": "Pseudo",
    "password": "Mot de passe",
    "repeatpassword": "Confirmation du mot de passe",
    "attachPicture": "Joindre une photo de profil",
    "agree": "Accepter les termes et conditions",
    "agreeRule": "Vous devez accepter les termes et conditions pour créer un compte",
    "emailRule": "Un email est requis",
    "usernameRule": "Un pseudo est requis",
    "firstNameRule": "Prénom requis",
    "lastNameRule": "Nom requis",
    "passwordRule": "Un mot de passe est requis",
    "autofill": "Test_42_AUTOFILL"
  }
}
</i18n>
