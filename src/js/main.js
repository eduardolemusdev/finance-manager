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
  const isIngressSelected =
    transactionSelect.value === "INGRESS" &&
    ingressTabButton.getAttribute(activeAttribute) === "1";

  const isEgressSelected =
    transactionSelect.value === "EGRESS" &&
    egressTabButton.getAttribute(activeAttribute) === "1";

  if (isEgressSelected) {
    listTransacctionsByType(transactionSelect.value);
  }

  if (isIngressSelected) {
    listTransacctionsByType(transactionSelect.value);
  }
});
