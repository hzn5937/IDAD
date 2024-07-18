window.onSpotifyWebPlaybackSDKReady = () => {
    const token = "BQC3U8cLPHffXd8xG71F8k4SRHA0Y3RrU6DdaBD63lWKSFaEWt5AM7Cd9-m_JJ-lC_qvPH3q-4_iwUsW_N0qmQ7fchld-opPpBPoiEWRPTBDIdysAOpjO3N7s1870Ib-xZFsvxpGYz3zp7dH3ccH-rAxKvQBAG-bRQyTIpV7SWppUghnH-Cqp6XklJkr6XGHkBBSK4RP0YhxTVPJYhyEmYMSDQ5Y"

    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5
    })

    player.addListener('initialization_error', ({ message }) => {
        console.error(message);
    });
  
    player.addListener('authentication_error', ({ message }) => {
        console.error(message);
    });
  
    player.addListener('account_error', ({ message }) => {
        console.error(message);
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    player.connect();

    document.getElementById('togglePlay').onclick = function() {
        player.togglePlay();
    };

}