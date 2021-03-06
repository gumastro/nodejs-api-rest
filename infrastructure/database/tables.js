class Tables {
    init(connection) {
        this.connection = connection
        
        this.createAppointments()
        this.createPets()
    }

    createAppointments() {
        const sql = 'CREATE TABLE IF NOT EXISTS Appointments (id int NOT NULL AUTO_INCREMENT, client varchar(11) NOT NULL, pet varchar(20), service varchar(20) NOT NULL, appointmentDate datetime NOT NULL, created datetime NOT NULL, status varchar(20) NOT NULL, observations text, PRIMARY KEY(id))'

        this.connection.query(sql, error => {
            if(error) {
                console.log(error)
            } else {
                console.log('[SUCCESS] Appointments table created!')
            }
        })
    }

    createPets() {
        const sql = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, name varchar(50), image varchar(200), PRIMARY KEY(id))'

        this.connection.query(sql, error => {
            if(error) {
                console.log(error)
            } else {
                console.log('[SUCCESS] Pets table created!')
            }
        })
    }
}

module.exports = new Tables