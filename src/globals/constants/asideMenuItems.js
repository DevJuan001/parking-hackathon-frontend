export const avatarItem = {
  name: "avatar",
  icon: "/parking-logo.svg",
  alt: "Avatar Icon",
};

export const firstSectionItems = [
  {
    itemId: "home",
    name: "Inicio",
    path: "/home",
    icon: "home",
    roles: ["Admin"],
  },

  {
    itemId: "parking",
    name: "Parking",
    path: "/parking",
    icon: "parking_sign",
    roles: ["Admin"],
  },

  {
    itemId: "users",
    name: "Usuarios",
    path: "/users",
    icon: "groups",
    roles: ["Admin"],
  },

  {
    itemId: "calendar",
    name: "Calendario",
    path: "/calendar",
    icon: "calendar_month",
    roles: ["Admin"],
  },

  {
    itemId: "entries",
    name: "Entradas",
    path: "/entries",
    icon: "browse_activity",
    roles: ["Admin"],
  },

  {
    itemId: "exits",
    name: "Salidas",
    path: "/exits",
    icon: "garage_money",
    roles: ["Admin"],
  },

  {
    itemId: "finance",
    name: "Finanzas",
    path: "/finance",
    icon: "account_balance",
    roles: ["Admin"],
  },
];

export const secondSectionItems = [
  {
    itemId: "logout",
    name: "Cerrar Sesión",
    path: "/",
    icon: "logout",
  },
];
