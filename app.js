// Rete di connessione
const NETWORK = "testnet"; // Può essere 'mainnet-beta', 'testnet' o 'devnet'

// Funzione per connettere Phantom Wallet
async function connectWallet() {
    if (!window.solana || !window.solana.isPhantom) {
        alert("Phantom wallet is not installed. Please install it to continue.");
        return;
    }

    try {
        // Richiesta di connessione al wallet
        const resp = await window.solana.connect();
        console.log("Connected wallet: ", resp.publicKey.toString());

        // Connessione alla rete
        const connection = new solanaWeb3.Connection(
            solanaWeb3.clusterApiUrl(NETWORK)
        );
        console.log("Connected to network:", NETWORK);

        alert(`Wallet connected: ${resp.publicKey.toString()}`);
    } catch (err) {
        console.error("Error connecting to Phantom wallet:", err);
        alert("Failed to connect wallet. Please try again.");
    }
}

// Collega il bottone alla funzione
document.getElementById("connect-wallet").addEventListener("click", connectWallet);
