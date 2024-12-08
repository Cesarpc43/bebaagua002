let waterConsumed = 0;
const waterGoal = 2000; // Meta diária em ml

// Carregar dados salvos
function loadSavedData() {
    const saved = localStorage.getItem('waterConsumed');
    if (saved) {
        waterConsumed = parseInt(saved);
        updateDisplay();
    }
}

// Atualizar a exibição
function updateDisplay() {
    const progress = (waterConsumed / waterGoal) * 100;
    document.getElementById('waterProgress').style.width = `${Math.min(progress, 100)}%`;
    document.getElementById('waterConsumed').textContent = waterConsumed;
    
    // Salvar dados
    localStorage.setItem('waterConsumed', waterConsumed);

    // Verificar se atingiu a meta
    if (waterConsumed >= waterGoal) {
        alert('Parabéns! Você atingiu sua meta de água hoje! 🎉');
    }
}

// Adicionar água
function addWater(amount) {
    waterConsumed += amount;
    updateDisplay();
}

// Reiniciar contador
function resetWater() {
    if (confirm('Tem certeza que deseja reiniciar o contador?')) {
        waterConsumed = 0;
        updateDisplay();
    }
}

// Configurar notificações
function setupNotifications() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
                setInterval(() => {
                    if (document.hidden && waterConsumed < waterGoal) {
                        new Notification('Hora de beber água! 💧', {
                            body: 'Mantenha-se hidratado!',
                            icon: 'https://example.com/icon.png'
                        });
                    }
                }, 3600000); // Notifica a cada 1 hora
            }
        });
    }
}

// Inicializar
window.addEventListener('load', () => {
    loadSavedData();
    setupNotifications();
});
