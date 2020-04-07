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
            outlined
            clearable
            color="primary"
            :label="$t('password')"
            type="Password"
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
              register({ email, username, lastName, firstName, password })
            "
            :disabled="!formValid"
            x-large
            color="primary"
            >{{ $t("register") }}</v-btn
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      formValid: false,
      agreeToTerms: false,
      agreeToTermsRules: [value => !!value || this.$t("agreeRule")],
      emailRules: [value => !!value || this.$t("emailRule")],
      username: "",
      password: "",
      lastName: "",
      firstName: ""
    };
  },
  props: {
    email: {
      type: String,
      default: ""
    }
  },
  methods: {
    ...mapActions("Registration", ["register"]),
    resetForm() {
      this.$refs.signUpForm.reset();
    },
    resetValidation() {
      this.$refs.signUpForm.resetValidation();
    }
  }
};
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
