<template>
  <div class="word">
    <h3>{{ msg }}</h3>
    <img src="../assets/images/1.jpg" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "恭喜发财"
    };
  },
  mounted() {}
};
</script>
<style lang="less" scope>
.word {
  background: red;
  text-align: center;
  padding-top: 100px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  color: #fff;
}
</style>
