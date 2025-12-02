// 1. INICIALIZAR ANIMACIONES (AOS)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true
    });
});

// 2. SMOOTH SCROLLING
document.querySelectorAll('a[data-scroll]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('data-scroll'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// 3. SISTEMA DE ESTADO (Hero Card Interaction)
const statusBtn = document.getElementById('toggle-status');
const statusText = document.getElementById('status-text');
const statusIcon = document.getElementById('status-icon');
const liveIndicator = document.getElementById('live-indicator');
const pingDot = document.querySelector('.ping-dot');

if(statusBtn) {
    statusBtn.addEventListener('click', () => {
        const isOnline = statusText.textContent.includes('Online');

        if(isOnline) {
            // Cambiar a Modo Error
            statusText.textContent = "Error de Conexión";
            statusText.classList.replace('text-white', 'text-danger');
            
            statusIcon.textContent = "wifi_off";
            statusIcon.classList.replace('text-white', 'text-danger');
            
            liveIndicator.textContent = "OFFLINE";
            liveIndicator.classList.replace('text-white', 'text-danger');
            
            pingDot.style.background = '#ef4444';
            pingDot.style.boxShadow = '0 0 10px #ef4444';
            statusBtn.innerHTML = '<span class="material-symbols-rounded fs-6 me-2 align-middle">refresh</span>Reconectar';
        } else {
            // Volver a Online
            statusText.textContent = "Sistemas Online";
            statusText.classList.replace('text-danger', 'text-white');
            
            statusIcon.textContent = "wifi_tethering";
            statusIcon.classList.replace('text-danger', 'text-white');
            
            liveIndicator.textContent = "LIVE";
            liveIndicator.classList.replace('text-danger', 'text-white');
            
            pingDot.style.background = '#22c55e';
            pingDot.style.boxShadow = '0 0 10px #22c55e';
            statusBtn.innerHTML = '<span class="material-symbols-rounded fs-6 me-2 align-middle">bug_report</span>Simular Incidencia';
        }
    });
}

// 4. CAMBIO DE SERVICIOS
const serviceCards = document.querySelectorAll('.service-card');
const infoTitle = document.getElementById('service-info-title');
const infoText = document.getElementById('service-info-text');

const servicesData = {
    urgente: {
        title: "Protocolo Urgente (Rocket)",
        desc: "Utilizamos drones y transporte dedicado para entregas en menos de 24h. Garantía de devolución del 100% si llegamos tarde."
    },
    estandar: {
        title: "Protocolo Estándar (Box)",
        desc: "Rutas consolidadas por Inteligencia Artificial para reducir la huella de carbono y el coste. Entrega en 48-72h."
    },
    tracking: {
        title: "Geo-Tracking Avanzado",
        desc: "Acceso a la API de satélite para ver tu paquete moverse en el mapa en tiempo real. Notificaciones push al móvil."
    }
};

serviceCards.forEach(card => {
    card.addEventListener('click', (e) => {
        serviceCards.forEach(c => c.style.borderColor = 'rgba(255,255,255,0.1)');
        card.style.borderColor = '#6366f1';
        
        const type = card.getAttribute('data-service');
        if(servicesData[type]) {
            infoTitle.textContent = servicesData[type].title;
            infoText.textContent = servicesData[type].desc;
        }
    });
});

// 5. WORKFLOW
const workflowItems = document.querySelectorAll('#workflow-list .list-group-item');
const stepTitle = document.getElementById('step-title');
const stepDesc = document.getElementById('step-desc');
const stepIcon = document.querySelector('#step-icon span');

const workflowData = {
    1: {
        title: "Digitalización",
        desc: "El usuario introduce los datos y nuestro sistema genera un identificador único (Hash) que acompañará al paquete.",
        icon: "qr_code"
    },
    2: {
        title: "Hub Logístico",
        desc: "En el almacén, brazos robóticos clasifican tu paquete leyendo el código QR a alta velocidad.",
        icon: "hub"
    },
    3: {
        title: "Entrega Final",
        desc: "El cliente final valida la recepción mediante biometría o código seguro en su smartphone.",
        icon: "check_circle"
    }
};

workflowItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        workflowItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const step = item.getAttribute('data-step');
        if(workflowData[step]) {
            stepTitle.textContent = workflowData[step].title;
            stepDesc.textContent = workflowData[step].desc;
            stepIcon.textContent = workflowData[step].icon;
        }
    });
});