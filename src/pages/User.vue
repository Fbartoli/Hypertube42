<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <div class="headline">{{ $t('title') }}</div>
      </v-card-title>

      <br />
      <v-divider></v-divider>
      <br />

      <v-container>
        <v-form ref="PersonalInfoForm" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="5">
              <v-text-field
                v-model.trim="userData.username"
                :rules="usernameRules"
                :label="$t('username')"
                counter="20"
                required
              />
            </v-col>
            <v-col cols="5"> </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              <v-text-field
                v-model.trim="userData.firstname"
                :rules="nameRules"
                :label="$t('firstname')"
                counter="20"
                required
              />
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model.trim="userData.lastname"
                :rules="nameRules"
                :label="$t('lastname')"
                counter="20"
                required
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="5">
              <v-select
                v-model="userData.language"
                :items="languageList"
                :label="$t('language')"
                required
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn
                @click="validatePersonalInfo"
                :disabled="!valid"
                color="blue lighten-4"
                class="mr-4"
              >
                Update my Personal Information
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>

      <br />
      <v-divider></v-divider>
      <br />

      <v-container>
        <v-form ref="EmailForm" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="10">
              <v-text-field
                v-model.trim="userData.email"
                :rules="emailRules"
                :label="$t('email')"
                counter="42"
                required
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn
                @click="validateEmail"
                :disabled="!valid"
                color="blue lighten-4"
                class="mr-4"
              >
                Update my Email
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>

      <br />
      <v-divider></v-divider>
      <br />

      <v-container>
        <v-row align="center">
          <v-col cols="5">
            <v-card
              :hover="true"
              v-ripple="{ class: `blue--text` }"
              color="deep-blue lighten-5"
            >
              <v-img aspect-ratio="2" class="spacer blue lighten-2" no-gutters>
                <v-row align="center" class="fill-height">
                  <v-col align="center" class="pa-0" cols="12">
                    <br />
                    <v-avatar class="profile indigo accent-4" size="164">
                      <v-img
                        v-if="showPictures[0]"
                        :src="`data:image/*;base64,${showPictures[0]}`"
                      />
                      <v-img
                        v-else
                        :src="`data:image/*;base64,${userData.avatar}`"
                      />
                    </v-avatar>
                    <v-card-subtitle>
                      <div>
                        <div
                          class="headline font-weight-bold blue--text text--accent-4"
                        >
                          {{ userData.username }}
                        </div>
                        <a class="title font-italic blue--text text--accent-3">
                          {{ userData.firstname }}
                        </a>
                        <a class="title font-italic blue--text text--accent-3">
                          {{ userData.lastname }}
                        </a>
                      </div>
                    </v-card-subtitle>
                  </v-col>
                </v-row>
              </v-img>
            </v-card>
          </v-col>
          <v-col cols="5">
            <v-row justify="center">
              <v-form
                id="myForm"
                ref="AvatarForm"
                v-model="valid"
                lazy-validation
              >
                <v-file-input
                  @change="displayImage(uploadPic.mypic)"
                  :rules="mypicsRules"
                  v-model="uploadPic.mypic"
                  accept="image/*"
                  counter
                  show-size
                  prepend-icon="mdi-camera"
                  placeholder="Profile Picture"
                  label="Profile Picture"
                  truncate-length="42"
                />
                <br />
                <v-btn
                  @click="validateAvatar"
                  :disabled="!valid"
                  color="blue lighten-4"
                  class="mr-4"
                >
                  Update my Avatar
                </v-btn>
              </v-form>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <br />
      <v-divider></v-divider>
      <v-container>
        <v-row class="font-italic">
          <v-col>
            <br />
            <router-link :to="{ name: 'resetpasswordonline' }">
              {{ $t('Reset password') }}<br /><br />
            </router-link>
          </v-col>
        </v-row>
        <br />
        <v-btn @click="getUser()" color="blue lighten-4" class="mr-4">
          GetUser_TEST
        </v-btn>
      </v-container>
    </v-card>
  </div>
</template>

<script>
// import axios from 'axios'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      target: this.$route.params.username,
      agreeToTerms: false,
      // username: 'test_username',
      // password: 'test_password',
      // lastName: 'test_lastname',
      // firstName: 'test_firstname',
      valid: true,
      languageList: ['english', 'french', 'spanish'],
      uploadPic: {
        mypic: null,
      },
      showPictures: {
        '0': null,
      },
      usernameRules: [
        v => !!v || 'Username is required',
        v =>
          (v && v.length <= 15) || 'Password must be less than 15 characters',
        v => /.{3,}/.test(v) || '3 characters minimum.',
        v =>
          /^[a-zA-Z0-9_.-]*$/.test(v) ||
          'Must be alphanumeric characters [Abc123...]',
      ],
      nameRules: [
        v => !!v || 'Field required',
        v => (v && v.length <= 20) || 'Must be less than 20 characters',
        v => /.{2,}/.test(v) || '2 characters minimum.',
        v => /^[a-zA-Z_.-]*$/.test(v) || 'Must be letters only',
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => (v && v.length <= 42) || 'Email must be less than 42 characters',
        v =>
          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v) ||
          'Must be a valid email [address@domain.com]',
      ],
      mypicsRules: [
        // value => value.size < 10000000 || 'Picture size should be less than 10 MB!'
      ],
    }
  },
  computed: {
    ...mapGetters({
      userData: 'App/storeUser',
      currentUsername: 'App/storeUsername',
    }),
  },
  methods: {
    ...mapActions('App', [
      'getUser',
      'updateUserInfo',
      'updateEmail',
      'putToken',
    ]),
    validateEmail() {
      const payloadPutEmail = {
        username: this.currentUsername,
        email: this.userData.email,
      }
      // this.$v.$touch()
      // if (!this.$v.$invalid) {
      this.updateEmail({ payloadPutEmail })
      // }
    },
    validatePersonalInfo() {
      const payloadPutUser = {
        currentUsername: this.currentUsername,
        username: this.userData.username,
        firstName: this.userData.firstname,
        lastName: this.userData.lastname,
        language: this.userData.language,
      }
      // this.$v.$touch()
      // if (!this.$v.$invalid) {
      this.updateUserInfo({ payloadPutUser })
    },

    // validatePersonalInfo2() {
    //   const options = {
    //     method: 'put',
    //     url: `https://hypertube42.herokuapp.com/users/user/${this.currentUsername}`,
    //     data: {
    //       username: this.userData.username,
    //       firstName: this.userData.firstname,
    //       lastName: this.userData.lastname,
    //       language: this.userData.language,
    //     },
    //     headers: {
    //       'x-access-token': this.userData.token,
    //     },
    //   }
    //   if (this.$refs.PersonalInfoForm.validate()) {
    //     axios(options)
    //       .then(response => {
    //         console.log('TEST_validatePersonalInfo_User.vue', response)
    //         if (response.status === 200 || response.status === '200') {
    //           this.$store.dispatch('App/putToken', response.data.token)
    //           // WHY DOES IT STOP THERE ?
    //           console.log('HELP1')
    //           // this.$store.dispatch('App/putUserInfo', {
    //           //   username: this.userData.username,
    //           //   firstName: this.userData.firstname,
    //           //   lastName: this.userData.lastname,
    //           //   language: this.userData.language,
    //           // })
    //           console.log('HELP2')
    //         }
    //         // this.$store.dispatch('interact/setMessage', 'Personal information updated !')
    //         // this.$router.push('/')
    //       })
    //       // eslint-disable-next-line
    //       .catch(error => {})
    //     // this.$router.push('/')
    //   }
    // },

    validateAvatar() {
      // console.log('ROUTER', router)
      if (this.$refs.AvatarForm.validate()) {
        const data = new FormData()
        const xhr = new XMLHttpRequest()
        const self = this

        if (this.uploadPic.mypic) {
          data.append('avatar', this.uploadPic.mypic)
        }

        // Returns an unsigned short, the state of the request.
        xhr.addEventListener('readystatechange', function() {
          // 4 means the request is DONE, operation completed
          if (this.readyState === 4) {
            if (this.status === 200 || this.status === '200') {
              // self.$store.dispatch('storeAction', 'Pictures updated !')
              this.showPictures = null
              const notification = {
                type: 200,
                message: 'Profile picture updated !',
              }
              self.$store.dispatch('Notifications/add', notification, {
                root: true,
              })
              self.$store.dispatch('App/getUser', '', {
                root: true,
              })
              self.$router.push({
                name: 'home',
              })
            }
          }
        })
        xhr.open(
          'PATCH',
          `https://hypertube42.herokuapp.com/users/user/${this.currentUsername}/avatar`
        )
        xhr.setRequestHeader('Accept', '*/*')
        xhr.setRequestHeader('Cache-Control', 'no-cache')
        xhr.setRequestHeader('Access-Control-Allow-Origin', true)
        xhr.setRequestHeader('x-access-token', this.userData.token)
        // xhr.setRequestHeader('Accept-Encoding', 'gzip, deflate')
        // xhr.setRequestHeader('Connection', 'keep-alive')
        xhr.send(data)
      }
    },
    displayImage(File) {
      if (!File) {
        return
      }
      let renamed = ''
      const reader = new FileReader()
      reader.readAsDataURL(File)
      reader.onload = () => {
        renamed = reader.result.split(';base64,')
        this.showPictures[0] = renamed[1]
      }
    },
  },
}
</script>

<style scoped></style>
<i18n>
{
  "en": {
    "title": "Update my profile",
    "username": "Username",
    "firstname": "First Name",
    "lastname": "Last Name",
    "language": "Subtitles language preference",
    "email": "Email",
    "password": "Password",
    "preview": "Preview",
    "Reset password": "Change my password",
    "usernameRuleRequired": "Username is required"
  },
  "fr": {
    "title": "Mise à jour de mon profil",
    "username": "Nom d'utilisateur",
    "firstname": "Prénom",
    "lastname": "Nom",
    "language": "Langue préférée de sous-titres",
    "email": "Email",
    "password": "Mot de passe",
    "preview": "Aperçu",
    "Reset password": "Modifier mon mot de passe",
    "usernameRuleRequired": "Le nom d'utilisateur est requis"
  }
}
</i18n>
