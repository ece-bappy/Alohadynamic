chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "findUnpaidRows") {
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        function: (values) => {
          const unpaidRows = document.querySelectorAll('tr > td > span[style="background-color:red;color:#FFFFFF;font-weight:bold;padding:5px;border-radius:5px;"]');
          unpaidRows.forEach((row) => {
            const updateButton = row.closest('tr').querySelector('td > a[title="Update"]');
            if (updateButton) {
              const updateLink = updateButton.getAttribute('href');
              const newTab = window.open(updateLink, '_blank');
              newTab.onload = function () {
                newTab.postMessage({ action: "fillForm", values: values }, '*');
              };
            }
          });
        },
        args: [request.values]
      });
    }
  });
  