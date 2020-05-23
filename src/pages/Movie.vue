<template>
  <v-card class="mx-auto my-12" width="80%">
    <v-img max-height="auto" :src="movie.large_cover_image"></v-img>

    <v-card-title>{{ movie.title }} </v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          length="10"
          :value="movie.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">{{ movie.rating }}</div>
      </v-row>

      <div class="my-4 subtitle-1">
        {{ movie.year }} • {{ movie.genres[0] }}
      </div>

      <div>
        {{ movie.description_full }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-title>{{ $t('playerTitle') }}</v-card-title>

    <div class="player" v-if="playerShow !== ''">
      <video-player
        ref="videoPlayer"
        :key="componentKey"
        class="video-player-box"
        :options="playerOptions"
        :playsinline="true"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @ended="onPlayerEnded($event)"
        @waiting="onPlayerWaiting($event)"
        @playing="onPlayerPlaying($event)"
        @loadeddata="onPlayerLoadeddata($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @canplay="onPlayerCanplay($event)"
        @canplaythrough="onPlayerCanplaythrough($event)"
        @statechanged="playerStateChanged($event)"
        @ready="playerReadied"
      >
      </video-player>
    </div>
    <div>
      <v-btn
        v-if="this.storeMovieMeta.torrents[0]"
        class="ma-5"
        @click="zeroStream()"
        color="primary"
      >
        {{ this.storeMovieMeta.torrents[0].quality }}
      </v-btn>
      <v-btn
        v-if="this.storeMovieMeta.torrents[1]"
        class="ma-5"
        @click="oneStream()"
        color="primary"
      >
        {{ this.storeMovieMeta.torrents[1].quality }}
      </v-btn>
      <v-btn
        v-if="this.storeMovieMeta.torrents[2]"
        class="ma-5"
        @click="twoStream()"
        color="primary"
      >
        {{ this.storeMovieMeta.torrents[2].quality }}
      </v-btn>
      <v-btn
        v-if="this.storeMovieMeta.torrents[3]"
        class="ma-5"
        @click="threeStream()"
        color="primary"
      >
        {{ this.storeMovieMeta.torrents[3].quality }}
      </v-btn>
      <v-btn class="ma-5" @click="resetPlayer()" color="primary">
        Reset Player component
      </v-btn>
    </div>
    <v-divider class="mx-4"></v-divider>

    <v-card-title>{{ $t('commentTitle') }}</v-card-title>
    <v-list subheader two-line style="background-color: transparent">
      <v-list-item v-for="(itemComment, id) in storeComments" :key="id">
        <v-row v-if="itemComment.username == storeUsername">
          <v-col>
            <v-list-item-content>
              <v-list-item-subtitle class="my-4 subtitle-1"
                >{{ itemComment.username }}:</v-list-item-subtitle
              >
              <v-list-item-title>{{ itemComment.text }}</v-list-item-title>
            </v-list-item-content>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="2" />
          <v-col cols="10">
            <v-list-item-content>
              <v-list-item-subtitle class="my-4 subtitle-1"
                >{{ itemComment.username }}:</v-list-item-subtitle
              >
              <v-list-item-title>{{ itemComment.text }}</v-list-item-title>
            </v-list-item-content>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>

    <v-form ref="formComment" submit.prevent="validComment()">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-list-item-subtitle class="ma-1 subtitle-1">
              {{ storeUsername }}:<br />
            </v-list-item-subtitle>
            <v-text-field
              v-model.lazy="comment"
              @input="$v.comment.$touch()"
              @blur="$v.comment.$touch()"
              :error-messages="commentErrors"
              :label="$t('comment')"
              :counter="142"
              outlined
              clearable
              color="blue"
              type="text"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          @click="validComment()"
          x-large
          color="blue"
          :disabled="$v.$invalid"
        >
          {{ $t('postComment') }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import {
  required,
  // alphaNum,
  minLength,
  maxLength,
} from 'vuelidate/lib/validators'
// import Vue from 'vue'
// import VueCoreVideoPlayer from 'vue-core-video-player'
// import VideoPlayer from "@/components/VideoPlayer.vue"
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'VideoHypertube',
  // components: {
  //   VideoPlayer
  // },
  data() {
    return {
      comment: '',
      ref: this.$route.params.id,
      videoSource: undefined,
      playerShow: '',
      componentKey: 0,
      playerHash: '',
      // playerOptions: {
      //   autoplay: true,
      //   controls: true,
      //   language: 'en',
      //   playbackRates: [0.7, 1.0, 1.5, 2.0],
      //   aspectRatio: '16:9',
      //   sources: [{
      //     type: 'video/webm',
      //     // src: 'http://localhost:3000/torrent/OZ6OLQISQ6DVUV54PDAYQTXKBWJMPF6V',
      //     // src: this.videoSource
      //     src: `http://localhost:3000/torrent/${this.playerHash}?id=${this.ref}`
      //   }],
      // },
      // src: 'http://vjs.zencdn.net/v/oceans.mp4',
      // src: this.getStream({ magnetHash: 'OZ6OLQISQ6DVUV54PDAYQTXKBWJMPF6V', id: this.ref })
    }
  },
  props: {
    movie: {
      type: Object,
      required: true,
    },
    comments: {
      type: Object,
      required: false,
    },
  },
  methods: {
    ...mapActions('Movies', ['sendComment', 'getStream']),
    validComment() {
      // console.log('this.ref_', this.ref)
      // console.log('this.comment_', this.comment)
      // this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sendComment({ ref: this.ref, text: this.comment })
      }
      this.$refs.formComment.reset()
      // this.comment = ''
      // this.componentKey += 1
    },
    // listen event
    onPlayerPlay(player) {
      console.log('player play!', player)
    },
    onPlayerPause(player) {
      console.log('player pause!', player)
    },
    // ...player event

    // or listen state event

    onPlayerEnded(player) {
      console.log('player ended!', player)
    },
    onPlayerWaiting(player) {
      console.log('player waiting!', player)
    },
    onPlayerPlaying(player) {
      console.log('player playing!', player)
    },
    onPlayerLoadeddata(player) {
      console.log('player Loadeddata!', player)
    },
    onPlayerTimeupdate(player) {
      console.log('player Timeupdate!', player)
    },
    onPlayerCanplay(player) {
      console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      console.log('player Canplaythrough!', player)
    },
    playerStateChanged(playerCurrentState) {
      console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    },
    resetPlayer() {
      this.componentKey += 1
    },
    zeroStream() {
      this.playerHash = this.storeMovieMeta.torrents[0].hash
      const startPlayer = this
      setTimeout(function() {
        startPlayer.playerShow = 'OK'
        // console.log('=== [0] OK ===')
      }, 1000)
      // return this.getStream({
      //   magnetHash: this.storeMovieMeta.torrents[0].hash,
      //   id: this.ref,
      // })
      // this.playerOptions.sources[0].src = this.storeMovieMeta.torrents[0].url
    },
    oneStream() {
      this.playerHash = this.storeMovieMeta.torrents[1].hash
      const startPlayer = this
      setTimeout(function() {
        startPlayer.playerShow = 'OK'
        // console.log('=== [1] OK ===')
      }, 1000)
    },
    twoStream() {
      this.playerHash = this.storeMovieMeta.torrents[2].hash
      const startPlayer = this
      setTimeout(function() {
        startPlayer.playerShow = 'OK'
        // console.log('=== [2] OK ===')
      }, 1000)
    },
    threeStream() {
      this.playerHash = 'OZ6OLQISQ6DVUV54PDAYQTXKBWJMPF6V'
      const startPlayer = this
      setTimeout(function() {
        startPlayer.playerShow = 'OK'
        // console.log('=== test [3] OK ===')
      }, 1000)
      // this.playerOptions.sources[3].src = this.storeMovieMeta.torrents[3].url
    },
  },
  computed: {
    ...mapGetters({
      storeToken: 'App/storeToken',
      storeMovieMeta: 'Movies/storeMovieMeta',
      storeUsername: 'App/storeUsername',
      storeComments: 'Movies/storeComments',
    }),
    player() {
      return this.$refs.videoPlayer.player
    },
    commentErrors() {
      const errors = []
      if (!this.$v.comment.$dirty) return errors
      // !this.$v.comment.required && errors.push(this.$t('commentRuleRequired'))
      // !this.$v.comment.alphaNum && errors.push(this.$t('alphaNumRule'))
      !this.$v.comment.minLength && errors.push(this.$t('commentRuleMin'))
      !this.$v.comment.maxLength && errors.push(this.$t('commentRuleMax'))
      return errors
    },
    serverMessage() {
      return this.$store.getters['interact/serverMessage']
    },
    playerOptions() {
      return {
        autoplay: true,
        controls: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        aspectRatio: '16:9',
        sources: [
          {
            type: 'video/webm',
            // src: 'http://localhost:3000/torrent/OZ6OLQISQ6DVUV54PDAYQTXKBWJMPF6V',
            // src: this.videoSource
            src: `http://localhost:3000/torrent/${this.playerHash}?id=${this.ref}`,
          },
        ],
      }
    },
  },
  validations: {
    comment: {
      required,
      // alphaNum,
      minLength: minLength(2),
      maxLength: maxLength(142),
    },
  },
}
</script>

<style lang="scss" scoped></style>
<i18n>
{
  "en": {
    "alphaNumRule": "Must be alphanumeric characters [Abc123...]",
    "username": "Username",
    "comment": "Type your comment here",
    "commentRuleMin": "Comment must be at least 2 characters long",
    "commentRuleMax": "Comment must be at most 142 characters long",
    "commentRuleRequired": "Comment required",
    "commentTitle": "Comments: ",
    "postComment": "Share !",
    "playerTitle": "Video: "
  },
  "fr": {
    "alphaNumRule": "Caractères alphanumérique [Abc123...] uniquement",
    "username": "Nom d'utilisateur",
    "comment": "Écris ton commentaire ici",
    "commentRuleMin": "Le commentaire doit avoir 2 caractères minimum",
    "commentRuleMax": "Le commentaire doit avoir 142 caractères maximum",
    "commentRuleRequired": "Un commentaire est requis",
    "commentTitle": "Commentaires: ",
    "postComment": "Partager !",
    "playerTitle": "Film: "
  }
}
</i18n>
