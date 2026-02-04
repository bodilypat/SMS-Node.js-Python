//src/features/auth/pages/ForgotPassword.jsx 

import { useState } from 'react';
import { forgotPasswordApi } from '../auth.api';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await forgotPasswordApi({ email });
            console.log('Password reset link sent:', response);
        } catch (error) {
            console.error('Error sending password reset link:', error);
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
}
export default ForgotPassword;

