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
    if (message === Messages.START_RECORDING) {
      if (tab?.id) {
        console.log("MESSAGE SENT TO ", tab);
        browser.tabs.sendMessage(tab.id, { action: Messages.MOUNT_WIDGET });
      }
    }
  };
  browser.runtime.onMessage.addListener(
    (request: { action: Messages }, sender, sendResponse) => {
      console.log(request, "MESSAGE RECIEVED IN BACKGROUND");
      handleMessage(request.action);
    }
  );
});
