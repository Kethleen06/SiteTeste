
/* script.js - funções para modal, tabs, scroll suave e formulários */

document.addEventListener('DOMContentLoaded', () => {
    // colocar ano no footer
    document.getElementById('ano').textContent = new Date().getFullYear();
  });
  
  /* Smooth scroll para seções */
  function scrollToSection(id) {
    const el = (id === 'footer') ? document.getElementById('footer') : document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  /* Modal: open/close e comportamento com parâmetro pessoa/empresa */
  const modal = document.getElementById('loginModal');
  
  function openModal(e, tipo = null) {
    if (e) e.preventDefault();
    modal.setAttribute('aria-hidden','false');
    modal.style.display = 'flex';
    // se tipo for passado, abrir aba "criar" e selecionar pessoa/empresa
    if (tipo) {
      switchTab(null, 'criar');
      if (tipo === 'empresa') {
        document.getElementById('tipoCadastro').value = 'empresa';
        toggleCNPJ();
      } else {
        document.getElementById('tipoCadastro').value = 'pessoa';
        toggleCNPJ();
      }
    } else {
      switchTab(null, 'entrar'); // default entrar
    }
  }
  
  function closeModal() {
    modal.setAttribute('aria-hidden','true');
    modal.style.display = 'none';
  }
  
  /* Tabs dentro do modal */
  function switchTab(event, tab) {
    // tab: 'entrar' ou 'criar'
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(b => b.classList.remove('active'));
    if (event && event.currentTarget) event.currentTarget.classList.add('active');
    // se não há evento, decorar botões manualmente
    if (!event) {
      document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.dataset.tab === (tab === 'entrar' ? 'entrar' : 'criar')) btn.classList.add('active');
      });
    }
  
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    const target = document.getElementById(tab);
    if (target) target.classList.add('active');
  }
  
  /* Mostrar/ocultar CNPJ se tipo empresa */
  function toggleCNPJ() {
    const tipo = document.getElementById('tipoCadastro').value;
    const cnpj = document.getElementById('cnpjField');
    if (tipo === 'empresa') {
      cnpj.style.display = 'block';
      cnpj.required = true;
    } else {
      cnpj.style.display = 'none';
      cnpj.required = false;
      cnpj.value = '';
    }
  }
  
  /* Form handlers (aqui você pode integrar com backend/substituir por fetch) */
  function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    // TODO: integrar com backend
    alert(`Ação de login simulada para: ${email}\n(implemente integração com o servidor)`);
    closeModal();
  }
  
  function handleCadastro(event) {
    event.preventDefault();
    const nome = document.getElementById('nomeCad').value;
    const email = document.getElementById('emailCad').value;
    const tipo = document.getElementById('tipoCadastro').value;
    // TODO: integrar com backend
    alert(`Cadastro simulado:\nNome: ${nome}\nE-mail: ${email}\nTipo: ${tipo}\n(implemente integração com o servidor)`);
    closeModal();
  }
  
  /* Newsletter */
  function handleNewsletter(event) {
    event.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    if (!email) {
      alert('Digite um e-mail para se inscrever.');
      return;
    }
    // TODO: enviar para serviço de newsletter
    alert(`Obrigado! E-mail ${email} inscrito (simulado).`);
    document.getElementById('newsletterEmail').value = '';
  }
  
  /* Fechar modal quando clicar fora do conteúdo */
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  /* Acessibilidade: fechar com ESC */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });
  