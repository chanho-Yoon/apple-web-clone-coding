// 구간별 스크롤 높이를 담음
const init = () => {
    let yOffset = 0; // 스크롤 Y px를 저장할 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된 scroll-section
    let enterNewScene = false; // 새로운 scene 시작되는 순간 true
    const sceneInfo = [
        {
            // scroll section 0
            type        : 'sticky',
            heightNum   : 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs        : {
                container: document.querySelector('#scroll-section-0'),
                messageA : document.querySelector('#scroll-section-0 .main-message.a'),
                messageB : document.querySelector('#scroll-section-0 .main-message.b'),
                messageC : document.querySelector('#scroll-section-0 .main-message.c'),
                messageD : document.querySelector('#scroll-section-0 .main-message.d')
            },
            values      : {
                messageA_opacity: [0, 1, { start: 0.1, end: 0.2 }],
                messageB_opacity: [0, 1, { start: 0.3, end: 0.4 }],
                messageC_opacity: [0, 1, { start: 0.5, end: 0.6 }],
                messageD_opacity: [0, 1, { start: 0.7, end: 0.8 }],
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
    function setLayout() {
        //	각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
        console.log(window.innerHeight);
        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;

        // 각 scene
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    // 스크롤 액션
    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0; // 초기화
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        if (yOffset < prevScrollHeight) {
            enterNewScene = true;
            // 혹시나 최상단 too에서 yOffset의 값이 -로 찍히는 브라우저가 있을 경우 대비
            if (currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        // 스크롤이 순간적으로 바뀔때 -값이 안들어가도록 순간적으로 한 턴 넘겨버리는 함수
        if (enterNewScene) return;

        playAnimation();
    }

    // 현재 영역의 섹션이 얼마나 스크롤 됐는지 구하는 함수
    function calcValues( values, currentYOffset ) {
        let rv;
        // 현재 씬에서 스크롤된 범위를 비율로 구함
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        // values.length 가 3인 경우에는 'start,end' 가 있다는 것 (부분 스크롤 영역 존재)
        if (values.length === 3) {
            //	start ~ end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
                rv = ( currentYOffset - partScrollStart ) / partScrollHeight * ( values[1] - values[0] ) + values[0];
            } else if (currentYOffset < partScrollStart) {
                rv = values[0];
            } else if (currentYOffset > partScrollEnd) {
                rv = values[1];
            }
        } else {
            // 현재 씬의 스크롤 범위3 설정 변수
            rv = scrollRatio * ( values[1] - values[0] ) + values[0];
        }
        return rv;
    }

    // 스크롤할 때 각 섹션별로 컨트롤 하는 함수
    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight; // 현재 scene의 스크롤 높이
        // console.log(currentScene);
        switch (currentScene) {
            case 0:
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                objs.messageA.style.opacity = messageA_opacity_in;
                console.log(messageA_opacity_in);
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    // 브라우저의 창 크기 변환시 height 다시 적용하기 위해 만든 이벤트
    window.addEventListener('resize', setLayout);
    window.addEventListener('load', setLayout);
};

init();