<template>
  <div class="AnnouncementPage">
      <h1>Announcements</h1>
      <div v-if="announcements !== null">
        <announcement
            v-for="item in announcements"
            :key="item.id"
            :data="item.fields"
        />
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import Announcement from './Announcement';
export default {
  name: 'AnnouncementPage',
  components: {
      Announcement,
  },
  data() {
    return {
      announcements: [],
    }
  },
  methods: {
    fetchAnnouncements() {
      axios
      .get(`${process.env.VUE_APP_BASE_URL}/api/announcements`)
      .then(response => {
        this.announcements = response.data;
      });
    },
  },
  mounted() {
      this.fetchAnnouncements();
  }
}
</script>

<style>
.AnnouncementPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 5%;
  font-family: 'Roboto Condensed', sans-serif;
  text-align: center;
}
</style>
