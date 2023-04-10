function AlertBox({ type = "danger", children }) {
	return (
		<div
			className={`alert alert-${type} mt-4`}
			role="alert"
		>
			{children}
		</div>
	);
}

export default AlertBox;
