
const input = document.querySelector('#test-name');

if (input) {
  let realValue = '';

  input.addEventListener('input', function (e) {
    const cursorPos = this.selectionStart;
    const newVal = this.value;

    // figure out what changed
    if (newVal.length < realValue.length) {
      // backspace or delete
      const diff = realValue.length - newVal.length;
      realValue = realValue.slice(0, cursorPos) + realValue.slice(cursorPos + diff);
    } else {
      // added characters
      const added = newVal.length - realValue.length;
      const inserted = e.data || newVal.slice(cursorPos - added, cursorPos);
      realValue = realValue.slice(0, cursorPos - inserted.length) + inserted + realValue.slice(cursorPos - inserted.length);
    }

    // update dataset with the real text
    this.dataset.encrypted = realValue;

    // mask with *
    this.value = '*'.repeat(realValue.length);

    // restore cursor position
    this.setSelectionRange(cursorPos, cursorPos);
  });
}