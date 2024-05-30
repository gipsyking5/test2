const express = require('express');
const { Connection, clusterApiUrl, PublicKey } = require('@solana/web3.js');
const path = require('path');

const app = express();
const port = 3000;

const connection = new Connection(clusterApiUrl('mainnet-beta'));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { balance: null, error: null, themeImage: 'cujo_on_crypto_2.webp' });
});

app.get('/balance', async (req, res) => {
  const walletAddress = req.query.wallet;
  try {
    const publicKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(publicKey);
    res.render('index', { balance: balance / 1e9, error: null, themeImage: 'cujo_on_crypto_2.webp' }); // Balance in SOL
  } catch (error) {
    res.render('index', { balance: null, error: 'Invalid wallet address!', themeImage: 'cujo_on_crypto_2.webp' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
