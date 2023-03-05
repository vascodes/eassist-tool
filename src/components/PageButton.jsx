function PageButton({ buttonClass, buttonText, handlePageButtonClick }) {
	return (
		<button
			className={buttonClass}
			onClick={() => handlePageButtonClick()}
		>
			{buttonText}
		</button>
	);
}

export default PageButton;
