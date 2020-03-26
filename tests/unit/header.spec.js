import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import globalstore from "@/store/index";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Header from "@/components/Header.vue";

// avoid the multiple vue instance error
Vue.use(Vuetify);

let localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe("Header.vue", () => {
  let vuetify;
  let store;

  beforeEach(() => {
    (vuetify = new Vuetify({
      theme: {
        dark: true
      }
    })),
      (store = globalstore);
  });

  it("renders the Header components", () => {
    const wrapper = shallowMount(Header, {
      vuetify,
      store
    });
    expect(wrapper.isVueInstance()).toBe(true);
  });
  it("it renders a language class with a default value of the store", () => {
    const wrapper = shallowMount(Header, {
      vuetify,
      store
    });
    expect(wrapper.find(".Language").text()).toBe(store.getters.getLanguage);
  });
});
