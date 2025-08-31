const input = document.querySelector('#test-name');

if (input) {
  let realValue = '';

  input.addEventListener('input', function (e) {
    const cursorPos = this.selectionStart;
    const newVal = this.value;

    // This checks for value changes
    if (newVal.length < realValue.length) {
      const diff = realValue.length - newVal.length;
      realValue = realValue.slice(0, cursorPos) + realValue.slice(cursorPos + diff);
    } else {
      const added = newVal.length - realValue.length;
      const inserted = e.data || newVal.slice(cursorPos - added, cursorPos);
      realValue = realValue.slice(0, cursorPos - inserted.length) + inserted + realValue.slice(cursorPos - inserted.length);
    }

    // This updates the input dataset with the actual value
    this.dataset.encrypted = realValue;

    // To mask the actual input values with *
    this.value = '*'.repeat(realValue.length);
    this.setSelectionRange(cursorPos, cursorPos);
  });
}

const encryptionForm = document.querySelector('#test-encryption-form');

if (encryptionForm) {
  encryptionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Encryption Values
    const testId = document.querySelector('#test-id').value.trim();
    const testName = document.querySelector('#test-name').dataset.encrypted;
    
    // Value View
    alert(`Your Encryption Details: \n Test Id: ${testId} \n Test Name: ${testName}`);
  });
}