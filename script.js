// ─── HAMBURGER MENU ───
    function toggleMenu() {
      const btn = document.getElementById('hamburger');
      const nav = document.getElementById('mobileNav');
      btn.classList.toggle('open');
      nav.classList.toggle('open');
    }

    function closeMenu() {
      document.getElementById('hamburger').classList.remove('open');
      document.getElementById('mobileNav').classList.remove('open');
    }

    // ─── VIDEO ───
    function playVideo() {
      const video = document.getElementById('promoVideo');
      const overlay = document.getElementById('videoOverlay');
      video.play();
      overlay.classList.add('hidden');
    }

    document.getElementById('promoVideo').addEventListener('ended', () => {
      document.getElementById('videoOverlay').classList.remove('hidden');
    });

    // ─── CART ───
    let cart = [];

    function openCart() {
      document.getElementById('cartOverlay').classList.add('open');
      document.getElementById('cartDrawer').classList.add('open');
      renderCart();
    }

    function closeCart() {
      document.getElementById('cartOverlay').classList.remove('open');
      document.getElementById('cartDrawer').classList.remove('open');
    }

    function addToCart(name, price) {
      const existing = cart.find(i => i.name === name);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ name, price, qty: 1 });
      }
      updateCartCount();
      showToast('✓ ' + name + ' adicionado!');
    }

    function removeFromCart(index) {
      cart.splice(index, 1);
      updateCartCount();
      renderCart();
    }

    function updateCartCount() {
      const total = cart.reduce((sum, i) => sum + i.qty, 0);
      document.getElementById('cartCount').textContent = total;
    }

    function renderCart() {
      const container = document.getElementById('cartItems');
      const totalEl = document.getElementById('cartTotal');
      const checkoutBtn = document.getElementById('checkoutBtn');

      if (cart.length === 0) {
        container.innerHTML = '<p class="cart-empty">O seu carrinho está vazio.</p>';
        totalEl.textContent = '0 Kz';
        return;
      }

      let html = '';
      let total = 0;
      let msg = 'Olá! Quero comprar:\n';

      cart.forEach((item, i) => {
        total += item.price * item.qty;
        msg += `- ${item.name} (x${item.qty}) — ${(item.price * item.qty).toLocaleString()} Kz\n`;
        html += `
          <div class="cart-item">
            <div class="cart-item-info">
              <strong>${item.name}</strong>
              <span>x${item.qty} × ${item.price.toLocaleString()} Kz</span>
            </div>
            <strong style="color:var(--gold); font-size:15px; white-space:nowrap;">${(item.price * item.qty).toLocaleString()} Kz</strong>
            <button class="remove-item" onclick="removeFromCart(${i})" title="Remover">×</button>
          </div>
        `;
      });

      msg += `\nTotal: ${total.toLocaleString()} Kz`;
      container.innerHTML = html;
      totalEl.textContent = total.toLocaleString() + ' Kz';
      checkoutBtn.href = `https://wa.me/+244932381213?text=${encodeURIComponent(msg)}`;
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2800);
    }