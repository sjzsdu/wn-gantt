import wnGantt from "./index.vue";

wnGantt.install = function(Vue) {
  Vue.component(wnGantt.name, wnGantt);
};

export default wnGantt;
