const fragment = document.createDocumentFragment();
const rootRoom = document.getElementById('root-room');

const roomDoms = [];

let currentRoomIndex = 0;

function removeClasss(ele, txt) {
	var str = ele.className,
		index = str.indexOf(txt);
	if (index > -1) {
		ele.className = str.replace(txt, '');
	}
}
function addClasss(ele, txt) {
	ele.className += ` ${txt}`;
}
const btnL = document.createElement('a');
btnL.className = 'button'; // disabled
btnL.innerText = '上一个';

const btnR = document.createElement('a');
btnR.className = 'button';
btnR.innerText = '下一个';

const buildRoom = (imgList, index) => {
	// dom创建
	const box = document.createElement('div');
	roomDoms.push(box);
	if (index === currentRoomIndex) {
		box.className = `room-box`;
	} else {
		box.className = `room-box transparent`;
	}
	box.setAttribute('data-roomindex', index + 1);

	const topDiv = document.createElement('div');
	topDiv.className = 'top room-item';

	const frontDiv = document.createElement('div');
	frontDiv.className = 'front room-item wall';
	frontDiv.setAttribute('data-id', 1);

	const leftDiv = document.createElement('div');
	leftDiv.className = 'left room-item wall';
	leftDiv.setAttribute('data-id', 2);

	const backDiv = document.createElement('div');
	backDiv.className = 'back room-item wall';
	backDiv.setAttribute('data-id', 3);

	const rightDiv = document.createElement('div');
	rightDiv.className = 'right room-item wall';
	rightDiv.setAttribute('data-id', 4);

	const bottomDiv = document.createElement('div');
	bottomDiv.className = 'bottom room-item';
	if (index === 0) {
		bottomDiv.appendChild(btnL);
		bottomDiv.appendChild(btnR);
	}

	imgList.forEach((img, index) => {
		// 一面墙壁3张照片
		if (index < 3) {
			frontDiv.appendChild(img);
		} else if (index < 6) {
			leftDiv.appendChild(img);
		} else if (index < 9) {
			rightDiv.appendChild(img);
		} else if (index < 12) {
			backDiv.appendChild(img);
		}
	});
	box.appendChild(topDiv);
	box.appendChild(frontDiv);
	box.appendChild(leftDiv);
	box.appendChild(backDiv);
	box.appendChild(rightDiv);
	box.appendChild(bottomDiv);
	fragment.appendChild(box);
	// 动效+事件
	let currentDeg = getComputedStyle(document.documentElement).getPropertyValue('--deg');
	currentDeg = currentDeg.substring(0, currentDeg.length - 3);
	const rootVar = document.documentElement.style;

	const list = [frontDiv, leftDiv, backDiv, rightDiv];
	const length = 4; // list.length
	// data-id对应的
	const idArr = [1, 2, 3, 4];

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
	}
};

btnL.onclick = () => {
	if (currentRoomIndex === 0) {
		return;
	} else {
		addClasss(roomDoms[currentRoomIndex], 'transparent');
		currentRoomIndex -= 1;
		removeClasss(roomDoms[currentRoomIndex], 'transparent');
	}

	if (currentRoomIndex === 0) {
		btnL.className = 'button disabled';
	} else if (currentRoomIndex < roomDoms.length - 1) {
		btnR.className = 'button';
	}
};
btnR.onclick = () => {
	if (currentRoomIndex === roomDoms.length - 1) {
		return;
	} else {
		addClasss(roomDoms[currentRoomIndex], 'transparent');
		currentRoomIndex += 1;
		removeClasss(roomDoms[currentRoomIndex], 'transparent');
	}

	if (currentRoomIndex === roomDoms.length - 1) {
		btnR.className = 'button disabled';
	} else if (currentRoomIndex > 0) {
		btnL.className = 'button';
	}
};

const roomImgArr = [
	'https://raw.githubusercontent.com/jc784999074/static/main/public/assets/img/1.jpeg',
	'https://raw.githubusercontent.com/jc784999074/static/main/public/assets/img/2.jpeg',
	'https://raw.githubusercontent.com/jc784999074/static/main/public/assets/img/3.jpeg',
	'https://raw.githubusercontent.com/jc784999074/static/main/public/assets/img/4.jpeg',
	'https://raw.githubusercontent.com/jc784999074/static/main/public/assets/img/5.jpeg',
	'https://raw.githubusercontent.com/jc784999074/static/main/public/assets/img/6.jpeg',
	'https://raw.githubusercontent.com/jc784999074/static/main/public/assets/img/7.jpeg',
	'https://raw.githubusercontent.com/jc784999074/static/main/public/assets/img/8.jpeg',
	'https://raw.githubusercontent.com/jc784999074/static/main/public/assets/img/9.jpeg',
	'https://raw.githubusercontent.com/jc784999074/static/main/public/assets/img/10.jpeg',
	'https://raw.githubusercontent.com/jc784999074/static/main/public/assets/img/11.jpeg',
	'https://raw.githubusercontent.com/jc784999074/static/main/public/assets/img/12.jpeg',
	'https://raw.githubusercontent.com/jc784999074/static/main/public/assets/img/13.jpeg',
]; // [][img,img,img]

roomImgArr.forEach((room, index) => {
	buildRoom(room, index);
});

rootRoom.appendChild(fragment);

window.g_global
	.axios({
		method: 'get',
		url: '/getPicture',
		data: {
			firstName: 'Fred',
			lastName: 'Flintstone',
		},
	})
	.then(res => {
		const allCount = res.length;
		const count = 12; // 一间房子12张照片
		const roomCount = Math.ceil(allCount / count); // 获取有几个12，
		for (let i = 0; i < roomCount; i++) {
			roomImgArr.push([]);
		}
		let nowRoomIndex = 1;
		let nowCount = nowRoomIndex * count; // 一房12个
		for (let i = 0; i < allCount; i++) {
			if (i === nowCount) {
				nowRoomIndex += 1;
				nowCount = nowRoomIndex * count;
			}
			const img = new Image();
			img.src = res[i].src;
			roomImgArr[nowRoomIndex - 1].push(img);
		}

		roomImgArr.forEach((room, index) => {
			buildRoom(room, index);
		});

		rootRoom.appendChild(fragment);
	});
