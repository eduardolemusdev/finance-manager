const ingressTabButton = document.getElementById("ingresTabButton");
const egressTabButton = document.getElementById("egressTabButton");
const currentTabButton = document.getElementById("currentTabBackground");

const activeAttribute = "active-button";
const transacctionsArrayMock = [
  {
    transaccionId: 1,
    descripcion: "Pago de renta",
    monto: 500.0,
    type: "egress",
  },
  {
    transaccionId: 2,
    descripcion: "Compra en supermercado",
    monto: 120.5,
    type: "egress",
  },
  {
    transaccionId: 3,
    descripcion: "Recarga de celular",
    monto: 10.0,
    type: "egress",
  },
  {
    transaccionId: 4,
    descripcion: "Sueldo recibido",
    monto: 1500.0,
    type: "ingress",
  },
  {
    transaccionId: 5,
    descripcion: "Transferencia recibida",
    monto: 200.0,
    type: "ingress",
  },
];

const listTransacctionsByType = (type) => {};

ingressTabButton.addEventListener("click", () => {
  const isActive = egressTabButton.getAttribute(activeAttribute) === "1";
  if (isActive) {
    currentTabButton.classList.add("fromEgressButton");
    currentTabButton.classList.remove("fromIngressButton");

    ingressTabButton.setAttribute(activeAttribute, "1");
    egressTabButton.removeAttribute(activeAttribute);
  }
});

egressTabButton.addEventListener("click", () => {
  const isActive = ingressTabButton.getAttribute(activeAttribute) === "1";
  if (isActive) {
    currentTabButton.classList.add("fromIngressButton");
    currentTabButton.classList.remove("fromEgressButton");

    egressTabButton.setAttribute(activeAttribute, "1");
    ingressTabButton.removeAttribute(activeAttribute);
  }
});
