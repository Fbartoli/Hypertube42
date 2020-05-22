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

    <div class="player">
      <video-player
        ref="videoPlayer"
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
// import MovieComment from '../components/MovieComment'
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
      // componentKey: 0,
      playerOptions: {
        // videojs options
        height: '360',
        autoplay: true,
        controls: true,
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src: 'http://vjs.zencdn.net/v/oceans.mp4',
          },
        ],
        poster: '/static/images/author.jpg',
      },
    }
  },
  // components: { MovieComment },
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
    ...mapActions('Movies', ['sendComment']),
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
  },
  computed: {
    ...mapGetters({
      storeToken: 'App/storeToken',
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
    "playerTitle": "Player: "
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
    "playerTitle": "Lecteur: "
  }
}
</i18n>
