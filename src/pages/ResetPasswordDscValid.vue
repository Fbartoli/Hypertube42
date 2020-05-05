<template>
  <v-card width="80%" class="mx-auto mt-5">
    <v-card-title class="pb-0">
      <h1>{{ $t('title') }}</h1>
    </v-card-title>
    <v-container>
      TEST_New Password activation Token:<br />
      {{ passToken }}<br />
    </v-container>
    <v-card-text class="mt-5">
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="new_password"
                :error-messages="passwordErrors"
                :counter="15"
                outlined
                clearable
                color="blue"
                :label="$t('password')"
                type="Password"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        @click="validDscNewPassword(new_password)"
        x-large
        color="blue"
        :disabled="$v.$invalid"
      >
        {{ $t('changePassword') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
// import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      passToken: this.$route.params.resetemail,
      new_password: '',
      // valid: true,
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
    //     passwordToken: 'Email/storePasswordToken',
    //   }),
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
  },
  validations: {
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(15),
    },
  },
  methods: {
    // message to myself, try to refacto by using prop in the routing rather than the store
    ...mapActions('Email', ['putDscResetPassword']),
    validDscNewPassword(new_password) {
      const dscNewPassword = {
        token: this.passToken,
        new_password: new_password,
      }
      console.log('Page_obj_dscNewPassword ', dscNewPassword)
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.putDscResetPassword({ dscNewPassword })
      }
    },
  },
}
</script>

<style scoped></style>
<i18n>
{
  "en": {
    "title": "You may choose a new password !",
    "username": "Username",
    "password": "Password",
    "new_password": "New Password",
    "changePassword": "Valid my new password !"
  },
  "fr": {
    "title": "Vous pouvez choisir un nouveau mot de passe !",
    "username": "Nom d'utilisateur",
    "password": "Mot de Passe",
    "new_password": "Nouveau Mot de Passe",
    "changePassword": "Valider mon nouveau mot de passe !"
  }
}
</i18n>
