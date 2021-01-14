// 구간별 스크롤 높이를 담음
const init = () => {
	let yOffset = 0; // 스크롤 Y px를 저장할 변수
	let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
	let currentScene = 0; // 현재 활성화된 scroll-section
	// 스크롤할 때 global,nav style 에서 height를 빼고 계산하기 위해 style값 가져오기 위한 변수
	const globalNavStyle = document.querySelector('.global-nav');
	const localNavStyle = document.querySelector('.local-nav');
	const globalNavHeight = Number(window.getComputedStyle(globalNavStyle).getPropertyValue('height').replace('px', ''));
	const localNavHeight = Number(window.getComputedStyle(localNavStyle).height.replace('px', ''));

	let sumHeight = globalNavHeight + localNavHeight;
	console.log(globalNavHeight);
	console.log(localNavHeight);
	const sceneInfo = [
		{
			// scroll section 0
			type        : 'sticky',
			heightNum   : 5, // 브라우저 높이의 5배로 scrollHeight 세팅
			scrollHeight: 0,
			objs        : {
				container: document.querySelector('#scroll-section-0')
			}
		}, {
			// scroll section 1
			type        : 'normal',
			heightNum   : 5,
			scrollHeight: 0,
			objs        : {
				container: document.querySelector('#scroll-section-1')
			}
		}, {
			// scroll section 2
			type        : 'sticky',
			heightNum   : 5,
			scrollHeight: 0,
			objs        : {
				container: document.querySelector('#scroll-section-2')
			}
		}, {
			// scroll section 3
			type        : 'sticky',
			heightNum   : 5,
			scrollHeight: 0,
			objs        : {
				container: document.querySelector('#scroll-section-3')
			}
		}
	];

	// 4개의 섹션 각각의 엘리먼트들 배열에 저장하기 위한 최초 실행 함수
	const setLayout = () => {
		//	각 스크롤 섹션의 높이 세팅
		for (let i = 0; i < sceneInfo.length; i++) {
			sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
			sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight - sumHeight}px`;
			// 스크롤 섹션에서 global+local height 높이만 빼줘야함
			sumHeight = 0;
		}
	};

	const scrollLoop = () => {
		prevScrollHeight = 0; // 초기화
		for (let i = 0; i < currentScene; i++) {
			prevScrollHeight += sceneInfo[i].scrollHeight;
		}
		if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			currentScene++;
		} else if (yOffset < prevScrollHeight) {
			currentScene--;
		}
		console.log(currentScene);
	};

	// 브라우저의 창 크기 변환시 height 다시 적용하기 위해 만든 이벤트
	window.addEventListener('resize', setLayout);

	window.addEventListener('scroll', () => {
		yOffset = window.pageYOffset;
		scrollLoop();
	});
	setLayout();
};

init();