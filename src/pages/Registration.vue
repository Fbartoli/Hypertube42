<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-form ref="signUpForm" v-model="formValid">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            outlined
            clearable
            readonly
            color="primary"
            @blur="$v.email.$touch()"
            :label="$t('email')"
            type="text"
            required
          ></v-text-field>
          <v-text-field
            v-model="username"
            outlined
            clearable
            color="primary"
            :label="$t('username')"
            type="text"
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="firstName"
            outlined
            clearable
            color="primary"
            :label="$t('firstName')"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            outlined
            clearable
            color="primary"
            :label="$t('lastName')"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            :counter="15"
            outlined
            clearable
            color="primary"
            :label="$t('password')"
            type="Password"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
          <v-checkbox
            :label="$t('agree')"
            :rules="agreeToTermsRules"
            v-model="agreeToTerms"
          >
          </v-checkbox>
          <v-btn
            class="mr-4"
            @click="
              register({
                email,
                username,
                lastName,
                firstName,
                password,
              })
            "
            :disabled="$v.$invalid"
            x-large
            color="primary"
            >{{ $t('register') }}</v-btn
          >
          <v-btn class="mr-4" color="warning" x-large @click="resetValidation"
            >Reset validation</v-btn
          >
          <v-btn color="red" x-large @click="resetForm">Reset</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      agreeToTerms: false,
      username: '',
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
  },
  methods: {
    ...mapActions('Registration', ['register']),
    resetForm() {
      this.$refs.signUpForm.reset()
    },
    resetValidation() {
      this.$refs.signUpForm.resetValidation()
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
    "email": "Email address",
    "firstName": "First name",
    "lastName": "Last name",
    "register": "Register !",
    "username": "Username",
    "password": "Password",
    "attachPicture": "Attach a profile picture",
    "agree": "Agree to terms and conditions",
    "agreeRule": "You must agree to create an account",
    "emailRule": "Email is required"
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
    "emailRule": "Un email est requis"
  }
}
</i18n>
