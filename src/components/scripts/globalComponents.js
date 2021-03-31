import Vue from "vue";

Vue.component("exam-essay", () => import("../examEssay"));

Vue.component("exam-identification", () => import("../examIdentification"));

Vue.component("exam-mcq", () => import("../examMCQ"));

Vue.component("prompt-modal", () => import("../promptModal"));
