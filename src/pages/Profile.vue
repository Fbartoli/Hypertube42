<template>
  <v-card>
    <v-card-title primary-title>
      <div class="headline">
        {{ $t('titlea') + userProfile.username + $t('title_b') }}
      </div>
    </v-card-title>
    <div>
      <div>
        <v-container>
          <v-row>
            <v-col cols="5">
              <v-card
                :hover="true"
                v-ripple="{ class: `blue--text` }"
                color="deep-blue lighten-5"
              >
                <v-img
                  aspect-ratio="2"
                  class="spacer blue lighten-2"
                  no-gutters
                >
                  <v-row align="center" class="fill-height">
                    <v-col align="center" class="pa-0" cols="12">
                      <br />
                      <v-avatar class="profile indigo accent-4" size="164">
                        <v-img
                          :src="`data:image/*;base64,${userProfile.avatar}`"
                        />
                      </v-avatar>
                      <v-card-subtitle>
                        <div>
                          <div
                            class="headline font-weight-bold blue--text text--accent-4"
                          >
                            {{ userProfile.username }}
                          </div>
                          <a
                            class="title font-italic blue--text text--accent-3"
                          >
                            {{ userProfile.firstname }}
                          </a>
                          <a
                            class="title font-italic blue--text text--accent-3"
                          >
                            {{ userProfile.lastname }}
                          </a>
                        </div>
                      </v-card-subtitle>
                    </v-col>
                  </v-row>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      target: this.$route.params.profile,
      // username: 'test_username',
      // password: 'test_password',
      // lastName: 'test_lastname',
      // firstName: 'test_firstname',
      valid: true,
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
      userProfile: 'App/storeUser',
    }),
  },
  methods: {
    ...mapActions('App', ['getUser', 'putUserInfo', 'putToken']),
  },
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
