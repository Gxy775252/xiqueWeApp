const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
  * 组件共通时把组件中的方法合并到页面中
  * param
  *		pageObj（第一个参数）：注册Page()函数时传入的object
  *		compObjArr(后面的参数)：页面require的共通组件
  **/
const mergeComponents = function () {
  let pageObj = arguments[0];
  let length = arguments.length;
  for (let i = 1; i < length; i++) {
    let compObj = arguments[i];
    for (let compKey in compObj) {
      if (compKey == 'data') {
        // 合并页面中的data
        let data = compObj[compKey];
        for (let dataKey in data) {
          pageObj.data[dataKey] = data[dataKey];
        }
      } else {
        // 合并页面中的方法
        pageObj[compKey] = compObj[compKey];
      }
    }
  }
}  

/**
 * 函数节流方法
 * @param Function fn 延时调用函数
 * @param Number delay 延迟多长时间
 * @return Function 延迟执行的方法
 */
const throttle = function (fn, delay) {
  let timer = null;

  return function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn();
    }, delay);
  }
};

module.exports = {
  formatTime: formatTime,
  mergeComponents: mergeComponents,
  throttle: throttle
}
