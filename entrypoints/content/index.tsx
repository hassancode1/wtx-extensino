import "./style.css";
import ReactDOM from "react-dom/client";
import App from "./App";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",

  async main(ctx) {
    browser.runtime.onMessage.addListener((msg) => {
      console.log(msg, "MESSAGE RECIEVED TO CONTNET SCRIPT");
    });
    console.log("background");
    const ui = await createShadowRootUi(ctx, {
      name: "wxt-react-example",
      position: "inline",
      anchor: "body",
      append: "first",
      onMount: (container) => {
        const wrapper = document.createElement("div");
        container.append(wrapper);

        const root = ReactDOM.createRoot(wrapper);
        root.render(<App />);
        return { root, wrapper };
      },
      onRemove: (elements) => {
        elements?.root.unmount();
        elements?.wrapper.remove();
      },
    });

    ui.mount();
  },
});
