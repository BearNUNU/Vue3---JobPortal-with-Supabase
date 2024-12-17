<template>
<div class="form-container">
    <form calss="form-group" @submit.prevent="handleSingUp"> 
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Email" required v-model="id">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" required v-model="password">
        <label for="tel">Phone</label>
        <input type="tel" id="tel" name="tel" placeholder="전화번호" required v-model="tel">
    </form>
     <div class="form-group">
        <label for="introduce">자기소개</label>
        <textarea id="introduce" name="introduce" placeholder="자기소개" required v-model="introduce"></textarea>
     </div>
     <button type="submit">회원가입</button>
</div>
  </template>
  
  <script>
  import { ref } from 'vue';
  const id = ref('');
  const password = ref('');
  const tel = ref('');
  const introduce = ref('');


  const handleSingUp = () => {
    console.log(id.value, password.value, tel.value, introduce.value);
    if(id.value === '' || password.value === '' || tel.value === '' || introduce.value === ''){
        alert('모든 입력란을 입력해주세요');
        return;
    }
  };

  </script>
  
  <style scoped lang="scss">
  @use "../style/form.scss";
  </style>