<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">Charity Donation System</h2>
      <div class="tab-buttons">
        <button 
          :class="{ active: activeTab === 'signIn' }" 
          @click="activeTab = 'signIn'"
        >
          Sign In
        </button>
        <button 
          :class="{ active: activeTab === 'signUp' }" 
          @click="activeTab = 'signUp'"
        >
          Sign Up
        </button>
      </div>

      <!-- Sign In Form -->
      <form v-if="activeTab === 'signIn'" @submit.prevent="handleSignIn">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="signInData.email" type="email" id="email" placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input v-model="signInData.phone" type="text" id="phone" placeholder="Enter your phone number" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="signInData.password" type="password" id="password" placeholder="Enter your password" required />
        </div>
        <button type="submit" class="submit-button">Sign In</button>
      </form>

      <!-- Sign Up Form -->
      <form v-if="activeTab === 'signUp'" @submit.prevent="handleSignUp">
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input v-model="signUpData.fullName" type="text" id="fullName" placeholder="Enter your full name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="signUpData.email" type="email" id="email" placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input v-model="signUpData.phone" type="text" id="phone" placeholder="Enter your phone number" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="signUpData.password" type="password" id="password" placeholder="Enter your password" required />
        </div>
        <button type="submit" class="submit-button">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      activeTab: 'signIn', 
      signInData: {
        email: '',
        phone: '',
        password: '',
      },
      signUpData: {
        fullName: '',
        email: '',
        phone: '',
        password: '',
      },
    };
  },
  methods: {
    async handleSignIn() {
  try {
    console.log("Sending data to server:", this.signInData);

    const response = await axios.post('http://localhost:5000/api/users/signin', this.signInData);
    if (response.data.success) {
      alert('Welcome back!');
      this.$router.push('/donate'); // انتقال به صفحه اهدا 
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error('Error during sign in:', error);
    if (error.response) {
      console.error('Server response error:', error.response.data);
      alert(error.response.data.message);
    } else {
      alert('Network error. Please check your connection.');
    }
  }
},
    async handleSignUp() {
      try {
        const response = await axios.post('http://localhost:5000/api/users/signup', this.signUpData);
        if (response.data.success) {
          alert('Account created successfully!');
          this.$router.push('/donate'); // انتقال به صفحه اهدا 
        } else {
          alert('Sign up failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during sign up:', error);
        alert('An error occurred. Please try again.');
      }
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #2c3e50, #34495e);
  padding: 20px;
  box-sizing: border-box;
}

.auth-card {
  background-color: #1e2a3a;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.auth-title {
  font-size: 1.8rem;
  color: #ecf0f1;
  margin-bottom: 20px;
}

.tab-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tab-buttons button {
  flex: 1;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.tab-buttons button.active {
  background-color: #3498db;
  color: white;
}

.tab-buttons button:not(.active) {
  background-color: #34495e;
  color: #ecf0f1;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  font-size: 0.9rem;
  color: #ecf0f1;
  display: block;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 0.9rem;
  border: 1px solid #7f8c8d;
  border-radius: 5px;
  background-color: #2c3e50;
  color: #ecf0f1;
}

.form-group input:focus {
  border-color: #3498db;
  outline: none;
}

.submit-button {
  background-color: #3498db;
  color: white;
  padding: 12px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #2980b9;
}
</style>
