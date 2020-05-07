<template>
  <div>
    <v-container>
      <v-img src="../assets/Dreamland_Cinema_Title.jpg">
        test
      </v-img>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      email: '',
    }
  },
}
</script>

<style scoped>
#custom .custom {
  /* background-image: ; */
  background-color: green;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
</style>

<i18n>
{
  "en": {
    "email": "Email address",
    "register": "Register now !"
  },
  "fr": {
    "email": "Adresse email",
    "register": "Je m'inscris !"
  }
}
</i18n>
