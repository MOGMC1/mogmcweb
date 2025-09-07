document.addEventListener('DOMContentLoaded', function() {
    loadConfig();
});

async function loadConfig() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();
        
        updateServerStatus(config.serverStatus);
        updateServerIP(config.serverIp, config.serverPort);
        updateGamemodes(config.gamemodes);
    } catch (error) {
        console.error('Error loading config:', error);
        updateServerStatus('offline');
        updateServerIP('hi', '25565');
        updateGamemodes([]);
    }
}

function updateServerStatus(status) {
    const statusIndicator = document.getElementById('status-indicator');
    const statusText = document.getElementById('status-text');
    
    statusIndicator.className = `status-badge ${status}`;
    statusText.textContent = status.charAt(0).toUpperCase() + status.slice(1);
}

function updateServerIP(ip, port) {
    const serverAddress = document.getElementById('server-address');
    const fullAddress = port && port !== '25565' ? `${ip}:${port}` : ip;
    serverAddress.textContent = fullAddress;
}

function updateGamemodes(gamemodes) {
    const gamemodesList = document.getElementById('gamemodes-list');
    gamemodesList.innerHTML = '';
    
    if (!gamemodes || gamemodes.length === 0) {
        gamemodesList.innerHTML = '<p style="text-align: center; color: #888888;">No game modes available</p>';
        return;
    }
    
    gamemodes.forEach(gamemode => {
        const card = document.createElement('div');
        card.className = 'gamemode-card';
        
        card.innerHTML = `
            <h3 class="gamemode-name">${gamemode.name}</h3>
            <p class="gamemode-description">${gamemode.description}</p>
        `;
        
        gamemodesList.appendChild(card);
    });
}