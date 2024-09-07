const checkPassword = async (pass1, pass2) => {
    let isPassMatch = false

    bcrypt.compare(pass1, 'superSecret', function (err, res) {
        if (pass1 != pass2) {
            isPassMatch
        } else {
            // Send JWT
        }
    });
}