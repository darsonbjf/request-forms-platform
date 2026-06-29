const recaptchaTokenValidate = async (req, res) => {
    const { recaptchaToken } = req.body;

    const verificationUrl = process.env.RECAPTCHA_VERIFY_URL || 'https://www.google.com/recaptcha/api/siteverify'; 
    const secretKey = process.env.SECRET_KEY; 

    if (!secretKey) {
        return res.status(503).json({ message: 'reCAPTCHA não configurado no servidor' });
    }

    try {
        const response = await fetch(verificationUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                secret: secretKey,
                response: recaptchaToken,
            })
        });

        const data = await response.json();

        if (data.success) {
            res.json({ message: 'Formulário enviado com sucesso!' });
        } else {
            res.status(400).json({ message: 'Falha na verificação do reCAPTCHA' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

export { recaptchaTokenValidate };
