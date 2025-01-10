const express = require('express');
const app = express();
const con = require('./db');

app.use(express.json());

app.get('/get_institutes', function (req, res) {
    con.query('SELECT id, name FROM tbl_institute WHERE is_active = "1"', function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            if (result.length > 0) {
                res.status(200).json({ message: 'Institutes get successfully', data: result });
            } else {
                res.status(200).json({ message: 'No data found' });
            }
        }
    });
});

app.post('/get_category', function (req, res) {

    const request = req.body;

    con.query(`SELECT id, name, type, sub_type FROM tbl_category WHERE type = '${request.type}' AND is_active = "1"`, function (err, result) {

        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            if (result.length > 0) {
                res.status(200).json({ message: 'Category get successfully', data: result });
            } else {
                res.status(200).json({ message: 'No data found' });
            }
        }
    });
});

app.post('/get_boards', function (req, res) {

    const request = req.body;

    con.query(`SELECT id, name, type, sub_type FROM tbl_category WHERE type = '${request.type}' AND sub_type = '${request.sub_type}' AND is_active = "1"`, function (err, result) {

        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            if (result.length > 0) {
                res.status(200).json({ message: 'Boards get successfully', data: result });
            } else {
                res.status(200).json({ message: 'No data found' });
            }
        }
    });
});

app.post('/get_mediums', function (req, res) {

    const request = req.body;

    con.query(`SELECT id, name, type, sub_type FROM tbl_category WHERE type = '${request.type}' AND sub_type = '${request.sub_type}' AND is_active = "1"`, function (err, result) {

        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            if (result.length > 0) {
                res.status(200).json({ message: 'Mediums get successfully', data: result });
            } else {
                res.status(200).json({ message: 'No data found' });
            }
        }
    });
});

app.post('/get_class_category', function (req, res) {

    const request = req.body;

    con.query(`SELECT id, name, type, sub_type FROM tbl_category WHERE type = '${request.type}' AND sub_type = '${request.sub_type}' AND is_active = "1"`, function (err, result) {

        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            if (result.length > 0) {
                res.status(200).json({ message: 'Class category get successfully', data: result });
            } else {
                res.status(200).json({ message: 'No data found' });
            }
        }
    });
});

app.post('/get_standard', function (req, res) {

    const request = req.body;

    con.query(`SELECT id, category_id, name FROM tbl_school_class_standard WHERE category_id = '${request.category_id}' AND is_active = "1"`, function (err, result) {

        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            if (result.length > 0) {
                res.status(200).json({ message: 'Standard get successfully', data: result });
            } else {
                res.status(200).json({ message: 'No data found' });
            }
        }
    });
});

app.post('/get_subject', function (req, res) {

    const request = req.body;

    con.query(`SELECT id, school_class_standard_id, name FROM tbl_school_standard_subject WHERE school_class_standard_id = '${request.school_class_standard_id}' AND is_active = "1"`, function (err, result) {

        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Error fetching data' });
        } else {
            if (result.length > 0) {
                res.status(200).json({ message: 'Subjects get successfully', data: result });
            } else {
                res.status(200).json({ message: 'No data found' });
            }
        }
    });
});


app.post('/user_registration', function (req, res) {

    const request = req.body;

    const params = {
        name: request.name,
        email: request.email,
        institute_id: request.institute_id,
        // board_id: request.board_id ?? '0',
        medium_id: request.medium_id ?? '0',
        // class_standard_id: request.class_standard_id ?? '0',
        class_category_id: request.class_category_id ?? '0',
        country_code: request.country_code,
        phone: request.phone,
        state: request.state,
        city: request.city,
    }

    if (request.institute_type == 'School') {
        params.board_id = request.board_id ?? '0';
        params.class_standard_id = request.class_standard_id ?? '0';
    }

    con.query(`INSERT INTO tbl_user SET ?`, params, function (err, result) {

        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Error while user registration' });
        } else {
            if (result.insertId > 0) {

                // if (request.institute_type == 'School') {

                const user_subject = request.subject;

                user_subject?.forEach(item => {

                    const subject_params = {
                        user_id: result.insertId,
                        subject_id: item,
                    }

                    let table;

                    if (request.institute_type == 'School') {
                        table = 'tbl_user_subject'
                    } else if (request.institute_type == 'College') {
                        table = 'tbl_college_subject'
                    }

                    con.query(`INSERT INTO ${table} SET ?`, subject_params, function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
                // } else if (request.institute_type == 'College') {

                //     const user_subject = request.subject;

                //     user_subject?.forEach(item => {

                //         const subject_params = {
                //             user_id: result.insertId,
                //             standard_subject_id: item,
                //         }

                //         con.query(`INSERT INTO tbl_college_subject SET ?`, subject_params, function (err, result) {
                //             if (err) {
                //                 console.log(err);
                //             }
                //         });
                //     });
                // }

                res.status(200).json({ message: 'User registered successfully' });

            } else {
                res.status(500).send({ message: 'Error while user registration' });
            }
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})