<template>
  <div class="form-container" v-if="isLogin">
    <div class="loading_info" v-if="isLoading">
      <p>포스트 중입니다...</p>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">제목</label>
        <input
            type="text"
            id="title"
            required
            placeholder="공고 내용을 요약해 주세요."
            v-model="title"
        >
      </div>

      <div class="form-group">
        <label for="todo">하는 일</label>
        <input
            type="text"
            id="todo"
            v-model="todo"
            placeholder="해야할 업무를 입력해주세요."
            required
        />
      </div>

      <div class="form-group">
        <input type="radio" id="pay_rule1" name="pay_rule" value="시급" v-model="pay_rule" required checked>
        <input type="radio" id="pay_rule2" name="pay_rule" value="월급" v-model="pay_rule" required >
        <div class="tab-group">
          <label for="pay_rule1">시급</label>
          <label for="pay_rule2">월급</label>
        </div>
        <input
            type="number"
            id="pay"
            placeholder="시급 또는 월급을 입력해주세요."
            v-model="pay"
            required
        >
      </div>

      <div class="form-group">
        <label for="desc">자세한 설명</label>
        <textarea
            name="desc"
            id="desc"
            v-model="desc"
            rows="4"
            required
            placeholder="구체적인 업무 내용, 근무여건, 지원자가 갖추어야 할 능력 등 우대 사항에 대해 알려주세요."
        ></textarea>
      </div>

      <div class="form-group">
        <label for="company_name">업체명</label>
        <input
            type="text"
            id="company_name"
            v-model="company_name"
            required
            placeholder="예) 땅콩가게"
        >
      </div>


      <div class="form-group">
        <label for="location">위치</label>
        <input
            type="text"
            id="location"
            v-model="location"
            required
            placeholder="예) 서울시 강남구 논현동"
        >
      </div>
      <div class="form-group">
        <label for="tel">연락처</label>
        <input type="text" id="tel" v-model="tel" required placeholder="예) 010-1234-5678">
      </div>

      <div class="form-group">
        <label for="photo">
          <p class="title">사진(선택)</p>
          <figure>
            <Icon icon="mdi-light:camera" width="64" height="64"  style="color: #1e1e1e;" />
            <img :src="previewImage ? previewImage : '/box64.jpg'" alt="미리보기" width="64" height="64" />
          </figure>
        </label>
        <input type="file" id="photo" accept="image/*" @change="onFileChange">
      </div>
      <button class="btn-submit">수정완료</button>
    </form>
  </div>
</template>
<script setup>
import {ref, onMounted, onUnmounted, watch} from 'vue';
import { Icon } from '@iconify/vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth} from "../auth/auth.js";
import supabase from "../supabase.js";

const router = useRouter();
const route = useRoute();
const { isLogin, user, checkLoginStatus} = useAuth()

const isLoading = ref(false)
const title = ref('');
const todo = ref('');
const pay_rule = ref('시급');
const pay = ref('');
const desc = ref('');
const company_name = ref('');
const location = ref('');
const tel = ref('');
const previewImage = ref(null)
const img_url = ref('')
let file = null


const handleSubmit = async () => {
  isLoading.value = true;
  if(previewImage.value){
    await uploadImage()
  }
  const { error } = await supabase
      .from('job_posts')
      .update({
        title: title.value,
        todo: todo.value,
        pay_rule: pay_rule.value,
        pay: pay.value,
        desc: desc.value,
        company_name: company_name.value,
        location: location.value,
        tel: tel.value,
        img_url: img_url.value,
      })
      .eq('id', route.params.id)
  if(error) {
    alert(error.message || '수정 실패');
  } else {
    alert('수정 성공');
    router.push('/job-list');
  }
  isLoading.value = false;
}

const onFileChange =(e)=>{
   file = e.target.files[0]
  if(file){
    previewImage.value = URL.createObjectURL(file)
  }
}

const uploadImage = async () => {
  const uniqueFileName = `${Date.now()}_${file.name}`; // supabase storage 파일 이름 중복을 막기 위해서
  const { data, error } = await supabase
      .storage
      .from('image')// 한글 이름 파일도 들어갈 수 있게 수정 필요
      .upload(uniqueFileName, file, {
        cacheControl: '3600',
        upsert: false
      })

  if(error) {
    console.log(error.message)
  } else {
    console.log('uploaded file:', data)
    // 이미지 url 가져오기
    const { data:imgData } = supabase
        .storage
        .from('image')
        .getPublicUrl(uniqueFileName)
    console.log('file url:', imgData.publicUrl)

    img_url.value = imgData.publicUrl;
  }
}

const getPost =async () =>{
  const {data, error} = await supabase
      .from('job_posts')
      .select()
      .eq('id',route.params.id)
      .single()
  title.value = data.title;
  todo.value = data.todo;
  pay_rule.value = data.pay_rule;
  pay.value = data.pay;
  desc.value = data.desc
  company_name.value = data.company_name;
  location.value = data.location;
  tel.value = data.tel;
  previewImage.value = data.img_url;
  prev_img_url.value = data.img_url;
}


onMounted(async()=>{
  await checkLoginStatus();
  getPost()
})

onUnmounted(()=>{
  if (previewImage){    URL.revokeObjectURL(previewImage.value) }//메모리 누수 방지를 위해서
})

</script>

<style lang="scss" scoped>
@use "../style/form.scss";

.form-container {
  margin-top: 20px;
  padding-bottom: 50px;

  .tab-group {
    display: flex;
    gap: 15px;
    label {
      flex: 1;
      border: 1px solid var(--main-color-dark);
      border-radius: 8px;
      text-align: center;
      padding: 12px;
    }
  }

  input[type="radio"] {
    display: none;
  }

  input[type="radio"]:nth-child(1):checked ~ .tab-group label:nth-child(1) {
    background: var(--main-color-dark);
    color: #fff;
  }

  input[type="radio"]:nth-child(2):checked ~ .tab-group label:nth-child(2) {
    background: var(--main-color-dark);
    color: #fff;
  }

  #pay { margin-top: 8px;}

  .form-group:has(label[for=photo]) input {
    border: none;
  }

  label[for=photo] {
    figure {
      display: flex;
      align-items: center;
      img {
        border: 1px solid red;
        margin-left: 30px;
      }
    }
  }
  input[type="file"] {
    display: none;
  }
}

.btn-submit {
  background: var(--main-color-light);
}

.form-group:has(label[for=photo]) {
  padding-bottom: 25px;
  border-bottom: 5px solid #ccc;
}

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

