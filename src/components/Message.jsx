function Message({ children, bgColor, color }) {
	return (
		<div className="message" style={{ backgroundColor: bgColor, color }}>
			{children}
		</div>
	);
}

export default Message;
