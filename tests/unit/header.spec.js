import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import router from "@/router/index.js";
import { mount, createLocalVue } from "@vue/test-utils";
import Header from "@/components/Header.vue";

const localVue = createLocalVue();
Vue.use(Vuetify);
Vue.use(VueRouter);

describe("Header.vue", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify({
      theme: {
        dark: true
      }
    });
  });

  it("loads Header", () => {
    const wrapper = mount(Header, {
      localVue,
      vuetify,
      router
    });
    expect(wrapper).toBeDefined();
  });
  it("expects to contain a navbar", () => {
    const wrapper = mount(Header, {
      localVue,
      vuetify,
      router
    });
    expect(wrapper.contains(".navbar")).toBe(true);
  });
  it("renders a v-btn", async () => {
    const wrapper = mount(Header, {
      localVue,
      vuetify,
      router
    });

    expect(wrapper.find(".v-btn").text()).toBe("about us");
  });
});
