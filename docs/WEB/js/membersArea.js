// 設定選單與內容區塊的預設狀態
function initializeMenu() {
	const menuItems = document.querySelectorAll('.menu-item');
	const sections = document.querySelectorAll('.selectContent');

	// 設定預設
	menuItems[0].classList.add('active');
	// 展示當前選中的區塊
	sections.forEach((section, index) => {
		section.style.display = index === 0 ? 'block' : 'none';
	});
}

// 點選不同選單時，切換顯示對應內容區塊
function bindMenuEvents() {
	// 取得所有具有對應CLASS的標籤組成集合陣列
	const menuItems = document.querySelectorAll('.menu-item');
	const sections = document.querySelectorAll('.selectContent');


	// 遍歷集合，用item代表集合內的單一標籤物件
	// ❗ 這次遍歷是給所有的標籤(item)註冊點擊事件
	// 也是為什麼這bindMenuEvents()只需要執行一次的原因，因為每個item都註冊了裡面的點擊事件
	menuItems.forEach(item => {

		// 當該標籤被點擊(click)的話
		// 因為應用目標是被點擊(this)的那個item，所以不能用=>寫法，除非改成用第二種 event 物件
		item.addEventListener('click', function () {

			// ❗ 這裡才是標籤(item)被點擊時觸發的事件
			// 因此再次遍歷選單集合(menuItems)，將所有item的選取(active)狀態移除
			// 只在點選的(this)標籤加上選取狀態(active)
			menuItems.forEach(i => i.classList.remove('active'));
			this.classList.add('active');


			// dataset.section就是自訂標籤data-section
			// data- => dataset
			// (data-)section => .section
			const sectionId = this.dataset.section;
			sections.forEach(section => {
				// 控制只有選中的區塊顯示
				// 如果HTML有selectContent這個CLASS標籤的ID等於選取的ID(sectionID)就顯示
				section.style.display = section.id === sectionId ? 'block' : 'none';
			});
		});


		// 箭頭(=>)寫法，可檢視兩種差異會更有心得
		// item.addEventListener('click', (event) => {
		// 	menuItems.forEach(i => i.classList.remove('active'));
		// 	event.currentTarget.classList.add('active');	// 只有變這裡的this

		// 	const sectionId = event.currentTarget.dataset.section;
		// 	sections.forEach(section => {
		// 		section.style.display = section.id === sectionId ? 'block' : 'none';
		// 	});
		// });
	});
}


// 動態更新"查看個人資料"位置
function updateAccordionMargin() {
	// 	找出兩個元素：
	// rowElement 是.userInformation 裡的.row 元素。
	// accordion 是.accordion - custom 元素。
	// ⚠️ 如果找不到這兩個元素，就直接 return（跳出函數）。
	const rowElement = document.querySelector('.userInformation .row');
	const accordion = document.querySelector('.accordion-custom');
	if (!rowElement || !accordion) return;

	// 取得 rowElement 的實際高度（包含 padding，但不包含 margin）。
	const rowHeight = rowElement.offsetHeight;
	// 計算動態 margin，並設最小值為 -40
	const dynamicMargin = Math.max(-rowHeight / 3, -40);

	// 設定 CSS 變數
	if (window.innerWidth >= 768) {	// 螢幕寬度 ≥ 768px 就套用動態 margin
		accordion.style.setProperty('--dynamic-margin', `${dynamicMargin}px`);
	} else {	// 否則(手機尺寸)就設為0不套用
		accordion.style.setProperty('--dynamic-margin', `0px`);
	}
}



// 修改資料按鈕(預計高亮編輯區塊ID, 按下按鈕ID, 遮罩ID)
function setupToggleEdit(sectionId, toggleBtnId, overlayId) {
	// 接收外部資料值
	const section = document.getElementById(sectionId);
	const toggleBtn = document.getElementById(toggleBtnId);
	const overlay = overlayId ? document.getElementById(overlayId) : null;

	// 獲得章節(section)範圍內的所有具有 edit-input/display-text 兩種CLASS的標籤
	// 因為是所有(All)，因此會自動將抓到的標籤組合成集合陣列
	const inputs = section.querySelectorAll('.edit-input');
	const texts = section.querySelectorAll('.display-text');

	// 是否為編輯中
	let isEditing = false;

	// 當編輯按鈕按下(click)時觸發的事件
	toggleBtn.addEventListener('click', () => {
		// 切換編輯狀態
		isEditing = !isEditing;


		// 從inputs集合中用forEach抓出全部的內容
		// 抓出的單一標籤用input代表來執行要用在標籤的指令
		inputs.forEach(input => {
			// 目前編輯中，該標籤就顯示(block)、否則就隱藏(none)
			input.style.display = isEditing ? 'block' : 'none';
			if (!isEditing) {

				// 判斷是不是下拉式選單
				// .next用來抓下一個兄弟元素，即是標籤的CLASS有edit-input下的標籤
				const p = input.nextElementSibling;
				if (p) {	// 如果標籤存在
					if (input.tagName === 'SELECT') {	// .tagName會將抓到的標籤名稱自動轉成全大寫
						p.textContent = input.options[input.selectedIndex].text;
					} else { // textContent和innerText類似，但更適合處理純文字內容
						p.textContent = input.value;
					}
				}
			}
		});

		// texts.forEach(function (p) {
		//     p.style.display = isEditing ? 'none' : 'block';
		// });
		texts.forEach(p => {
			// 目前編輯中，該標籤就隱藏(none)、否則就顯示(block)
			p.style.display = isEditing ? 'none' : 'block';
		});



		// 按鈕的文字
		// .getAttribute是取得寫在HTML標籤內自訂屬性('data-'開頭)的值，所以可以獲得原始的設定文字
		toggleBtn.textContent = isEditing ? '完成修改' : toggleBtn.getAttribute('data-edit-text');

		// 根據是否編輯中決定按鈕套用的樣式
		// 用.classList來管理該標籤的CLASS
		// .toggle後面的條件為True時才會加上前面的樣式
		toggleBtn.classList.toggle('btn-outline-primary', !isEditing);
		toggleBtn.classList.toggle('btn-primary', isEditing);


		// 判斷是否有加入遮罩
		if (overlay) {
			// 編輯中就顯示遮罩
			overlay.style.display = isEditing ? 'block' : 'none';
		}

		// 編輯中就給章節加上editing的CLASS，主要為了套用CSS的高亮區塊
		section.classList.toggle('editing', isEditing);
	});
}

// 高亮區塊與編輯按鈕設定
setupToggleEdit('infoSection', 'toggleEditBtn', 'overlay');
setupToggleEdit('contactSection', 'toggleContactEditBtn', 'overlay');
setupToggleEdit('accountSection', 'toggleAccountEditBtn', 'overlay');
setupToggleEdit('passwordSection', 'togglePasswordEditBtn', 'overlay');



/****************************啟動函式*************************/


// 等待 DOM 完全載入後執行(CSS等未完成)
document.addEventListener("DOMContentLoaded", () => {
	// 選單 - 初始化
	initializeMenu();
	// 選單 - 綁定點擊事件
	bindMenuEvents();
});

// 整個網頁都加載完成後觸發。
window.addEventListener('load', () => {
	// 第一次個人資料位置
	updateAccordionMargin();
});


// 每次視窗變動啟動
window.addEventListener('resize', () => {
	// 重新分配個人資料位置
	updateAccordionMargin();
}); 