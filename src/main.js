import Vue from "vue";
import App from "./App.vue";

// Plugins
import mdiVue from 'mdi-vue/v2';
import * as mdijs from '@mdi/js';
import Transitions from 'vue2-transitions'


// Plugins
Vue.use(mdiVue, {
  icons: mdijs
});
Vue.use(Transitions)


Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
