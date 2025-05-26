<!-- 複製用標準模板
<BaseInput 
id="輸入框ID" 
type="輸入框類型" 
:label="文字標籤" 
:placeholder="input提示文字" 
:quote="引用文字"
:errorMessage="錯誤訊息" 
@blur="validateUsername" 
v-model="localForm.username" /> -->

<template>
	<div class="inp_modle">
		<p>{{ label }}</p>
		<div class="soild"></div>
		<input :id="inp_id" :type="inp_type" :placeholder="placeholder" :value="value"
			@input="$emit('input', $event.target.value)" @blur="$emit('blur')" />
		<span class="quote" :class="{ error: errorMessage }">
			{{ errorMessage || quote }}
		</span>
	</div>
</template>

<script>
export default {
	name: 'BaseInput',
	props: {
		inp_id: String,
		label: String,
		inp_type: {
			inp_type: String,
			default: 'text'
		},
		placeholder: String,
		value: String,
		quote: String,
		errorMessage: String,
	},
};
</script>


<!-- scoped 表示只在這個.vue裡面使用 -->
<style>
/* 標準輸入區 */
.inp_modle {
	width: 100%;
	text-align: left;
	line-height: normal;
	margin-bottom: 24px;

	p {
		font-family: '王翰宗顏楷體';
		font-size: 24px;
		color: var(--main-color);
		margin-bottom: 0;
	}

	.soild {
		height: 2px;
		background-color: var(--main-color);
	}

	input[type="text"],
	input[type="password"],
	input[type="date"],
	input[type="email"],
	input[type="tel"] {
		padding-left: 6px;
		width: 100%;
		height: 30px;
		/* 內陰影 */
		box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.4);
		/* 去除邊框 */
		border: none;
		/* 去除聚焦外框 */
		outline: none;

		&:focus {
			background-color: var(--inputfocus);
		}
	}

	.gender{
		height: 30px;
	}

	/* 針對 date 類型的 input */
	input[type="date"] {
		padding: 1px 6px;
	}

	/* 引用區塊樣式 */
	.quote {
		border-left: 2.4px solid #777;
		padding-left: 0.5em;
		font-family: '王翰宗中仿宋';
		font-size: 14px;
		font-style: italic;
		color: #777;
		line-height: 1.6;
	}

	.quote.error {
		color: var(--error);
		/* font-weight: bold; */
	}

}


/* 標準輸入區 */
@media (max-width: 540px) {
	.inp_modle {

		p {
			font-size: 20px !important;
		}

		input[type="text"] {
			height: 24px;
		}

		/* 針對 date 類型的 input */
		input[type="date"] {
			padding: 1px 0;
		}

		/* 引用區塊樣式 */
		.quote {
			font-size: 12px;
		}

	}
}
</style>
