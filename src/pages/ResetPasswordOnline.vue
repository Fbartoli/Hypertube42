<template>
  <v-card width="80%" class="mx-auto mt-5">
    <v-card-title class="pb-0">
      <h1>{{ $t('title') }}</h1>
    </v-card-title>
    <v-card-text class="mt-5">
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="password"
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
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="new_password"
                :error-messages="passwordErrors"
                :counter="15"
                outlined
                clearable
                color="blue"
                :label="$t('new_password')"
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
        @click="validOnlineNewPassword(password, new_password)"
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
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      password: '',
      new_password: '',
    }
  },
  // props: {
  //   userInfo: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  computed: {
    ...mapGetters({
      storeUsername: 'App/storeUsername',
    }),
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
    ...mapActions('App', ['putOnlineNewPassword']),
    validOnlineNewPassword(password, new_password) {
      const onlineNewPassword = {
        password: password,
        new_password: new_password,
        username: this.storeUsername,
      }
      console.log('Page_obj_ ', onlineNewPassword)
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.putOnlineNewPassword({ onlineNewPassword })
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
