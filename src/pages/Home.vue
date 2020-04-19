<template>
  <v-form class="center">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="email"
            outlined
            clearable
            color="primary"
            label="Email"
            type="text"
          >
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                </template>
                {{ $t('email') }}
              </v-tooltip>
            </template>
            <template v-slot:append-outer>
              <v-btn
                :to="{ name: 'register', params: { email } }"
                x-large
                color="red"
                style="top: -18px"
                >{{ $t('register') }}</v-btn
              >
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
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
<style scoped></style>
<i18n>
{
  "en": {
    "email": "Email address",
    "register": "Register now !"
  },
  "fr": {
    "email": "Adresse email",
    "register": "Inscris toi !"
  }
}
</i18n>
