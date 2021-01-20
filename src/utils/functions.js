// 格式化日期
export function formatDate(value, format = 'yyyy-MM-dd hh:mm:ss') {
  let time = new Date(+value);
  let o = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    'q+': Math.floor((time.getMonth() + 3) / 3),
    'S': time.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }

  return format;
}

// 判断是否是json字符串
const isJsonString = (str) => {
  if (typeof str === 'string') {
    try {
      let obj = JSON.parse(str);
      if (typeof obj === 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
};

// 设置localStorage
export function setLocalStorage (key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};

// 获取localStorage
export function getLocalStorage(key) {
  let value = localStorage.getItem(key);
  if (isJsonString(value)) {
    return JSON.parse(value);
  }
  return value;
};

// 先简单做xss的过滤
export function filterXSS(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/ /g, '&nbsp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\r{0,}\n/g, '<br/>')
}

// 生成随机数，默认生成1-10的随机数
export function generateRandomNumber (range = 10) {
  return Math.floor(Math.random() * 10 + 1);
}
