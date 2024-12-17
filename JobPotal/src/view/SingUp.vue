<template>
    <div class="loading_info" v-if="isLoading">
        <p>회원가입 중입니다...</p>
    </div>
        <div class="form-container">
            <form @submit.prevent="handleSignup">
                <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="이메일 입력"
            required
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="비밀번호 입력"
            required
            v-model="password"
          />
        </div>
        <div class="form-group">
          <label for="tel">Phone</label>
          <input 
            type="tel" 
            id="tel" 
            placeholder="010-1234-5678"
            required
            v-model="tel"
          />
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input 
            type="name" 
            id="name" 
            placeholder="이름 입력"
            required
            v-model="name"
          />
        </div>
          <div class="form-group">
          <label for="address">Address</label>
          <input 
            type="address" 
            id="address" 
            placeholder="주소 입력"
            required
            v-model="address"
          />
        </div>
        <div class="form-group">
          <label for="introduce">자기소개</label>
          <textarea id="introduce" v-model="introduce"></textarea>
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import supabase from '../supabase';
  import { ref } from 'vue';
import { useRouter } from 'vue-router';

  const router = useRouter();

  const email = ref('');
  const password = ref('');
  const tel = ref('');
  const introduce = ref('');
  const name = ref('');
  const address = ref('');

  const isLoading = ref(false);

  const handleSignup = async () => {
    isLoading.value = true;
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if(error) {
    alert(error.message)
  } else {
    console.log('회원가입 성공')
    const { error } = await supabase
      .from('user_table')
      .insert({ 
        tel: tel.value,
        introduce: introduce.value,
        name: name.value,
        address: address.value,
      })
      if(error) { 
        alert('에러')
        console.log(error)
      }
  }
  router.push('/');
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