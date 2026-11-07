import React, { useState } from 'react';
import {
  X,
  User,
  AlertCircle,
  Sparkles,
  Lock,
  Eye,
  EyeOff,
  Mail,
  CheckCircle,
  KeyRound,
} from 'lucide-react';
import { useCommunity } from '../../hooks/useCommunity';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'signin' | 'signup';
  onClose: () => void;
  onRegisteredSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onRegisteredSuccess,
}) => {
  const { login, signup, resetPassword } = useCommunity();
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);

  // Sign In state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Sign Up state: Name, Gmail/Email, and Password
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // Forgot Password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [showForgotNewPassword, setShowForgotNewPassword] = useState(false);
  const [showForgotConfirmPassword, setShowForgotConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    const result = login(loginEmail, loginPassword);
    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      setError('Please provide your name, gmail/email, and password.');
      return;
    }

    if (signupPassword.trim().length < 4) {
      setError('Password should be at least 4 characters long.');
      return;
    }

    // Register as Student with Name, Gmail, Password
    const result = signup(
      signupName.trim(),
      signupEmail.trim(),
      signupPassword.trim()
    );

    if (result.success) {
      onClose();
      // Prompt user to complete their profile
      if (onRegisteredSuccess) {
        onRegisteredSuccess();
      }
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!forgotEmail.trim()) {
      setError('Please enter your registered email address.');
      return;
    }

    if (!forgotNewPassword.trim() || forgotNewPassword.trim().length < 4) {
      setError('New password must be at least 4 characters long.');
      return;
    }

    if (forgotNewPassword.trim() !== forgotConfirmPassword.trim()) {
      setError('Passwords do not match. Please re-enter carefully.');
      return;
    }

    const result = resetPassword(forgotEmail.trim(), forgotNewPassword.trim());
    if (result.success) {
      setSuccessMessage('Password reset successfully! You are now logged in.');
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setError(result.error || 'Password reset failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 text-[#080808] shadow-2xl">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 text-[#666666] hover:text-[#080808] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tabs */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#E5E7EB] mb-6">
          <button
            onClick={() => {
              setMode('signin');
              setError(null);
              setSuccessMessage(null);
            }}
            type="button"
            className={`text-base font-bold pb-1 cursor-pointer transition-colors ${
              mode === 'signin'
                ? 'text-[#080808] border-b-2 border-[#080808]'
                : 'text-[#888888] hover:text-[#080808]'
            }`}
          >
            Student Login
          </button>
          <button
            onClick={() => {
              setMode('signup');
              setError(null);
              setSuccessMessage(null);
            }}
            type="button"
            className={`text-base font-bold pb-1 cursor-pointer transition-colors ${
              mode === 'signup'
                ? 'text-[#080808] border-b-2 border-[#080808]'
                : 'text-[#888888] hover:text-[#080808]'
            }`}
          >
            New Registration
          </button>
          {mode === 'forgot' && (
            <button
              type="button"
              className="text-base font-bold pb-1 text-[#080808] border-b-2 border-[#080808]"
            >
              Reset Password
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-xs text-[#991B1B] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#DC2626]" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] text-xs text-[#166534] flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-[#16A34A]" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* SIGN IN FORM */}
        {mode === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4 text-xs">
            <div>
              <label className="block text-[10px] uppercase font-mono text-[#666666] mb-1 font-semibold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#080808]" />
                <span>Registered Email / Gmail</span>
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                placeholder="e.g. arsalansahil02@gmail.com or rahul@gmail.com"
                className="w-full px-3 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] uppercase font-mono text-[#666666] font-semibold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#080808]" />
                  <span>Password</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot');
                    setError(null);
                    setSuccessMessage(null);
                    if (loginEmail) setForgotEmail(loginEmail);
                  }}
                  className="text-[11px] text-[#666666] hover:text-[#080808] underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-3 pr-10 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#080808] cursor-pointer"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#080808] text-white font-bold hover:bg-[#222222] cursor-pointer shadow-sm transition-colors text-xs"
            >
              Sign In to PioneerPixel
            </button>

            <div className="pt-3 border-t border-[#E5E7EB] flex flex-col items-center gap-2 text-center text-[11px] text-[#666666]">
              <div>
                Forgot your password?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot');
                    setError(null);
                    setSuccessMessage(null);
                    if (loginEmail) setForgotEmail(loginEmail);
                  }}
                  className="text-[#080808] underline font-bold cursor-pointer hover:text-black"
                >
                  Reset Password
                </button>
              </div>
              <div>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError(null);
                    setSuccessMessage(null);
                  }}
                  className="text-[#080808] underline font-bold cursor-pointer hover:text-black"
                >
                  Register new profile
                </button>
              </div>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {mode === 'forgot' && (
          <form onSubmit={handleResetPassword} className="space-y-3.5 text-xs">
            <div className="p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-[11px] text-[#555555] flex items-start gap-2">
              <KeyRound className="w-4 h-4 text-[#080808] shrink-0 mt-0.5" />
              <span>
                Enter your registered email address and create a new password to recover your account.
              </span>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-[#666666] mb-1 font-semibold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#080808]" />
                <span>Registered Email / Gmail *</span>
              </label>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                placeholder="e.g. arsalansahil02@gmail.com"
                className="w-full px-3 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-[#666666] mb-1 font-semibold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#080808]" />
                <span>New Password *</span>
              </label>
              <div className="relative">
                <input
                  type={showForgotNewPassword ? 'text' : 'password'}
                  value={forgotNewPassword}
                  onChange={(e) => setForgotNewPassword(e.target.value)}
                  required
                  placeholder="Enter new password (min 4 characters)"
                  className="w-full pl-3 pr-10 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                />
                <button
                  type="button"
                  onClick={() => setShowForgotNewPassword(!showForgotNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#080808] cursor-pointer"
                >
                  {showForgotNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-[#666666] mb-1 font-semibold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#080808]" />
                <span>Confirm New Password *</span>
              </label>
              <div className="relative">
                <input
                  type={showForgotConfirmPassword ? 'text' : 'password'}
                  value={forgotConfirmPassword}
                  onChange={(e) => setForgotConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-enter new password"
                  className="w-full pl-3 pr-10 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                />
                <button
                  type="button"
                  onClick={() => setShowForgotConfirmPassword(!showForgotConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#080808] cursor-pointer"
                >
                  {showForgotConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#080808] text-white font-bold hover:bg-[#222222] cursor-pointer shadow-sm transition-colors text-xs"
            >
              Reset Password & Sign In
            </button>

            <div className="pt-3 border-t border-[#E5E7EB] text-center text-[11px] text-[#666666]">
              Remembered your password?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError(null);
                  setSuccessMessage(null);
                }}
                className="text-[#080808] underline font-bold cursor-pointer"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}

        {/* SIGN UP FORM — NAME, GMAIL, PASSWORD */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-3.5 text-xs">
            <div className="p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-[11px] text-[#555555] flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#080808] shrink-0 mt-0.5" />
              <span>
                Enter your Name, Gmail, and Password to create your account and complete your profile.
              </span>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-[#666666] mb-1 font-semibold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#080808]" />
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-[#666666] mb-1 font-semibold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#080808]" />
                <span>Gmail / Email Address *</span>
              </label>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
                placeholder="e.g. rahul.sharma@gmail.com"
                className="w-full px-3 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-[#666666] mb-1 font-semibold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#080808]" />
                <span>Set Password *</span>
              </label>
              <div className="relative">
                <input
                  type={showSignupPassword ? 'text' : 'password'}
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  placeholder="Create a password (min 4 characters)"
                  className="w-full pl-3 pr-10 py-2.5 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#080808] cursor-pointer"
                >
                  {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#080808] text-white font-bold hover:bg-[#222222] cursor-pointer shadow-sm transition-colors text-xs"
            >
              Sign Up & Open Profile
            </button>

            <div className="text-center text-[11px] text-[#666666]">
              Already registered?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError(null);
                  setSuccessMessage(null);
                }}
                className="text-[#080808] underline font-bold cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
