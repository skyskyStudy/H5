
import axios from 'axios'
let arr_click = []; //点击后的数组
let click = true; //防止连续点击

const unit = {
  // 初始化设置size
  ResizeRemToPxBase: function(designWidth, remToPx){
    let html = document.documentElement;
    html.style.fontSize = "";
    //以根节点为基数  即当前默认字体大小
    let d = window.document.createElement('div');
    d.style.width = '1rem';
    d.style.display = "none";
    let head = window.document.getElementsByTagName('head')[0];
    head.appendChild(d);
    let defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
    head.removeChild(d);
    //（当前设备屏幕宽度/设计稿宽度）*（当前1rem的取值/当前默认字体大小）*100+"%"
    html.style.fontSize = window.innerWidth / designWidth * remToPx * (defaultFontSize / 16) + "px";
    head = null;
    html = null;
  },

  // 获取ur中的value值
  GetUrlValue: function (key) {
    let url = window.location.href;
    let value = '', arr = [];
    let num = url.indexOf("?");
    url = url.substr(num + 1);
    if (url === '' || url === null || url === undefined) {
      return;
    } else {
      arr = url.split('&');
      arr.map((item, index) => {
        num = item.indexOf('=');
        if (num > 0) {
          let name = item.substring(0, num);
          if (name === key) {
            value = item.substr(num + 1);
            return;
          }
        }
      })
    }
    return value;
  },

  //cookie的设置和获取
  SetCookie: function (name, value, expires) {
    document.cookie = name + "=" + value + ";" + expires + ";path=/INAVAD";
    document.cookie = name + "=" + value + ";" + expires;
  },
  GetCookie: function(name) {
    let cname = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(cname) == 0)
        return c.substring(cname.length, c.length);
    }
    return "";
  },

  // 获取广告
  GetList: function(type) {
    // 初始化广告次数
    window.sessionStorage.setItem('cur_index', 0);
    let url = "/INAVAD/GetList";
    let get_list_data_send = {};
    if (type) {
      get_list_data_send = { view_id: viewid, platform_id: plat, pop_win: type, platform_type: platform_type, city: city, name: view_name, open_id: open_id };
    } else {
      get_list_data_send = { view_id: viewid, platform_id: plat, platform_type: platform_type, city: city, name: view_name, open_id: open_id };
    }
    return new Promise(function (resolve, reject) {
      axios.post(url, get_list_data_send)
        .then(function (res) {
          let data = res.data;
          // 存储广告数据
          if (data.list) {
            window.sessionStorage.setItem("listDataArr",JSON.stringify(data));
          }
          resolve(data);
        }).catch(function (err) {
        reject(err);
      })
    })
  },

  // show曝光的管理函数
  ShowListControl: function(num) {
    let arr_str = JSON.parse(window.sessionStorage.getItem("listDataArr")); //取出奖品信息(sessionStorage)
    let advert = arr_str.list[num];
    // 拿到已经曝光的广告
    let arr_show = JSON.parse(window.sessionStorage.getItem("arr_show")) || [];
    let arr_show_str = arr_show.join(',');
    // 没有在曝光的光就发送show
    let show_bool = arr_str.list && advert && advert.id && arr_show_str.indexOf(advert.id) === -1;
    // 没有曝光的
    if (show_bool) {
      unit.ShowList(num);
      // 存储曝光广告的id
      arr_show.push(advert);
      window.sessionStorage.setItem('arr_show', JSON.stringify(arr_show));
    } else {
      console.log('全部曝光了');
    }
  },
  // Show曝光
  ShowList: function (num) {
    let arr_str = JSON.parse(window.sessionStorage.getItem("listDataArr")); //取出奖品信息(sessionStorage)
    // 获取GetList的事件
    let cur_cookie = unit.GetCookie("show_history" + arr_str.time);
    let str = '', target_value = '';

    // 判断有广告的就使用
    if (arr_str) {
      // 是否弹窗
      let pop_win = arr_str.popwin && num == 99;
      if (pop_win) {
        str = arr_str.popwin.id;
        axios.post('/INAVAD/Show',{
          view_id: viewid,
          id: arr_str.popwin.id,
          index: arr_str.popwin.index,
          platform_id: plat,
          oper_id: oper_id,
          openid: open_id,
          name: view_name
        }).then(function (res) {
        })
      } else {
        str = arr_str.list[num].id;
        axios.post('/INAVAD/Show',{
          view_id: viewid,
          id: arr_str.list[num].id,
          index: arr_str.list[num].index,
          platform_id: plat,
          oper_id: oper_id,
          openid: open_id,
          name: view_name
        }).then(function (res) {
        })
      }
    }
    // 设置cookie
    if (cur_cookie) {
      let d = new Date();
      d.setTime(d.getTime() + (32 * 60 * 60 * 1000));
      let expires = "expires=" + d.toUTCString();
      window.sessionStorage.setItem("time", d.toUTCString());
      target_value = str;
      unit.SetCookie("show_history" + arr_str.time, target_value, expires);
    } else {
      let expires = "expires=" + window.sessionStorage.getItem("time");
      target_value = cur_cookie + ',' + str;
      unit.SetCookie("show_history" + arr_str.time, target_value, expires);
    }
  },

  // 点击函数
  ClickList: function (clicknum) {
    setTimeout(function () {
      click = true;
    }, 1000);
    if (click === true) {
      click = false;
      let arr_str = JSON.parse(window.sessionStorage.getItem("listDataArr"));
      arr_click = JSON.parse(window.sessionStorage.getItem("arr_click")) || arr_click;
      let arr_click_str = arr_click.join(',');
      // 判断是否有弹窗
      if (arr_str.popwin && clicknum == 99) {
        let pop_win = arr_str.popwin;
        let click_pop = pop_win && pop_win.id && arr_click.indexOf(pop_win.id) === -1;
        // 未有点击
        if (pop_win) {
          arr_click.push(pop_win.id);
          window.sessionStorage.setItem("arr_click", JSON.stringify(arr_click)); //存储
          // 发送请求
          axios.post('/INAVAD/Click',{
            view_id: viewid,
            id: pop_win.id,
            index: pop_win.index,
            platform_id: plat,
            oper_id: oper_id,
            openid: open_id,
            name: view_name
          }).then(function (res) {
            let data = res.data;
            window.location.href = pop_win.direct_url;
          }).catch(function (err) {
            console.log('请求超时');
          })
        } else {
          window.location.href = pop_win.direct_url;
        }
      }
      else { // 不是popwin弹窗
        let advert = arr_str.list[clicknum];
        let click_list = arr_str.list && advert && advert.id && arr_click_str.indexOf(advert.id) === -1;
        if (click_list) {
          arr_click.push(advert.id);
          window.sessionStorage.setItem("arr_click", JSON.stringify(arr_click)); //存储
          axios.post('/INAVAD/Click',{
            view_id: viewid,
            id: advert.id,
            index: advert.index,
            platform_id: plat,
            oper_id: oper_id,
            openid: open_id,
            name: view_name
          }).then(function (res) {
            let data = res.data;
            window.location.href = advert.direct_url;
          }).catch(function (err) {
            console.log('请求超时');
          })
        } else {
          if (clicknum < arr_str.list.length) {
            window.location.href = advert.direct_url;
          }
        }
      }
    }
  },

  // 浏览器侦听事件
  Monitor: function () {
    if (window.history && window.history.pushState) {
      window.onpopstate = function () {
        location.reload();
      }
    }
  }
};

// 公共接口的js
let plat = null;
let ua = navigator.userAgent.toLowerCase(); //判断用户浏览器类型
if (ua.indexOf("alipay") != -1) {
  plat = 1; //支付宝
}
else if (ua.match(/MicroMessenger/i) == "micromessenger") {
  plat = 2; //微信
}
else {
  plat = 3; //其它
}
//判断IOS或是Android
let u = navigator.userAgent, app = navigator.appVersion;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
let platform_type;
if (isAndroid) {
  platform_type = "android";
}
else if (isIOS) {
  platform_type = "ios";
}
else {
  platform_type = "other";
}
//拿到页面url中的参数
let viewid = unit.GetUrlValue('view_id');
let view_name = unit.GetUrlValue('name');
let open_id = unit.GetUrlValue('openid');
let oper_id = unit.GetUrlValue('oper_id');
let city = unit.GetUrlValue('city');

/*
*  在此调用自己的方法
* */
//目前设计稿750， 根 font-size 100px  尺寸 除以100  单位：rem
unit.ResizeRemToPxBase(750, 100);
// 侦听浏览器后退事件
unit.Monitor();

export default  unit

