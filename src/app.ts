import express from 'express';


const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/api/products', (req, res):any => {
    console.log(req.body);
    res.status(201).json({
        message: 'Data received',
        data: req.body,
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

