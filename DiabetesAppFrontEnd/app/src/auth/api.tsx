export default interface Respuesta {
    respuesta: string;
};

export const register = async (
    navigation: any,
    email: string,
    password: string,
    iHaveDiabeteStrings: any,
    someoneHaveDiabetesString: any,
    onSuccess?: () => void,
    setError?: React.Dispatch<React.SetStateAction<{ title: string; errorMessages: string[] } | null>>
) => {

    const iHaveDiabetes = Number(iHaveDiabeteStrings);
    const someoneHaveDiabetes = Number(someoneHaveDiabetesString);

    const registerDTO = {
        email,
        password,
        iHaveDiabetes,
        someoneHaveDiabetes
    };

    console.log(
        "iHaveDiabetes: ", iHaveDiabetes,
        "someoneHaveDiabetes: ", someoneHaveDiabetes
    )

    // URL 
    const url = `https://diabetesapp-z821.onrender.com/register`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerDTO),
        });

        if (!response.ok) {
            const errorData = await response.json();

            const errorMessages = [errorData.message || "Error desconocido"];

            // Pasar el error con la estructura consistente
            if (setError) {
                setError({
                    title: "Error de validación.",
                    errorMessages: errorMessages,
                });
            }

            console.error("Error al crear el usuario:", errorData);
            return;
        }

        const data = await response.json();

        console.log("Usuario creado!!", data);

        if (onSuccess) {
            onSuccess();
        }

        navigation.navigate("Welcome");
    } catch (error) {
        // Manejo de errores si la solicitud falla (como problemas de red)
        if (setError) {
            setError({
                title: "Error de conexión",
                errorMessages: ["No se pudo conectar con el servidor. Intenta más tarde."],
            });
        }
        console.error("Error en la solicitud:", error);
    }
};

export const iniciarSesion = async (
    navigation: any,
    email: string,
    password: string,
    onSuccess?: () => void,
    setError?: React.Dispatch<React.SetStateAction<{ title: string; errorMessages: string[] } | null>>
) => {
    // DTO de iniciar sesión
    const loginDTO = {
        email,
        password
    };

    // URL
    const url = `https://diabetesapp-z821.onrender.com/login`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginDTO),
        });

        if (!response.ok) {
            const errorData = await response.json();

            const errorTitle = errorData.message || "Error";
            const errorMessages = [errorData.message || "Error desconocido"];

            // Pasar el error con la estructura consistente
            if (setError) {
                setError({
                    title: "Error de validación.",
                    errorMessages: errorMessages,
                });
            }

            console.error("Error al crear el usuario:", errorData);
            return;
        }

        if (onSuccess) {
            onSuccess();
        }

        navigation.navigate("Menu");
    } catch (error) {
        // Manejo de errores si la solicitud falla (como problemas de red)
        if (setError) {
            setError({
                title: "Error de conexión",
                errorMessages: ["No se pudo conectar con el servidor. Intenta más tarde."],
            });
        }
        console.error("Error en la solicitud:", error);
    }
};

export const recuperarContrasena = async (
    navigation: any,
    email: string,
    onSuccess?: () => void,
    setError?: React.Dispatch<React.SetStateAction<{ title: string; errorMessages: string[] } | null>>
) => {
    // DTO
    const recoverPasswordDTO = {
        email
    };

    // URL
    const url = `https://diabetesapp-z821.onrender.com/recover-password`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recoverPasswordDTO),
        });

        if (!response.ok) {
            const errorData = await response.json();

            const errorTitle = errorData.message || "Error";
            const errorMessages = [errorData.message || "Error desconocido"];

            // Pasar el error con la estructura consistente
            if (setError) {
                setError({
                    title: "Error de validación.",
                    errorMessages: errorMessages,
                });
            }

            console.error("Error al recuperar la contrasena:", errorData);
            return;
        }

        if (onSuccess) {
            onSuccess();
        }

        navigation.navigate("VerificationCode", { email: email });
    } catch (error) {
        // Manejo de errores si la solicitud falla (como problemas de red)
        if (setError) {
            setError({
                title: "Error de conexión",
                errorMessages: ["No se pudo conectar con el servidor. Intenta más tarde."],
            });
        }
        console.error("Error en la solicitud:", error);
    }
};

export const verificarCodigo = async (
    navigation: any,
    email: string | undefined,
    verificationCode: string,
    onSuccess?: () => void,
    setError?: React.Dispatch<React.SetStateAction<{ title: string; errorMessages: string[] } | null>>
) => {
    // DTO
    const verifyCodeDTO = {
        email,
        verificationCode
    };

    // URL
    const url = `https://diabetesapp-z821.onrender.com/verify-code`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(verifyCodeDTO),
        });

        if (!response.ok) {
            const errorData = await response.json();

            const errorTitle = errorData.message || "Error";
            const errorMessages = [errorData.message || "Error desconocido"];

            // Pasar el error con la estructura consistente
            if (setError) {
                setError({
                    title: "Error de validación.",
                    errorMessages: errorMessages,
                });
            }

            console.error("Error al verificar el codigo:", errorData);
            return;
        }

        if (onSuccess) {
            onSuccess();
        }

        navigation.navigate("ChangePassword", { email: email });
    } catch (error) {
        // Manejo de errores si la solicitud falla (como problemas de red)
        if (setError) {
            setError({
                title: "Error de conexión",
                errorMessages: ["No se pudo conectar con el servidor. Intenta más tarde."],
            });
        }
        console.error("Error en la solicitud:", error);
    }
}

export const cambiarContrasena = async (
    navigation: any,
    email: string,
    newPassword: string,
    onSuccess?: () => void,
    setError?: React.Dispatch<React.SetStateAction<{ title: string; errorMessages: string[] } | null>>
) => {
    // DTO
    const changePasswordDTO = {
        email,
        newPassword
    };

    // URL
    const url = `https://diabetesapp-z821.onrender.com/change-password`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(changePasswordDTO),
        });

        if (!response.ok) {
            const errorData = await response.json();

            const errorTitle = errorData.message || "Error";
            const errorMessages = [errorData.message || "Error desconocido"];

            // Pasar el error con la estructura consistente
            if (setError) {
                setError({
                    title: "Error de validación.",
                    errorMessages: errorMessages,
                });
            }

            console.error("Error al cambiar la contraseña:", errorData);
            return;
        }

        if (onSuccess) {
            onSuccess();
        }

        navigation.navigate("Login");
    } catch (error) {
        // Manejo de errores si la solicitud falla (como problemas de red)
        if (setError) {
            setError({
                title: "Error de conexión",
                errorMessages: ["No se pudo conectar con el servidor. Intenta más tarde."],
            });
        }
        console.error("Error en la solicitud:", error);
    }
}

export const enviarMensajeChatBot = async (
    user_id: string,
    message: string,
    setResponse: any
) => {
    const chatBotDTO = {
        user_id,
        message
    }

    // URL
    const url = `https://diabetesapp-z821.onrender.com/chat`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(chatBotDTO),
        });

        const data = await response.json();
        console.log("Respuesta: ", data);
        if (data.outputs && data.outputs["out-0"]) {
            setResponse({ mensaje: data.outputs["out-0"] });
        } else {
            console.error("❌ Respuesta inesperada del chatbot:", data);
        }
    } catch (error) {
        console.log("Error en chatbot: ", error);
    }
};