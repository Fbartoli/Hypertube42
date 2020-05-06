<template>
  <v-card>
    <v-card-title primary-title>
      <div class="headline">{{ $t('title') }}<br /><br /></div>
    </v-card-title>
    <v-container>
      Token du lien d'activation du compte:<br />
      {{ signupToken }}<br />
    </v-container>
    <v-card-text class="mt-5">
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
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
        </v-container>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        @click="validActivationAccountAgain(email)"
        x-large
        color="blue"
        :disabled="$v.$invalid"
      >
        {{ $t('askActivationAccountAgain') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
// import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      email: '',
      signupToken: this.$route.params.signup,
    }
  },
  // props: {
  //   userInfo: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  computed: {
    //   ...mapGetters({
    //     userProfile: 'App/storeUser',
    //   }),
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
    "email": "Email",
    "emailRule": "Email is required",
    "askActivationAccountAgain": "Get a new account activation email"
  },
  "fr": {
    "title": "Activation de votre compte",
    "email": "Email",
    "emailRule": "Email is required",
    "askActivationAccountAgain": "Obtenir un nouvel email d'activation de compte"
  }
}
</i18n>
