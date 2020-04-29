<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <div class="headline">Update your personal information</div>
      </div>
    </v-card-title>
    <div>
      <div>
        <v-form ref="PersonalInfoForm" v-model="valid" lazy-validation>
          <v-container>
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
                  @click="validatePersonalInfo"
                  :disabled="!valid"
                  color="blue lighten-4"
                  class="mr-4"
                >
                  Update my Personal Information
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-form id="myForm" ref="AvatarForm" v-model="valid" lazy-validation>
          <v-container>
            <br /><br />
            <v-row>
              <v-col cols="10">
                <v-file-input
                  @change="displayImage(uploadPic.mypic, 0)"
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
              </v-col>
            </v-row>
            <v-card
              :hover="true"
              v-ripple="{ class: `purple--text` }"
              class="mx-auto"
              max-width="434"
            >
              <v-img
                :src="`data:image/*;base64,${userData.avatar}`"
                aspect-ratio="2"
                class="spacer blue lighten-2"
                no-gutters
              >
                <v-row align="end" class="fill-height">
                  <v-col align-self="start" class="pa-0" cols="12">
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
                  </v-col>
                </v-row>
              </v-img>
            </v-card>
            <v-row>
              <v-col>
                <v-btn
                  @click="validateAvatar"
                  :disabled="!valid"
                  color="blue lighten-4"
                  class="mr-4"
                >
                  Update my Avatar
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <br />
        <v-row class="font-italic">
          <v-col>
            <br />
            Do you want to change your password ?
            <router-link
              :to="{ name: 'reset', params: { username: userData.username } }"
            >
              {{ $t('Reset password') }}<br /><br />
            </router-link>
          </v-col>
        </v-row>
        <br />
      </div>
    </div>
  </v-card>
</template>

<script>
// import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      agreeToTerms: false,
      // username: 'test_username',
      // password: 'test_password',
      // lastName: 'test_lastname',
      // firstName: 'test_firstname',
      valid: true,
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
  // props: {
  //   userInfo: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  computed: {
    ...mapGetters({
      userData: 'App/storeUser',
    }),
  },
  // async asyncData (context) {
  //   const usersettings = await axios
  //     .get(process.env.serverUrl + '/users/user', {
  //       headers: {
  //         Authorization: 'Bearer ' + context.app.store.getters['App/isAuth']
  //       }
  //     })
  //     .then((response) => {
  //       context.store.dispatch('user/setUserData', response.data.userdata)
  //     })
  //     // eslint-disable-next-line
  //     .catch((error) => {
  //     })
  //   return {
  //     usersettings
  //   }
  // },
  methods: {
    validatePersonalInfo() {
      if (this.$refs.PersonalInfoForm.validate()) {
        this.$axios({
          method: 'post',
          url: process.env.serverUrl + '/users/user',
          data: {
            username: this.userData.username,
            email: this.userData.email,
            firstname: this.userData.firstname,
            lastname: this.userData.lastname,
          },
          headers: {
            Authorization: 'Bearer ' + this.userData.token,
          },
        })
          // .then((response) => {
          //   // this.$store.dispatch('interact/setMessage', 'Personal information updated !')
          //   this.$router.push('/')
          // })
          // eslint-disable-next-line
          .catch((error) => {
          })
        // this.$router.push('/settings')
      }
    },
    validateAvatar() {
      if (this.$refs.AvatarForm.validate()) {
        const data = new FormData()
        if (this.uploadPic.mypic) {
          data.append('images', this.uploadPic.mypic)
        }
        const xhr = new XMLHttpRequest()
        xhr.withCredentials = true
        const self = this
        // Returns an unsigned short, the state of the request.
        xhr.addEventListener('readystatechange', function() {
          // 4 means the request is DONE, operation completed
          if (this.readyState === 4) {
            if (this.status === 200 || this.status === '200') {
              self.$store.dispatch('interact/setMessage', 'Pictures updated !')
            }
          }
        })
        xhr.open('POST', process.env.serverUrl + '/users/upload')
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.userData.token)
        xhr.setRequestHeader('Accept', '*/*')
        xhr.setRequestHeader('Cache-Control', 'no-cache')
        // xhr.setRequestHeader('Accept-Encoding', 'gzip, deflate')
        // xhr.setRequestHeader('Connection', 'keep-alive')
        xhr.send(data)
      }
    },
    displayImage(File, number) {
      if (!File) {
        return
      }
      let renamed = ''
      const reader = new FileReader()
      reader.readAsDataURL(File)
      reader.onload = () => {
        renamed = reader.result.split(';base64,')
        this.showPictures[number] = renamed[1]
      }
    },
  },
}
</script>

<style scoped></style>
<i18n>
{
  "en": {
    "username": "Username",
    "firstname": "First Name",
    "lastname": "Last Name",
    "email": "Email",
    "password": "Password",
    "Reset password": "Reset password",
    "usernameRuleRequired": "Username is required"
  },
  "fr": {
    "username": "Nom d'utilisateur",
    "firstname": "Prénom",
    "lastname": "Nom",
    "email": "Email",
    "password": "Mot de passe",
    "Reset password": "J'ai oublié mon mot de passe",
    "usernameRuleRequired": "Le nom d'utilisateur est requis"
  }
}
</i18n>
