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
                  :label="$t('profilePicture')"
                  truncate-length="42"
                />
                <br />
                <v-btn
                  @click="validateAvatar"
                  :disabled="!valid"
                  color="blue lighten-4"
                  class="mr-4"
                >
                  {{ $t('updateAvatar') }}
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
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      target: this.$route.params.username,
      valid: true,
      isEditing: true,
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
  beforeRouteLeave(to, from, next) {
    if (this.isEditing && this.storeDefaultPicture && this.isAuth) {
      return
    } else {
      next()
    }
  },
  computed: {
    ...mapGetters({
      userData: 'App/storeUser',
      currentUsername: 'App/storeUsername',
      storeDefaultPicture: 'App/storeDefaultPicture',
      isAuth: 'App/isAuth',
    }),
  },
  methods: {
    ...mapActions('App', ['getUser', 'putToken']),

    validateAvatar() {
      function error(error) {
        this.$store.dispatch('App/setError', error)
      }

      if (this.$refs.AvatarForm.validate()) {
        const data = new FormData()
        const xhr = new XMLHttpRequest()
        const self = this
        //> 10 mb
        if (this.uploadPic.mypic.size > 1024 * 1024 * 10) {
          error('The file is too large (more than 10 MB)')
          return
        }
        if (this.uploadPic.mypic) {
          data.append('avatar', this.uploadPic.mypic)
        }

        // Returns an unsigned short, the state of the request.
        xhr.addEventListener('readystatechange', function() {
          // 4 means the request is DONE, operation completed
          if (this.readyState === 4) {
            if (this.status === 200) {
              // self.showPictures = null
              self.uploadPic.mypic = null
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
          `${process.env.VUE_APP_BACKEND_URL}users/user/${this.currentUsername}/avatar`
        )
        xhr.setRequestHeader('Accept', '*/*')
        xhr.setRequestHeader('Cache-Control', 'no-cache')
        xhr.setRequestHeader('Access-Control-Allow-Origin', true)
        xhr.setRequestHeader('x-access-token', this.userData.token)
        xhr.addEventListener('error', error)

        xhr.send(data)
      }
      this.valid = false
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

    "profilePicture": "Profile Picture",
    "updateAvatar": "Update avatar"

  },
  "fr": {
    "title": "Choisissez une photo de profil pour finaliser votre inscription",

    "profilePicture": "Photo de profil",
    "updateAvatar": "Mettre à jour ma photo"
  }
}
</i18n>
