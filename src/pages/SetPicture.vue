<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <div class="headline">{{ $t('title') }}</div>
      </v-card-title>

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
      valid: true,
      uploadPic: {
        mypic: null,
      },
      showPictures: {
        '0': null,
      },
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
    ...mapActions('App', ['getUser', 'putToken']),

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
            if (this.status === 200) {
              // || this.status === '200') {
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
    "title": "Choose a profile picture to finalize your registration",
    "username": "Username",
    "firstname": "First Name",
    "lastname": "Last Name",
    "preview": "Preview"
  },
  "fr": {
    "title": "Choisissez une photo de profil pour finaliser votre inscription",
    "username": "Nom d'utilisateur",
    "firstname": "Prénom",
    "lastname": "Nom",
    "preview": "Aperçu"
  }
}
</i18n>
