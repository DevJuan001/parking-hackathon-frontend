export const modals = {
  editSpot: {
    title: "Editar Plaza",
    disableHeader: true,
    growDirection: "center",
    styles: `p-4 w-screen h-screen
    md:w-[380px] md:h-auto md:rounded-4xl`,
  },

  createSpot: { title: "Agregar Plaza", growDirection: "center" },

  editFloor: {
    title: "Editar Piso",
    growDirection: "center",
    disableHeader: true,
    styles: `p-4 w-screen h-screen
    md:w-[380px] md:h-auto md:rounded-4xl`,
  },

  createFloor: {
    title: "Agregar Piso",
    styles: `p-7 w-[350px] h-auto rounded-4xl
    md:w-[450px]`,
  },

  editTariff: {
    title: "Editar Tarifa",
    disableHeader: true,
    growDirection: "center",
    styles: `p-4 w-screen h-screen
    md:w-[380px] md:h-auto md:rounded-4xl`,
  },

  createTariff: { title: "Agregar Tarifa", growDirection: "center" },

  export: { disableHeader: true },

  search: { disableHeader: true },

  filter: { disableHeader: true },
};
