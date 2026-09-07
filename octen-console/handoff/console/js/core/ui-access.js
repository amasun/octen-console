if (!window.raCopyTemplate) {
          window.raCopyTemplate = function(btn) {
            const text = document.getElementById('ra-template').innerText;
            const label = btn.querySelector('.ra-copy-label');
            const copyIcon = btn.querySelector('.ra-copy-icon');
            const checkIcon = btn.querySelector('.ra-check-icon');
            const setCopied = () => {
              label.textContent = 'Copied!';
              copyIcon.classList.add('hidden');
              checkIcon.classList.remove('hidden');
              btn.style.color = '#039855';
              setTimeout(() => {
                label.textContent = 'Copy';
                copyIcon.classList.remove('hidden');
                checkIcon.classList.add('hidden');
              }, 1500);
              if (typeof toast === 'function') toast('Template copied');
            };
            if (navigator.clipboard && window.isSecureContext) {
              navigator.clipboard.writeText(text).then(setCopied).catch(() => {
                const ta = document.createElement('textarea');
                ta.value = text;
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand('copy'); setCopied(); } catch(e) {}
                document.body.removeChild(ta);
              });
            } else {
              const ta = document.createElement('textarea');
              ta.value = text;
              document.body.appendChild(ta);
              ta.select();
              try { document.execCommand('copy'); setCopied(); } catch(e) {}
              document.body.removeChild(ta);
            }
          };
        }