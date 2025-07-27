export default defineBackground(() => {
  console.log("Hello from the background!");

  enum Messages {
    START_RECORDING = "START_RECORDING",
    MOUNT_WIDGET = "MOUNT_WIDGET",
  }

  const handleMessage = async (message: Messages) => {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab?.id) return;

    if (message === Messages.START_RECORDING) {
      console.log("MESSAGE SENT TO ", tab);
      try {
        await browser.tabs.sendMessage(tab.id, {
          action: Messages.MOUNT_WIDGET,
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  (browser.action ?? browser.browserAction).onClicked.addListener(
    async (tab) => {
      console.log("browser action triggered,", tab);
      if (tab.id) {
        await browser.tabs.sendMessage(tab.id, {
          action: Messages.MOUNT_WIDGET,
        });
      }
    }
  );

  browser.runtime.onMessage.addListener(
    (request: { action: Messages }, sender, sendResponse) => {
      console.log(request, "MESSAGE RECEIVED IN BACKGROUND");
      handleMessage(request.action);
      sendResponse({ received: true });
    }
  );
});
