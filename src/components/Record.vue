<template>
  <div class="record-content">
    <span class="back iconfont icon-fanhui">返回</span>
    <div class="items">
      <a class="item" :href="item.direct_url" v-for="item in filter_all_record" :key="item.id">
        <img :src="item.pic_url" height="" width="" alt="">
        <div class="item-info">
          <h3 class="item-title">{{item.title}}</h3>
          <span></span>
        </div>
        <span class="gogo iconfont icon-qianjin"></span>
      </a>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Record",
      data () {
        return {
          all_record: [],
        }
      },
      computed: {
        filter_all_record: function() {
          return JSON.parse(window.sessionStorage.getItem("arr_show"));
        }
      },
      created: function () {
        let _this = this;
        _this.all_record = JSON.parse(window.sessionStorage.getItem("arr_show"));
        console.log(_this.all_record);
      }
    }
</script>

<style scoped lang="less">
  @import "../style/_rest.less";
  .record-content {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .back {
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
    font-size: 0.3rem;
    color: #333;
    z-index: 10;
  }
  .gogo {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%); /* Safari 和 Chrome */
  }
  .items {

  }
  .item {
    overflow: hidden;
    position: relative;
    display: block;
    padding: 0.23rem;
    border-top: solid #eee 1px;
    background-color: #fff;
    img {
      width: 2.08rem;
      height: 1.28rem;
      margin-right: 0.29rem;
      float: left;
    }
    .item-info {
      float: left;
      span {
        font-size: 0.28rem;
        vertical-align: middle;
        display: inline-block;
      }
    }
    .item-title {
      font-size: 0.32rem;
      font-weight: 400;
      overflow: hidden;
      width: 9em;
      height: 1em;
      margin-top: 0.14rem;
      margin-bottom: 0.35rem;
      white-space: nowrap;
      text-overflow: ellipsis;
    }


  }
  .item:active {
    background-color: #f1f1f1;
  }


</style>
