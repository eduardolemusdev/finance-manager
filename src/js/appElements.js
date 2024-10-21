const currentTabButton = document.getElementById("currentTabBackground");
const saveTransactionBtn = document.getElementById("saveTransactionBtn");

const transacctionsListContainer = document.getElementById(
  "transacctionsListContainer"
);

const TRANSACCTIONS_TYPES = {
  INGRESS: "INGRESS",
  EGRESS: "EGRESS",
};

const _transactionsService = new TransactionsService();
