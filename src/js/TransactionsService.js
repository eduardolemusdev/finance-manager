class TransactionsService {
  #accountIngress = "accountsIngressEgress";

  constructor() {
    this.#initDatabase();
  }

  async saveTransaction(accountId, transaction) {
    const accountsString = localStorage.getItem(this.#accountIngress);

    const registeredAccounts = JSON.parse(accountsString);
    const currentAccount = registeredAccounts.find(
      (account) => account.accountId === accountId
    );

    // se registra una cuenta por primera vez
    if (!currentAccount) {
      alert(
        "Nueva cuenta registrada!, oprime el boton de recargar para obtener la información"
      );
      const newAccount = {
        accountId,
        transactionHistory: [transaction],
      };

      localStorage.setItem(
        this.#accountIngress,
        JSON.stringify([...registeredAccounts, newAccount])
      );
    }

    // de la cuenta que estamos utilizando accedemos a todas las transacciones y le añadimos la nueva tranasaccion
    const currentAccountUpdatedTransactions = [
      ...currentAccount.transactionHistory,
      transaction,
    ];

    // le asignamos el nuevo array de transacciones, esto sobrescribe el antiguo
    currentAccount.transactionHistory = currentAccountUpdatedTransactions;

    // buscamos que posicion del arreglo tiene la cuenta que estamos trabajando
    // ya que ahora hay que actualizar el las transacciones de la cuenta en el array
    const currentAccountID = registeredAccounts.findIndex(
      (account) => account.accountId === accountId
    );

    // actualizamos las trasacciones de la cuenta con la que estamos trabajando
    registeredAccounts[currentAccountID].transactionHistory =
      currentAccountUpdatedTransactions;

    // guardamos el arreglo ya actualizado en el localStorage
    localStorage.setItem(
      this.#accountIngress,
      JSON.stringify(registeredAccounts)
    );
  }

  getTransactionsByAccountId(accountId, type) {
    const accountsString = localStorage.getItem(this.#accountIngress);

    if (!accountsString) {
      return [];
    }

    const registeredAccounts = JSON.parse(accountsString);

    const currentAccount = registeredAccounts.find(
      (account) => account.accountId === accountId
    );

    return currentAccount
      ? currentAccount.transactionHistory.filter(
          (transaction) => transaction.type === type
        )
      : [];
  }

  async getAccountAvailableAmount(accountId) {
    const ingressTransactionsTotal = await this.getAccountTotalIngressAmount(
      accountId
    );
    const egressTransactionsTotal = await this.getAccountTotalEgressAmount(
      accountId
    );

    const totalAvailableAmount =
      ingressTransactionsTotal - egressTransactionsTotal;

    return totalAvailableAmount.toFixed(2);
  }

  async getAccountTotalIngressAmount(accountId) {
    return this.getTransactionsByAccountId(
      accountId,
      TRANSACCTIONS_TYPES.INGRESS
    )
      .map((transaction) => parseFloat(transaction.amount))
      .reduce((prev, curr) => prev + curr, 0);
  }

  async getAccountTotalEgressAmount(accountId) {
    return this.getTransactionsByAccountId(
      accountId,
      TRANSACCTIONS_TYPES.EGRESS
    )
      .map((transaction) => parseFloat(transaction.amount))
      .reduce((prev, curr) => prev + curr, 0);
  }

  async getAccountPercentEgressTotal(accountId) {
    const totalIngress = await this.getAccountTotalIngressAmount(accountId);
    const totalEgress = await this.getAccountTotalEgressAmount(accountId);

    const egressPercent = (totalEgress * 100) / totalIngress;

    return egressPercent;
  }

  async getAccountPercentPerTransaction(accountId, egressAmountTransaction) {
    const totalAccountIngress = await this.getAccountTotalIngressAmount(
      accountId
    );
    return (egressAmountTransaction * 100) / totalAccountIngress;
  }

  #initDatabase() {
    const accountsString = localStorage.getItem(this.#accountIngress);

    if (!accountsString) {
      localStorage.setItem(this.#accountIngress, JSON.stringify([]));
    }
  }
}
