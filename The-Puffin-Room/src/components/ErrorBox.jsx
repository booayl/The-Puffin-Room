function ErrorBox({status, message}) {
    return (
        <p className="alertBoxRed">{status}  {message}</p>
    );
  }
  
  export default ErrorBox;