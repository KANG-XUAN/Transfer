<template>
  <!-- Step 4 -->
  <div id="step4" :class="['step', nowStep === 4 ? 'active-step' : '']">
    <h4>【肆．確認您的資料並驗證】</h4>

    <h5>{{ form.nickname }}</h5>
    <div class="underline"></div>

    <span class="name">性別：</span>
    <span class="data">{{ genderText }}</span>
    <br>
    <span class="name">生日：</span>
    <span class="data">{{ form.birth }}</span>
    <br>
    <span class="name">電子郵件：</span>
    <span class="data">{{ form.email }}</span>
    <br>
    <span class="name">電話：</span>
    <span class="data">{{ form.phone }}</span>
  </div>
</template>

<script>
export default {
  name: "RegisterStep4",
  props: {
    nowStep: Number,
    form: {
      type: Object,
      required: true
    }
  },
  // 本地資料庫
  data() {
    return {
      localForm: {
        nickname: this.form.nickname,
        gender: this.form.gender,
        birth: this.form.birth,
        email: this.form.email,
        phone: this.form.phone,
      },  // 複製 prop 避免直接改
    };
  },
  computed: {
    genderText() {
      switch (this.form.gender) {
        case 'male': return '男';
        case 'female': return '女';
        case 'hidden': return '隱藏';
        default: return '未選擇';
      }
    }
  },
  methods: {
    validateForm() {
      // 增加驗證碼判斷

      return true;
    }
  }
}
</script>

<style>
#step4 {

  /* 暱稱 */
  h5 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 0;
  }

  /* 底線 */
  .underline {
    width: 70%;
    height: 1px;
    background-color: black;
    margin: 10px auto;
  }

  /* 文字 */
  .name {
    display: inline-block;
    color: var(--main-color);
    width: 80px;
  }

  /* 資料 */
  .data {
    margin-left: 10px;
  }
}
</style>