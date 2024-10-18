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
    console.log(registeredAccounts, accountId);

    const currentAccount = registeredAccounts.find(
      (account) => account.accountId === accountId
    );

    console.log("x", currentAccount, accountId);

    return currentAccount
      ? currentAccount.transactionHistory.filter(
          (transaction) => transaction.type === type
        )
      : [];
  }

  #initDatabase() {
    const accountsString = localStorage.getItem(this.#accountIngress);

    if (!accountsString) {
      localStorage.setItem(this.#accountIngress, JSON.stringify([]));
    }
  }
}
