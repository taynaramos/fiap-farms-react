import React from 'react';
import ProductionDashboard from './components/ProductionDashboard';

// Estilo global para fonte Roboto
const globalStyle = document.createElement('style');
globalStyle.innerHTML = `body, * { font-family: 'Roboto', Arial, sans-serif !important; }`;
document.head.appendChild(globalStyle);

export default function App({ children }: { children?: React.ReactNode }) {
	return (
		<div>
			<ProductionDashboard />
		</div>
	);
}
