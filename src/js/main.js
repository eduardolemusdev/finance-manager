const ingressTabButton = document.getElementById("ingresTabButton");
const egressTabButton = document.getElementById("egressTabButton");
const currentTabButton = document.getElementById("currentTabBackground");
const saveTransactionBtn = document.getElementById("saveTransactionBtn");
const accountIdValue = document.getElementById("accountIdInput").value;

const transacctionsListContainer = document.getElementById(
  "transacctionsListContainer"
);

const TRANSACCTIONS_TYPES = {
  INGRESS: "INGRESS",
  EGRESS: "EGRESS",
};

const _transactionsService = new TransactionsService();

const activeAttribute = "active-button";
const transacctionsArrayMock = [
  {
    transaccionId: 1,
    descripcion: "Pago de renta",
    monto: 500.0,
    type: TRANSACCTIONS_TYPES.EGRESS,
  },
  {
    transaccionId: 2,
    descripcion: "Compra en supermercado",
    monto: 120.5,
    type: TRANSACCTIONS_TYPES.EGRESS,
  },
  {
    transaccionId: 3,
    descripcion: "Recarga de celular",
    monto: 10.0,
    type: TRANSACCTIONS_TYPES.EGRESS,
  },
  {
    transaccionId: 4,
    descripcion: "Sueldo recibido",
    monto: 1500.0,
    type: TRANSACCTIONS_TYPES.INGRESS,
  },
  {
    transaccionId: 5,
    descripcion: "Transferencia recibida",
    monto: 200.0,
    type: TRANSACCTIONS_TYPES.INGRESS,
  },
];

// removemo items por su clase
const removeTransactionItems = () => {
  const transactionItems = document.querySelectorAll(".transacctionItem");
  transactionItems.forEach((item) => item.remove());
};

const listTransacctionsByType = (type) => {
  const transacctions = _transactionsService.getTransactionsByAccountId(
    accountIdValue,
    type
  );

  console.log("TRANSACTIONS", transacctions);

  const signByType = type === TRANSACCTIONS_TYPES.INGRESS ? "+" : "-";

  // llamamos la funcion cada vez que hacemos un cambio de lista
  removeTransactionItems();

  // generamos y agregamos los transaction items al doom
  transacctions.forEach((transacction) => {
    const div = document.createElement("div");
    div.className =
      "border-2 border-gray-400 flex justify-between px-6 py-2 text-slate-800 font-semibold rounded-sm transacctionItem";

    const spanDescription = document.createElement("span");
    spanDescription.id = "transacctionDescription";
    spanDescription.textContent = transacction.description;

    const spanAmount = document.createElement("span");
    spanAmount.id = "transacctionAmount";
    spanAmount.textContent = `${signByType} $ ${transacction.amount}`;

    div.appendChild(spanDescription);
    div.appendChild(spanAmount);

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

saveTransactionBtn.addEventListener("click", () => {
  const transactionSelect = document.getElementById("transaction-select");
  const transactionDescription = document.getElementById(
    "transactionDescription"
  );

  const transactionAmount = document.getElementById("transactionAmount");

  const numbersRegex = /^\d+(\.\d{1,2})?$/;

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

  console.log(transactionItem);

  _transactionsService.saveTransaction(accountIdValue, transactionItem);
});
