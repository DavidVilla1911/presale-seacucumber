const NETWORK = "devnet"; // Devnet per test
const PROGRAM_ID = "dRxFhMb8nojoWBLLRKMUHypwhHJYQ8AznUqn9S7d64v";
const TREASURY_WALLET = "5ZgZuZNTb3vH7pEq36d9pDyHATcmSf2obD4HbfRagHqx";

async function connectWallet() {
    if (!window.solana || !window.solana.isPhantom) {
        alert("Phantom wallet is not installed. Please install it to continue.");
        return;
    }

    try {
        // Connessione al wallet Phantom
        const resp = await window.solana.connect();
        console.log("Connected wallet: ", resp.publicKey.toString());
        alert(`Wallet connected: ${resp.publicKey.toString()}`);

        // Connessione alla rete Solana
        const connection = new solanaWeb3.Connection(
            solanaWeb3.clusterApiUrl(NETWORK)
        );

        // Creazione transazione per il programma
        const transaction = new solanaWeb3.Transaction();
        const instruction = new solanaWeb3.TransactionInstruction({
            keys: [
                {
                    pubkey: resp.publicKey,
                    isSigner: true,
                    isWritable: true,
                },
                {
                    pubkey: new solanaWeb3.PublicKey(TREASURY_WALLET),
                    isSigner: false,
                    isWritable: true,
                },
            ],
            programId: new solanaWeb3.PublicKey(PROGRAM_ID),
        });

        transaction.add(instruction);

        // Invia la transazione
        const { blockhash } = await connection.getRecentBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = resp.publicKey;

        const signedTransaction = await window.solana.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        await connection.confirmTransaction(signature);

        alert("Transaction successful: " + signature);
    } catch (err) {
        console.error("Transaction failed:", err);
        alert("Transaction failed. Check the console for details.");
    }
}

document.getElementById("connect-wallet").addEventListener("click", connectWallet);
