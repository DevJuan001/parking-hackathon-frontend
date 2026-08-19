export const modals = {
  dayInfo: {
    location: "right",
    disableHeader: true,
  },

  editReservation: {
    margin: 0,
    disableHeader: true,
    growDirection: "center",
    styles: `p-4 w-screen h-screen
    md:w-[450px] md:h-auto md:rounded-[42px]`,
  },

  createReservation: {
    margin: 10,
    title: "Crear reserva",
    growDirection: "right-center",
  },

  share: {
    location: "center",
    disableHeader: true,
  },

  dayInfo: {
    location: "right",
    disableHeader: true,
    styles: `p-5 w-screen h-screen
    md:w-[540px] md:h-[calc(100vh-15px)] md:rounded-[40px]`,
  },

  export: {
    margin: 12,
    disableHeader: true,
    styles: `p-2 w-[300px] h-auto rounded-[32px]
    md:w-[350px]`,
    growDirection: "center",
  },
};
