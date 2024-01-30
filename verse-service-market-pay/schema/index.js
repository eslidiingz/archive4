const profiles = require('./profiles.schema');
const wallets = require('./wallets.schema');
const wallet_transactions = require('./wallet_transactions.schema');
const payment_transactions = require('./payment_transactions.schema');
const shop_transactions = require('./shop_transactions.schema');
const withdraw_transactions = require('./withdraw_transactions.schema');
const banks = require('./banks.schema');
const system_names = require('./system_names.schema');
const admin_users = require('./admin_users.schema');
const system_configs = require('./system_configs.schema');
const swap_wallets = require('./swap_wallets.schema');
const mexpay_transactions = require('./mexpay_transactions.schema');


const models = {
    banks,
    profiles,
    wallets,
    wallet_transactions,
    payment_transactions,
    shop_transactions,
    withdraw_transactions,
    system_names,
    admin_users,
    system_configs,
    swap_wallets,
	mexpay_transactions
}


module.exports = models;