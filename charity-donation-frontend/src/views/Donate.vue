<template>
  <div class="donate-page">
    <h1>Donate to a Charity</h1>

    <div class="charity-list">
      <h2>Select a Charity</h2>
      <div v-for="charity in charities" :key="charity._id" class="charity-item">
        <h3>{{ charity.name }}</h3>
        <p>{{ charity.description }}</p>
        <button @click="selectCharity(charity._id)">Donate to {{ charity.name }}</button>
      </div>
    </div>

    <div v-if="selectedCharity">
      <h2>Make a Donation</h2>
      <form @submit.prevent="makeDonation">
        <label for="amount">Donation Amount</label>
        <input type="number" v-model="donationData.amount" id="amount" required />

        <label>
          <input type="checkbox" v-model="donationData.isRecurring" />
          Make this a recurring donation
        </label>

        <button type="submit">Donate</button>
      </form>
    </div>

    <div v-if="donationResponse" class="donation-response">
      <p>{{ donationResponse.message }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DonatePage',
  data() {
    return {
      charities: [],
      selectedCharity: null,
      donationData: {
        amount: 0,
        isRecurring: false,
        charityId: '',
      },
      donationResponse: null,
    };
  },
  methods: {
    async fetchCharities() {
      try {
        const response = await axios.get('/api/charities');
        this.charities = response.data.charities;
      } catch (error) {
        console.error('Error fetching charities:', error);
      }
    },
    selectCharity(charityId) {
      this.selectedCharity = charityId;
      this.donationData.charityId = charityId;
    },
    async makeDonation() {
      try {
        const response = await axios.post('/api/donations', this.donationData);
        this.donationResponse = response.data;
      } catch (error) {
        console.error('Error making donation:', error);
        this.donationResponse = { message: 'Error making donation. Please try again.' };
      }
    },
  },
  mounted() {
    this.fetchCharities();
  },
};
</script>

<style>
.donate-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.charity-list {
  margin-bottom: 20px;
}

.charity-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin: 10px 0 5px;
}

input {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.donation-response {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #28a745;
  color: #28a745;
}
</style>
