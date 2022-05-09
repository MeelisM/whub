import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import "primevue/resources/themes/luna-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Paginator from "primevue/paginator";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";
import Tag from "primevue/tag";
import Divider from "primevue/divider";
import Chart from "primevue/chart";

const app = createApp(App);

app.use(VueAxios, axios);
app.use(PrimeVue);
app.use(router);

app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Paginator", Paginator);
app.component("InputText", InputText);
app.component("Button", Button);
app.component("ProgressSpinner", ProgressSpinner);
app.component("Tag", Tag);
app.component("Divider", Divider);
app.component("Chart", Chart);

app.mount("#app");
