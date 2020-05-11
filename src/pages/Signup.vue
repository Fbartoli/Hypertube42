<template>
  <v-card>
    <v-card-title primary-title>
      <div class="headline">{{ $t('title') }}<br /><br /></div>
    </v-card-title>
    <v-container v-if="storeChecker === 'OK'">
      Your account was successfully activated !
    </v-container>
    <v-container v-else>
      <v-form>
        <v-row>
          <v-col cols="12">
            {{ $t('question') }}<br /><br />
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              :label="$t('email')"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              outlined
              clearable
              color="blue"
              type="Email"
            />
          </v-col>
        </v-row>
        <v-btn
          @click="validActivationAccountAgain(email)"
          x-large
          color="blue"
          :disabled="$v.$invalid"
        >
          {{ $t('askActivationAccountAgain') }}
        </v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      email: '',
      signupToken: this.$route.params.signup,
    }
  },
  // props: {
  //   resource: {
  //     type: String,
  //     required: false,
  //     default: ''
  //   }
  // },
  computed: {
    ...mapGetters({
      storeChecker: 'Email/storeChecker',
    }),
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push(this.$t('emailRule'))
      !this.$v.email.email && errors.push(this.$t('emailRule'))
      return errors
    },
  },
  validations: {
    email: {
      email,
      required,
    },
  },
  methods: {
    ...mapActions('Email', ['getActivationTokenAgain']),
    validActivationAccountAgain(activationEmail) {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        console.log('Signup.vue_Email Activation AGAIN_ ', activationEmail)
        this.getActivationTokenAgain(activationEmail)
      }
    },
  },
}
</script>

<style scoped></style>
<i18n>
{
  "en": {
    "title": "Account Validation",
    "question": "Do you want a new link to activate your account ?",
    "email": "Email",
    "emailRule": "Email is required",
    "askActivationAccountAgain": "Get a new account activation email"
  },
  "fr": {
    "title": "Activation de votre compte",
    "question": "Voulez-vous un nouveau lien pour activer votre compte ?",
    "email": "Email",
    "emailRule": "Email is required",
    "askActivationAccountAgain": "Obtenir un nouvel email d'activation de compte"
  }
}
</i18n>
