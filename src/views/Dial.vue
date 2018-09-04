<template>
    <div id="main" class="main">
      <div class="content">
        <a href="javascript:;" @click="GetRecord(1)" class="record"></a>
        <div class="banner">
          <img src="../assets/images/5l7hw3xxft.png" height="" width="" alt="">
          <div class="rule" @click="ChangeRule(1)"></div>
        </div>
        <!-- 次数 -->
        <div class="free-time">
          <p>今日免费：{{filter_count}} 次</p>
        </div>
        <!-- 核心 -->
        <div class="core">
          <div class="core-overflow">
            <div class="corona-border"></div>
            <div class="corona-group default rotate_box"></div>
            <div class="circle-rotate" :class="{begin: status_options.start === 99}">
              <div id="circle" >
                <div
                  class="circle-box">
                  <!-- 这个遍历添加 -->
                  <div class="prize">
                    <div class="prize-dialog">
                      <img src="../assets/images/lucky.png" height="" width="" alt="">
                    </div>
                  </div>
                  <div class="prize">
                    <div class="prize-dialog">
                      <img src="../assets/images/liuliang.png" height="" width="" alt="">
                    </div>
                  </div>
                  <div class="prize">
                    <div class="prize-dialog">
                      <img src="../assets/images/30.png" height="" width="" alt="">
                    </div>
                  </div>
                  <div class="prize">
                    <div class="prize-dialog">
                      <img src="../assets/images/66.png" height="" width="" alt="">
                    </div>
                  </div>
                  <div class="prize">
                    <div class="prize-dialog">
                      <img src="../assets/images/200.png" height="" width="" alt="">
                    </div>
                  </div>
                  <div class="prize">
                    <div class="prize-dialog">
                      <img src="../assets/images/jd.png" height="" width="" alt="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="start" @click="PopWin(1)"></div>
          </div>
          <div class="point"></div>
        </div>
        <!--<p class="apple fixed">*奖品与活动和设备生产商Apple Inc.公司无关</p>-->
        <div class="text"></div>
        <!-- 手指 -->
        <div class="hand">
          <span class="hand_circle"></span>
          <span class="hand_body"></span>
        </div>
      </div>
      <!-- 规则 -->
      <div class="rule-modal" v-show="status_options.rule === 1">
        <div class="rule-modal-box">
          <div class="rule-title">
            <i></i>
            <span>{{status_options.rule_title}}</span>
            <i></i>
          </div>
          <div class="rule-content">
            <!-- 说明 -->
            <div class="instruction">
              <p>{{instruction_option.first}}</p>
              <p>{{instruction_option.two}}</p>
              <p>{{instruction_option.third}}</p>
              <p>{{instruction_option.title}}</p>
              <p v-for="(item, index) in instruction_option.options"
                 :key="index"
              >
                {{item}}
              </p>
            </div>
          </div>
          <div class="close iconfont icon-guanbi1" @click="ChangeRule(0)"></div>
        </div>
      </div>

      <!-- 福利弹窗 -->
      <div class="win" v-show="status_options.pop_win === 1">
        <div class="win-dialog">
          <span class="close" @click="PopWin(0)" ></span>
          <div class="modal-light">
          </div>
          <!--<div class="modal-head"></div>-->
          <div class="msfq-pic">
            <div class="msfq-png">
              <img :src="advert.pic_url" class="click-btn" @click="Task_Click(advert.click)" height="" width="" alt="">
            </div>
            <div class="msfq-desc" @click="Task_Click(advert.click)">
              {{advert.title}}
            </div>
            <a href="javascript:;" class="sub pic-btn" @click="Task_Click(advert.click)"></a>
          </div>

        </div>
      </div>

      <!-- 结束弹窗 -->
      <div class="over" v-show="status_options.pop_win === 2">
        <div class="over-dialog">
          <span class="close" @click="PopWin(0)"></span>
          <div class="over-content">
            <a :href="status_options.link" class="link">
              <img src="../assets/images/btn.jpg" alt="" />
              <span class="link-btn"></span>
            </a>
          </div>
        </div>
      </div>

      <!-- 已曝光的页面 -->
      <div class="get-record" v-show="status_options.record === 1">
        <span class="back iconfont icon-fanhui" @click="GetRecord(0)">返回</span>
        <div class="items">
          <a class="item"
             v-for="item in filter_all_records"
             @click="Task_Click(item.click)"
             :key="item.id">
            <img :src="item.pic_url" height="" width="" alt="">
            <div class="item-info">
              <h3 class="item-title">{{item.title}}</h3>
              <span></span>
            </div>
            <span class="gogo iconfont icon-qianjin"></span>
          </a>
        </div>
      </div>
    </div>
</template>

<script>
  import unit from '../unit'
    export default {
      name: "Dial",
      data() {
        return {
          status_options: {
            rule: 0, // 规则
            rule_title: '活动说明',
            pop_win: 0, // 弹窗
            link: 'http://www.baidu.com',
            count: '0',
            start: 99,
            record: 0,
            series: true
          },
          // 广告
          advert: {
            direct_url: "",
            id: "",
            index: 0,
            pic_url: '', // 图片
            title: 99
          },
          instruction_option: {
            first: '手痒又想买买买怎么办，这些“好礼”拯救你呀！买买买不愁，喜欢的东西跟你走！',
            two: '活动说明：参与活动即有机会获得惊喜礼包，每天8次免费抽奖机会。此活动为概率中奖，奖品数量有限，祝好运。',
            third: '－－－－－－－－－－－－－－－－',
            title: '重要声明',
            options: [
              '实物类奖品将在活动结束后5-10个工作日安排发货，请耐心等待',
              '优惠券类奖品的使用规则详见每个优惠券的介绍页',
              '通过非法途径获得奖品的，主办方有权不提供奖品',
              '此活动解释权归主办方所有'
            ]
          },
          filter_all_records: [],

        }
      },
      created () {
        let _this = this;
        _this.Task_GetList();
        let len = JSON.parse(window.sessionStorage.getItem('len')) || 0;
        let show_arr = JSON.parse(window.sessionStorage.getItem('arr_show')) || [];
        _this.status_options.count = len - show_arr.length;
        // _this.ShowRecord(_this.status_options.count);
      },
      computed: {
        filter_count: function () {
          let count = this.status_options.count;
          if (count < 0) {
            return 0;
          } else {
            return this.status_options.count;
          }
        }
      },
      mounted () {
        // 拿广告函数

      },
      methods: {
        // ShowRecord
        ShowRecord: function (count) {
          let _this = this;
          if (count == 0) {
            this.status_options.record = 1
          }
        },
        // 调用公共方法
        Task_GetList: function() {
          let _this = this;
          // 获取广告数组
          let arr_str = JSON.parse(window.sessionStorage.getItem("listDataArr"));
          let click_temp_arr =  JSON.parse(window.sessionStorage.getItem("click_temp_arr")) || [];
          // 显示弹窗
          if (!arr_str) {
            unit.GetList()
              .then(function (data) {
                if (data.popwin) {
                  _this.advert = data.popwin;
                  data.popwin.click = 99;
                  unit.ShowList(99);
                  click_temp_arr.push(data.popwin);
                  window.sessionStorage.setItem('len', data.list.length);
                  _this.status_options.count = data.list.length;
                } else {
                  data.list[0].click = 0;
                  _this.advert = data.list[0];
                  unit.ShowListControl(0);
                  click_temp_arr.push(data.list[0]);
                  window.sessionStorage.setItem('len', data.list.length);
                  _this.status_options.count = data.list.length - 1;
                }
                _this.status_options.pop_win = 1;
                window.sessionStorage.setItem('click_temp_arr', JSON.stringify(click_temp_arr));

              });
          }  else {
            _this.Show();
          }
        },
        Task_Click: function(num) {
          unit.ClickList(num);
        },

        // 显示隐藏规则
        ChangeRule: function(type) {
          let _this = this;
          _this.status_options.rule = type;
        },
        // 奖品弹窗
        PopWin: function(type) {
          let _this = this;
          if (type === 1) {
            if (_this.status_options.series === true) {
              if (_this.status_options.count > 0) {
                _this.status_options.start = 0;
                _this.status_options.series = false;
                let circle = document.getElementById('circle');
                let rand = Math.floor(Math.random() * 6);
                let rotate1 = 1440+(rand * 60 + 30) + 'deg';
                circle.style.transition = "all 1.8s ease-out";
                circle.style.transform = "rotate("+ rotate1 +")";
                setTimeout(function () {
                  _this.Show();
                }, 1850);
                setTimeout(function () {
                  circle.style.transition = "";
                  circle.style.transform = "rotate(0deg)";
                  _this.status_options.series = true;
                }, 2000)
              } else {
                _this.Show();
              }
            }
          } else if (type) {
            _this.status_options.pop_win = type;
          } else {
            _this.status_options.pop_win = 0;
          }
        },

        // 弹窗广告
        Show: function () {
          let _this = this;
          let arr_str = JSON.parse(window.sessionStorage.getItem("listDataArr"));
          let click_temp_arr =  JSON.parse(window.sessionStorage.getItem("click_temp_arr")) || [];
          // 获取已经曝光的数组
          let arr_show = JSON.parse(window.sessionStorage.getItem("arr_show")) || [];
          // 两重遍历将没有曝光的曝光，
          let show_index = arr_show.length;
          let len = arr_str.list.length;
          if (show_index < len) {
            unit.ShowListControl(show_index);
            arr_str.list[show_index].click = show_index;
            click_temp_arr.push(arr_str.list[show_index]);
            window.sessionStorage.setItem('click_temp_arr', JSON.stringify(click_temp_arr));
            _this.advert = arr_str.list[show_index];
            _this.status_options.pop_win = 1;
            let len = JSON.parse(window.sessionStorage.getItem('len')) || 0;
            let show_arr = JSON.parse(window.sessionStorage.getItem("arr_show")) || [];
            _this.status_options.count = len - show_arr.length;
          } else {
            // 已经全部展示了, 隐藏福利弹窗
            _this.status_options.pop_win = 2;
          }
        },

        // 查看已经获得的广告
        GetRecord: function (type) {
          let _this = this;
          if (type === 1) {
            _this.status_options.record = 1;
            history.pushState('record', '', '');
          } else if (type === 0) {
            _this.status_options.record = 0;
            history.go(-1)
          } else {
            _this.status_options.record = 0;
            history.go(-1)
          }
          _this.filter_all_records =  JSON.parse(window.sessionStorage.getItem("click_temp_arr"));
        },
      }
    }
</script>

<style scoped lang="less">

</style>
