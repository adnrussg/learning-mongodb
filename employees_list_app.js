const mongoose = require('mongoose');
const Employees = require('./employee');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const uri = "mongodb://root:Yylxeyu9Dp8TMlBnOGmj1E0P@172.21.163.193:27017";
mongoose.connect(uri,{'dbName':'employeeDB'});

app.use("*",bodyParser.json());
app.use(cors());

app.get('/api/employees', async (req,res) => {
    const documents = await Employees.find();
    res.json(documents)
});

app.post('/api/add_employee', async (req,res) => {
    console.log(req);
    const data = req.body;
    const emp = new Employees({
        "emp_name": data['name'],
        "age": data['age'],
        "location": data['location'],
        "email": data['email']
    });
    await emp.save();
    res.json({ message: 'Employee added successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});