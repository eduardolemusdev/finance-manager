saveTransactionBtn.addEventListener("click", async () => {
  const transactionSelect = document.getElementById("transaction-select");
  const transactionDescription = document.getElementById(
    "transactionDescription"
  );
  const accountIdValue = document.getElementById("accountIdInput").value;

  const transactionAmount = document.getElementById("transactionAmount");

  const numbersRegex = /^\d+(\.\d{1,2})?$/;
  if (
    accountIdValue === "" ||
    accountIdValue === null ||
    accountIdValue === undefined
  ) {
    alert("Cuenta invaldia, debe proveer una cuenta valida");
    return;
  }
  if (transactionSelect.value === "none") {
    alert("Debe seleccionar un tipo de gasto, Ingreo o Egreso.");
    return;
  }

  if (transactionDescription.value.length <= 0) {
    alert("Descripción requerida.");
    return;
  }

  if (!numbersRegex.test(transactionAmount.value)) {
    alert("Monto invalido.");
    return;
  }

  const transactionItem = {
    description: transactionDescription.value,
    amount: transactionAmount.value,
    type: transactionSelect.value,
  };

  await _transactionsService.saveTransaction(accountIdValue, transactionItem);
  listTransacctionsByTabValue();
});

document
  .getElementById("loadAccountBtn")
  .addEventListener("click", async () => {
    const totalAvailableAmountSpan = document.getElementById(
      "totalAvailableAmount"
    );

    const totalIngressSpan = document.getElementById("totalIngressSpan");
    const totalEgressSpan = document.getElementById("totalEgressSpan");
    const accountIdValue = document.getElementById("accountIdInput").value;
    const expensePercentageSpan = document.getElementById("expensePercentage");

    const totalAmount = await _transactionsService.getAccountAvailableAmount(
      accountIdValue
    );

    const signMoney = getDollarSign(totalAmount);
    totalAvailableAmountSpan.textContent = `${signMoney} $${totalAmount}`;

    const totalIngressAmount =
      await _transactionsService.getAccountTotalIngressAmount(accountIdValue);

    totalIngressSpan.textContent = `${getDollarSign(
      totalIngressAmount
    )} $${totalIngressAmount.toFixed(2)}`;

    const totalEgressAmount =
      await _transactionsService.getAccountTotalEgressAmount(accountIdValue);

    totalEgressSpan.textContent = `- $${totalEgressAmount.toFixed(2)}`;

    const egressPercent = (
      await _transactionsService.getAccountPercentEgressTotal(accountIdValue)
    ).toFixed(2);

    expensePercentageSpan.textContent = `${egressPercent} %`;

    listTransacctionsByTabValue();
  });

const listTransacctionsByTabValue = () => {
  const transactionSelect = document.getElementById("transaction-select");
  const transactionSelectValue =
    transactionSelect.value === "none" ? "INGRESS" : transactionSelect.value;

  // validamos que al agregar una transaccion solo se pueda listar el item si el tipo del select es igual que el del tab
  const isIngressSelected =
    transactionSelectValue &&
    ingressTabButton.getAttribute(activeAttribute) === "1";

  const isEgressSelected =
    transactionSelectValue &&
    egressTabButton.getAttribute(activeAttribute) === "1";

  const isEqualSelectValueAndTransacctionList =
    isEgressSelected || isIngressSelected;

  if (isEqualSelectValueAndTransacctionList) {
    listTransacctionsByType(transactionSelectValue);
  }
};
