/* eslint-disable */

<template>
  <div class="donate">
    <!-- نمایش اطلاعات کاربر -->
    <div class="user-profile">
      <img
        class="profile-picture"
        :src="user.profileImage || 'https://via.placeholder.com/100'"
        alt="Profile Picture"
      />
      <div class="user-info">
        <h3>{{ user.fullName }}</h3>
        <p>Your Total Donations: ${{ user.totalDonations }}</p>
      </div>
    </div>

    <!-- لیست خیریه‌ها -->
    <h2>Choose a Charity to Donate</h2>
    <div v-if="loading">Loading charities...</div>
    <div v-else class="charity-list">
      <div
        v-for="charity in charities"
        :key="charity._id"
        class="charity-item"
      >
        <h3>{{ charity.name }}</h3>
        <p>{{ charity.description }}</p>
        <p>Goal: ${{ charity.goal }}</p>
        <input
          type="number"
          v-model.number="donations[charity._id]"
          placeholder="Enter amount"
        />
        <button @click="donateToCharity(charity._id)">
          Donate
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonatePage',
  data() {
    return {
      user: {}, 
      charities: [],
      donations: {},
      loading: true,
    };
  },
  async created() {
    try {
      // دریافت اطلاعات کاربر
      const userResponse = await fetch("http://localhost:5000/api/users/USER_ID");
      const userData = await userResponse.json();
      if (userData.success) {
        this.user = userData.data;
      }

      // دریافت لیست خیریه‌ها
      const charitiesResponse = await fetch("http://localhost:5000/api/charities");
      const charitiesData = await charitiesResponse.json();
      if (charitiesData.success) {
        this.charities = charitiesData.data;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async donateToCharity(charityId) {
      const amount = this.donations[charityId];
      if (!amount || amount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:5000/api/charities/${charityId}/donate`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
          }
        );
        const data = await response.json();
        if (data.success) {
          alert("Donation successful!");
          this.donations[charityId] = 0;
        } else {
          alert("Donation failed. Please try again.");
        }
      } catch (error) {
        console.error("Error processing donation:", error);
        alert("An error occurred. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.donate {
  margin: 20px auto;
  max-width: 600px;
  text-align: center;
}

.user-profile {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.profile-picture {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.charity-list {
  margin-top: 20px;
}

.charity-item {
  background: #f9f9f9;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: left;
}

.charity-item input {
  margin-top: 10px;
  padding: 5px;
  width: 100%;
}

.charity-item button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.charity-item button:hover {
  background-color: #218838;
}
</style>
