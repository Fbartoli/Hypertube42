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
    {{ storeUsername }}

    <v-form submit.prevent="validComment()">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="comment"
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
// import MovieComment from '../components/MovieComment'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      comment: '',
      ref: this.$route.params.id,
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
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sendComment({ ref: this.ref, text: this.comment })
      }
    },
  },
  computed: {
    ...mapGetters({
      storeToken: 'App/storeToken',
      storeUsername: 'App/storeUsername',
    }),
    commentErrors() {
      const errors = []
      if (!this.$v.comment.$dirty) return errors
      !this.$v.comment.required && errors.push(this.$t('commentRuleRequired'))
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
    "postComment": "Share !"
  },
  "fr": {
    "alphaNumRule": "Caractères alphanumérique [Abc123...] uniquement",
    "username": "Nom d'utilisateur",
    "comment": "Écris ton commentaire ici",
    "commentRuleMin": "Le commentaire doit avoir 2 caractères minimum",
    "commentRuleMax": "Le commentaire doit avoir 142 caractères maximum",
    "commentRuleRequired": "Un commentaire est requis",
    "postComment": "Partager !"
  }
}
</i18n>
