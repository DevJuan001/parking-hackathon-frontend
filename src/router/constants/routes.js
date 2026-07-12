import { lazy } from "react";
// Loadings
import HomeLoading from "@/modules/home/components/ui/HomeLoading";
import UsersLoading from "@/modules/users/components/ui/UsersLoading";
import ParkingLoading from "@/modules/parking/components/ui/ParkingLoading";
// Pages
const HomePage = lazy(() => import("@/modules/home/HomePage"));
const UsersPage = lazy(() => import("@/modules/users/UsersPage"));
const ExitsPage = lazy(() => import("@/modules/exits/ExitsPage"));
const EntriesPage = lazy(() => import("@/modules/entries/EntriesPage"));
const ParkingPage = lazy(() => import("@/modules/parking/ParkingPage"));
const FinancePage = lazy(() => import("@/modules/finance/FinancePage"));
const CheckInPage = lazy(() => import("@/modules/check-in/CheckInPage"));
const OnBoardingPage = lazy(
  () => import("@/modules/on-boarding/OnBoardingPage"),
);
const VehiclePayment = lazy(
  () => import("@/modules/vehicle-payment/VehiclePayment"),
);

export const layoutRoutes = [
  {
    path: "/home",
    component: HomePage,
    loading: HomeLoading,
    roles: ["Admin"],
  },

  {
    path: "/users",
    component: UsersPage,
    loading: UsersLoading,
    roles: ["Admin"],
  },

  {
    path: "/entries",
    component: EntriesPage,
    loading: UsersLoading,
    roles: ["Admin"],
  },

  {
    path: "/parking",
    component: ParkingPage,
    roles: ["Admin"],
    loading: ParkingLoading,
  },

  {
    path: "/exits",
    component: ExitsPage,
    loading: ParkingLoading,
    roles: ["Admin"],
  },

  {
    path: "/finance",
    component: FinancePage,
    loading: ParkingLoading,
    roles: ["Admin"],
  },
];

export const standAloneRoutes = [
  {
    path: "/on-boarding",
    component: OnBoardingPage,
    roles: ["Admin"],
  },

  {
    path: "/vehicle-payment",
    component: VehiclePayment,
    roles: ["Cliente"],
  },

  {
    path: "/check-in",
    component: CheckInPage,
    roles: ["Cliente"],
  },
];
