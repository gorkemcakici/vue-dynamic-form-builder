import { createApp } from "vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import router from "./router/index";
import store from "./store/index";
import App from "./App.vue";
import appLoading from "./components/appLoading.vue"
import appSmartDdl from "./components/appSmartDdl.vue";
import appTextbox from "./components/appTextbox.vue";
import appCheckbox from "./components/appCheckbox.vue";
import appCalendar from "./components/appCalendar.vue";
import appText from "./components/appText.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const app = createApp(App);
app.use(router);
app.use(store);
app.component('appLoading',appLoading)
app.component("appSmartDdl", appSmartDdl);
app.component("appTextbox", appTextbox);
app.component("appCheckbox", appCheckbox);
app.component("appCalendar", appCalendar);
app.component("appText", appText);
app.component("Datepicker", Datepicker);
app.mount("#app");
