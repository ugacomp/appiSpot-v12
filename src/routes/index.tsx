import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import PrivateAdminRoute from '../components/PrivateAdminRoute';
import PrivateRoute from '../components/PrivateRoute';
import AdminLayout from '../components/AdminLayout';
import HostLayout from '../components/HostLayout';
import GuestLayout from '../components/GuestLayout';

// Lazy load pages
const Home = React.lazy(() => import('../pages/Home'));
const SpotDetails = React.lazy(() => import('../pages/SpotDetails'));
const ExploreSpots = React.lazy(() => import('../pages/ExploreSpots'));
const About = React.lazy(() => import('../pages/About'));
const Contact = React.lazy(() => import('../pages/Contact'));
const ListSpot = React.lazy(() => import('../pages/ListSpot'));
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));

// Guest Pages
const GuestProfile = React.lazy(() => import('../pages/guest/GuestProfile'));
const GuestProfileEdit = React.lazy(() => import('../pages/guest/GuestProfileEdit'));
const GuestBookings = React.lazy(() => import('../pages/guest/GuestBookings'));
const GuestCancellations = React.lazy(() => import('../pages/guest/GuestCancellations'));
const GuestWishlist = React.lazy(() => import('../pages/guest/GuestWishlist'));

// Host Pages
const HostDashboard = React.lazy(() => import('../pages/HostDashboard'));
const HostBookings = React.lazy(() => import('../pages/host/HostBookings'));
const HostSpots = React.lazy(() => import('../pages/host/HostSpots'));
const HostRevenue = React.lazy(() => import('../pages/host/HostRevenue'));
const HostCancellations = React.lazy(() => import('../pages/host/HostCancellations'));
const HostMessages = React.lazy(() => import('../pages/host/HostMessages'));
const HostSettings = React.lazy(() => import('../pages/host/HostSettings'));

// Admin Pages
const AdminLogin = React.lazy(() => import('../pages/AdminLogin'));
const AdminDashboard = React.lazy(() => import('../pages/AdminDashboard'));
const AdminBookings = React.lazy(() => import('../pages/admin/AdminBookings'));
const AdminBookingDetails = React.lazy(() => import('../pages/admin/AdminBookingDetails'));
const AdminGuests = React.lazy(() => import('../pages/admin/AdminGuests'));
const AdminGuestDetails = React.lazy(() => import('../pages/admin/AdminGuestDetails'));
const AdminHosts = React.lazy(() => import('../pages/admin/AdminHosts'));
const AdminHostDetails = React.lazy(() => import('../pages/admin/AdminHostDetails'));
const AdminRevenue = React.lazy(() => import('../pages/admin/AdminRevenue'));
const AdminPayouts = React.lazy(() => import('../pages/admin/AdminPayouts'));
const AdminRefunds = React.lazy(() => import('../pages/admin/AdminRefunds'));
const AdminRefundDetails = React.lazy(() => import('../pages/admin/AdminRefundDetails'));
const AdminMessages = React.lazy(() => import('../pages/admin/AdminMessages'));
const AdminSpots = React.lazy(() => import('../pages/admin/AdminSpots'));
const AdminSpotDetails = React.lazy(() => import('../pages/admin/AdminSpotDetails'));
const AdminRoles = React.lazy(() => import('../pages/admin/AdminRoles'));
const AdminRoleDetails = React.lazy(() => import('../pages/admin/AdminRoleDetails'));
const AdminUsers = React.lazy(() => import('../pages/admin/AdminUsers'));
const AdminUserDetails = React.lazy(() => import('../pages/admin/AdminUserDetails'));
const AdminApprovals = React.lazy(() => import('../pages/admin/AdminApprovals'));
const AdminApprovalDetails = React.lazy(() => import('../pages/admin/AdminApprovalDetails'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/explore" element={<ExploreSpots />} />
        <Route path="/spots/:id" element={<SpotDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Guest Routes */}
        <Route path="/guest/profile" element={
          <PrivateRoute roles={['guest']}>
            <GuestLayout>
              <GuestProfile />
            </GuestLayout>
          </PrivateRoute>
        } />
        <Route path="/guest/profile/edit" element={
          <PrivateRoute roles={['guest']}>
            <GuestLayout>
              <GuestProfileEdit />
            </GuestLayout>
          </PrivateRoute>
        } />
        <Route path="/guest/bookings" element={
          <PrivateRoute roles={['guest']}>
            <GuestLayout>
              <GuestBookings />
            </GuestLayout>
          </PrivateRoute>
        } />
        <Route path="/guest/cancellations" element={
          <PrivateRoute roles={['guest']}>
            <GuestLayout>
              <GuestCancellations />
            </GuestLayout>
          </PrivateRoute>
        } />
        <Route path="/guest/wishlist" element={
          <PrivateRoute roles={['guest']}>
            <GuestLayout>
              <GuestWishlist />
            </GuestLayout>
          </PrivateRoute>
        } />

        {/* Host Routes */}
        <Route path="/host" element={
          <PrivateRoute roles={['host']}>
            <HostLayout>
              <HostDashboard />
            </HostLayout>
          </PrivateRoute>
        } />
        <Route path="/host/bookings" element={
          <PrivateRoute roles={['host']}>
            <HostLayout>
              <HostBookings />
            </HostLayout>
          </PrivateRoute>
        } />
        <Route path="/host/spots" element={
          <PrivateRoute roles={['host']}>
            <HostLayout>
              <HostSpots />
            </HostLayout>
          </PrivateRoute>
        } />
        <Route path="/host/revenue" element={
          <PrivateRoute roles={['host']}>
            <HostLayout>
              <HostRevenue />
            </HostLayout>
          </PrivateRoute>
        } />
        <Route path="/host/cancellations" element={
          <PrivateRoute roles={['host']}>
            <HostLayout>
              <HostCancellations />
            </HostLayout>
          </PrivateRoute>
        } />
        <Route path="/host/messages" element={
          <PrivateRoute roles={['host']}>
            <HostLayout>
              <HostMessages />
            </HostLayout>
          </PrivateRoute>
        } />
        <Route path="/host/settings" element={
          <PrivateRoute roles={['host']}>
            <HostLayout>
              <HostSettings />
            </HostLayout>
          </PrivateRoute>
        } />
        <Route path="/list-spot" element={
          <PrivateRoute roles={['host']}>
            <ListSpot />
          </PrivateRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/bookings" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminBookings />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/bookings/:id" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminBookingDetails />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/bookings/upcoming" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminBookings type="upcoming" />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/bookings/past" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminBookings type="past" />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/guests" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminGuests />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/guests/:id" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminGuestDetails />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/hosts" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminHosts />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/hosts/:id" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminHostDetails />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/revenue" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminRevenue />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/payouts" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminPayouts />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/refunds" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminRefunds />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/refunds/:id" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminRefundDetails />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/messages" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminMessages />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/spots" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminSpots />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/spots/:id" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminSpotDetails />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/roles" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminRoles />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/roles/:id" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminRoleDetails />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/users" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/users/:id" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminUserDetails />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/approvals" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminApprovals />
            </AdminLayout>
          </PrivateAdminRoute>
        } />
        <Route path="/admin/approvals/:type/:id" element={
          <PrivateAdminRoute>
            <AdminLayout>
              <AdminApprovalDetails />
            </AdminLayout>
          </PrivateAdminRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;