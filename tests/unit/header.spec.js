import { shallowMount } from "@vue/test-utils";
import Header from "@/components/Header.vue";

describe("HelloWorld.vue", () => {
  it("loads the module", () => {
    const wrapper = shallowMount(Header, {});
    expect(wrapper).toBeDefined();
  });
  it("Contain a navbar", () => {
    const wrapper = shallowMount(Header, {});
    expect(wrapper.contains("navbar")).toBe(true);
  });
});
