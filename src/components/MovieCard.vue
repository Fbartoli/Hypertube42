<template>
  <div>
    <h4 class="title">{{ event.title }}</h4>
    <h1>{{ event.description }}</h1>
    <v-list>
      <v-subheader>Cast</v-subheader>
      <v-list-item-group v-model="cast" color="primary">
        <v-list-item v-for="(actor, i) in event.cast" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="actor.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: {
        id: 1,
        title: "Tomorrow never dies",
        description: "James Bond kicking some asses",
        cast: [{ id: 1, name: "Pierce Brosnan" }]
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
