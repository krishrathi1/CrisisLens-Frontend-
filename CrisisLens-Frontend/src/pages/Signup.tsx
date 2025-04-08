import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length > 6) score += 1;
    if (pass.length > 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    setPasswordStrength(score);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/auth/register', { fullname, email, password });
      setIsOtpSent(true);
      setLoading(false);
    } catch (error) {
      setError('Registration failed. Please check your information and try again.');
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post('/auth/verify-otp', { email, otp });
      setLoading(false);
      // Redirect to success page or login
    } catch (error) {
      setError('OTP verification failed. Please check the code and try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-6 px-6">
          <h2 className="text-center text-3xl font-extrabold text-white">{isOtpSent ? 'Verify Your Email' : 'Create Account'}</h2>
          <p className="mt-2 text-center text-blue-100">
            {isOtpSent 
              ? 'We sent a verification code to your email' 
              : 'Join us and start your journey today'}
          </p>
        </div>
        
        <div className="py-8 px-6">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          
          {!isOtpSent ? (
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    required
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-3 border border-gray-300 rounded-md"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-3 border border-gray-300 rounded-md"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      checkPasswordStrength(e.target.value);
                    }}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-3 border border-gray-300 rounded-md"
                    placeholder="••••••••"
                  />
                </div>
                
                {/* Password strength meter */}
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex mt-1 h-2 rounded overflow-hidden">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div 
                          key={level}
                          className={`flex-1 ${
                            passwordStrength >= level 
                              ? level <= 2 
                                ? 'bg-red-400' 
                                : level <= 3 
                                  ? 'bg-yellow-400' 
                                  : 'bg-green-400'
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {passwordStrength <= 2 && 'Weak password'}
                      {passwordStrength === 3 && 'Moderate password'}
                      {passwordStrength >= 4 && 'Strong password'}
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : 'Create Account'}
                </button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </a>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <p className="text-center text-gray-600 mb-6">
                We've sent a verification code to<br />
                <span className="font-medium text-gray-900">{email}</span>
              </p>
              
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Verification Code
                </label>
                <div className="mt-1">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-3 border border-gray-300 rounded-md text-center text-lg font-bold tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : 'Verify Email'}
                </button>
              </div>
              
              <div className="text-center mt-4">
                <button
                  type="button"
                  className="text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none"
                  onClick={() => setIsOtpSent(false)}
                >
                  Go back
                </button>
                <p className="text-xs text-gray-500 mt-4">
                  Didn't receive a code?{' '}
                  <button
                    type="button"
                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    Resend
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;