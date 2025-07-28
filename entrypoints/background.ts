export default defineBackground(() => {
  console.log("Hello from the background!");

  enum Messages {
    START_RECORDING = "START_RECORDING",
    STOP_RECORDING = "STOP_RECORDING",
    MOUNT_WIDGET = "MOUNT_WIDGET",
  }

  const handleMessage = async (message: Messages) => {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab?.id) return;

    if (message === Messages.MOUNT_WIDGET) {
      await browser.tabs.sendMessage(tab.id, {
        action: Messages.MOUNT_WIDGET,
      });
    }
  };

  browser.runtime.onMessage.addListener(
    (request: { action: Messages }, sender, sendResponse) => {
      console.log(request, "MESSAGE RECEIVED IN BACKGROUND");
      handleMessage(request.action);
      sendResponse({ received: true });
    }
  );
});
