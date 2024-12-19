<template>
  <nav>
    <h1>{{ title }}</h1>
    <router-link 
      v-if="currentPath === '/' 
          || currentPath === '/signup' 
          || currentPath === '/job-post'"
      to="/job-list" 
      class="btn-close"
    >
      <Icon 
        icon="material-symbols:close" 
        width="24"
        style="color: #1e1e1e;"
      />
    </router-link>

    <router-link 
      v-if="currentPath === '/jobdetail' || currentPath === '/userprofile'"
      to="/job-list" 
      class="btn-close"
    >
      <Icon 
        icon="ic:baseline-arrow-back" 
        width="24" 
        height="24"  
        style="color: 1e1e1e" 
      />
    </router-link>
    
    <router-link 
	      v-if="currentPath === '/jobdetail' || currentPath === '/userprofile'"
	      to="/job-list" 
	      class="btn-close"
	    >
	      <Icon 
	        icon="ic:baseline-arrow-back" 
	        width="24" 
	        height="24"  
	        style="color: 1e1e1e" 
	      />
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
  import { useRoute } from 'vue-router';
  import { watch, ref } from 'vue';

  let route = useRoute();
  let currentPath = route.path;
  let title = ref('');

  watch(route, (newPath) => {
    currentPath = newPath.path;
    console.log(currentPath);
    

    if(currentPath === '/') {
      title.value = '로그인'; 
    } else if (currentPath === '/signup') {
      title.value = '회원가입';
    } else if (currentPath === '/joblist') {
      title.value = '땅콩알바';
    } else if (currentPath === '/job-detail') {
      title.value = '상세보기';
    } else if (currentPath === '/jobpost') {
      title.value = '구인등록'
    } else if (currentPath === '/userprofile') {
      title.value = '프로필'
    }

  });
</script>
  
<style lang="scss" scoped>
  nav {
    position: relative;
    // background: pink;
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