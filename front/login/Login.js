// ============================================
// 🔐 FUNCIONALIDADES DO LOGIN
// ============================================
// Script que gerencia: validação de email/senha, mostrar/esconder senha,
// mostrar/ocultar senhas, login (simulado) com redirecionamento,
// e botões sociais (Google, Facebook) com placeholders.

// Aguarda o HTML carregar completamente antes de executar
document.addEventListener('DOMContentLoaded', () => {
    // Seletores DOM para elementos do formulário
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // ============================================
    // 👁️ MOSTRAR/ESCONDER SENHA
    // ============================================
    // Alterna entre mostrar/esconder a senha ao clicar no botão olho.
    togglePassword.addEventListener('click', (e) => {
        e.preventDefault();
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        // Muda emoji do olho
        togglePassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });

    // ============================================
    // ✅ VALIDAÇÃO DE EMAIL
    // ============================================
    // Ao sair do campo (blur): valida formato de email.
    // Mostra erro se inválido (borda vermelha + mensagem).
    // Ao entrar no campo (focus): limpa erro anterior.
    emailInput.addEventListener('blur', () => {
        if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Por favor, insira um email válido';
            emailError.classList.add('show');
            emailInput.style.borderColor = '#ff6b6b';
        } else {
            emailError.classList.remove('show');
            emailInput.style.borderColor = '#e0e0e0';
        }
    });

    emailInput.addEventListener('focus', () => {
        emailError.classList.remove('show');
        if (emailInput.value) {
            emailInput.style.borderColor = '#e0e0e0';
        }
    });

    // ============================================
    // ✅ VALIDAÇÃO DE SENHA
    // ============================================
    // Ao sair do campo: verifica se tem pelo menos 6 caracteres.
    // Mostra erro se muito curta (borda vermelha + mensagem).
    // Ao entrar: limpa erro anterior.
    passwordInput.addEventListener('blur', () => {
        if (passwordInput.value.length < 6) {
            passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres';
            passwordError.classList.add('show');
            passwordInput.style.borderColor = '#ff6b6b';
        } else {
            passwordError.classList.remove('show');
            passwordInput.style.borderColor = '#e0e0e0';
        }
    });

    passwordInput.addEventListener('focus', () => {
        passwordError.classList.remove('show');
        if (passwordInput.value) {
            passwordInput.style.borderColor = '#e0e0e0';
        }
    });

    // ============================================
    // 📤 SUBMIT DO FORMULÁRIO (Login)
    // ============================================
    // Ao submeter (Enter ou click em Entrar):
    // - Valida email e senha
    // - Se OK: verifica se são credenciais de admin
    // - Se admin: redireciona para /admin e salva autenticação
    // - Se não admin: redireciona para /inicial/i.html
    // - Se erro: mostra mensagem de erro e mantém na página
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = document.getElementById('remember').checked;

        // Validar campos
        if (!validateEmail(email)) {
            emailError.textContent = 'Email inválido';
            emailError.classList.add('show');
            return;
        }

        if (password.length < 6) {
            passwordError.textContent = 'Senha inválida';
            passwordError.classList.add('show');
            return;
        }

        // Credenciais de admin
        const ADMIN_EMAIL = 'admin@biblioteca.com';
        const ADMIN_PASSWORD = '123456';

        // Verificar se são credenciais de admin
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // Login de admin bem-sucedido
            console.log('Login admin realizado');
            
            // Salvar sessão de admin
            sessionStorage.setItem('adminLogged', 'true');
            sessionStorage.setItem('adminUser', email);
            sessionStorage.setItem('loginTime', new Date().toISOString());
            
            // Mostrar mensagem de sucesso
            showNotification('Bem-vindo Admin! Abrindo painel...', 'success');

            // Simular delay e redirecionamento
            setTimeout(() => {
                // Redireciona para o painel de admin
                window.location.href = '/admin';
            }, 1500);
        } else {
            // Login de usuário comum
            console.log('Login de usuário comum:', { email, password, remember });
            
            // Mostrar mensagem de sucesso
            showNotification('Login realizado com sucesso!', 'success');

            // Simular delay e redirecionamento
            setTimeout(() => {
                // Redireciona para a página inicial real do projeto
                window.location.href = '../inicial/inicial.html';
            }, 1500);
        }
    });

    // ============================================
    // 🔗 EVENTOS DOS BOTÕES SOCIAIS
    // ============================================
    // Botões Google e Facebook ainda não têm integração real.
    // Só mostram notificações de placeholder por enquanto.
    document.querySelector('.btn-google').addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Login com Google (em desenvolvimento)', 'info');
    });

    document.querySelector('.btn-facebook').addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Login com Facebook (em desenvolvimento)', 'info');
    });

    // ============================================
    // 🔑 ESQUECI A SENHA
    // ============================================
    document.querySelector('.forgot-password').addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Verifique seu email para recuperar a senha', 'info');
    });

    // ============================================
    // 📝 CADASTRO
    // ============================================
    // Link "Cadastre-se" ainda não tem página implementada.
    // Mostra notificação de placeholder por enquanto.
    document.querySelector('.signup-link').addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Página de cadastro (em desenvolvimento)', 'info');
    });
});

// ============================================
// 🛠️ FUNÇÕES AUXILIARES
// ============================================

/**
 * validateEmail(email): string → boolean
 * Valida formato de email usando regex.
 * Retorna true se formato válido (tem @, domínio, extensão).
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * showNotification(message, type): void
 * Exibe uma notificação flutuante (toast) no canto superior direito.
 * type: 'success' (verde), 'error' (vermelho), ou 'info' (azul).
 * Desaparece automaticamente após 3 segundos.
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    // Define cor de fundo conforme tipo de notificação
    if (type === 'success') {
        notification.style.background = '#4caf50';  // Verde
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.background = '#ff6b6b';  // Vermelho
        notification.style.color = 'white';
    } else {
        notification.style.background = '#2196f3';  // Azul
        notification.style.color = 'white';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Anima saída após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// 🎨 ANIMAÇÕES CSS
// ============================================
// Injeta animações slideIn/slideOut para as notificações.
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
