// Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import '../Components/Profile.css'; // Create this file for styling if needed

function Login() {
    const [formData, setFormData] = useState({
        emailOrUsername: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform form validation
        if (!formData.emailOrUsername || !formData.password) {
            setError('Please fill in all fields.');
            return;
        }

        // Send login request to the server
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                // Login successful
                console.log('Login successful:', result);
                // Redirect to the homepage or user dashboard
                window.location.href = '/home';
            } else {
                // Login failed
                setError(result.message || 'Invalid credentials.');
            }
        } catch (err) {
            console.error('Error logging in:', err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <Card className="profile-card">
                <Card.Header className="text-center">
                    <h3>Sign Up</h3>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* Username or Email Field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                id="emailOrUsername"
                                name="emailOrUsername"
                                value={formData.emailOrUsername}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </Form.Group>

                        {/* Password Field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </Form.Group>

                        {/* Error Message */}
                        {error && <p className="error-message">{error}</p>}

                        {/* Submit Button */}
                        <Button type="submit" className="btn btn-primary">
                            Login
                        </Button>
                    </Form>

                    {/* Sign Up Link */}
                    <p className="signup-link">
                        Don’t have an account? <Link to="/signup">Sign up here</Link>.
                    </p>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;
