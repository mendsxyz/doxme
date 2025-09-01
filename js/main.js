const input = document.querySelector('#test-name');

if (input) {
  let realValue = '';
  
  input.addEventListener('input', function(e) {
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
const reviewEncryptionBtn = document.querySelector('#review-encryption-btn');

if (encryptionForm) {
  encryptionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Encryption Values
    const testId = document.querySelector('#test-id').value.trim();
    const testName = document.querySelector('#test-name').dataset.encrypted;
    
    setLoading(reviewEncryptionBtn, true);
    
    const guardUrl = '';
    const encryptedGuardUrl = `${guardUrl}?encrypt_uid=${testId}`;
    
    try {
      const checkRes = await fetch(encryptedGuardUrl, {
        method: 'GET',
      });
      
      if (!checkRes.ok) {
        throw new Error('HTTP Error! Unable to fetch: ', `${checkRes.status}`);
      }
      
      const checkData = await checkRes.json();
      
      if (!checkData.exists) {
        const testEncForm = new FormData();
        testEncForm.append('encrypt_uid', testId);
        testEncForm.append('encrypt_name', testName);
        
        const res = await fetch(guardUrl, {
          method: 'POST',
          body: testEncForm,
        });
        
        if (!res.ok) {
          throw new Error('HTTP Error! Unable to fetch ', `${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.status === 'success') {
          setLoading(reviewEncryptionBtn, false);
          alert('Successful!');
        }
      }
    } catch (err) {
      alert('An Unknown Error Occured, Please try again');
      setLoading(reviewEncryptionBtn, false);
    }
  });
}

// Show query loading status
function setLoading(buttonEl, isLoading = true) {
  if (!buttonEl) return;
  
  if (isLoading) {
    buttonEl.classList.add('btn-loading');
    buttonEl.disabled = true;
  } else {
    buttonEl.classList.remove('btn-loading');
    buttonEl.disabled = false;
  }
}