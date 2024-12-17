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

  
<style scoped lang="scss">
  @use "../style/form.scss";
</style>