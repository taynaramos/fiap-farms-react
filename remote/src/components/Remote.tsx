import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import ProductionDashboard from './ProductionDashboard';

export default () => {
	const [message, setMessage] = useState('');

	const handleLogout = () => {
		signOut(auth)
			.then(() => setMessage('Logout realizado com sucesso!'))
			.catch(() => setMessage('Erro ao fazer logout.'));
	};

	return (
		<div>
			<h2>Dashboard</h2>
			<ProductionDashboard />
			<button onClick={handleLogout}>Logout</button>
			{message && <div style={{ color: 'green', marginTop: 8 }}>{message}</div>}
		</div>
	);
}; 