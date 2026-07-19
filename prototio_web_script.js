// BASE DE DATOS INICIAL SIMULADA (Para pruebas del sistema)
let miembros = JSON.parse(localStorage.getItem('gym_miembros')) || [
    { id: "0955123456", nombre: "Leonela Mendoza", correo: "lmendozam@unemi.edu.ec", estado: "Activo", vencimiento: "2026-08-30", totalPagado: 30 },
    { id: "0955789123", nombre: "Gabriela Rivero", correo: "griveros@unemi.edu.ec", estado: "Vencido", vencimiento: "2026-06-15", totalPagado: 0 }
];

let logs = JSON.parse(localStorage.getItem('gym_logs')) || [
    "Sistema inicializado con base de datos simulada."
];

// NAVEGACIÓN ENTRE MÓDULOS DE LA SPA
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-[#0f2a4a]', 'text-white');
        btn.classList.add('text-gray-600', 'hover:bg-gray-100');
    });

    document.getElementById(`mod-${tabId}`).classList.remove('hidden');
    const activeBtn = document.getElementById(`tab-${tabId}`);
    activeBtn.classList.remove('text-gray-600', 'hover:bg-gray-100');
    activeBtn.classList.add('bg-[#0f2a4a]', 'text-white');
}

// COMPONENTE DE NOTIFICACIONES TOAST
function showToast(title, desc, type = 'success') {
    const toast = document.getElementById('toast');
    const icon = document.getElementById('toast-icon');
    
    toast.className = `fixed bottom-5 right-5 z-50 bg-white border-l-4 p-4 rounded shadow-lg flex items-center space-x-3 transition-all duration-300 max-w-sm`;
    
    if(type === 'success') {
        toast.classList.add('border-green-500');
        icon.innerHTML = `<i data-lucide="check-circle" class="text-green-500 w-5 h-5"></i>`;
    } else if(type === 'error') {
        toast.classList.add('border-red-500');
        icon.innerHTML = `<i data-lucide="alert-triangle" class="text-red-500 w-5 h-5"></i>`;
    } else {
        toast.classList.add('border-blue-500');
        icon.innerHTML = `<i data-lucide="info" class="text-blue-500 w-5 h-5"></i>`;
    }
    
    document.getElementById('toast-title').innerText = title;
    document.getElementById('toast-desc').innerText = desc;
    
    lucide.createIcons();
    toast.classList.remove('hidden');
    
    setTimeout(() => { toast.classList.add('hidden'); }, 4000);
}

// RF-01: REGISTRO DE NUEVOS MIEMBRESOS
function handleRegistro(e) {
    e.preventDefault();
    const id = document.getElementById('reg-id').value.trim();
    const nombre = document.getElementById('reg-nombre').value.trim();
    const correo = document.getElementById('reg-correo').value.trim();

    // Validar si ya existe el ID (Flujo alternativo / Excepción)
    if(miembros.some(m => m.id === id)) {
        showToast("Error de Registro (RF-01)", "El número de identificación ya está registrado en el sistema.", "error");
        addLog(`[ALERTA] Intento de registro duplicado para ID: ${id}`);
        return;
    }

    // Guardado exitoso simulado
    const nuevo = { id, nombre, correo, estado: "Vencido", vencimiento: "Sin pago", totalPagado: 0 };
    miembros.push(nuevo);
    saveData();
    showToast("Éxito (RF-01)", "Miembro guardado en la base de datos exitosamente.", "success");
    addLog(`[RECEPCIÓN] Nuevo miembro registrado: ${nombre} (ID: ${id})`);
    document.getElementById('form-registro').reset();
    render();
}

// RF-02: REGISTRO DE PAGOS MENSUALES (Partición de equivalencias y valores límite)
function handlePago(e) {
    e.preventDefault();
    const id = document.getElementById('pago-usuario-id').value;
    const monto = parseFloat(document.getElementById('pago-monto').value);

    // LÓGICA REGLA DE NEGOCIO ($30.00 exactos)
    if (monto < 30.00) {
        showToast("Pago Rechazado (RF-02)", "Monto insuficiente. La tarifa fija es de $30.00.", "error");
        addLog(`[PAGOS] Intento de pago rechazado por valor menor ($${monto.toFixed(2)}) para ID: ${id}`);
        return;
    } 
    if (monto > 30.00) {
        showToast("Error de Exceso (RF-02)", "El sistema no acepta montos superiores a la tarifa fija de $30.00.", "error");
        addLog(`[PAGOS] Intento de pago rechazado por exceso ($${monto.toFixed(2)}) para ID: ${id}`);
        return;
    }

    // Si es $30.00 exactos pasa el criterio
    const miembro = miembros.find(m => m.id === id);
    if(miembro) {
        miembro.estado = "Activo";
        miembro.vencimiento = "2026-08-30"; // Simulación de renovación automática
        miembro.totalPagado += 30;
        saveData();
        showToast("Pago Procesado", `Se registró $30.00 con éxito para ${miembro.nombre}.`, "success");
        addLog(`[FINANZAS] Pago de mensualidad procesado con éxito para ${miembro.nombre}`);
        document.getElementById('form-pago').reset();
        render();
    }
}

// RNF-01: VERIFICACIÓN ACCESO BIOMÉTRICO (< 2 segundos)
function simulateScan() {
    const pantalla = document.getElementById('bio-pantalla');
    pantalla.innerHTML = `<p class="text-yellow-400 animate-pulse">PROCESANDO HUELLA BIOMÉTRICA...</p>`;
    
    // Simular retraso de procesamiento de red en 1.2 segundos (Cumple < 2s requerido)
    setTimeout(() => {
        if(miembros.length === 0) {
            pantalla.innerHTML = `<p class="text-red-500">ERROR: NO HAY MIEMBROS EN LA BD</p>`;
            return;
        }
        const indexAleatorio = Math.floor(Math.random() * miembros.length);
        const m = miembros[indexAleatorio];

        if(m.estado === "Activo") {
            pantalla.className = "border p-4 rounded-lg bg-green-900 text-white min-h-[100px] flex flex-col justify-center items-center font-mono text-sm";
            pantalla.innerHTML = `<p class="font-bold text-base">🔓 ACCESO CONCEDIDO</p><p class="text-xs mt-1">Bienvenido: ${m.nombre}</p><p class="text-[10px] text-green-300">Vence: ${m.vencimiento}</p>`;
            addLog(`[BIOMÉTRICO] Acceso autorizado para ${m.nombre} en 1.2s.`);
        } else {
            pantalla.className = "border p-4 rounded-lg bg-red-900 text-white min-h-[100px] flex flex-col justify-center items-center font-mono text-sm";
            pantalla.innerHTML = `<p class="font-bold text-base">🔒 ACCESO DENEGADO</p><p class="text-xs mt-1">Usuario: ${m.nombre}</p><p class="text-[10px] text-red-300">Razón: Membresía Vencida o sin pago</p>`;
            addLog(`[BIOMÉTRICO] Acceso denegado para ${m.nombre} (Membresía Vencida).`);
        }
    }, 1200); 
}

// RF-03: RECUPERACIÓN DE CONTRASEÑA
function toggleRecovery(show) {
    document.getElementById('recovery-box').classList.toggle('hidden', !show);
}
function handleRecovery() {
    const email = document.getElementById('recovery-email').value.trim();
    if(!email) return;

    const existe = miembros.some(m => m.correo === email) || email === "admin@unemi.com";
    if(existe) {
        showToast("Correo Enviado (RF-03)", "Enlace temporal enviado. Expirará en 30 minutos.", "success");
        addLog(`[SEGURIDAD] Enlace de recuperación enviado al correo: ${email}`);
        toggleRecovery(false);
    } else {
        showToast("Usuario no encontrado", "El correo ingresado no existe en el sistema.", "error");
        addLog(`[SEGURIDAD] Solicitud fallida de recuperación para: ${email}`);
    }
}

// CONTROL DE LOGIN HÍBRIDO (RNF-02)
function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('login-user').value.trim();
    showToast("Autenticación Híbrida (RNF-02)", `Acceso correcto al perfil del sistema para: ${user}`, "info");
    addLog(`[SEGURIDAD] Sesión iniciada con éxito por: ${user}`);
    switchTab('recepcion');
}

// AUXILIARES DE PERSISTENCIA Y RE-RENDER
function addLog(txt) {
    const timestamp = new Date().toLocaleTimeString();
    logs.unshift(`[${timestamp}] ${txt}`);
    if(logs.length > 30) logs.pop();
    saveData();
    renderLogs();
}

function saveData() {
    localStorage.setItem('gym_miembros', JSON.stringify(miembros));
    localStorage.setItem('gym_logs', JSON.stringify(logs));
}

function renderLogs() {
    const logBox = document.getElementById('rep-logs');
    if(logBox) {
        logBox.innerHTML = logs.map(l => `<div>${l}</div>`).join('');
    }
}

function render() {
    // 1. Renderizar tabla de usuarios (Recepcionista)
    const tbody = document.getElementById('tabla-usuarios');
    if(tbody) {
        tbody.innerHTML = miembros.map(m => `
            <tr class="border-b border-gray-100 hover:bg-gray-50">
                <td class="p-3 font-semibold text-gray-700">${m.id}</td>
                <td class="p-3 text-gray-600">${m.nombre}</td>
                <td class="p-3 text-gray-500">${m.correo}</td>
                <td class="p-3">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${m.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                        ${m.estado}
                    </span>
                </td>
                <td class="p-3 text-gray-500 font-medium">${m.vencimiento}</td>
            </tr>
        `).join('');
    }

    // 2. Renderizar select de pagos
    const select = document.getElementById('pago-usuario-id');
    if(select) {
        select.innerHTML = miembros.map(m => `<option value="${m.id}">${m.nombre} (ID: ${m.id})</option>`).join('');
    }

    // 3. Renderizar reportes agregados financieros
    const cajaTotal = miembros.reduce((acc, cur) => acc + cur.totalPagado, 0);
    const totalActivos = miembros.filter(m => m.estado === 'Activo').length;
    const totalVencidos = miembros.filter(m => m.estado === 'Vencido').length;

    if(document.getElementById('rep-ingresos')) {
        document.getElementById('rep-ingresos').innerText = `$${cajaTotal.toFixed(2)}`;
        document.getElementById('rep-activos').innerText = totalActivos;
        document.getElementById('rep-vencidos').innerText = totalVencidos;
    }

    renderLogs();
}

// Inicialización
window.onload = () => {
    lucide.createIcons();
    render();
};