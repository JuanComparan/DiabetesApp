import { ip } from "./ip";

export const register = async (
    navigation: any,
    email: string,
    password: string,
    iHaveDiabeteStrings: any,
    someoneHaveDiabetesString: any,
    onSuccess?: () => void,
    setError?: React.Dispatch<React.SetStateAction<{ title: string; errorMessages: string } | null>>
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
    const url = `http://${ip}:3000/register`;

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

            const errorTitle = errorData.message || "Error";
            const errorMessages = [errorData.message || "Error desconocido"];

            // Pasar el error con la estructura consistente
            if (setError) {
                setError({
                    title: errorTitle,
                    errorMessages: errorMessages.join(', '),
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
                errorMessages: "No se pudo conectar con el servidor. Intenta más tarde.",
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
    setError?: React.Dispatch<React.SetStateAction<{ title: string; errorMessages: string } | null>>
) => {
    // DTO de iniciar sesión
    const loginDTO = {
        email,
        password
    };

    // URL
    const url = `http://${ip}:3000/login`;

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
                    title: errorTitle,
                    errorMessages: errorMessages.join(', '),
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
                errorMessages: "No se pudo conectar con el servidor. Intenta más tarde.",
            });
        }
        console.error("Error en la solicitud:", error);
    }
}