import React, { Suspense } from 'react';
import ResetPassword from './resetPasswordPage';

export const metadata = {
  title: "Reset Password",
};

function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}

export default ForgotPasswordPage;
