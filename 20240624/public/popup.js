class Popup {
    popup = null
    text = "";
    constructor(a) {
        this.text = a;
        this.init();
    }

    init() {
        const bg = document.createElement("div");
        const popupWrap = document.createElement("div");
        const popupHeader = document.createElement("div");
        const popupBody = document.createElement("div");
        const popupContent = document.createElement("p");
        const popupBtnLine = document.createElement("div");
        const popupBtn01 = document.createElement("button");
        const popupBtn02 = document.createElement("button");

        bg.append(popupWrap);
        popupWrap.append(popupHeader, popupBody, popupBtnLine);
        popupBody.append(popupContent);
        popupBtnLine.append(popupBtn01, popupBtn02);
        bg.classList.add("popup-background");
        popupBody.classList.add("popup-body");
        popupHeader.classList.add("popup-header");
        popupBtnLine.classList.add("popup-btn-line");
        popupWrap.classList.add("popup-wrap");
        popupContent.innerHTML = this.text;
        popupBtn01.innerHTML = "확인";
        popupBtn02.innerHTML = "취소";
        document.body.append(bg);
        this.popup = bg;
    }

    open() {
        if (!this.popup.classList.contains("is-active"))
            this.popup.classList.add("is-active");
    }

    addEventListener(handler, handler2) { // 확인버튼함수, 취소버튼함수
        const [btn01, btn02] = this.popup.querySelectorAll(".popup-btn-line > button"); // 클래스안의 버튼 요소를 배열로 반환
        btn01.onclick = () => { handler(); this.close() };
        btn02.onclick = () => { handler2(); this.close() };
    }

    close = () => { // 화살표함수로 this를 풀어야 함
        if (this.popup.classList.contains("is-active"))
            this.popup.classList.remove("is-active");
    }
}