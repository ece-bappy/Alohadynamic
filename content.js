// Listen for messages from the new tabs
window.addEventListener('message', function(event) {
  if (event.data.action === 'fillForm') {
    fillForm(event.data.values);
  }
});

// Function to fill the form
function fillForm(values) {
  const setInputValue = (labelText, newValue) => {
    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
      if (label.innerText.trim() === labelText) {
        const input = label.nextElementSibling.querySelector('input');
        if (input) {
          input.value = newValue;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    });
  };

  setInputValue('Total Amount', values.totalAmount);
  setInputValue('Discount Amount', values.discountAmount);
  setInputValue('Vat Amount', values.vatAmount);
  setInputValue('Grand Total Amount', values.grandTotalAmount);

  // Find and click the "Update Fees" button
  const updateFeesButton = document.querySelector('.row_bottom_custom .btn.btn-success');
  if (updateFeesButton) {
    updateFeesButton.click();
  }
}
