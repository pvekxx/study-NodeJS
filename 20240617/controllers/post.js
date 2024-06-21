const { posts } = require("../models") // ../models/index 는 생략 가능

// ViewPostAll : 내보낼 모듈에 ViewPostAll 키를 추가
exports.ViewPostAll = async () => {
    try {
        // 데이터를 조회한다.
        const data = await posts.getViewPostAll();
        // 데이터를 파싱하는 부분은 서비스 로직으로
        return data;
    } catch (error) {
        console.log("err : controller view post all")
    }
}

exports.ViewIndexPost = async (id) => {
    try {
        const data = await posts.getSelectIndexPost(id);
        return data;
    } catch (error) {
        console.log("err : controller view post index")
    }
}

exports.SetPostContent = async (title, content) => {
    try {
        await posts.setPostContent(title, content);
    } catch (error) {
        console.log("err : controller set post content");
    }
}