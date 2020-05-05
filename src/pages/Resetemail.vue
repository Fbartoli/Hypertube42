<template>
  <v-card>
    <v-card-title primary-title>
      <div class="headline">Reset email Page<br /><br /></div>
    </v-card-title>
    <div>
      <div>
        <v-container>
          Token du lien d'activation:<br />
          {{ emailToken }}<br />
        </v-container>
      </div>
    </div>
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
    "titlea": " ",
    "title_b": "’s profile",
    "username": "Username",
    "firstname": "First Name",
    "lastname": "Last Name",
    "language": "Subtitles language preference"
  },
  "fr": {
    "titlea": "Profil de ",
    "title_b": " ",
    "username": "Nom d'utilisateur",
    "firstname": "Prénom",
    "lastname": "Nom",
    "language": "Langue préférée de sous-titres"
  }
}
</i18n>
