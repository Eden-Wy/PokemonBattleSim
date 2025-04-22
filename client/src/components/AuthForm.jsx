import { useState } from 'react';

const AuthForm = ({
  isRegistering,
  formData,
  setFormData,
  onSubmit,
  toggleForm,
  message,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        {isRegistering ? 'Register' : 'Login'}
      </h2>

      {message && (
        <div className="shadow-lg alert alert-error">
          <span>{message}</span>
        </div>
      )}

      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          value={formData.user_email}
          onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
          placeholder="Please enter your e-mail"
          className="w-full input input-bordered"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Enter your password"
          className="w-full input input-bordered"
          required
        />
      </div>


      <button type="submit" className="w-full btn btn-primary">
        {isRegistering ? 'Register' : 'Login'}
      </button>

      <p
        className="mt-2 text-center cursor-pointer text-blue-500"
        onClick={toggleForm}
      >
        {isRegistering
          ? 'Do you have an account already? Login'
          : 'You do not have an account yet? Register'}
      </p>
    </form>
  );
};

export default AuthForm;