<template>
  <div class="quotations quotations-anime mt-auto" v-if="content">
    <div class="quote" :class="{ show: isShow }" v-html="content.quote"></div>
    <div class="author" :class="{ show: isShow }">{{ content.author }}</div>
  </div>
</template>

<script>
export default {
  name: 'WelcomeQuote',
  props: {
    isShow: Boolean
  },
  data() {
    return {
      quotes: [
        // {
        //   quote: "秦時明月漢時關，一片孤城萬仞山。<br>蓬山此去無多路，輕舟已過萬重山。",
        //   author: "？？？",
        // },
        {
          quote: "罔談彼短，靡恃己長。信使可覆，器欲難量。<br>禍因惡積，福緣善慶。尺璧非寶，寸陰是競。",
          author: "周興嗣《千字文．節選》",
        },
        {
          quote: "溫溫恭人，如集於木。<br>惴惴小心，如臨於谷。<br>戰戰兢兢，如履薄冰。",
          author: "佚名《詩經．節選》",
        },
        {
          quote: "鶴鳴於九皋，聲聞於天。<br>魚在於渚，或潛在淵。<br>樂彼之園，爰有樹檀，其下維谷。<br>他山之石，可以攻玉。",
          author: "佚名《詩經．鶴鳴》",
        },
        {
          quote: "杳冥冥兮羌晝晦，東風飄兮神靈雨。<br>留靈修兮憺忘歸，歲既晏兮孰華予？",
          author: "屈原《九歌．山鬼．節選》",
        },
        {
          quote: "老驥伏櫪，志在千里。烈士暮年，壯心不已。<br>盈縮之期，不但在天。養怡之福，可得永年。",
          author: "曹操《龜雖壽．節選》",
        },
        {
          quote: "東臨碣石，以觀滄海。水何澹澹，山島竦峙。<br>日月之行，若出其中。星漢燦爛，若出其裏。",
          author: "曹操《觀滄海．節選》",
        },
        {
          quote: "青青子衿，悠悠我心。但為君故，沉吟至今。<br>呦呦鹿鳴，食野之苹。我有嘉賓，鼓瑟吹笙。",
          author: "曹操《短歌行．節選》",
        },
        {
          quote: "援琴鳴弦發清商，短歌微吟不能長<br>明月皎皎照我床，星漢西流夜未央<br>牽牛織女遙相望，爾獨何辜限河梁",
          author: "曹丕《燕歌行（一）．節選》",
        },
        {
          quote: "休迅飛鳧，飄忽若神。凌波微步，羅襪生塵。<br>動無常則，若危若安。進止難期，若往若還。<br>轉眄流精，光潤玉顏。含辭未吐，氣若幽蘭。",
          author: "曹植《洛神賦．節選》",
        },
        {
          quote: "非淡泊無以明志，非寧靜無以致遠<br>非學無以廣才，非志無以成學",
          author: "諸葛亮《誡子書．節選》",
        },
        {
          quote: "綠螘新醅酒，紅泥小火爐。<br>晚來天欲雪，能飲一杯無？",
          author: "白居易《問劉十九》",
        },
        {
          quote: "燕山雪花大如席，片片吹落軒轅臺。<br>黃河捧土尚可塞，北風雨雪恨難裁。",
          author: "李白《北風行．節選》",
        },
        // {
        //   quote: "昨夜雨疏風驟，濃睡不消殘酒<br>試問捲簾人，卻道海棠依舊<br>知否？知否？應是綠肥紅瘦",
        //   author: "李清照《如夢令．昨夜雨疏風驟》",
        // },
      ],
      content: null
    };
  },
  mounted() {
    this.content = this.getRandomItem(this.quotes);
  },
  methods: {
    getRandomItem(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  }
};
</script>


<style scoped>
  /* 名言引用 */
	.quotations {
		font-family: '王翰宗顏楷體';
		margin: 0 auto;

		/* 引用區塊樣式 */
		.quote {
			border-left: 2.4px solid #777;
			padding-left: 0.5em;
			background-color: rgba(255, 255, 255, 0.25);

			font-size: 18px;
			font-style: italic;
			color: #777;
			line-height: 1.6;
		}

		/* 作者 */
		.author {
			margin: 0;
			margin-top: 5px;

			font-size: 16px;
			text-align: right;
			color: var(--quote-text-color);
			display: inline-block;

			/* 偽樣式 —— */
			&::before {
				content: "——";
				margin-right: 4px;
			}
		}
	}

	/* 【名言引用-動畫 (讓引用區淡入顯示，避免元素區塊一開始突兀出現展開) */
	.quotations-anime {

		/* 名言先出現 */
		.quote {
			/* 透明 */
			opacity: 0;
			/* 指定透明：淡入效果	ease:常見預設值，慢 - 快 - 慢 */
			transition: opacity 1.5s ease 2.0s;
		}

		/* 作者再出來 */
		.author {
			opacity: 0;
			transition: opacity 1s ease 2.5s;
		}

		/* JS加入的樣式，用以啟動上方動畫效果 */
		.show {
			/* 顯示 */
			opacity: 1;
		}

	}
	/* 動畫】 */
</style>