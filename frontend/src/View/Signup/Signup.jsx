import React, { useState } from "react";
import "./Signup.css";

function Signup() {
  // Variáveis de estado para os campos de entrada
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    // Validação simples
    if (!email) {
      setErrorMessage("Email é obrigatório.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    // Resetar mensagem de erro se todas as validações passarem
    setErrorMessage("");

    // Aqui você pode adicionar a lógica para enviar os dados para um servidor
    console.log("Dados enviados:", { email, password });
  };

  // Funções para atualizar os estados
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  return (
    <div className="todaPagina">
      <div className="paletaS">
        <h1>Sign Up Form</h1>
        <form className="formS" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            className="inputS"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Palavra-passe"
            className="inputS"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            placeholder="Reconfirmar palavra-passe"
            className="inputS"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button className="loginBtnS" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
