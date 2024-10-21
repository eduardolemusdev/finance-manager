const getCurrentFormat = () => {
  const actualMonth = new Intl.DateTimeFormat("es-ES", {
    month: "long",
  }).format(new Date());

  return `${actualMonth.charAt(0).toUpperCase()}${actualMonth.slice(
    1
  )} de ${new Date().getFullYear().toString()}`;
};

const getDollarSign = (amount) => (amount > 0 ? "+" : "-");

document.getElementById("currentMonthSpan").textContent = getCurrentFormat();
