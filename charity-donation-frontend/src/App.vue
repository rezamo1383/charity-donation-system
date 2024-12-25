<template>
  <div id="app">
    <header>
      <h1>Charity Donation System</h1>
    </header>
    <main>
      <!-- نمایش کامپوننت‌ها بر اساس مسیر -->
      <router-view />
    </main>
    <footer>
      <p>&copy; 2024 Charity Donation System</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* استایل‌های عمومی برای کل برنامه */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

header {
  background: #42b983;
  color: white;
  padding: 20px 0;
}

footer {
  background: #35495e;
  color: white;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
}

main {
  margin: 20px auto;
  max-width: 800px;
}
</style>
