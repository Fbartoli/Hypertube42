<template>
  <v-card class="mx-auto my-12" width="80%">
    <v-img max-height="auto" :src="movie.large_cover_image"></v-img>

    <v-card-title>{{ movie.title }}</v-card-title>

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
        {{ movie.year }} • {{ movie.genres[0] }} {{ movie.genres[1] }}
        {{ movie.genres[2] }}
      </div>

      <div>{{ movie.description_full }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-title>{{ $t('playerTitle') }}</v-card-title>
    <v-card-subtitle>{{ movie.runtime }} min</v-card-subtitle>
    }}

    <div class="player" v-if="playerShow !== ''">
      <video controls autoplay crossorigin="anonymous">
        <source :src="src" :type="playerFormat" />
        <track
          v-if="storeLanguage === 'english'"
          :src="storeSubtitles.en"
          kind="subtitles"
          srclang="en"
          label="en"
          default
        />
        <track
          v-if="storeLanguage === 'english'"
          :src="storeSubtitles.fr"
          kind="subtitles"
          srclang="fr"
          label="fr"
        />
      </video>
    </div>

    <div>
      <v-btn
        v-if="this.storeMovieMeta.torrents[0]"
        class="ma-5"
        @click="zeroStream()"
        color="primary"
        >{{ this.storeMovieMeta.torrents[0].quality }}</v-btn
      >
      <v-btn
        v-if="this.storeMovieMeta.torrents[1]"
        class="ma-5"
        @click="oneStream()"
        color="primary"
        >{{ this.storeMovieMeta.torrents[1].quality }}</v-btn
      >
      <v-btn
        v-if="this.storeMovieMeta.torrents[2]"
        class="ma-5"
        @click="twoStream()"
        color="primary"
        >{{ this.storeMovieMeta.torrents[2].quality }}</v-btn
      >
      <v-btn
        v-if="this.storeMovieMeta.torrents[3]"
        class="ma-5"
        @click="threeStream()"
        color="primary"
        >{{ this.storeMovieMeta.torrents[3].quality }}</v-btn
      >
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
              {{ storeUsername }}:
              <br />
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
          >{{ $t('postComment') }}</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
</template>

//
<script>
// // Get all text tracks for the current player.
// var tracks = player.textTracks();

// for (var i = 0; i < tracks.length; i++) {
//   var track = tracks[i];

//   // Find the English captions track and mark it as "showing".
//   if (track.kind === 'captions' && track.language === 'en') {
//     track.mode = 'showing';
//   }
// }

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
// import subtitlestotest from src/assets/subtitlestotest.srt

export default {
  name: 'VideoHypertube',
  // components: {
  //   VideoPlayer
  // },
  data() {
    return {
      comment: '',
      src: '',
      ref: this.$route.params.id,
      videoSource: undefined,
      trackSource: undefined,
      trackLanguage: 'en',
      trackLanguageList: ['en', 'fr', 'es'],
      playerShow: '',
      // componentKey: 0,
      playerHash: '',
      playerFormat: '',
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
    language: {
      type: String,
      required: false,
    },
    movie: {
      type: Object,
      required: true,
    },
    // comments: {
    //   type: Object,
    //   required: false,
    // },
  },
  methods: {
    ...mapActions('Movies', ['sendComment', 'getStream']),
    validComment() {
      if (!this.$v.$invalid) {
        this.sendComment({ ref: this.ref, text: this.comment })
      }
      this.$refs.formComment.reset()
      // this.comment = ''
      // this.componentKey += 1
    },
    zeroStream() {
      this.playerHash = this.storeMovieMeta.torrents[0].hash
      this.playerFormat = this.storeFormats[0]
      const startPlayer = this
      this.src = `${process.env.VUE_APP_BACKEND_URL}torrent/${this.playerHash}?id=${this.ref}`
      this.$store.dispatch('Movies/sendView', this.ref)
      setTimeout(function() {
        startPlayer.playerShow = 'OK'
      }, 1000)
      // return this.getStream({
      //   magnetHash: this.storeMovieMeta.torrents[0].hash,
      //   id: this.ref,
      // })
      // this.playerOptions.sources[0].src = this.storeMovieMeta.torrents[0].url
    },
    oneStream() {
      this.playerHash = this.storeMovieMeta.torrents[1].hash
      this.playerFormat = this.storeFormats[1]
      const startPlayer = this
      this.src = `${process.env.VUE_APP_BACKEND_URL}torrent/${this.playerHash}?id=${this.ref}`
      this.$store.dispatch('Movies/sendView', this.ref)
      setTimeout(function() {
        startPlayer.playerShow = 'OK'
      }, 1000)
    },
    twoStream() {
      this.playerHash = this.storeMovieMeta.torrents[2].hash
      this.playerFormat = this.storeFormats[2]
      const startPlayer = this
      this.src = `${process.env.VUE_APP_BACKEND_URL}torrent/${this.playerHash}?id=${this.ref}`
      this.$store.dispatch('Movies/sendView', this.ref)
      setTimeout(function() {
        startPlayer.playerShow = 'OK'
      }, 1000)
    },
    threeStream() {
      this.playerHash = this.storeMovieMeta.torrents[3].hash
      this.playerFormat = this.storeFormats[3]
      const startPlayer = this
      this.src = `${process.env.VUE_APP_BACKEND_URL}torrent/${this.playerHash}?id=${this.ref}`
      this.$store.dispatch('Movies/sendView', this.ref)
      setTimeout(function() {
        startPlayer.playerShow = 'OK'
      }, 1000)
    },
  },
  computed: {
    ...mapGetters({
      storeToken: 'App/storeToken',
      storeMovieMeta: 'Movies/storeMovieMeta',
      storeUsername: 'App/storeUsername',
      storeComments: 'Movies/storeComments',
      storeFormats: 'Movies/storeFormats',
      storeSubtitles: 'Movies/storeSubtitles',
      storeLanguage: 'App/storeLanguage',
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
            type: `${this.playerFormat}`,
            src: `${process.env.VUE_APP_BACKEND_URL}/torrent/${this.playerHash}?id=${this.ref}`,
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
