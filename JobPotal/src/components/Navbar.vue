<template>
    <nav>
        <h1>{{ title }}</h1>
        <router-link to="/joblist" class="btn-close"  v-if="currentPath === '/'||currentPath === '/singup'||currentPath === '/jobpost'">
            <Icon icon="material-symbols:close" width="24" height="24" style="color: #1e1e1e"/>
        </router-link>
        <div class="right-icons" v-if="currentPath === '/joblist'">
      <router-link to="/user-profile">
        <Icon 
          icon="teenyicons:user-circle-solid" 
          width="24"
          style="color: #1e1e1e;"
        />
      </router-link>
      <router-link to="/job-post">
        <Icon 
        icon="mdi:pencil-outline"  
          width="24"
          style="color: #1e1e1e;"
        />
      </router-link>
    </div> 
    </nav>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

let route = useRoute();
let currentPath = route.path;
let title = ref('');

watch(route, (newPath) => {
    currentPath = newPath.path;
    if (currentPath === '/') {
        title.value = '로그인';
    } else if (currentPath === '/singup') {
        title.value = '회원가입';
    } else if (currentPath === '/joblist') {
        title.value = '채용공고';
    } else if (currentPath === '/jobdetail') {
        title.value = '채용공고 상세';
    } else if (currentPath === '/jobpost') {
        title.value = '채용공고 작성';
    } else if (currentPath === '/userprofile') {
        title.value = '회원정보';
    }
    console.log(currentPath);
});
</script>

<style lang="scss" scoped>
  nav {
    position: relative;
    border-bottom: 1px solid #ccc;
    width: 100%;
    height: 44px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 16px;
      color: var(--text-color-dark);
    }
    .btn-close {
      position: absolute;
      left: 15px;
      text-decoration: none;
    }
  }  

  .right-icons {
    position: absolute;
    right: 15px;
    top: 10px;
    display: flex;
    gap: 10px;
  }
</style>