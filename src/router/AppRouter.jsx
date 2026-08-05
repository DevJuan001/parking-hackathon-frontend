import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// Constantes
import { layoutRoutes, standAloneRoutes } from "@/router/constants/routes";
// Componentes
import TermsPage from "@/modules/terms/TermsPage";
import ProtectedRoutes from "@/router/ProtectedRoutes";
import LandingPage from "@/modules/landing/LandingPage";
import Layout from "@/globals/components/Layout/Layout";
import CookiesPage from "@/modules/cookies/CookiesPage";
import ReservationPage from "@/modules/reservations/ReservationsPage";
import PrivacyPolicyPage from "@/modules/privacy-policy/PrivacyPolicyPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />

      <Route path="/" element={<LandingPage />} />

      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

      <Route path="/terms" element={<TermsPage />} />

      <Route path="/cookies" element={<CookiesPage />} />

      <Route path="/booking/:parkingId" element={<ReservationPage />} />

      <Route element={<Layout />}>
        {layoutRoutes.map(
          ({ path, component: Component, roles, loading: Fallback }) => (
            <Route key={path} element={<ProtectedRoutes roles={roles} />}>
              <Route
                path={path}
                element={
                  <Suspense fallback={<Fallback />}>
                    <Component />
                  </Suspense>
                }
              />
            </Route>
          ),
        )}
      </Route>

      {standAloneRoutes.map(({ path, component: Component, roles }) => (
        <Route key={path} element={<ProtectedRoutes roles={roles} />}>
          <Route
            path={path}
            element={
              <Suspense fallback={null}>
                <Component />
              </Suspense>
            }
          />
        </Route>
      ))}
    </Routes>
  );
}
