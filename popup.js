document.addEventListener('DOMContentLoaded', function() {
  const totalAmountInput = document.getElementById('totalAmount');
  const discountAmountInput = document.getElementById('discountAmount');
  const vatAmountInput = document.getElementById('vatAmount');
  const grandTotalAmountInput = document.getElementById('grandTotalAmount');
  const findButton = document.getElementById('findButton');

  // Load saved values from storage
  chrome.storage.sync.get(['totalAmount', 'discountAmount', 'vatAmount', 'grandTotalAmount'], function(items) {
    if (items.totalAmount !== undefined) totalAmountInput.value = items.totalAmount;
    if (items.discountAmount !== undefined) discountAmountInput.value = items.discountAmount;
    if (items.vatAmount !== undefined) vatAmountInput.value = items.vatAmount;
    if (items.grandTotalAmount !== undefined) grandTotalAmountInput.value = items.grandTotalAmount;
  });

  // Save values to storage when they change
  totalAmountInput.addEventListener('input', function() {
    chrome.storage.sync.set({ totalAmount: totalAmountInput.value });
  });

  discountAmountInput.addEventListener('input', function() {
    chrome.storage.sync.set({ discountAmount: discountAmountInput.value });
  });

  vatAmountInput.addEventListener('input', function() {
    chrome.storage.sync.set({ vatAmount: vatAmountInput.value });
  });

  grandTotalAmountInput.addEventListener('input', function() {
    chrome.storage.sync.set({ grandTotalAmount: grandTotalAmountInput.value });
  });

  // Send values to the content script when the button is clicked
  findButton.addEventListener('click', function() {
    const totalAmount = totalAmountInput.value;
    const discountAmount = discountAmountInput.value;
    const vatAmount = vatAmountInput.value;
    const grandTotalAmount = grandTotalAmountInput.value;

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (totalAmount, discountAmount, vatAmount, grandTotalAmount) => {
          chrome.runtime.sendMessage({
            action: 'findUnpaidRows',
            values: {
              totalAmount: totalAmount,
              discountAmount: discountAmount,
              vatAmount: vatAmount,
              grandTotalAmount: grandTotalAmount
            }
          });
        },
        args: [totalAmount, discountAmount, vatAmount, grandTotalAmount]
      });
    });
  });
});
