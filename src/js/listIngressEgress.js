const activeAttribute = "active-button";

// removemo items por su clase
const removeTransactionItems = () => {
  const transactionItems = document.querySelectorAll(".transacctionItem");
  transactionItems.forEach((item) => item.remove());
};

const listTransacctionsByType = async (type) => {
  const accountIdValue = document.getElementById("accountIdInput").value;

  const transacctions = _transactionsService.getTransactionsByAccountId(
    accountIdValue,
    type
  );

  const signByType = type === TRANSACCTIONS_TYPES.INGRESS ? "+" : "-";

  // llamamos la funcion cada vez que hacemos un cambio de lista
  removeTransactionItems();

  // generamos y agregamos los transaction items al doom
  transacctions.forEach(async (transacction) => {
    const div = document.createElement("div");
    div.className =
      "border-2 border-gray-400 flex justify-between px-6 py-2 text-slate-800 font-semibold rounded-sm transacctionItem";

    const spanDescription = document.createElement("span");
    spanDescription.id = "transacctionDescription";
    spanDescription.textContent = transacction.description;

    const spanAmount = document.createElement("span");
    spanAmount.id = "transacctionAmount";
    spanAmount.textContent = `${signByType} $ ${transacction.amount}`;

    const spanPercent = document.createElement("span");
    const egressAmount = parseFloat(transacction.amount).toFixed(2);
    const egressPercent =
      await _transactionsService.getAccountPercentPerTransaction(
        accountIdValue,
        egressAmount
      );

    spanPercent.textContent = `${egressPercent.toFixed(2)} %`;

    div.appendChild(spanDescription);
    div.appendChild(spanAmount);
    div.appendChild(spanPercent);

    transacctionsListContainer.appendChild(div);
  });
};

// llamamos al iniciar el script la funcion para que muestre inicialmente los ingresos ya que ese boton esta activado por default
listTransacctionsByType(TRANSACCTIONS_TYPES.INGRESS);

// manejamos los eventos de cuando el usuario interactura conel tab para listar las transacciones
// verificamos que el boton este activo para remover el atributo y asignarlo al contrario
// antes de eso agregamos las clases con la animacion de desplzaciar completamente el div que se encuentra con z-index 0
// segun sea el boton que accione el usuario, si es desde el boton de ingresos se deplaza en el eje x positivo y si es desde gastos solo vuelve al origen

ingressTabButton.addEventListener("click", () => {
  const isActive = egressTabButton.getAttribute(activeAttribute) === "1";
  if (isActive) {
    currentTabButton.classList.add("fromEgressButton");
    currentTabButton.classList.remove("fromIngressButton");

    ingressTabButton.setAttribute(activeAttribute, "1");
    egressTabButton.removeAttribute(activeAttribute);
  }

  listTransacctionsByType(TRANSACCTIONS_TYPES.INGRESS);
});

egressTabButton.addEventListener("click", () => {
  const isActive = ingressTabButton.getAttribute(activeAttribute) === "1";
  if (isActive) {
    currentTabButton.classList.add("fromIngressButton");
    currentTabButton.classList.remove("fromEgressButton");

    egressTabButton.setAttribute(activeAttribute, "1");
    ingressTabButton.removeAttribute(activeAttribute);
  }

  listTransacctionsByType(TRANSACCTIONS_TYPES.EGRESS);
});
