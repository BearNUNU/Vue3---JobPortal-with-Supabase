<template>
<div class="form-container">
    <form calss="form-group" @submit.prevent="handleLogin"> 
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Email@gmail.com" required v-model="id">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" required v-model="password">
        <button type="submit">로그인</button>
        <router-link to="/singup">회원가입</router-link>
    </form>
</div>
</template>

<script setup>
import { ref } from 'vue';
const id = ref('');
const password = ref('');

const handleLogin = () => {
    console.log(id.value, password.value);
}
</script>

  
<style scoped>
.form-container {
  max-width: 768px;
  margin: 0 auto;
  padding: 15px;
  margin-top: 80px;
  background-color: #fff;
}

.form-group {
  margin-bottom: 24px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: var(--main-color-dark);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 24px;
}

button:hover {
  opacity: 0.8;
}
</style>