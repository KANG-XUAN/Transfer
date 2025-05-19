<template>
	<!-- Step 1 -->
	<div :class="[nowStep === 1 ? 'active-step' : '']">
		<h4>【壹．設定您的帳號與密碼】</h4>

<p>目前步驟：{{ nowStep }}</p>
		<BaseInput
			id="username"
			label="帳號"
			type="text"
			placeholder="請輸入您的帳號或電子郵箱"
			v-model="localForm.username"
			quote="請輸入您的帳號"
			:error-message="formErrors.username"
		/>

		<BaseInput
			id="password"
			label="密碼"
			type="password"
			placeholder="請輸入您的密碼"
			v-model="localForm.password"
			quote="請輸入8位以上英數混合密碼"
			:error-message="formErrors.password"
		/>

		<BaseInput
			id="repassword"
			label="確認密碼"
			type="password"
			placeholder="請再次輸入您的密碼"
			v-model="localForm.repassword"
			quote="請輸入8位以上英數混合密碼"
			:error-message="formErrors.repassword"
		/>
	</div>
</template>


<script>
import BaseInput from '@/components/Form/BaseInput.vue';

export default {
  name: "RegisterStep1",
  components: { BaseInput },
  props: {
    nowStep: Number,
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localForm: { ...this.form },  // 複製 prop 避免直接改
      formErrors: {
        username: '',
        password: '',
        repassword: ''
      }
    };
  },

  methods: {
    validateForm() {
      this.formErrors.username = this.localForm.username ? '' : '帳號不得為空';
      this.formErrors.password = this.localForm.password.length >= 8 ? '' : '密碼需至少 8 碼';
      this.formErrors.repassword = this.localForm.repassword === this.localForm.password ? '' : '密碼不一致';

      // 這邊用事件回傳本地副本資料給父元件
      this.$emit('update:form', { ...this.localForm });

      return !this.formErrors.username && !this.formErrors.password && !this.formErrors.repassword;
    }
  }
};
</script>
