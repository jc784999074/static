let box = document.getElementById('roomBox');
// let list = box.getElementsByClassName('wall');
// const aClass = [];
// const length = list.length;
// for (let i = 0; i < length; i++) {
// 	aClass.push(list[i].className);
// 	list[i].setAttribute('data-index', i);
// 	list[i].addEventListener('click', event => {
// 		let index = event.currentTarget.getAttribute('data-index');
// 		let cha = Number(index);

// 		aClass.forEach((classStr, ind, arr) => {
// 			let nowIndex = ind - cha;
// 			nowIndex = nowIndex < 0 ? length + nowIndex : nowIndex;
// 			list[ind].className = arr[nowIndex];
// 		});
// 	});
// }

const leftDiv = box.getElementsByClassName('left')[0];
const rightDiv = box.getElementsByClassName('right')[0];
let currentDeg = getComputedStyle(document.documentElement).getPropertyValue('--deg');
currentDeg = currentDeg.substring(0, currentDeg.length - 3);
const rootVar = document.documentElement.style;

let list = box.getElementsByClassName('wall');
const length = list.length;
const idArr = [1, 2, 3, 4];
for (let i = 0; i < length; i++) {
	list[i].addEventListener('click', event => {
		const index = event.currentTarget.getAttribute('data-id');
		if (idArr[1] === Number(index)) {
			currentDeg += 90;
			rootVar.setProperty('--deg', currentDeg + 'deg');
			// 将数组最后一位取出，放到数组第一位
			idArr.unshift(idArr.pop());
		} else if (idArr[3] === Number(index)) {
			currentDeg -= 90;
			rootVar.setProperty('--deg', currentDeg + 'deg');
			// 将数组第一位取出，放到数组最后一位
			idArr.push(idArr.shift());
		}
	});
}
// leftDiv.addEventListener('click', event => {
// 	currentDeg += 90;
// 	rootVar.setProperty('--deg', currentDeg + 'deg');
// });
// rightDiv.addEventListener('click', event => {
// 	currentDeg -= 90;
// 	rootVar.setProperty('--deg', currentDeg + 'deg');
// });
