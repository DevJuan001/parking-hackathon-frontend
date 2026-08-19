export const modals = {
  editUser: { title: "Editar Usuario", location: "center" },

  createUser: { title: "Crear Usuario", location: "center" },

  disableUser: { title: "Deshabilitar Usuario" },

  enableUser: { title: "Habilitar Usuario" },

  filter: {
    title: "Filtrar",
    disableHeader: true,
    growDirection: "bottom-center",
    styles: `p-5 h-auto w-[365px] rounded-[32px]
    sm:w-[400px]`,
  },

  export: {
    disableHeader: true,
    growDirection: "center",
    styles: `p-2 w-[300px] h-auto rounded-[32px]
    md:w-[350px]`,
  },

  search: {
    disableHeader: true,
    growDirection: "left",
    styles: `h-18 w-[350px] border-2 border-[#E4E2E5] rounded-3xl`,
  },
};
