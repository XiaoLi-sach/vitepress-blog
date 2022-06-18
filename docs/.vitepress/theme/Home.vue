<template>
  <div id="home">
    <img src="https://xiaoli-wyy.oss-cn-hongkong.aliyuncs.com/XiaoLi_1456.jpg" style="width: 120px; margin: 0 auto;">
    <div class="author">XiaoLi_1456</div>
    <div class="text1">我不喜被人左右情绪， 在无人问津的时光中做着喜欢的事</div>
    <div class="text2">『我们一路奋战，不是为了改变世界，而是为了不让世界改变我们』</div>
    <div class="main">
       <button class="button1"><a href="https://github.com/xiaoli-sach">GitHub</a></button>
       <button><a href="https://space.bilibili.com/340808123">Bilibli</a></button>
    </div>
  </div>
</template>

<style scoped>
img {
  border-radius: 50%;
}
.author {
    font-size: 32px;
    font-weight: bold;
    margin: 20px;
}
.text2 {
    font-size: 12px;
    font-style: italic;
    line-height: 35px;
}
button {
    margin: 40px 20px 0;
    padding: 5px 20px;
    border-radius: 5px;
    border: none;
    cursor:pointer;
}
.main .button1 {
    background-color: #126bae;
}
.button1 a {
    color: #fff;
}
#home {
  max-width: 620px;
  margin: 40px auto;
  box-sizing: border-box;
  padding: 40px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
