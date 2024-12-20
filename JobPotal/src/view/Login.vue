<template>
    <div>
     <div class="loading_info" v-if="isLoading">
        <p>회원가입 중입니다...</p>
    </div>
<div class="form-container">
    <form calss="form-group" @submit.prevent="handleLogin"> 
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Email@gmail.com" required v-model="email">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" required v-model="password">
        <button type="submit">로그인</button>
        <router-link to="/signup">회원가입</router-link>
    </form>
</div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import supabase from '../supabase';

const router = useRouter();
const isLoading = ref(false);

const email = ref('');
const password = ref('');

const handleLogin = async() => {
    isLoading.value = true;
    const { data, error } = await supabase.auth.signInWithPassword({
  email: email.value,
  password: password.value,
})

  if(error) {
    alert(error.message)
  } else {
    router.push('/job-list');
  }
  isLoading.value = false;
}
</script>

  
<style scoped lang="scss">
  @use "../style/form.scss";

  .loading_info {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0, 0.7);
    color: #fff;
    display: grid;
    place-items: center;
  }
</style>