document.addEventListener('DOMContentLoaded', () => {

  const spotlight = document.querySelector('.spotlight-cursor');
  if (spotlight && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    });
  }

  const magneticBtns = document.querySelectorAll('.btn-magnetic');
  magneticBtns.forEach((btn) => {
    const strength = 22;
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const moveX = (x / rect.width) * strength;
      const moveY = (y / rect.height) * strength;
      btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  const roleEl = document.getElementById('roleType');
  if (roleEl) {
    const roles = ['Data Scientist', 'Data Analyst', 'Python Developer'];
    let roleIndex = 0, charIndex = 0, deleting = false;

    function typeLoop() {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        roleEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1400);
          return;
        }
      } else {
        charIndex--;
        roleEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeLoop, deleting ? 45 : 90);
    }
    typeLoop();
  }

  const statNums = document.querySelectorAll('.stat-num');
  if (statNums.length) {
    const animateCount = (el) => {
      const target = parseInt(el.dataset.target, 10) || 0;
      const duration = 1200;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + (el.dataset.suffix || '+');
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };

    const statObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    statNums.forEach((el) => statObserver.observe(el));
  }

  const terminalBody = document.getElementById('terminalBody');
  if (terminalBody) {
    const lines = [
      { prompt: '> ', text: `console.log('Hi, I'm Kaustubh')` },
      { prompt: '', text: 'Data Scientist | Data Analyst' },
      { prompt: '> ', text: 'building_models = True' },
    ];
    let lineIdx = 0, charIdx = 0;

    function typeTerminal() {
      if (lineIdx >= lines.length) {
        terminalBody.insertAdjacentHTML('beforeend', '<span class="terminal-cursor"></span>');
        return;
      }
      const line = lines[lineIdx];
      if (charIdx === 0) {
        terminalBody.insertAdjacentHTML('beforeend', `<div><span class="prompt">${line.prompt}</span><span class="line-${lineIdx}"></span></div>`);
      }
      const target = terminalBody.querySelector(`.line-${lineIdx}`);
      charIdx++;
      target.textContent = line.text.slice(0, charIdx);
      if (charIdx < line.text.length) {
        setTimeout(typeTerminal, 35);
      } else {
        lineIdx++;
        charIdx = 0;
        setTimeout(typeTerminal, 350);
      }
    }
    typeTerminal();
  }

  // Note: floating tech badge delays are set via inline `style="animation-delay:..."`
  // in index.html itself, so no forEach delay-setter is needed here.

});