<template>
  <div>
    <h2>Home Page</h2>
    <ul v-if="donations.length">
      <li v-for="donation in donations" :key="donation.id">{{ donation.name }}</li>
    </ul>
    <p v-else>Loading donations or no donations available.</p>
  </div>
</template>

<script>
import { getDonations } from '@/api/api';

export default {
  name: 'HomeView',
  data() {
    return {
      donations: [],
    };
  },
  async created() {
    try {
      this.donations = await getDonations();
      console.log('Donations fetched:', this.donations);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  },
};
</script>


<style scoped>
h2 {
  color: #6c42b9;
}
</style>
