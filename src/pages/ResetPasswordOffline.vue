<template>
  <v-card width="80%" class="mx-auto mt-5">
    <v-card-title class="pb-0">
      <h1>Reset password (offline mode)</h1>
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
        @click="submit(password, new_password)"
        x-large
        color="blue"
        :disabled="$v.$invalid"
      >
        {{ $t('title') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
// import { mapGetters } from 'vuex'
// import { mapActions } from 'vuex'

export default {
  data() {
    return {
      emailToken: this.$route.params.resetemail,
      valid: true,
    }
  },
  // props: {
  //   userInfo: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  // computed: {
  //   ...mapGetters({
  //     userProfile: 'App/storeUser',
  //   }),
  // },
  // methods: {
  //   ...mapActions('App', ['getUser', 'putUserInfo', 'putToken']),
  // },
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
