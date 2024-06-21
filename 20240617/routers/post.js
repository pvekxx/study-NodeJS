// 게시글의 라우터들
const router = require("express").Router();
const { ViewPostAll, ViewIndexPost, SetPostContent } = require("../controllers/post")

router.get("/", async (req, res) => {
    // 요청을 받고 controller에서 어떤 작업을 처리할건지
    // view 데이터를 받아서 페이지를 완성
    // 전체 게시글 요청
    try {
        const data = await ViewPostAll()
        console.log(data);
        res.render("main", { data }); // 메인페이지에 데이터를 전달 하겠다
    } catch (error) {
        console.log("err : router view post all");
    }
})

router.get("/insert", async (req, res) => {
    res.render("insert");
})
router.post("/insert", async (req, res) => {
    try {
        const { title, content } = req.body;
        await SetPostContent(title, content);
        res.redirect("/post");
    } catch (error) {
        console.log("err : router insert post");
    }
})

module.exports = router;