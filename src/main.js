import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import { Button, Input, Message } from 'element-ui'

Vue.use(Button);
Vue.use(Input);

Vue.prototype.$message = Message;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
