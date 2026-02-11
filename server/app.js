const path=require('path');
const express=require('express');
const cors=require('cors');

const hostRoutes=require('./routes/hostRoutes');
const userRoutes=require('./routes/userRoutes');
const app=express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));

app.use('/host',hostRoutes);
app.use(userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal Server Error'
  });
});

app.use((req,res)=>{
    res.status(404).send('Route Not Found');
});

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});