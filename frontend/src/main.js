import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import store from './stores/todoStore/store';
// import vuetify from './plugins/vuetify';
  
createApp(App)
    .use(router)
    .use(store)
    // .use(vuetify)
    .mount('#app');