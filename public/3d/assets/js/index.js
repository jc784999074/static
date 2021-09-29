// const fragment = document.createDocumentFragment();

let box = document.getElementById('roomBox');

const leftDiv = box.getElementsByClassName('left')[0];
const rightDiv = box.getElementsByClassName('right')[0];
let currentDeg = getComputedStyle(document.documentElement).getPropertyValue('--deg');
currentDeg = currentDeg.substring(0, currentDeg.length - 3);
const rootVar = document.documentElement.style;

let list = box.getElementsByClassName('wall');
const length = list.length;
const idArr = [1, 2, 3, 4];

const imgTags = [];
for (let i = 0; i < length; i++) {
	list[i].addEventListener('click', event => {
		const index = event.currentTarget.getAttribute('data-id');
		if (idArr[1] === Number(index)) {
			currentDeg -= 90;
			rootVar.setProperty('--deg', currentDeg + 'deg');
			// 将数组第一位取出，放到数组最后一位
			idArr.push(idArr.shift());
		} else if (idArr[3] === Number(index)) {
			currentDeg = Number(currentDeg) + 90;
			rootVar.setProperty('--deg', currentDeg + 'deg');
			// 将数组最后一位取出，放到数组第一位
			idArr.unshift(idArr.pop());
		}
	});
	let imgs = list[i].querySelectorAll('img');
	imgs.forEach(item => {
		imgTags.push(item);
	});
}

window.g_global
	.axios({
		method: 'post',
		url: '/getPicture',
		data: {
			firstName: 'Fred',
			lastName: 'Flintstone',
		},
	})
	.then(res => {
		for (let i = 0; i < res.length; i++) {
			if (imgTags[i] && res[i]) {
				imgTags[i].src = res[i].src;
			} else {
				break;
			}
		}
	});
